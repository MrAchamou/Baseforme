import type { Effect } from '@/types/effects';

interface AnimationContext {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  text: string;
  animationFrame: number;
  startTime: number;
}

export class EffectLoader {
  private canvas: HTMLCanvasElement | null = null;
  private loadedEffects: Map<string, Function> = new Map();
  private animationFrame: number | null = null;
  private currentContext: AnimationContext | null = null;
  public onProgress: ((progress: number) => void) | null = null;

  setCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
  }

  async loadEffect(effect: Effect): Promise<void> {
    if (this.loadedEffects.has(effect.id)) {
      console.log(`✅ Effect ${effect.name} already loaded`);
      return;
    }

    try {
      console.log(`🎬 Loading effect: ${effect.name} from ${effect.scriptUrl}`);

      if (this.onProgress) this.onProgress(20);

      // Fetch the effect script
      const response = await fetch(effect.scriptUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch effect script: ${response.statusText}`);
      }

      if (this.onProgress) this.onProgress(50);

      const scriptCode = await response.text();
      console.log(`📜 Script loaded for ${effect.name}, length: ${scriptCode.length} chars`);

      if (this.onProgress) this.onProgress(80);

      // Create a function from the script
      const effectFunction = new Function('context', `
        ${scriptCode}

        // If there's an animate function defined, return it
        if (typeof animate === 'function') {
          return animate;
        }

        // Otherwise create a basic animation wrapper
        return function() {
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

      this.loadedEffects.set(effect.id, effectFunction);

      if (this.onProgress) this.onProgress(100);

      console.log(`✅ Successfully loaded and compiled effect: ${effect.name}`);

    } catch (error) {
      console.error(`❌ Failed to load effect ${effect.name}:`, error);
      throw error;
    }
  }

  executeEffect(effectId: string, text: string): boolean {
    if (!this.canvas) {
      console.error('❌ No canvas set');
      return false;
    }

    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      console.error('❌ Failed to get canvas context');
      return false;
    }

    const effectFunction = this.loadedEffects.get(effectId);
    if (!effectFunction) {
      console.error(`❌ Effect ${effectId} not loaded`);
      return false;
    }

    // Stop any existing animation
    this.stopAnimation();

    try {
      console.log(`🎯 Executing effect ${effectId} with text: "${text}"`);

      // Create animation context
      this.currentContext = {
        ctx,
        canvas: this.canvas,
        text,
        animationFrame: 0,
        startTime: Date.now()
      };

      // Clear canvas first
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Set default background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Execute the effect
      const animateFunction = effectFunction(this.currentContext);

      if (typeof animateFunction === 'function') {
        console.log(`🎬 Starting animation for effect ${effectId}`);
        animateFunction();
      } else {
        console.log(`🎨 Direct execution for effect ${effectId}`);
      }

      return true;

    } catch (error) {
      console.error(`❌ Error executing effect ${effectId}:`, error);

      // Fallback to basic animation
      this.createFallbackAnimation(text);
      return false;
    }
  }

  private createFallbackAnimation(text: string): void {
    if (!this.canvas || !this.currentContext) return;

    const { ctx, canvas } = this.currentContext;
    let frame = 0;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated text
      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const hue = (frame * 2) % 360;
      ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;

      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const scale = 1 + Math.sin(frame * 0.1) * 0.1;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillText(text, 0, 0);
      ctx.restore();

      frame++;
      this.animationFrame = requestAnimationFrame(animate);
    };

    console.log(`🔄 Starting fallback animation for text: "${text}"`);
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

export const effectLoader = new EffectLoader();