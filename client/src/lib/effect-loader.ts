
import { Effect } from '../types/effects';
import { 
  loadEffectsFromLocal, 
  getLocalEffectsStats, 
  loadEffectScript,
  validateJSfileEffect 
} from './local-effects-loader';
import { logEffectSources } from './effect-validator';

interface LoadedEffect {
  effect: Effect;
  script: string;
  loadedAt: Date;
  source: string;
}

interface AnimationContext {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  text: string;
  animationFrame: number;
  startTime: number;
  image?: HTMLImageElement;
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

      this.loadedEffects.set(effect.id, {
        effect,
        script: scriptContent,
        loadedAt: new Date(),
        source: 'JSfile'
      });

      console.log(`✅ JSfile effect ${effect.name} loaded successfully from ${effect.scriptUrl}`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to load JSfile effect ${effect.name}:`, error);
      return false;
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

      // Alternative execution strategy pour les effets JSfile
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
      // Créer un environnement d'exécution sécurisé et compatible
      const safeGlobals = {
        Math,
        Date,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        requestAnimationFrame: window.requestAnimationFrame.bind(window),
        cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
        console: {
          log: console.log.bind(console),
          error: console.error.bind(console),
          warn: console.warn.bind(console)
        }
      };

      // Créer le contexte d'effet
      const effectContext = {
        canvas: this.canvas!,
        ctx,
        text,
        image,
        options,
        width: this.canvas!.width,
        height: this.canvas!.height,
        time: 0,
        frame: 0,
        ...safeGlobals
      };

      // Stratégie 1: Essayer d'exécuter comme fonction directe
      try {
        const wrappedScript = `
          (function(canvas, ctx, text, image, options, width, height) {
            ${loadedEffect.script}
          })
        `;
        
        const effectFunction = eval(wrappedScript);
        effectFunction(
          effectContext.canvas,
          effectContext.ctx,
          effectContext.text,
          effectContext.image,
          effectContext.options,
          effectContext.width,
          effectContext.height
        );
        
        console.log(`✅ Effect ${loadedEffect.effect.name} executed successfully (direct)`);
        return;
        
      } catch (directError) {
        console.warn(`Direct execution failed for ${loadedEffect.effect.name}, trying module approach...`);
      }

      // Stratégie 2: Essayer comme module avec exports
      try {
        const moduleScript = `
          const exports = {};
          const module = { exports };
          
          ${loadedEffect.script}
          
          // Retourner la fonction d'effet
          if (typeof exports.default === 'function') {
            exports.default;
          } else if (typeof module.exports === 'function') {
            module.exports;
          } else if (typeof exports.animate === 'function') {
            exports.animate;
          } else if (typeof exports.effect === 'function') {
            exports.effect;
          } else {
            null;
          }
        `;
        
        const effectFunction = eval(`(function() { ${moduleScript} })()`);
        
        if (effectFunction) {
          effectFunction(effectContext);
          console.log(`✅ Effect ${loadedEffect.effect.name} executed successfully (module)`);
          return;
        }
        
      } catch (moduleError) {
        console.warn(`Module execution failed for ${loadedEffect.effect.name}, trying animation loop...`);
      }

      // Stratégie 3: Créer une boucle d'animation générique
      this.createGenericAnimationLoop(loadedEffect, effectContext);
      
    } catch (error) {
      console.error(`Failed to execute JSfile effect ${loadedEffect.effect.name}:`, error);
      throw error;
    }
  }

  private createGenericAnimationLoop(loadedEffect: LoadedEffect, effectContext: any): void {
    let frame = 0;
    const startTime = Date.now();

    const animate = () => {
      if (!this.canvas || !this.currentContext) return;

      const ctx = effectContext.ctx;
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;

      // Clear canvas
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      try {
        // Essayer d'exécuter le script avec le contexte mis à jour
        const updatedContext = {
          ...effectContext,
          time: elapsed,
          frame,
          deltaTime: elapsed / 60
        };

        // Environnement d'exécution avec variables globales
        const scriptWithContext = `
          const canvas = arguments[0];
          const ctx = arguments[1];
          const text = arguments[2];
          const image = arguments[3];
          const options = arguments[4];
          const width = arguments[5];
          const height = arguments[6];
          const time = arguments[7];
          const frame = arguments[8];
          
          ${loadedEffect.script}
        `;

        const contextFunction = new Function(scriptWithContext);
        contextFunction(
          updatedContext.canvas,
          updatedContext.ctx,
          updatedContext.text,
          updatedContext.image,
          updatedContext.options,
          updatedContext.width,
          updatedContext.height,
          updatedContext.time,
          updatedContext.frame
        );

      } catch (frameError) {
        // Si l'exécution échoue, créer une animation de base
        this.drawBasicTextAnimation(ctx, effectContext.text, frame);
      }

      frame++;
      
      // Limiter à 5 secondes d'animation
      if (elapsed < 5) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };

    console.log(`🔄 Starting generic animation loop for ${loadedEffect.effect.name}`);
    animate();
  }

  private drawBasicTextAnimation(ctx: CanvasRenderingContext2D, text: string, frame: number): void {
    if (!this.canvas) return;

    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Animated text
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
