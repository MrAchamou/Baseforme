
import type { Effect } from '@/types/effects';

// Import des effets locaux
import effectsIndex from '../effects/effectsIndex.json';

interface LocalEffect extends Effect {
  scriptPath: string;
}

export class LocalEffectsLoader {
  private loadedScripts: Map<string, Function> = new Map();
  private effectsCache: Effect[] = [];

  /**
   * Charge la liste des effets depuis l'index local
   */
  async loadEffectsIndex(): Promise<Effect[]> {
    try {
      console.log('📂 Loading effects from local index...');
      
      // Transform effectsIndex to Effect format
      this.effectsCache = effectsIndex.map(effect => ({
        id: effect.id,
        name: effect.name,
        description: effect.description,
        path: `/src/effects/${effect.file}`,
        scriptUrl: `/src/effects/${effect.file}`,
        category: effect.category as 'text' | 'image' | 'both',
        type: effect.type as 'animation' | 'transition' | 'special'
      }));

      console.log(`✅ Successfully loaded ${this.effectsCache.length} effects from local index`);
      return this.effectsCache;
    } catch (error) {
      console.error('❌ Failed to load effects from local index:', error);
      return this.getFallbackEffects();
    }
  }

  /**
   * Charge un script d'effet spécifique
   */
  async loadEffectScript(effect: Effect): Promise<Function | null> {
    try {
      if (this.loadedScripts.has(effect.id)) {
        console.log(`✅ Effect ${effect.name} already loaded from cache`);
        return this.loadedScripts.get(effect.id)!;
      }

      console.log(`🎬 Loading effect script: ${effect.name}`);

      // Dynamically import the effect script
      const scriptPath = effect.path.replace('/src/', '../');
      
      // For local effects, we'll use dynamic import with modules
      let effectModule;
      
      try {
        // Try to import as ES module first
        effectModule = await import(/* @vite-ignore */ scriptPath);
      } catch (esError) {
        // Fallback: load as text and create function
        const response = await fetch(effect.scriptUrl!);
        if (!response.ok) {
          throw new Error(`Failed to fetch effect script: ${response.statusText}`);
        }

        const scriptCode = await response.text();
        
        // Create a function from the script
        const effectFunction = new Function('context', `
          ${scriptCode}
          
          // If there's an animate function defined, return it
          if (typeof animate === 'function') {
            return animate;
          }
          
          // Otherwise create a basic animation wrapper
          return function(context) {
            if (typeof init === 'function') {
              init(context);
            }
            
            let frame = 0;
            function animLoop() {
              if (typeof update === 'function') {
                update(context, frame);
              } else if (typeof render === 'function') {
                render(context, frame);
              }
              frame++;
              context.animationFrame = requestAnimationFrame(animLoop);
            }
            animLoop();
          };
        `);

        effectModule = { default: effectFunction };
      }

      const animateFunction = effectModule.default || effectModule.animate;
      
      if (typeof animateFunction === 'function') {
        this.loadedScripts.set(effect.id, animateFunction);
        console.log(`✅ Successfully loaded effect: ${effect.name}`);
        return animateFunction;
      } else {
        throw new Error('No valid animate function found in effect script');
      }

    } catch (error) {
      console.error(`❌ Failed to load effect ${effect.name}:`, error);
      return this.createFallbackFunction(effect.name);
    }
  }

  /**
   * Exécute un effet chargé
   */
  async executeEffect(effectId: string, canvas: HTMLCanvasElement, text: string, options: any = {}): Promise<void> {
    const effect = this.effectsCache.find(e => e.id === effectId);
    if (!effect) {
      console.error(`Effect ${effectId} not found in cache`);
      return;
    }

    const animateFunction = await this.loadEffectScript(effect);
    if (!animateFunction) {
      console.error(`Failed to load script for effect ${effectId}`);
      return;
    }

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get canvas context');
        return;
      }

      // Prepare context for effect execution
      const context = {
        canvas,
        ctx,
        text,
        animationFrame: 0,
        startTime: Date.now(),
        options,
        ...options
      };

      // Execute the effect
      console.log(`🎬 Executing effect: ${effect.name} with text: "${text}"`);
      animateFunction(context);

    } catch (error) {
      console.error(`Error executing effect ${effectId}:`, error);
      this.createFallbackAnimation(canvas, text, `Error: ${error.message}`);
    }
  }

  /**
   * Crée une fonction de fallback pour les effets qui échouent
   */
  private createFallbackFunction(effectName: string): Function {
    return (context: any) => {
      this.createFallbackAnimation(context.canvas, context.text, `Fallback for ${effectName}`);
    };
  }

  /**
   * Animation de fallback basique
   */
  private createFallbackAnimation(canvas: HTMLCanvasElement, text: string, errorInfo?: string): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f0f23');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated text
      const x = canvas.width / 2;
      const y = canvas.height / 2;

      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const hue = (frame * 3) % 360;
      const scale = 1 + Math.sin(frame * 0.08) * 0.1;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = `hsl(${hue}, 70%, 65%)`;
      ctx.shadowColor = `hsl(${hue}, 70%, 65%)`;
      ctx.shadowBlur = 15;
      ctx.fillText(text, 0, 0);
      ctx.restore();

      // Error info
      if (errorInfo) {
        ctx.font = '12px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText(errorInfo, x, y + 60);
      }

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * Effets de fallback si l'index local échoue
   */
  private getFallbackEffects(): Effect[] {
    return [
      {
        id: 'typewriter',
        name: 'TYPEWRITER',
        description: 'Animation de machine à écrire',
        path: '/src/effects/typewriter.js',
        scriptUrl: '/src/effects/typewriter.js',
        category: 'text',
        type: 'animation'
      },
      {
        id: 'neon-glow',
        name: 'NEON GLOW',
        description: 'Effet néon lumineux',
        path: '/src/effects/neon-glow.js',
        scriptUrl: '/src/effects/neon-glow.js',
        category: 'text',
        type: 'special'
      },
      {
        id: 'fire-write',
        name: 'FIRE WRITE',
        description: 'Écriture enflammée',
        path: '/src/effects/fire-write.js',
        scriptUrl: '/src/effects/fire-write.js',
        category: 'text',
        type: 'animation'
      }
    ];
  }

  /**
   * Nettoie les scripts chargés
   */
  clearCache(): void {
    this.loadedScripts.clear();
    this.effectsCache = [];
    console.log('🧹 Effects cache cleared');
  }

  /**
   * Retourne les statistiques de chargement
   */
  getStats() {
    return {
      effectsLoaded: this.effectsCache.length,
      scriptsInCache: this.loadedScripts.size,
      cacheHitRatio: this.loadedScripts.size / Math.max(this.effectsCache.length, 1)
    };
  }
}

// Instance singleton
export const localEffectsLoader = new LocalEffectsLoader();

// Fonction principale pour charger les effets (remplace loadEffectsFromGitHub)
export async function loadEffectsFromLocal(): Promise<Effect[]> {
  return await localEffectsLoader.loadEffectsIndex();
}
