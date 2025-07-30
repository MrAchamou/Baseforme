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
  element: HTMLElement;
  startTime: number;
  duration: number;
  parameters: any;
}

function logEffectSources(effects: Effect[]) {
  console.log('📊 Effect sources:');
  const sourceGroups = effects.reduce((acc, effect) => {
    const source = effect.isLocal ? 'Local Effect Directory' : 'External';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(sourceGroups).forEach(([source, count]) => {
    console.log(`   ${source}: ${count} effects`);
  });
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
      console.log(`🔄 Loading local effect: ${effect.name}`);

      if (!validateLocalEffect(effect)) {
        throw new Error(`Effect validation failed: ${effect.name} does not meet local requirements`);
      }

      // Pour les effets locaux, on utilise directement la fonction execute
      const loadedEffect: LoadedEffect = {
        effect,
        script: effect.scriptContent || '',
        loadedAt: new Date(),
        source: 'local',
        module: null
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

      // Utiliser directement la fonction execute de l'effet
      if (loadedEffect.effect.execute) {
        await loadedEffect.effect.execute(this.canvas, parameters.text || '', parameters);
        return true;
      } else {
        console.error('Effect has no execute function');
        return false;
      }

    } catch (error) {
      console.error(`❌ Effect execution failed for ${effectId}:`, error);
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
export { EffectLoader, type LoadedEffect, type AnimationContext };