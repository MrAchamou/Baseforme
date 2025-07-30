
export interface TemplateZone {
  id: string;
  name: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  alignment: 'center' | 'left' | 'right';
  fontSize: number;
  maxLines: number;
}

export interface TemplateLayout {
  format: string;
  zones: Record<string, TemplateZone>;
}

// Layouts pour différents formats
export const TEMPLATE_LAYOUTS: Record<string, TemplateLayout> = {
  '9:16': {
    format: '9:16',
    zones: {
      logo: {
        id: 'logo',
        name: 'Zone Logo',
        bounds: { x: 0.1, y: 0.1, width: 0.8, height: 0.15 },
        alignment: 'center',
        fontSize: 0.08,
        maxLines: 1
      },
      title: {
        id: 'title',
        name: 'Titre Principal',
        bounds: { x: 0.1, y: 0.3, width: 0.8, height: 0.2 },
        alignment: 'center',
        fontSize: 0.12,
        maxLines: 2
      },
      subtitle: {
        id: 'subtitle',
        name: 'Sous-titre',
        bounds: { x: 0.1, y: 0.55, width: 0.8, height: 0.15 },
        alignment: 'center',
        fontSize: 0.06,
        maxLines: 3
      },
      cta: {
        id: 'cta',
        name: 'Call-to-Action',
        bounds: { x: 0.1, y: 0.75, width: 0.8, height: 0.1 },
        alignment: 'center',
        fontSize: 0.05,
        maxLines: 2
      },
      footer: {
        id: 'footer',
        name: 'Pied de page',
        bounds: { x: 0.1, y: 0.9, width: 0.8, height: 0.05 },
        alignment: 'center',
        fontSize: 0.03,
        maxLines: 1
      }
    }
  },
  '1:1': {
    format: '1:1',
    zones: {
      logo: {
        id: 'logo',
        name: 'Zone Logo',
        bounds: { x: 0.1, y: 0.1, width: 0.8, height: 0.2 },
        alignment: 'center',
        fontSize: 0.1,
        maxLines: 1
      },
      title: {
        id: 'title',
        name: 'Titre Principal',
        bounds: { x: 0.1, y: 0.35, width: 0.8, height: 0.2 },
        alignment: 'center',
        fontSize: 0.12,
        maxLines: 2
      },
      subtitle: {
        id: 'subtitle',
        name: 'Sous-titre',
        bounds: { x: 0.1, y: 0.6, width: 0.8, height: 0.15 },
        alignment: 'center',
        fontSize: 0.07,
        maxLines: 2
      },
      cta: {
        id: 'cta',
        name: 'Call-to-Action',
        bounds: { x: 0.1, y: 0.8, width: 0.8, height: 0.1 },
        alignment: 'center',
        fontSize: 0.06,
        maxLines: 1
      },
      footer: {
        id: 'footer',
        name: 'Pied de page',
        bounds: { x: 0.1, y: 0.92, width: 0.8, height: 0.05 },
        alignment: 'center',
        fontSize: 0.04,
        maxLines: 1
      }
    }
  },
  '16:9': {
    format: '16:9',
    zones: {
      logo: {
        id: 'logo',
        name: 'Zone Logo',
        bounds: { x: 0.05, y: 0.1, width: 0.25, height: 0.3 },
        alignment: 'left',
        fontSize: 0.08,
        maxLines: 1
      },
      title: {
        id: 'title',
        name: 'Titre Principal',
        bounds: { x: 0.35, y: 0.2, width: 0.6, height: 0.25 },
        alignment: 'center',
        fontSize: 0.12,
        maxLines: 2
      },
      subtitle: {
        id: 'subtitle',
        name: 'Sous-titre',
        bounds: { x: 0.35, y: 0.5, width: 0.6, height: 0.2 },
        alignment: 'center',
        fontSize: 0.08,
        maxLines: 2
      },
      cta: {
        id: 'cta',
        name: 'Call-to-Action',
        bounds: { x: 0.35, y: 0.75, width: 0.6, height: 0.15 },
        alignment: 'center',
        fontSize: 0.07,
        maxLines: 1
      },
      footer: {
        id: 'footer',
        name: 'Pied de page',
        bounds: { x: 0.05, y: 0.9, width: 0.9, height: 0.05 },
        alignment: 'center',
        fontSize: 0.04,
        maxLines: 1
      }
    }
  }
};

export function getLayoutForFormat(format: string): TemplateLayout {
  return TEMPLATE_LAYOUTS[format] || TEMPLATE_LAYOUTS['9:16'];
}

export function getZoneBounds(zone: TemplateZone, canvasWidth: number, canvasHeight: number) {
  return {
    x: zone.bounds.x * canvasWidth,
    y: zone.bounds.y * canvasHeight,
    width: zone.bounds.width * canvasWidth,
    height: zone.bounds.height * canvasHeight
  };
}
