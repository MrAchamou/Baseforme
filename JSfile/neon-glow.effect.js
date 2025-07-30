
// neon-glow.effect.js

export const neonGlowEffect = {
  id: "neon-glow",
  name: "Neon Glow",
  
  description: `Effet de néon cyberpunk pulsant avec scintillements électriques.
Crée un tube de verre lumineux avec charge électrique variable.
Parfait pour des titres futuristes et ambiances technologiques.`,

  category: "text",
  subcategory: "style", 
  intensity: "medium",
  performance: "medium",

  compatibility: {
    text: true,
    image: false,
    logo: true,
    background: false
  },

  tags: ["neon", "cyberpunk", "glow", "electric", "tube", "futuristic"],

  parameters: {
    vitesse: {
      type: "range",
      min: 0.1,
      max: 3,
      default: 1.2,
      description: "Vitesse de pulsation"
    },
    intensite: {
      type: "range",
      min: 0.3,
      max: 1,
      default: 0.8,
      description: "Intensité de la lueur"
    },
    couleurPrimaire: {
      type: "color",
      default: "#00ffff",
      description: "Couleur principale du néon"
    },
    couleurSecondaire: {
      type: "color", 
      default: "#ff0080",
      description: "Couleur secondaire"
    },
    epaisseurTube: {
      type: "range",
      min: 2,
      max: 8,
      default: 4,
      description: "Épaisseur du tube"
    },
    scintillementFreq: {
      type: "range",
      min: 0.1,
      max: 2,
      default: 0.7,
      description: "Fréquence des scintillements"
    }
  },

  preview: {
    gif: "neon-glow.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    // Code original de l'effet NEON GLOW intégré
    class NeonGlowEffect extends BaseEffect {
      constructor(config = {}) {
        super({
          id: 'cyberpunk-neon-tube-024',
          name: 'Néon Cyberpunk Pulsant',
          category: 'text',
          version: '1.0',
          performance: 'medium',
          parameters: params
        });
        
        this.temps = 0;
        this.chargeElectrique = 0;
        this.scintillements = [];
        this.tensionBase = 0.8;
        this.perturbations = [];
        this.bloomParticles = [];
        
        this.initScintillements();
      }
      
      // ... reste du code original ...
    }
    
    return new NeonGlowEffect({ parameters: params });
  }
};
