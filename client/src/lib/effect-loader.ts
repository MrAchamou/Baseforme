import type { Effect } from '@/types/effects';

interface AnimationContext {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  text: string;
  animationFrame: number;
  startTime: number;
  image?: HTMLImageElement;
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

  executeEffect(effectId: string, text: string, image?: HTMLImageElement): boolean {
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
      console.error(`❌ Effect ${effectId} not loaded - using fallback`);
      this.createFallbackAnimation(text);
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
        startTime: Date.now(),
        image
      };

      // Clear canvas first
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Set default background with gradient
      const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      gradient.addColorStop(0, '#0f0f23');
      gradient.addColorStop(1, '#1a1a2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Execute the effect with timeout protection
      const timeout = setTimeout(() => {
        console.warn(`⚠️ Effect ${effectId} timeout - switching to fallback`);
        this.stopAnimation();
        this.createFallbackAnimation(text);
      }, 15000);

      const animateFunction = effectFunction(this.currentContext);

      if (typeof animateFunction === 'function') {
        console.log(`🎬 Starting animation for effect ${effectId}`);
        clearTimeout(timeout);
        animateFunction();
      } else {
        console.log(`🎨 Direct execution for effect ${effectId}`);
        clearTimeout(timeout);
      }

      return true;

    } catch (error) {
      console.error(`❌ Error executing effect ${effectId}:`, error);

      // Enhanced fallback with error details
      this.createFallbackAnimation(text, `Erreur: ${effectId}`);
      return false;
    }
  }

  private createFallbackAnimation(text: string, errorInfo?: string): void {
    if (!this.canvas) return;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    // Update context for fallback
    this.currentContext = {
      ctx,
      canvas: this.canvas,
      text,
      animationFrame: 0,
      startTime: Date.now()
    };

    let frame = 0;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Enhanced background gradient
      const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f0f23');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Animated text with multiple effects
      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;

      // Main text
      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const hue = (frame * 3) % 360;
      const scale = 1 + Math.sin(frame * 0.08) * 0.15;
      const rotation = Math.sin(frame * 0.02) * 0.1;

      // Shadow effect
      ctx.save();
      ctx.translate(x + 3, y + 3);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillText(text, 0, 0);
      ctx.restore();

      // Main text with color animation
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.fillStyle = `hsl(${hue}, 70%, 65%)`;
      ctx.fillText(text, 0, 0);

      // Add glow effect
      ctx.shadowColor = `hsl(${hue}, 70%, 65%)`;
      ctx.shadowBlur = 20;
      ctx.fillText(text, 0, 0);
      ctx.restore();

      // Error info if provided
      if (errorInfo) {
        ctx.font = '12px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText(errorInfo, x, y + 80);
      }

      // Particles effect
      for (let i = 0; i < 5; i++) {
        const particleX = x + Math.sin((frame + i * 50) * 0.05) * 100;
        const particleY = y + Math.cos((frame + i * 30) * 0.03) * 60;
        
        ctx.fillStyle = `hsl(${(hue + i * 60) % 360}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      frame++;
      this.animationFrame = requestAnimationFrame(animate);
    };

    console.log(`🔄 Starting enhanced fallback animation for text: "${text}"`);
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