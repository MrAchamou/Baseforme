
import { Effect } from '@/types/effects';
import { getLayoutForFormat, getZoneBounds, TemplateZone } from './template-layout';

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

export interface ZoneContent {
  zoneId: string;
  text: string;
  effect: Effect | null;
  image?: string;
}

export class PreviewEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrame: number | null = null;
  private currentFormat = '9:16';
  private zoneContents: Map<string, ZoneContent> = new Map();
  private isPlaying = false;
  private startTime = 0;

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
      this.currentFormat = format;
      this.canvas.width = formatConfig.width;
      this.canvas.height = formatConfig.height;
      
      // Adapter l'échelle pour l'affichage dans le mockup
      const maxWidth = 350;
      const maxHeight = 600;
      const scale = Math.min(maxWidth / formatConfig.width, maxHeight / formatConfig.height);
      
      this.canvas.style.width = `${formatConfig.width * scale}px`;
      this.canvas.style.height = `${formatConfig.height * scale}px`;
      
      // Redémarrer le rendu avec le nouveau format
      if (this.isPlaying) {
        this.render();
      }
      
      console.log(`📱 Preview Engine: Format ${format} configuré (${formatConfig.width}x${formatConfig.height}) pour ${platform}`);
    }
  }

  setZoneContent(zoneId: string, text: string, effect: Effect | null, image?: string) {
    this.zoneContents.set(zoneId, {
      zoneId,
      text,
      effect,
      image
    });
    
    if (this.isPlaying) {
      this.render();
    }
    
    console.log(`📍 Zone ${zoneId} mise à jour:`, { text, effect: effect?.name });
  }

  clearZone(zoneId: string) {
    this.zoneContents.delete(zoneId);
    if (this.isPlaying) {
      this.render();
    }
  }

  clearAllZones() {
    this.zoneContents.clear();
    if (this.isPlaying) {
      this.render();
    }
  }

  async loadScenario(elements: Array<{elementId: string, zoneId: string, text: string, effect: Effect | null}>) {
    this.clearAllZones();
    
    for (const element of elements) {
      this.setZoneContent(element.zoneId, element.text, element.effect);
    }
    
    this.startAnimation();
    console.log(`🎬 Scénario chargé avec ${elements.length} éléments`);
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

    const currentTime = Date.now();
    if (this.startTime === 0) {
      this.startTime = currentTime;
    }

    // Nettoyer le canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Dessiner le fond selon la plateforme
    this.drawPlatformBackground();

    // Obtenir le layout pour le format actuel
    const layout = getLayoutForFormat(this.currentFormat);

    // Dessiner les guides de zones (en mode debug)
    this.drawZoneGuides(layout);

    // Rendre chaque zone avec son contenu
    this.zoneContents.forEach((content, zoneId) => {
      const zone = layout.zones[zoneId];
      if (zone) {
        this.renderZoneContent(zone, content, currentTime - this.startTime);
      }
    });

    // Continuer l'animation
    this.animationFrame = requestAnimationFrame(this.render);
  }

  private drawPlatformBackground() {
    if (!this.ctx || !this.canvas) return;

    // Fond dégradé selon le format
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawZoneGuides(layout: any) {
    if (!this.ctx || !this.canvas) return;

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([5, 5]);

    Object.values(layout.zones).forEach((zone: any) => {
      const bounds = getZoneBounds(zone, this.canvas!.width, this.canvas!.height);
      this.ctx!.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
    });

    this.ctx.setLineDash([]);
  }

  private renderZoneContent(zone: TemplateZone, content: ZoneContent, elapsed: number) {
    if (!this.ctx || !this.canvas) return;

    const bounds = getZoneBounds(zone, this.canvas.width, this.canvas.height);
    
    // Appliquer l'effet si disponible
    if (content.effect) {
      this.ctx.save();
      this.applyZoneEffect(zone, content.effect, elapsed);
    }

    // Dessiner le texte
    if (content.text) {
      this.drawZoneText(zone, bounds, content.text);
    }

    // Dessiner l'image si disponible
    if (content.image) {
      this.drawZoneImage(zone, bounds, content.image);
    }

    if (content.effect) {
      this.ctx.restore();
    }
  }

  private drawZoneText(zone: TemplateZone, bounds: any, text: string) {
    if (!this.ctx) return;

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = `${bounds.height * zone.fontSize}px Arial, sans-serif`;
    this.ctx.textAlign = zone.alignment;
    
    const lines = this.wrapText(text, bounds.width, zone.maxLines);
    const lineHeight = bounds.height / Math.max(lines.length, 1);
    
    lines.forEach((line, index) => {
      const x = zone.alignment === 'center' ? bounds.x + bounds.width / 2 :
                zone.alignment === 'right' ? bounds.x + bounds.width :
                bounds.x;
      const y = bounds.y + (index + 0.7) * lineHeight;
      
      this.ctx!.fillText(line, x, y);
    });
  }

  private drawZoneImage(zone: TemplateZone, bounds: any, imageSrc: string) {
    // Implementation pour dessiner des images dans les zones
    // À implémenter selon les besoins
  }

  private wrapText(text: string, maxWidth: number, maxLines: number): string[] {
    if (!this.ctx) return [text];

    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length && lines.length < maxLines; i++) {
      const testLine = currentLine + words[i] + ' ';
      const metrics = this.ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = words[i] + ' ';
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine.trim() && lines.length < maxLines) {
      lines.push(currentLine.trim());
    }

    return lines;
  }

  private applyZoneEffect(zone: TemplateZone, effect: Effect, elapsed: number) {
    if (!this.ctx) return;

    // Appliquer des effets visuels basiques
    const progress = (elapsed / 1000) % 2; // Cycle de 2 secondes
    
    switch (effect.type) {
      case 'animation':
        this.ctx.globalAlpha = 0.8 + 0.2 * Math.sin(progress * Math.PI);
        break;
      case 'transition':
        const scale = 1 + 0.1 * Math.sin(progress * Math.PI * 2);
        this.ctx.scale(scale, scale);
        break;
      case 'special':
        this.ctx.shadowColor = '#00ffff';
        this.ctx.shadowBlur = 10 * Math.sin(progress * Math.PI);
        break;
    }
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
    this.zoneContents.clear();
  }
}

// Instance globale
export const previewEngine = new PreviewEngine();
