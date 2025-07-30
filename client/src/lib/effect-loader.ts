import { Effect } from '../types/effects';
import { 
  loadEffectsFromLocal, 
  loadEffectScript, 
  validateLocalEffect, 
  getLocalEffectsStats 
} from './local-effects-loader';

interface LoadedEffect {
  effect: Effect;
  script: string;
  loadedAt: Date;
  source: string;
  module?: any;
}

interface AnimationContext {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  element?: HTMLElement;
  startTime: number;
  duration: number;
  parameters: any;
}

function logEffectSources(effects: Effect[]) {
  const sources = effects.reduce((acc, effect) => {
    acc[effect.source] = (acc[effect.source] || 0) + 1;
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
      console.log('📂 Loading all local effects...');
      const effects = await loadEffectsFromLocal();

      logEffectSources(effects);

      console.log(`✅ Loaded ${effects.length} local effects`);
      return effects;

    } catch (error) {
      console.error('❌ Failed to load local effects:', error);
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
      console.log(`🔄 Loading local effect: ${effect.name} from ${effect.scriptUrl}`);

      if (!validateLocalEffect(effect)) {
        throw new Error(`Effect validation failed: ${effect.name} does not meet local requirements`);
      }

      if (!effect.scriptUrl || !effect.scriptUrl.startsWith('/src/effects/')) {
        throw new Error(`Security validation failed: Effect must come from local effects directory. Effect: ${effect.name}, URL: ${effect.scriptUrl}`);
      }

      const script = await loadEffectScript(effect.scriptUrl);

      // Essayer de charger le module
      let module = null;
      try {
        const blob = new Blob([script], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        module = await import(url);
        URL.revokeObjectURL(url);
      } catch (moduleError) {
        console.warn(`⚠️ Could not load as module: ${effect.name}`, moduleError);
      }

      const loadedEffect: LoadedEffect = {
        effect,
        script,
        loadedAt: new Date(),
        source: 'local',
        module
      };

      this.loadedEffects.set(effect.id, loadedEffect);
      console.log(`✅ Successfully loaded effect: ${effect.name}`);

      return true;

    } catch (error) {
      console.error(`❌ Failed to load effect ${effect.name}:`, error);
      return false;
    }
  }

  async executeEffect(effectId: string, element: HTMLElement, parameters: any = {}): Promise<boolean> {
    const loadedEffect = this.loadedEffects.get(effectId);

    if (!loadedEffect) {
      console.error(`Effect ${effectId} not loaded`);
      return false;
    }

    try {
      console.log(`🎬 Executing effect: ${loadedEffect.effect.name}`);

      if (!this.canvas) {
        console.error('Canvas not set');
        return false;
      }

      const context = this.canvas.getContext('2d');
      if (!context) {
        console.error('Could not get canvas context');
        return false;
      }

      // Créer le contexte d'animation
      const animationContext: AnimationContext = {
        canvas: this.canvas,
        context,
        element,
        startTime: Date.now(),
        duration: parameters.duration || 3000,
        parameters
      };

      this.currentContext = animationContext;

      // Si on a un module, essayer d'utiliser la fonction d'effet
      if (loadedEffect.module) {
        const effectConfig = loadedEffect.module.default || loadedEffect.module[Object.keys(loadedEffect.module)[0]];

        if (effectConfig && typeof effectConfig.engine === 'function') {
          console.log(`🚀 Running effect engine for: ${loadedEffect.effect.name}`);
          return await this.runEffectEngine(effectConfig.engine, animationContext);
        }
      }

      // Fallback: essayer d'exécuter le script directement
      console.log(`⚡ Running script directly for: ${loadedEffect.effect.name}`);
      return await this.runEffectScript(loadedEffect.script, animationContext);

    } catch (error) {
      console.error(`❌ Effect execution failed for ${effectId}:`, error);
      return false;
    }
  }

  private async runEffectEngine(engineFunction: Function, context: AnimationContext): Promise<boolean> {
    try {
      // Appeler la fonction d'effet avec le contexte
      await engineFunction(context);
      return true;
    } catch (error) {
      console.error('Effect engine execution failed:', error);
      return false;
    }
  }

  private async runEffectScript(script: string, context: AnimationContext): Promise<boolean> {
    try {
      // Créer un environnement sécurisé pour l'exécution du script
      const scriptFunction = new Function('context', 'canvas', 'ctx', script);
      await scriptFunction(context, context.canvas, context.context);
      return true;
    } catch (error) {
      console.error('Script execution failed:', error);
      return false;
    }
  }

  stopEffect(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    this.currentContext = null;
    console.log('🛑 Effect stopped');
  }

  getLoadedEffects(): LoadedEffect[] {
    return Array.from(this.loadedEffects.values());
  }

  isEffectLoaded(effectId: string): boolean {
    return this.loadedEffects.has(effectId);
  }

  clearCache(): void {
    this.loadedEffects.clear();
    console.log('🗑️ Effect cache cleared');
  }
}

export const effectLoader = new EffectLoader();
export { EffectLoader, LoadedEffect, AnimationContext };