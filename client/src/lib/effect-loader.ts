import type { Effect } from '@/types/effects';
import { loadEffectsFromLocal, loadEffectScript } from './local-effects-loader';

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

  async loadEffect(effect: Effect): Promise<boolean> {
    if (this.loadedEffects.has(effect.id)) {
      console.log(`Effect ${effect.id} already loaded`);
      return true;
    }

    try {
      console.log(`Loading local effect: ${effect.name}`);

      // Charge le script depuis le système local
      let scriptContent: string;

      if (effect.scriptUrl) {
        scriptContent = await loadEffectScript(effect.scriptUrl);
      } else if (effect.script) {
        // Utilise le script intégré pour les effets de démonstration
        scriptContent = effect.script;
      } else {
        throw new Error('No script available for this effect');
      }

      // Enregistre l'effet comme chargé
      this.loadedEffects.set(effect.id, {
        effect,
        script: scriptContent,
        loadedAt: new Date()
      });

      console.log(`✅ Local effect ${effect.name} loaded successfully`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to load local effect ${effect.name}:`, error);
      return false;
    }
  }

  async executeEffect(effectId: string, text: string, image?: HTMLImageElement, options: any = {}) {
    if (!this.canvas) {
      console.error('Canvas not set');
      return;
    }

    try {
      // Set canvas size if not already set
      if (this.canvas.width === 0 || this.canvas.height === 0) {
        this.canvas.width = 800;
        this.canvas.height = 400;
      }

      // Stop any existing animation
      this.stopAnimation();

      // Load and execute the effect
      const loadedEffect = this.loadedEffects.get(effectId);
      if (!loadedEffect) {
        throw new Error(`Effect ${effectId} not loaded`);
      }

      const ctx = this.canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Create animation context
      this.currentContext = {
        ctx,
        canvas: this.canvas,
        text,
        animationFrame: 0,
        startTime: Date.now(),
        image
      };

      // Execute the effect script in a safe environment
      try {
        // Les effets JSfile utilisent un format différent - ils exportent des fonctions ou des objets
        // On va créer un environnement d'exécution adapté
        const scriptEnvironment = {
          canvas: this.canvas,
          ctx,
          text,
          options: { ...options, image },
          requestAnimationFrame: window.requestAnimationFrame.bind(window),
          cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
          Math,
          Date,
          console
        };

        // Exécuter le script dans l'environnement sécurisé
        const effectFunction = new Function(
          'canvas', 'ctx', 'text', 'options', 'requestAnimationFrame', 'cancelAnimationFrame', 'Math', 'Date', 'console',
          `
          try {
            ${loadedEffect.script}
          } catch (e) {
            console.error('Effect execution error:', e);
            throw e;
          }
          `
        );
        
        effectFunction(
          scriptEnvironment.canvas,
          scriptEnvironment.ctx,
          scriptEnvironment.text,
          scriptEnvironment.options,
          scriptEnvironment.requestAnimationFrame,
          scriptEnvironment.cancelAnimationFrame,
          scriptEnvironment.Math,
          scriptEnvironment.Date,
          scriptEnvironment.console
        );
      } catch (scriptError) {
        console.error('Error executing effect script:', scriptError);
        throw new Error(`Script execution failed: ${scriptError.message}`);
      }

    } catch (error) {
      console.error(`Error executing effect ${effectId}:`, error);
      this.createFallbackAnimation(text, `Error: ${error.message}`);
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

// Effets de démonstration si GitHub échoue
const DEMO_EFFECTS: Effect[] = [
  {
    id: 'demo-fire-text',
    name: 'FIRE_TEXT',
    category: 'text',
    type: 'animation',
    path: '/demo/fire-text.js',
    description: 'Effet de feu sur texte'
  },
  {
    id: 'demo-electric-text',
    name: 'ELECTRIC_TEXT',
    category: 'text',
    type: 'animation',
    path: '/demo/electric-text.js',
    description: 'Effet électrique sur texte'
  },
  {
    id: 'demo-crystal-image',
    name: 'CRYSTAL_IMAGE',
    category: 'image',
    type: 'animation',
    path: '/demo/crystal-image.js',
    description: 'Effet cristal sur image'
  },
  {
    id: 'demo-sparkle-both',
    name: 'SPARKLE_UNIVERSAL',
    category: 'both',
    type: 'special',
    path: '/demo/sparkle-universal.js',
    description: 'Effet paillettes universel'
  },
  {
    id: 'demo-glow-text',
    name: 'GLOW_TEXT',
    category: 'text',
    type: 'animation',
    path: '/demo/glow-text.js',
    description: 'Effet de lueur sur texte'
  },
  {
    id: 'demo-wave-image',
    name: 'WAVE_IMAGE',
    category: 'image',
    type: 'animation',
    path: '/demo/wave-image.js',
    description: 'Effet de vague sur image'
  }
];

export const effectLoader = new EffectLoader();