
export interface EffectBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TemplateLayout {
  logo: EffectBounds;
  title: EffectBounds;
  subtitle: EffectBounds;
  cta: EffectBounds;
  background?: EffectBounds;
}

export const DEFAULT_TEMPLATE_LAYOUT: TemplateLayout = {
  logo: { x: 50, y: 50, width: 100, height: 100 },
  title: { x: 0, y: 160, width: 400, height: 60 },
  subtitle: { x: 0, y: 230, width: 400, height: 40 },
  cta: { x: 0, y: 300, width: 400, height: 50 }
};

export class ConstrainedEffect {
  private effect: any;
  private bounds: EffectBounds;

  constructor(effect: any, bounds: EffectBounds) {
    this.effect = effect;
    this.bounds = bounds;
  }

  render(ctx: CanvasRenderingContext2D, text: string, options: any = {}) {
    // Sauvegarder l'état du contexte
    ctx.save();
    
    // Créer un clipping path pour forcer l'effet dans sa zone
    ctx.beginPath();
    ctx.rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    ctx.clip();
    
    // Ajuster les coordonnées pour l'effet
    ctx.translate(this.bounds.x, this.bounds.y);
    
    // Créer un canvas temporaire aux dimensions exactes de la zone
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.bounds.width;
    tempCanvas.height = this.bounds.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (tempCtx) {
      // Exécuter l'effet dans le canvas temporaire
      const effectOptions = {
        ...options,
        canvas: tempCanvas,
        ctx: tempCtx,
        bounds: this.bounds
      };
      
      try {
        if (typeof this.effect.execute === 'function') {
          this.effect.execute(tempCanvas, text, effectOptions);
        } else if (typeof this.effect === 'function') {
          this.effect(tempCanvas, text, effectOptions);
        }
        
        // Dessiner le résultat dans le contexte principal
        ctx.drawImage(tempCanvas, -this.bounds.x, -this.bounds.y);
      } catch (error) {
        console.error('Error rendering constrained effect:', error);
      }
    }
    
    // Restaurer l'état du contexte
    ctx.restore();
  }

  getBounds(): EffectBounds {
    return this.bounds;
  }

  setBounds(bounds: EffectBounds) {
    this.bounds = bounds;
  }
}

export function createConstrainedEffect(effect: any, elementType: keyof TemplateLayout, customLayout?: TemplateLayout): ConstrainedEffect {
  const layout = customLayout || DEFAULT_TEMPLATE_LAYOUT;
  const bounds = layout[elementType];
  return new ConstrainedEffect(effect, bounds);
}
