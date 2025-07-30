
import { Effect } from '../types/effects';
import { 
  loadEffectsFromLocal, 
  loadEffectScript, 
  validateJSfileEffect, 
  getLocalEffectsStats 
} from './local-effects-loader';

interface LoadedEffect {
  effect: Effect;
  script: string;
  loadedAt: Date;
  source: string;
  module?: any; // Stocker le module JSfile chargé
}

interface AnimationContext {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  text: string;
  animationFrame: number;
  startTime: number;
  image?: HTMLImageElement;
}

function logEffectSources(effects: Effect[]): void {
  const sources = effects.reduce((acc, effect) => {
    const source = effect.source || 'unknown';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('📊 Effect sources:', sources);
}

class EffectLoader {
  private canvas: HTMLCanvasElement | null = null;
  private loadedEffects: Map<string, LoadedEffect> = new Map();
  private animationFrame: number | null = null;  
  private currentContext: AnimationContext | null = null;
  public onProgress: ((progress: number) => void) | null = null;

  setCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
  }

  async loadAllEffects(): Promise<Effect[]> {
    try {
      console.log('📂 Loading all JSfile effects...');
      const effects = await loadEffectsFromLocal();
      
      logEffectSources(effects);
      
      console.log(`✅ Loaded ${effects.length} JSfile effects`);
      return effects;
      
    } catch (error) {
      console.error('❌ Failed to load JSfile effects:', error);
      return [];
    }
  }

  getStats() {
    return getLocalEffectsStats();
  }

  async loadEffect(effect: Effect): Promise<boolean> {
    if (this.loadedEffects.has(effect.id)) {
      console.log(`Effect ${effect.id} already loaded`);
      return true;
    }

    try {
      console.log(`Loading JSfile effect: ${effect.name}`);

      if (!validateJSfileEffect(effect)) {
        throw new Error(`Effect validation failed: ${effect.name} does not meet JSfile requirements`);
      }

      if (!effect.scriptUrl || !effect.scriptUrl.startsWith('/JSfile/')) {
        throw new Error(`Security validation failed: Effect must come from JSfile directory. Effect: ${effect.name}`);
      }

      const scriptContent = await loadEffectScript(effect.scriptUrl);

      // Charger aussi le module JSfile pour l'exécution
      const effectModule = await this.loadJSfileModule(effect.scriptUrl);

      this.loadedEffects.set(effect.id, {
        effect,
        script: scriptContent,
        loadedAt: new Date(),
        source: 'JSfile',
        module: effectModule
      });

      console.log(`✅ JSfile effect ${effect.name} loaded successfully from ${effect.scriptUrl}`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to load JSfile effect ${effect.name}:`, error);
      return false;
    }
  }

  private async loadJSfileModule(scriptUrl: string): Promise<any> {
    try {
      const response = await fetch(scriptUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const content = await response.text();
      const blob = new Blob([content], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);

      try {
        const module = await import(url);
        return module;
      } finally {
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Failed to load JSfile module ${scriptUrl}:`, error);
      throw error;
    }
  }

  async executeEffect(effectId: string, text: string, image?: HTMLImageElement, options: any = {}) {
    if (!this.canvas) {
      console.error('Canvas not set');
      return;
    }

    try {
      if (this.canvas.width === 0 || this.canvas.height === 0) {
        this.canvas.width = 800;
        this.canvas.height = 400;
      }

      this.stopAnimation();

      const loadedEffect = this.loadedEffects.get(effectId);
      if (!loadedEffect) {
        throw new Error(`Effect ${effectId} not loaded`);
      }

      const ctx = this.canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      this.currentContext = {
        ctx,
        canvas: this.canvas,
        text,
        animationFrame: 0,
        startTime: Date.now(),
        image
      };

      // Exécuter l'effet JSfile avec le module chargé
      await this.executeJSfileEffect(loadedEffect, ctx, text, image, options);

    } catch (error) {
      console.error(`Error executing effect ${effectId}:`, error);
      this.createFallbackAnimation(text, `Error: ${error.message}`);
    }
  }

  private async executeJSfileEffect(
    loadedEffect: LoadedEffect, 
    ctx: CanvasRenderingContext2D, 
    text: string, 
    image?: HTMLImageElement, 
    options: any = {}
  ): Promise<void> {
    try {
      if (!loadedEffect.module) {
        throw new Error('JSfile module not loaded');
      }

      // Chercher l'objet d'effet dans le module
      let effectObject = null;

      if (loadedEffect.module.default && this.isValidJSfileEffect(loadedEffect.module.default)) {
        effectObject = loadedEffect.module.default;
      } else {
        const keys = Object.keys(loadedEffect.module);
        for (const key of keys) {
          if (this.isValidJSfileEffect(loadedEffect.module[key])) {
            effectObject = loadedEffect.module[key];
            break;
          }
        }
      }

      if (!effectObject || !effectObject.engine) {
        throw new Error('No valid effect engine found in JSfile module');
      }

      console.log(`🎬 Executing JSfile effect: ${effectObject.name}`);

      // Préparer les paramètres pour l'effet
      const effectParams = {
        vitesse: 1,
        intensite: 0.5,
        ...effectObject.parameters,
        ...options
      };

      // Créer l'élément pour l'effet (canvas ou div)
      const effectElement = this.createEffectElement(text, image);

      // Exécuter l'engine de l'effet JSfile
      const cleanup = effectObject.engine(effectElement, effectParams);

      // Démarrer l'animation de rendu
      this.startRenderLoop(effectElement, cleanup);

      console.log(`✅ JSfile effect ${effectObject.name} started successfully`);

    } catch (error) {
      console.error(`Failed to execute JSfile effect ${loadedEffect.effect.name}:`, error);
      this.createFallbackAnimation(text, `JSfile execution error: ${error.message}`);
    }
  }

  private createEffectElement(text: string, image?: HTMLImageElement): HTMLElement {
    if (!this.canvas) {
      throw new Error('Canvas not available');
    }

    // Créer un élément div pour l'effet (similaire à DOM)
    const element = document.createElement('div');
    element.textContent = text;
    element.style.position = 'absolute';
    element.style.left = '50%';
    element.style.top = '50%';
    element.style.transform = 'translate(-50%, -50%)';
    element.style.fontSize = '32px';
    element.style.fontWeight = 'bold';
    element.style.color = 'white';
    element.style.textAlign = 'center';
    element.style.whiteSpace = 'nowrap';

    // Ajouter temporairement à la page pour les calculs de style
    element.style.visibility = 'hidden';
    document.body.appendChild(element);

    return element;
  }

  private startRenderLoop(effectElement: HTMLElement, cleanup?: () => void): void {
    let frame = 0;
    const startTime = Date.now();

    const render = () => {
      if (!this.canvas || !this.currentContext) {
        if (cleanup) cleanup();
        return;
      }

      const ctx = this.currentContext.ctx;
      
      // Clear canvas
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Dessiner un fond
      const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Lire les propriétés de style de l'élément et les appliquer au canvas
      try {
        const styles = window.getComputedStyle(effectElement);
        const transform = styles.transform;
        const opacity = styles.opacity;
        
        ctx.save();
        
        // Appliquer l'opacité
        if (opacity && opacity !== '1') {
          ctx.globalAlpha = parseFloat(opacity);
        }

        // Appliquer les transformations (scale, rotate, etc.)
        if (transform && transform !== 'none') {
          this.applyTransformToCanvas(ctx, transform);
        }

        // Dessiner le texte avec les styles appliqués
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2;
        
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = styles.color || 'white';
        
        // Appliquer shadow si présent
        if (styles.textShadow && styles.textShadow !== 'none') {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = 10;
        }
        
        ctx.fillText(effectElement.textContent || '', x, y);
        
        ctx.restore();

      } catch (error) {
        // Fallback rendering
        this.drawBasicTextAnimation(ctx, effectElement.textContent || '', frame);
      }

      frame++;
      
      // Limiter à 10 secondes d'animation
      if ((Date.now() - startTime) < 10000) {
        this.animationFrame = requestAnimationFrame(render);
      } else {
        if (cleanup) cleanup();
        // Nettoyer l'élément
        if (effectElement.parentNode) {
          effectElement.parentNode.removeChild(effectElement);
        }
      }
    };

    render();
  }

  private applyTransformToCanvas(ctx: CanvasRenderingContext2D, transform: string): void {
    // Parser les transformations CSS et les appliquer au canvas
    const scaleMatch = transform.match(/scale\(([^)]+)\)/);
    const rotateMatch = transform.match(/rotate\(([^)]+)\)/);
    const translateMatch = transform.match(/translate\(([^)]+)\)/);

    if (scaleMatch) {
      const scale = parseFloat(scaleMatch[1]);
      ctx.scale(scale, scale);
    }

    if (rotateMatch) {
      const angle = parseFloat(rotateMatch[1]);
      ctx.rotate(angle * Math.PI / 180);
    }

    if (translateMatch) {
      const values = translateMatch[1].split(',');
      const x = parseFloat(values[0]);
      const y = values[1] ? parseFloat(values[1]) : 0;
      ctx.translate(x, y);
    }
  }

  private isValidJSfileEffect(obj: any): boolean {
    return obj && 
           typeof obj === 'object' &&
           typeof obj.id === 'string' &&
           typeof obj.name === 'string' &&
           typeof obj.engine === 'function';
  }

  private drawBasicTextAnimation(ctx: CanvasRenderingContext2D, text: string, frame: number): void {
    if (!this.canvas) return;

    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;

    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const hue = (frame * 2) % 360;
    const scale = 1 + Math.sin(frame * 0.1) * 0.1;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
    ctx.shadowColor = `hsl(${hue}, 70%, 60%)`;
    ctx.shadowBlur = 15;
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  private createFallbackAnimation(text: string, errorInfo?: string): void {
    if (!this.canvas) return;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    this.currentContext = {
      ctx,
      canvas: this.canvas,
      text,
      animationFrame: 0,
      startTime: Date.now()
    };

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Enhanced background
      const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f0f23');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;

      ctx.font = 'bold 42px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const hue = (frame * 3) % 360;
      const scale = 1 + Math.sin(frame * 0.08) * 0.12;
      const rotation = Math.sin(frame * 0.02) * 0.05;

      // Shadow
      ctx.save();
      ctx.translate(x + 2, y + 2);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillText(text, 0, 0);
      ctx.restore();

      // Main text
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.fillStyle = `hsl(${hue}, 70%, 65%)`;
      ctx.shadowColor = `hsl(${hue}, 70%, 65%)`;
      ctx.shadowBlur = 18;
      ctx.fillText(text, 0, 0);
      ctx.restore();

      if (errorInfo) {
        ctx.font = '11px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(errorInfo, x, y + 70);
      }

      frame++;
      this.animationFrame = requestAnimationFrame(animate);
    };

    console.log(`🔄 Starting fallback animation for: "${text}"`);
    animate();
  }

  stopAnimation(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.currentContext = null;
  }

  isEffectLoaded(effectId: string): boolean {
    return this.loadedEffects.has(effectId);
  }

  getLoadedEffectsCount(): number {
    return this.loadedEffects.size;
  }
}

export default EffectLoader;

// Export singleton instance for convenience
export const effectLoader = new EffectLoader();
