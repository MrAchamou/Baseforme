
import { Effect } from '@/types/effects';

export interface PreviewConfig {
  format: string;
  platform: string;
  phone: string;
  realtime: boolean;
}

export interface PreviewBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class PreviewEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrame: number | null = null;
  private currentEffect: Effect | null = null;
  private isPlaying = false;

  constructor() {
    this.bind();
  }

  bind() {
    this.render = this.render.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    console.log('✅ Preview Engine: Canvas configuré', canvas.width, 'x', canvas.height);
  }

  updateFormat(format: string, platform: string) {
    if (!this.canvas) return;

    const formats = {
      '9:16': { width: 720, height: 1280 },
      '1:1': { width: 1080, height: 1080 },
      '4:5': { width: 1080, height: 1350 },
      '16:9': { width: 1280, height: 720 },
      '3:4': { width: 810, height: 1080 }
    };

    const formatConfig = formats[format as keyof typeof formats];
    if (formatConfig) {
      this.canvas.width = formatConfig.width;
      this.canvas.height = formatConfig.height;
      
      // Adapter l'échelle pour l'affichage dans le mockup
      const maxWidth = 350;
      const maxHeight = 600;
      const scale = Math.min(maxWidth / formatConfig.width, maxHeight / formatConfig.height);
      
      this.canvas.style.width = `${formatConfig.width * scale}px`;
      this.canvas.style.height = `${formatConfig.height * scale}px`;
      
      console.log(`📱 Preview Engine: Format ${format} configuré (${formatConfig.width}x${formatConfig.height})`);
    }
  }

  async loadEffect(effect: Effect, text: string) {
    this.currentEffect = effect;
    this.stopAnimation();

    if (!this.canvas || !this.ctx) {
      console.error('❌ Preview Engine: Canvas non configuré');
      return;
    }

    try {
      // Charger l'effet via l'effect-loader existant
      const { effectLoader } = await import('@/lib/effect-loader');
      await effectLoader.loadEffect(effect, text);
      
      console.log(`🎬 Preview Engine: Effet ${effect.name} chargé pour preview`);
      this.startAnimation();
    } catch (error) {
      console.error('❌ Preview Engine: Erreur lors du chargement', error);
    }
  }

  startAnimation() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.render();
    console.log('▶️ Preview Engine: Animation démarrée');
  }

  stopAnimation() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.isPlaying = false;
    console.log('⏹️ Preview Engine: Animation arrêtée');
  }

  private render() {
    if (!this.canvas || !this.ctx || !this.isPlaying) return;

    // Nettoyer le canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Exécuter l'effet actuel
    if (this.currentEffect) {
      try {
        const { effectLoader } = require('@/lib/effect-loader');
        effectLoader.executeEffect(this.currentEffect.id, '');
      } catch (error) {
        console.error('❌ Preview Engine: Erreur de rendu', error);
      }
    }

    // Continuer l'animation
    this.animationFrame = requestAnimationFrame(this.render);
  }

  setRealtimeMode(enabled: boolean) {
    if (enabled && !this.isPlaying) {
      this.startAnimation();
    } else if (!enabled && this.isPlaying) {
      this.stopAnimation();
    }
    console.log(`🔄 Preview Engine: Mode temps réel ${enabled ? 'activé' : 'désactivé'}`);
  }

  destroy() {
    this.stopAnimation();
    this.canvas = null;
    this.ctx = null;
    this.currentEffect = null;
  }
}

// Instance globale
export const previewEngine = new PreviewEngine();
