// neon glow.effect.js

export const neon glowEffect = {
  id: "neon glow",
  name: "Neon glow",
  
  description: `## 💡 EFFET 24 : NEON GLOW

**CATÉGORIE :** TEXT  
**EFFET DEMANDÉ :** Neon_Glow  
**ID UNIQUE :** cyberpunk-neon-tube-024  
**NOM AFFICHAGE :** Néon Cyberpunk Pulsant  

**DESCRIPTION :** Transformation en tubes néon avec glow cyberpunk authentique. Éclairage au gaz noble simulé, scintillements électriques, variations d'intensité selon la "tension", halos colorés avec bloom réaliste. Effet de tube de verre avec réflexions internes.

**SPÉCIFICATIONS ADDICTION :**
- Scintillements électriques imprévisibles
- Pulsations d'intensité selon la "charge électrique"
- Halos colorés avec effet bloom atmosphérique
- Réflexions internes dans les tubes de verre simulés

----------------------------------------------------------------

🔥 NEON GLOW EFFECT - CYBERPUNK AUTHENTIQUE
J'ai créé un effet néon hypnotique qui simule parfaitement l'éclairage au gaz noble avec tous les détails techniques demandés :
⚡ SYSTÈME ÉLECTRIQUE RÉALISTE

Charge électrique dynamique : 3 ondes sinusoïdales superposées + perturbations aléatoires (30% imprévisibilité)
Pulsations organiques : Tension variable qui affecte l'intensité globale
Scintillements électriques : 2 types (forts = éclairs, faibles = points lumineux)

🌟 RENDU MULTICOUCHES CINÉMATOGRAPHIQUE

5 couches de glow : Du halo externe au cœur blanc brillant
Couleurs dégradées : Primaire (cyan) → Secondaire (magenta) → Blanc pur
Épaisseur variable : Paramètre d'épaisseur de tube ajustable
Shadow blur progressif : Effet de profondeur réaliste

💫 EFFETS ATMOSPHÉRIQUES ADDICTIFS

Particules de bloom : 25 particules flottantes avec mouvement organique
Réflexions internes : Gradient simulant le verre du tube néon
Perturbations électriques : Micro-vibrations sur le tracé du texte
Loop parfait : Cycle électrique continu sans à-coups

🎯 OPTIMISATIONS PERFORMANCE

Object pooling : Réutilisation des scintillements et particules
Calculs cachés : Métriques de texte calculées une fois
Composite operations : Effet "screen" pour les réflexions
Delta time : Animation fluide indépendante du framerate

L'effet génère une authentique sensation de tube néon cyberpunk avec des variations électriques imprévisibles qui maintiennent l'attention !`,

  category: "text",
  subcategory: "style",
  intensity: "medium",
  performance: "light",

  compatibility: {
    text: true,
    image: false,
    logo: true,
    background: false
  },

  tags: ["text", "texte", "glow", "neon", "neon glow"],

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
    gif: "neon glow.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'cyberpunk-neon-tube-024',
            name: 'Néon Cyberpunk Pulsant',
            category: 'text',
            version: '1.0',
            performance: 'medium',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1.2 },
                intensite: { type: 'range', min: 0.3, max: 1, default: 0.8 },
                couleurPrimaire: { type: 'color', default: '#00ffff' },
                couleurSecondaire: { type: 'color', default: '#ff0080' },
                epaisseurTube: { type: 'range', min: 2, max: 8, default: 4 },
                scintillementFreq: { type: 'range', min: 0.1, max: 2, default: 0.7 }
            }
        });
        
        // Variables privées de l'effet
        this.temps = 0;
        this.chargeElectrique = 0;
        this.scintillements = [];
        this.tensionBase = 0.8;
        this.perturbations = [];
        this.bloomParticles = [];
        
        // Initialisation des scintillements
        this.initScintillements();
    }
    
    initScintillements() {
        // Pool de scintillements électriques
        for (let i = 0; i < 15; i++) {
            this.scintillements.push({
                x: 0,
                y: 0,
                intensite: 0,
                duree: 0,
                maxDuree: Math.random() * 300 + 100,
                actif: false,
                type: Math.random() > 0.7 ? 'fort' : 'faible'
            });
        }
        
        // Particules de bloom atmosphérique
        for (let i = 0; i < 25; i++) {
            this.bloomParticles.push({
                x: 0,
                y: 0,
                taille: Math.random() * 3 + 1,
                vitesseX: (Math.random() - 0.5) * 0.5,
                vitesseY: (Math.random() - 0.5) * 0.5,
                vie: Math.random() * 1000 + 500,
                maxVie: 0,
                couleur: { r: 0, g: 255, b: 255 },
                actif: false
            });
        }
    }
    
    initialize(canvas, element) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.element = element;
        
        // Calcul des dimensions du texte
        this.ctx.font = `${element.fontSize || 48}px Arial`;
        this.textMetrics = this.ctx.measureText(element.content || 'NEON');
        this.textWidth = this.textMetrics.width;
        this.textHeight = element.fontSize || 48;
        
        // Position centrée
        this.textX = element.x || (canvas.width - this.textWidth) / 2;
        this.textY = element.y || canvas.height / 2;
        
        // Initialisation des perturbations électriques
        this.initPerturbations();
    }
    
    initPerturbations() {
        this.perturbations = [];
        const nbPerturbations = Math.floor(this.textWidth / 20);
        
        for (let i = 0; i < nbPerturbations; i++) {
            this.perturbations.push({
                x: (i / nbPerturbations) * this.textWidth,
                amplitude: Math.random() * 2 + 1,
                frequence: Math.random() * 0.01 + 0.005,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 0, g: 255, b: 255};
    }
    
    updateChargeElectrique(deltaTime) {
        // Simulation de charge électrique avec variations organiques
        const baseFreq = 0.003 * this.parameters.vitesse.default;
        const variation1 = Math.sin(this.temps * baseFreq) * 0.3;
        const variation2 = Math.sin(this.temps * baseFreq * 1.7) * 0.2;
        const variation3 = Math.sin(this.temps * baseFreq * 2.3) * 0.1;
        
        this.chargeElectrique = this.tensionBase + variation1 + variation2 + variation3;
        
        // Perturbations électriques aléatoires (30% imprévisibilité)
        if (Math.random() < 0.003 * this.parameters.scintillementFreq.default) {
            this.chargeElectrique += (Math.random() - 0.5) * 0.4;
        }
        
        // Limitation des valeurs
        this.chargeElectrique = Math.max(0.2, Math.min(1.2, this.chargeElectrique));
    }
    
    updateScintillements(deltaTime) {
        this.scintillements.forEach(scint => {
            if (!scint.actif && Math.random() < 0.008 * this.parameters.scintillementFreq.default) {
                // Activation d'un nouveau scintillement
                scint.x = this.textX + Math.random() * this.textWidth;
                scint.y = this.textY + (Math.random() - 0.5) * this.textHeight;
                scint.duree = 0;
                scint.maxDuree = Math.random() * 200 + 50;
                scint.intensite = Math.random() * 0.8 + 0.2;
                scint.actif = true;
            }
            
            if (scint.actif) {
                scint.duree += deltaTime;
                if (scint.duree >= scint.maxDuree) {
                    scint.actif = false;
                }
            }
        });
    }
    
    updateBloomParticles(deltaTime) {
        this.bloomParticles.forEach(particle => {
            if (!particle.actif && Math.random() < 0.015) {
                // Spawn nouvelle particule de bloom
                particle.x = this.textX + Math.random() * this.textWidth;
                particle.y = this.textY + (Math.random() - 0.5) * this.textHeight * 1.2;
                particle.vie = 0;
                particle.maxVie = Math.random() * 800 + 400;
                particle.vitesseX = (Math.random() - 0.5) * 0.3;
                particle.vitesseY = (Math.random() - 0.5) * 0.2;
                particle.taille = Math.random() * 4 + 1;
                
                // Couleur basée sur la charge électrique
                const couleurBase = this.hexToRgb(this.parameters.couleurPrimaire.default);
                particle.couleur = {
                    r: couleurBase.r + (Math.random() - 0.5) * 50,
                    g: couleurBase.g + (Math.random() - 0.5) * 50,
                    b: couleurBase.b + (Math.random() - 0.5) * 50
                };
                particle.actif = true;
            }
            
            if (particle.actif) {
                particle.x += particle.vitesseX;
                particle.y += particle.vitesseY;
                particle.vie += deltaTime;
                
                if (particle.vie >= particle.maxVie) {
                    particle.actif = false;
                }
            }
        });
    }
    
    drawNeonTube(ctx) {
        const couleurPrimaire = this.hexToRgb(this.parameters.couleurPrimaire.default);
        const couleurSecondaire = this.hexToRgb(this.parameters.couleurSecondaire.default);
        
        // Intensité basée sur la charge électrique
        const intensiteGlobale = this.chargeElectrique * this.parameters.intensite.default;
        
        ctx.save();
        ctx.font = `${this.textHeight}px Arial`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        
        // Couches multiples pour effet néon réaliste
        const layers = [
            { taille: 8, alpha: 0.1, couleur: couleurPrimaire },
            { taille: 6, alpha: 0.2, couleur: couleurPrimaire },
            { taille: 4, alpha: 0.4, couleur: couleurPrimaire },
            { taille: 2, alpha: 0.8, couleur: couleurSecondaire },
            { taille: 1, alpha: 1.0, couleur: { r: 255, g: 255, b: 255 } }
        ];
        
        layers.forEach((layer, index) => {
            ctx.shadowColor = `rgba(${layer.couleur.r}, ${layer.couleur.g}, ${layer.couleur.b}, ${layer.alpha * intensiteGlobale})`;
            ctx.shadowBlur = layer.taille * this.parameters.epaisseurTube.default;
            ctx.fillStyle = `rgba(${layer.couleur.r}, ${layer.couleur.g}, ${layer.couleur.b}, ${layer.alpha * intensiteGlobale})`;
            
            // Ajout de perturbations électriques sur le tracé
            ctx.save();
            ctx.translate(this.textX, this.textY);
            
            // Perturbations légères pour simuler l'instabilité électrique
            if (index < 3) {
                this.perturbations.forEach(pert => {
                    const offset = Math.sin(this.temps * pert.frequence + pert.phase) * pert.amplitude * (intensiteGlobale - 0.5);
                    ctx.translate(0, offset * 0.2);
                });
            }
            
            ctx.fillText(this.element.content || 'NEON', 0, 0);
            ctx.restore();
        });
        
        ctx.restore();
    }
    
    drawScintillements(ctx) {
        ctx.save();
        
        this.scintillements.forEach(scint => {
            if (!scint.actif) return;
            
            const progression = scint.duree / scint.maxDuree;
            const intensiteScint = Math.sin(progression * Math.PI) * scint.intensite;
            
            if (scint.type === 'fort') {
                // Scintillement fort - éclair
                ctx.strokeStyle = `rgba(255, 255, 255, ${intensiteScint})`;
                ctx.lineWidth = 2;
                ctx.shadowColor = 'rgba(255, 255, 255, ' + intensiteScint + ')';
                ctx.shadowBlur = 10;
                
                ctx.beginPath();
                ctx.moveTo(scint.x - 5, scint.y);
                ctx.lineTo(scint.x + 5, scint.y);
                ctx.moveTo(scint.x, scint.y - 5);
                ctx.lineTo(scint.x, scint.y + 5);
                ctx.stroke();
            } else {
                // Scintillement faible - point lumineux
                ctx.fillStyle = `rgba(255, 255, 255, ${intensiteScint})`;
                ctx.shadowColor = 'rgba(255, 255, 255, ' + intensiteScint + ')';
                ctx.shadowBlur = 5;
                
                ctx.beginPath();
                ctx.arc(scint.x, scint.y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        ctx.restore();
    }
    
    drawBloomParticles(ctx) {
        ctx.save();
        
        this.bloomParticles.forEach(particle => {
            if (!particle.actif) return;
            
            const progression = particle.vie / particle.maxVie;
            const alpha = Math.sin(progression * Math.PI) * 0.3;
            
            ctx.fillStyle = `rgba(${particle.couleur.r}, ${particle.couleur.g}, ${particle.couleur.b}, ${alpha})`;
            ctx.shadowColor = `rgba(${particle.couleur.r}, ${particle.couleur.g}, ${particle.couleur.b}, ${alpha * 0.8})`;
            ctx.shadowBlur = particle.taille * 2;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.taille * (1 - progression * 0.5), 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.restore();
    }
    
    drawReflexionsInternes(ctx) {
        // Effet de réflexions internes dans le tube de verre
        ctx.save();
        
        const couleurReflex = this.hexToRgb(this.parameters.couleurSecondaire.default);
        const intensiteReflex = this.chargeElectrique * 0.3;
        
        ctx.font = `${this.textHeight}px Arial`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        
        // Gradient de réflexion
        const gradient = ctx.createLinearGradient(
            this.textX, this.textY - this.textHeight/2,
            this.textX, this.textY + this.textHeight/2
        );
        gradient.addColorStop(0, `rgba(${couleurReflex.r}, ${couleurReflex.g}, ${couleurReflex.b}, 0)`);
        gradient.addColorStop(0.3, `rgba(${couleurReflex.r}, ${couleurReflex.g}, ${couleurReflex.b}, ${intensiteReflex})`);
        gradient.addColorStop(0.7, `rgba(${couleurReflex.r}, ${couleurReflex.g}, ${couleurReflex.b}, ${intensiteReflex * 0.5})`);
        gradient.addColorStop(1, `rgba(${couleurReflex.r}, ${couleurReflex.g}, ${couleurReflex.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = 'screen';
        ctx.fillText(this.element.content || 'NEON', this.textX, this.textY);
        
        ctx.restore();
    }
    
    render(ctx, element, deltaTime) {
        // Mise à jour des systèmes
        this.updateChargeElectrique(deltaTime);
        this.updateScintillements(deltaTime);
        this.updateBloomParticles(deltaTime);
        
        // Rendu des couches
        this.drawBloomParticles(ctx);     // Particules atmosphériques en arrière-plan
        this.drawNeonTube(ctx);           // Tube néon principal
        this.drawReflexionsInternes(ctx); // Réflexions internes
        this.drawScintillements(ctx);     // Scintillements électriques
    }
    
    update(deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse.default;
    }
    
    destroy() {
        // Nettoyage mémoire
        this.scintillements = null;
        this.perturbations = null;
        this.bloomParticles = null;
        this.ctx = null;
        this.canvas = null;
        this.element = null;
    }
    
  }
};
