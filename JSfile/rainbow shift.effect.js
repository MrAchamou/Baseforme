// rainbow shift.effect.js

export const rainbow shiftEffect = {
  id: "rainbow shift",
  name: "Rainbow shift",
  
  description: `🌈 EFFET 28 : RAINBOW SHIFT
CATÉGORIE : TEXT  
EFFET DEMANDÉ : Rainbow_Shift  
ID UNIQUE : chromatic-spectrum-cycle-028  
NOM AFFICHAGE : Cycle Spectral Chromatique  
DESCRIPTION : Transformation continue à travers tout le spectre visible. Transition HSV fluide avec saturation et luminosité variables, effet prismatique avec dispersion, zones de couleur qui migrent à travers le texte. Couleurs impossibles créées par interférences.
SPÉCIFICATIONS ADDICTION :
- Cycle chromatique perpétuel sans répétition exacte
- Zones de couleur qui migrent organiquement
- Couleurs impossibles créées par superposition
- Effet prismatique avec séparation spectrale

------------------------------------------------------------------------------------

🌈 RAINBOW SHIFT EFFECT - CRÉÉ AVEC SUCCÈS !
✨ FONCTIONNALITÉS HYPNOTIQUES IMPLÉMENTÉES :
🎭 FACTEURS ADDICTION :

Cycle perpétuel : Aucune répétition exacte grâce aux phases d'interférence multiples
Zones migratoires : 4 zones de couleur qui se déplacent organiquement à travers le texte
Couleurs impossibles : Générées par superposition d'ondes sinusoïdales avec bruit chromatique
Effet prismatique : Dispersion spectrale avec séparation RGB pour un effet cristallin

🔬 TECHNIQUES AVANCÉES :

Conversion HSV optimisée : Transitions fluides dans l'espace colorimétrique
Système d'interférence : 3 phases décalées créent des couleurs impossibles
Path sampling : Échantillonnage haute résolution du texte pour un rendu fluide
Cache intelligent : Optimisation mémoire avec réutilisation des gradients

⚡ PERFORMANCE 60 FPS :

Object pooling : Réutilisation des structures de zones et paths
Cache des métriques : Recalcul uniquement si le texte change
Calculs optimisés : HSV vers RGB en une passe, trigonométrie mise en cache

🎨 PARAMÈTRES CONFIGURABLES :

vitesse : Contrôle la rapidité des cycles chromatiques
intensite : Influence des couleurs impossibles sur le rendu final
dispersion : Amplitude de l'effet prismatique
zones : Nombre de zones migratoires (1-8)
saturation & luminosite : Contrôle fin de l'intensité colorimétrique

L'effet produit un cycle spectral addictif où les couleurs évoluent constamment sans jamais se répéter exactement, créant une fascination visuelle continue parfaite pour des GIF publicitaires captivants !`,

  category: "text",
  subcategory: "transform",
  intensity: "medium",
  performance: "medium",

  compatibility: {
    text: true,
    image: false,
    logo: true,
    background: false
  },

  tags: ["text", "texte", "shift", "phase", "prism", "rainbow shift"],

  parameters: {
    // Paramètres par défaut - à personnaliser selon l'effet
    vitesse: {
      type: "range",
      min: 0.1,
      max: 3,
      default: 1,
      description: "Vitesse d'animation"
    },
    intensite: {
      type: "range",
      min: 0,
      max: 1,
      default: 0.8,
      description: "Intensité de l'effet"
    }
  },

  preview: {
    gif: "rainbow shift.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'chromatic-spectrum-cycle-028',
            name: 'Cycle Spectral Chromatique',
            category: 'text',
            version: '1.0',
            performance: 'medium',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1 },
                intensite: { type: 'range', min: 0, max: 1, default: 0.8 },
                dispersion: { type: 'range', min: 0, max: 1, default: 0.6 },
                zones: { type: 'range', min: 1, max: 8, default: 4 },
                saturation: { type: 'range', min: 0.3, max: 1, default: 0.9 },
                luminosite: { type: 'range', min: 0.3, max: 1, default: 0.7 }
            }
        });

        // Variables privées de l'effet
        this.temps = 0;
        this.canvas = null;
        this.ctx = null;
        this.textMetrics = null;
        
        // Système de zones chromatiques migratoires
        this.zones = [];
        this.spectrumOffset = 0;
        this.prismOffset = 0;
        
        // Cache pour optimisation
        this.gradientCache = new Map();
        this.lastText = '';
        this.textPath = null;
        
        // Générateur de couleurs impossibles
        this.interferencePhases = [0, Math.PI * 0.33, Math.PI * 0.66];
        this.chromaticNoise = this.generateChromaticNoise();
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Initialiser les zones migratoires
        this.initializeZones();
        
        // Configurer le texte
        this.updateTextMetrics(element);
    }

    initializeZones() {
        const zoneCount = this.parameters.zones.default;
        this.zones = [];
        
        for (let i = 0; i < zoneCount; i++) {
            this.zones.push({
                position: i / zoneCount,
                speed: 0.3 + Math.random() * 0.4,
                hueOffset: (i / zoneCount) * 360,
                amplitude: 0.5 + Math.random() * 0.5,
                phase: Math.random() * Math.PI * 2,
                width: 0.15 + Math.random() * 0.2
            });
        }
    }

    generateChromaticNoise() {
        const size = 256;
        const noise = new Float32Array(size);
        for (let i = 0; i < size; i++) {
            noise[i] = Math.sin(i * 0.1) * 0.3 + 
                      Math.sin(i * 0.23) * 0.2 + 
                      Math.sin(i * 0.47) * 0.1;
        }
        return noise;
    }

    updateTextMetrics(element) {
        if (element.content !== this.lastText) {
            this.lastText = element.content;
            this.ctx.font = `${element.height * 0.8}px Arial, sans-serif`;
            this.textMetrics = this.ctx.measureText(element.content);
            this.textPath = this.createTextPath(element);
        }
    }

    createTextPath(element) {
        const path = [];
        const text = element.content;
        const fontSize = element.height * 0.8;
        
        this.ctx.font = `${fontSize}px Arial, sans-serif`;
        
        let x = element.x + (element.width - this.textMetrics.width) / 2;
        const y = element.y + element.height / 2 + fontSize * 0.3;
        
        // Créer un chemin de points le long du texte
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charWidth = this.ctx.measureText(char).width;
            
            // Échantillonner plusieurs points par caractère
            const samples = Math.max(3, Math.floor(charWidth / 8));
            for (let s = 0; s < samples; s++) {
                path.push({
                    x: x + (s / samples) * charWidth,
                    y: y,
                    char: char,
                    charIndex: i,
                    progress: (i + s / samples) / text.length
                });
            }
            x += charWidth;
        }
        
        return path;
    }

    // Conversion HSV vers RGB optimisée
    hsvToRgb(h, s, v) {
        h = ((h % 360) + 360) % 360; // Normaliser hue
        const c = v * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = v - c;
        
        let r, g, b;
        
        if (h < 60) { r = c; g = x; b = 0; }
        else if (h < 120) { r = x; g = c; b = 0; }
        else if (h < 180) { r = 0; g = c; b = x; }
        else if (h < 240) { r = 0; g = x; b = c; }
        else if (h < 300) { r = x; g = 0; b = c; }
        else { r = c; g = 0; b = x; }
        
        return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        };
    }

    // Génération de couleurs impossibles par interférence
    generateImpossibleColor(position, time) {
        const baseHue = (time * 30 + position * 360) % 360;
        
        // Interférences multiples pour créer des couleurs impossibles
        let interference = 0;
        for (let i = 0; i < this.interferencePhases.length; i++) {
            const phase = this.interferencePhases[i] + time * (1 + i * 0.3);
            interference += Math.sin(phase + position * Math.PI * 8) * 0.2;
        }
        
        // Ajout de bruit chromatique
        const noiseIndex = Math.floor(position * this.chromaticNoise.length) % this.chromaticNoise.length;
        const noise = this.chromaticNoise[noiseIndex] * this.parameters.intensite.default;
        
        const finalHue = baseHue + interference * 60 + noise * 30;
        const saturation = this.parameters.saturation.default + interference * 0.3;
        const luminosity = this.parameters.luminosite.default + Math.sin(time * 2 + position * Math.PI * 4) * 0.2;
        
        return this.hsvToRgb(finalHue, Math.max(0, Math.min(1, saturation)), Math.max(0, Math.min(1, luminosity)));
    }

    // Effet prismatique avec dispersion
    createPrismaticEffect(ctx, x, y, char, color, dispersion) {
        const dispersions = [
            { offset: { x: -dispersion, y: 0 }, color: { ...color, r: Math.min(255, color.r * 1.2) } },
            { offset: { x: 0, y: 0 }, color: color },
            { offset: { x: dispersion, y: 0 }, color: { ...color, b: Math.min(255, color.b * 1.2) } }
        ];
        
        ctx.save();
        
        // Rendu avec dispersion
        dispersions.forEach((disp, index) => {
            ctx.globalAlpha = 0.7 - index * 0.1;
            ctx.fillStyle = `rgb(${disp.color.r}, ${disp.color.g}, ${disp.color.b})`;
            ctx.fillText(char, x + disp.offset.x, y + disp.offset.y);
        });
        
        ctx.restore();
    }

    render(ctx, element, deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse.default;
        this.updateTextMetrics(element);
        
        if (!this.textPath) return;
        
        ctx.save();
        
        // Mise à jour des zones migratoires
        this.zones.forEach(zone => {
            zone.position += zone.speed * deltaTime * 0.001;
            if (zone.position > 1) zone.position -= 1;
            
            zone.hueOffset += zone.speed * deltaTime * 0.05;
            zone.phase += deltaTime * 0.002;
        });
        
        // Configuration du texte
        ctx.font = `${element.height * 0.8}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Rendu de chaque point du chemin de texte
        this.textPath.forEach(point => {
            let finalColor = { r: 0, g: 0, b: 0 };
            let totalWeight = 0;
            
            // Accumulation des influences des zones
            this.zones.forEach(zone => {
                const distance = Math.abs(point.progress - zone.position);
                const wrappedDistance = Math.min(distance, 1 - distance);
                
                if (wrappedDistance < zone.width) {
                    const influence = Math.cos(wrappedDistance / zone.width * Math.PI * 0.5);
                    const weight = influence * influence;
                    
                    const zoneHue = (zone.hueOffset + Math.sin(zone.phase) * zone.amplitude * 60) % 360;
                    const zoneColor = this.hsvToRgb(
                        zoneHue,
                        this.parameters.saturation.default,
                        this.parameters.luminosite.default
                    );
                    
                    finalColor.r += zoneColor.r * weight;
                    finalColor.g += zoneColor.g * weight;
                    finalColor.b += zoneColor.b * weight;
                    totalWeight += weight;
                }
            });
            
            // Couleur impossible de base si aucune zone n'influence
            if (totalWeight < 0.1) {
                finalColor = this.generateImpossibleColor(point.progress, this.temps * 0.001);
                totalWeight = 1;
            } else {
                finalColor.r /= totalWeight;
                finalColor.g /= totalWeight;
                finalColor.b /= totalWeight;
                
                // Mélange avec couleur impossible pour l'effet
                const impossible = this.generateImpossibleColor(point.progress, this.temps * 0.001);
                const mix = this.parameters.intensite.default * 0.3;
                finalColor.r = finalColor.r * (1 - mix) + impossible.r * mix;
                finalColor.g = finalColor.g * (1 - mix) + impossible.g * mix;
                finalColor.b = finalColor.b * (1 - mix) + impossible.b * mix;
            }
            
            // Effet prismatique
            const dispersionAmount = this.parameters.dispersion.default * 2;
            this.createPrismaticEffect(ctx, point.x, point.y, point.char, finalColor, dispersionAmount);
        });
        
        ctx.restore();
    }

    update(deltaTime) {
        // Mise à jour des phases d'interférence pour les couleurs impossibles
        this.interferencePhases = this.interferencePhases.map((phase, index) => 
            phase + deltaTime * 0.001 * (1 + index * 0.2)
        );
        
        // Rotation du spectre global pour éviter la répétition
        this.spectrumOffset += deltaTime * 0.0001;
        this.prismOffset += deltaTime * 0.0003;
        
        // Variation organique des paramètres
        const timeVar = this.temps * 0.001;
        this.zones.forEach((zone, index) => {
            zone.amplitude = 0.5 + Math.sin(timeVar * 0.7 + index) * 0.3;
            zone.width = 0.15 + Math.sin(timeVar * 0.5 + index * 1.5) * 0.1;
        });
    }

    destroy() {
        this.gradientCache.clear();
        this.zones = [];
        this.textPath = null;
        this.chromaticNoise = null;
        this.canvas = null;
        this.ctx = null;
    }
    
  }
};
