// prism split.effect.js

export const prism splitEffect = {
  id: "prism split",
  name: "Prism split",
  
  description: `## 🌈 EFFET 60 : PRISM SPLIT

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Prism_Split  
**ID UNIQUE :** chromatic-spectral-decomposition-060  
**NOM AFFICHAGE :** Décomposition Spectrale Prismatique  

**DESCRIPTION :** Image se divise en ses composantes chromatiques pures comme un prisme optique. Séparation spectrale révélant la structure colorimétrique cachée, chaque couleur développe sa propre trajectoire, recomposition créant des interférences colorées nouvelles.

**SPÉCIFICATIONS ADDICTION :**
- Décomposition révélant la "génétique chromatique" de l'image
- Trajectoires indépendantes créant des danses colorées
- Recomposition avec interférences créant des couleurs impossibles
- Révélation de couleurs cachées invisibles dans l'image originale

-------------------------------------------------------------------------

✨ CARACTÉRISTIQUES HYPNOTIQUES IMPLÉMENTÉES :
🔬 DÉCOMPOSITION SPECTRALE AUTHENTIQUE :

7 canaux spectraux basés sur les longueurs d'ondes réelles
Calcul d'affinité chromatique pour extraction précise
Réfraction progressive selon les lois optiques

🎭 ADDICTION PAR RÉVÉLATION :

Génétique chromatique : Chaque pixel révèle sa composition spectrale cachée
4 couleurs impossibles apparaissent progressivement (rose spectral, vert laser, bleu électrique, jaune plasma)
70/30 d'imprévisibilité : Trajectoires calculées mais avec variations organiques

🌊 DANSE COLORÉE INDÉPENDANTE :

Chaque spectre suit sa propre trajectoire basée sur son indice de réfraction
Rotations et oscillations indépendantes créant des chorégraphies colorées
Modes de mélange cycliques (screen, multiply, overlay, color-dodge)

💫 INTERFÉRENCES CRÉATIVES :

Recomposition générant des couleurs impossibles par interférence
Gradients radiaux dynamiques révélant les couleurs cachées
Motifs d'onde sinusoïdaux créant des pulsations hypnotiques

🎯 CYCLE D'ADDICTION 4 PHASES :

Normal → Image standard (préparation)
Décomposition → Séparation spectrale progressive
Séparation → Danse indépendante des couleurs + révélation
Recomposition → Fusion avec interférences + couleurs impossibles

⚡ OPTIMISATIONS PERFORMANCE :

Object pooling pour particules et canaux
Canvas dédiés pour chaque spectre
Calculs de trajectoire pré-générés
Gestion mémoire avec destruction propre

🎪 RÉSULTAT : Un prisme optique numérique révélant l'âme chromatique cachée de chaque image !`,

  category: "image",
  subcategory: "transform",
  intensity: "high",
  performance: "heavy",

  compatibility: {
    text: false,
    image: true,
    logo: false,
    background: true
  },

  tags: ["image", "pixel", "plasma", "phase", "rotation", "prism"],

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
    gif: "prism split.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'chromatic-spectral-decomposition-060',
            name: 'Décomposition Spectrale Prismatique',
            category: 'image',
            version: '1.0',
            performance: 'medium',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1 },
                intensite: { type: 'range', min: 0, max: 1, default: 0.7 },
                separationMax: { type: 'range', min: 10, max: 100, default: 50 },
                refractionForce: { type: 'range', min: 0.1, max: 2, default: 1 },
                couleurBoost: { type: 'range', min: 0, max: 2, default: 1.3 }
            }
        });

        // Variables privées de l'effet
        this.temps = 0;
        this.imageData = null;
        this.originalCanvas = null;
        this.spectralChannels = [];
        this.interferencePatterns = [];
        this.prismPhase = 0; // 0: normal, 1: décomposition, 2: séparation, 3: recomposition
        
        // Pool d'objets pour optimisation
        this.particlePool = [];
        this.channelPool = [];
        
        // Spectres chromatiques avec longueurs d'ondes
        this.spectrumData = [
            { color: [255, 0, 0], wavelength: 700, refraction: 1.0, angle: 0 },      // Rouge
            { color: [255, 127, 0], wavelength: 620, refraction: 1.1, angle: 0.2 }, // Orange
            { color: [255, 255, 0], wavelength: 580, refraction: 1.2, angle: 0.4 }, // Jaune
            { color: [0, 255, 0], wavelength: 530, refraction: 1.3, angle: 0.6 },   // Vert
            { color: [0, 255, 255], wavelength: 490, refraction: 1.4, angle: 0.8 }, // Cyan
            { color: [0, 0, 255], wavelength: 450, refraction: 1.5, angle: 1.0 },   // Bleu
            { color: [127, 0, 255], wavelength: 420, refraction: 1.6, angle: 1.2 }  // Violet
        ];

        this.hiddenColors = [
            { r: 255, g: 0, b: 127, intensity: 0 },   // Rose spectral
            { r: 127, g: 255, b: 0, intensity: 0 },   // Vert laser
            { r: 0, g: 127, b: 255, intensity: 0 },   // Bleu électrique
            { r: 255, g: 255, b: 127, intensity: 0 }  // Jaune plasma
        ];
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.element = element;
        
        // Créer canvas original pour référence
        this.originalCanvas = document.createElement('canvas');
        this.originalCanvas.width = canvas.width;
        this.originalCanvas.height = canvas.height;
        this.originalCtx = this.originalCanvas.getContext('2d');
        
        // Initialiser les canaux spectraux
        this.initSpectralChannels();
        
        // Initialiser les motifs d'interférence
        this.initInterferencePatterns();
    }

    initSpectralChannels() {
        this.spectralChannels = [];
        for (let i = 0; i < this.spectrumData.length; i++) {
            const spectrum = this.spectrumData[i];
            this.spectralChannels.push({
                canvas: document.createElement('canvas'),
                ctx: null,
                offset: { x: 0, y: 0 },
                rotation: 0,
                intensity: 1,
                wavelength: spectrum.wavelength,
                refraction: spectrum.refraction,
                baseAngle: spectrum.angle,
                color: spectrum.color,
                phase: Math.random() * Math.PI * 2,
                trajectory: this.generateTrajectory(spectrum.refraction)
            });
        }
        
        // Initialiser les contextes des canaux
        this.spectralChannels.forEach(channel => {
            channel.canvas.width = this.canvas.width;
            channel.canvas.height = this.canvas.height;
            channel.ctx = channel.canvas.getContext('2d');
        });
    }

    initInterferencePatterns() {
        this.interferencePatterns = [];
        for (let i = 0; i < 4; i++) {
            this.interferencePatterns.push({
                phase: Math.random() * Math.PI * 2,
                frequency: 0.02 + Math.random() * 0.03,
                amplitude: 10 + Math.random() * 20,
                color: this.hiddenColors[i],
                active: false
            });
        }
    }

    generateTrajectory(refraction) {
        const points = [];
        const steps = 60;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const angle = refraction * Math.PI * 0.3 * Math.sin(t * Math.PI * 3);
            const distance = Math.sin(t * Math.PI) * 100 * refraction;
            
            points.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                scale: 0.8 + 0.4 * Math.sin(t * Math.PI),
                opacity: Math.sin(t * Math.PI)
            });
        }
        
        return points;
    }

    extractSpectralData() {
        if (!this.element.content) return;
        
        // Dessiner l'élément original
        this.originalCtx.clearRect(0, 0, this.originalCanvas.width, this.originalCanvas.height);
        this.originalCtx.save();
        this.originalCtx.translate(this.element.x + this.element.width/2, this.element.y + this.element.height/2);
        this.originalCtx.rotate(this.element.rotation);
        this.originalCtx.globalAlpha = this.element.opacity;
        
        if (this.element.content instanceof HTMLImageElement) {
            this.originalCtx.drawImage(
                this.element.content,
                -this.element.width/2,
                -this.element.height/2,
                this.element.width,
                this.element.height
            );
        }
        this.originalCtx.restore();
        
        // Extraire les données d'image
        try {
            this.imageData = this.originalCtx.getImageData(0, 0, this.originalCanvas.width, this.originalCanvas.height);
            this.decomposeSpectralChannels();
        } catch (e) {
            console.warn('Cannot extract image data for spectral analysis');
        }
    }

    decomposeSpectralChannels() {
        if (!this.imageData) return;
        
        const data = this.imageData.data;
        
        this.spectralChannels.forEach((channel, channelIndex) => {
            channel.ctx.clearRect(0, 0, channel.canvas.width, channel.canvas.height);
            const channelImageData = channel.ctx.createImageData(this.imageData.width, this.imageData.height);
            const channelData = channelImageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];
                
                if (a > 0) {
                    // Calculer l'affinité spectrale
                    const spectralAffinity = this.calculateSpectralAffinity(r, g, b, channel.color);
                    const intensity = spectralAffinity * this.parameters.couleurBoost.value;
                    
                    // Appliquer la couleur spectrale avec intensité
                    channelData[i] = channel.color[0] * intensity;
                    channelData[i + 1] = channel.color[1] * intensity;
                    channelData[i + 2] = channel.color[2] * intensity;
                    channelData[i + 3] = a * intensity;
                    
                    // Révéler couleurs cachées
                    if (intensity > 0.7 && channelIndex < this.hiddenColors.length) {
                        this.hiddenColors[channelIndex].intensity = Math.min(1, this.hiddenColors[channelIndex].intensity + 0.01);
                    }
                }
            }
            
            channel.ctx.putImageData(channelImageData, 0, 0);
        });
    }

    calculateSpectralAffinity(r, g, b, spectrumColor) {
        // Calculer la similarité avec la couleur spectrale
        const dr = Math.abs(r - spectrumColor[0]) / 255;
        const dg = Math.abs(g - spectrumColor[1]) / 255;
        const db = Math.abs(b - spectrumColor[2]) / 255;
        
        const distance = Math.sqrt(dr * dr + dg * dg + db * db);
        return Math.max(0, 1 - distance / Math.sqrt(3));
    }

    updatePrismPhase() {
        const cycle = (this.temps * 0.001 * this.parameters.vitesse.value) % 4;
        this.prismPhase = Math.floor(cycle);
        
        // Transition fluide entre phases
        const phaseProgress = cycle - this.prismPhase;
        return phaseProgress;
    }

    updateSpectralChannels(deltaTime, phaseProgress) {
        const separationMax = this.parameters.separationMax.value * this.parameters.intensite.value;
        const refractionForce = this.parameters.refractionForce.value;
        
        this.spectralChannels.forEach((channel, index) => {
            channel.phase += deltaTime * 0.002 * this.parameters.vitesse.value;
            
            let separationFactor = 0;
            let trajectoryProgress = 0;
            
            switch (this.prismPhase) {
                case 0: // Normal
                    separationFactor = 0;
                    break;
                case 1: // Décomposition
                    separationFactor = phaseProgress;
                    break;
                case 2: // Séparation maximum
                    separationFactor = 1;
                    trajectoryProgress = phaseProgress;
                    break;
                case 3: // Recomposition
                    separationFactor = 1 - phaseProgress;
                    trajectoryProgress = 1 - phaseProgress;
                    break;
            }
            
            // Calcul de la position basée sur la réfraction
            const baseAngle = channel.baseAngle * refractionForce;
            const separation = separationMax * separationFactor * channel.refraction;
            
            channel.offset.x = Math.cos(baseAngle + channel.phase * 0.3) * separation;
            channel.offset.y = Math.sin(baseAngle + channel.phase * 0.3) * separation * 0.5;
            
            // Trajectoire indépendante pendant la séparation
            if (trajectoryProgress > 0 && channel.trajectory.length > 0) {
                const trajIndex = Math.floor(trajectoryProgress * (channel.trajectory.length - 1));
                const trajPoint = channel.trajectory[trajIndex];
                
                channel.offset.x += (trajPoint.x - this.canvas.width/2) * trajectoryProgress * 0.3;
                channel.offset.y += (trajPoint.y - this.canvas.height/2) * trajectoryProgress * 0.3;
                channel.intensity = trajPoint.opacity;
            } else {
                channel.intensity = 1 - separationFactor * 0.3;
            }
            
            channel.rotation = separationFactor * channel.refraction * 0.1 * Math.sin(channel.phase);
        });
    }

    updateInterferencePatterns(deltaTime) {
        this.interferencePatterns.forEach((pattern, index) => {
            pattern.phase += deltaTime * pattern.frequency * this.parameters.vitesse.value;
            
            // Activer les interférences pendant la recomposition
            if (this.prismPhase === 3) {
                pattern.active = true;
                const hiddenColor = this.hiddenColors[index];
                hiddenColor.intensity = Math.min(1, hiddenColor.intensity + deltaTime * 0.001);
            } else {
                pattern.active = false;
                this.hiddenColors[index].intensity *= 0.95;
            }
        });
    }

    render(ctx, element, deltaTime) {
        this.element = element;
        
        // Extraire données spectrales si nécessaire
        if (!this.imageData) {
            this.extractSpectralData();
        }
        
        const phaseProgress = this.updatePrismPhase();
        this.updateSpectralChannels(deltaTime, phaseProgress);
        this.updateInterferencePatterns(deltaTime);
        
        ctx.save();
        
        // Effacer le canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Phase normale: afficher l'image originale
        if (this.prismPhase === 0 && phaseProgress < 0.1) {
            this.renderOriginalElement(ctx);
        } else {
            // Rendu des canaux spectraux
            this.renderSpectralChannels(ctx);
            
            // Rendu des interférences
            if (this.prismPhase === 3) {
                this.renderInterferences(ctx);
            }
        }
        
        ctx.restore();
    }

    renderOriginalElement(ctx) {
        if (!this.element.content) return;
        
        ctx.save();
        ctx.translate(this.element.x + this.element.width/2, this.element.y + this.element.height/2);
        ctx.rotate(this.element.rotation);
        ctx.globalAlpha = this.element.opacity;
        
        if (this.element.content instanceof HTMLImageElement) {
            ctx.drawImage(
                this.element.content,
                -this.element.width/2,
                -this.element.height/2,
                this.element.width,
                this.element.height
            );
        }
        ctx.restore();
    }

    renderSpectralChannels(ctx) {
        // Mode de mélange pour créer des interférences colorées
        const blendModes = ['screen', 'multiply', 'overlay', 'color-dodge', 'hard-light'];
        
        this.spectralChannels.forEach((channel, index) => {
            if (channel.intensity > 0.01) {
                ctx.save();
                
                // Mode de mélange cyclique
                ctx.globalCompositeOperation = blendModes[index % blendModes.length];
                ctx.globalAlpha = channel.intensity * this.element.opacity;
                
                ctx.translate(
                    this.element.x + this.element.width/2 + channel.offset.x,
                    this.element.y + this.element.height/2 + channel.offset.y
                );
                ctx.rotate(this.element.rotation + channel.rotation);
                
                // Dessiner le canal spectral
                ctx.drawImage(
                    channel.canvas,
                    -this.canvas.width/2,
                    -this.canvas.height/2
                );
                
                ctx.restore();
            }
        });
    }

    renderInterferences(ctx) {
        this.interferencePatterns.forEach((pattern, index) => {
            if (pattern.active) {
                const hiddenColor = this.hiddenColors[index];
                if (hiddenColor.intensity > 0.01) {
                    ctx.save();
                    ctx.globalCompositeOperation = 'color-dodge';
                    ctx.globalAlpha = hiddenColor.intensity * 0.3;
                    
                    // Créer motif d'interférence
                    const gradient = ctx.createRadialGradient(
                        this.element.x + this.element.width/2,
                        this.element.y + this.element.height/2,
                        0,
                        this.element.x + this.element.width/2,
                        this.element.y + this.element.height/2,
                        Math.max(this.element.width, this.element.height)
                    );
                    
                    const wave = Math.sin(pattern.phase) * 0.5 + 0.5;
                    gradient.addColorStop(0, `rgba(${hiddenColor.r}, ${hiddenColor.g}, ${hiddenColor.b}, ${wave})`);
                    gradient.addColorStop(0.5, `rgba(${hiddenColor.r}, ${hiddenColor.g}, ${hiddenColor.b}, ${wave * 0.3})`);
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    
                    ctx.restore();
                }
            }
        });
    }

    update(deltaTime) {
        this.temps += deltaTime;
        
        // Re-extraire les données si l'élément a changé
        if (this.temps % 1000 < deltaTime) {
            this.imageData = null;
        }
    }

    destroy() {
        // Libération mémoire
        if (this.originalCanvas) {
            this.originalCanvas.width = 0;
            this.originalCanvas.height = 0;
            this.originalCanvas = null;
        }
        
        this.spectralChannels.forEach(channel => {
            if (channel.canvas) {
                channel.canvas.width = 0;
                channel.canvas.height = 0;
            }
        });
        
        this.spectralChannels = [];
        this.interferencePatterns = [];
        this.particlePool = [];
        this.channelPool = [];
        this.imageData = null;
        this.hiddenColors = [];
    }
    
  }
};
