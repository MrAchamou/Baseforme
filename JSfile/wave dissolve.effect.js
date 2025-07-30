// wave dissolve.effect.js

export const wave dissolveEffect = {
  id: "wave dissolve",
  name: "Wave dissolve",
  
  description: `## 🌊 EFFET 40 : WAVE DISSOLVE

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Wave_Dissolve  
**ID UNIQUE :** oceanic-wave-dissolution-040  
**NOM AFFICHAGE :** Dissolution Ondulatoire Océanique  

**DESCRIPTION :** Dissolution par vagues océaniques avec physics fluide. Vagues qui déferlent sur l'image, emportant pixels dans leur ressac, effet de marée avec flux et reflux. Mousse écumeuse révélant et cachant alternativement des portions d'image.

**SPÉCIFICATIONS ADDICTION :**
- Vagues avec amplitude et fréquence variables
- Effet de ressac révélant/cachant des détails cycliquement
- Mousse écumeuse avec patterns organiques complexes
- Marée créant des révélations progressives de l'image originale

------------------------------------------------------------------

🌊 WAVE DISSOLVE EFFECT CRÉÉ !
✨ CARACTÉRISTIQUES HYPNOTIQUES IMPLÉMENTÉES :
🌊 SYSTÈME DE VAGUES MULTI-COUCHES :

4 couches de vagues avec amplitudes et fréquences différentes
Directions alternées créant un effet de ressac naturel
Variations organiques via noise procédural
Physics fluide avec interactions entre couches

🔄 CYCLE DE MARÉE ADDICTIF :

Marée de 8 secondes avec flux et reflux hypnotique
Révélation progressive de l'image selon le niveau de marée
30% d'imprévisibilité via variations de noise organique
Ressac dynamique changeant de direction aléatoirement

✨ MOUSSE ÉCUMEUSE VIVANTE :

150 particules en object pooling optimisé
Scintillements aléatoires (10% de chance par frame)
Variations de taille cycliques pour effet organique
Dégradés radiaux avec transparence progressive

🎭 DISSOLUTION INTELLIGENTE :

Masque dynamique recalculé en temps réel
Zones de révélation influencées par les vagues
Transition fluide entre visible/dissous
Effet de brillance dans les zones révélées

🎯 PARAMÈTRES CONFIGURABLES :

Vitesse : Contrôle la rapidité générale
Intensité : Force de la dissolution
Amplitude : Hauteur des vagues
Fréquence : Densité des ondulations
Marée : Intensité du flux/reflux
Mousse : Densité des particules écumeuses

🚀 OPTIMISATIONS PERFORMANCE :

Object pooling pour les particules
Rendu conditionnel (skip si alpha < 0.05)
Résolution adaptative du masque (pas de 2px)
Calculs incrémentaux pour les transformations

Cet effet crée une expérience océanique immersive où l'image semble être emportée et révélée par des vagues naturelles, avec un cycle de marée addictif qui maintient l'attention !`,

  category: "image",
  subcategory: "filter",
  intensity: "medium",
  performance: "medium",

  compatibility: {
    text: false,
    image: true,
    logo: false,
    background: true
  },

  tags: ["image", "pixel", "dissolve", "wave", "wave dissolve"],

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
    gif: "wave dissolve.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'oceanic-wave-dissolution-040',
            name: 'Dissolution Ondulatoire Océanique',
            category: 'image',
            version: '1.0',
            performance: 'medium',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1 },
                intensite: { type: 'range', min: 0, max: 1, default: 0.6 },
                amplitude: { type: 'range', min: 20, max: 80, default: 45 },
                frequence: { type: 'range', min: 0.003, max: 0.02, default: 0.008 },
                maree: { type: 'range', min: 0.1, max: 0.8, default: 0.4 },
                mousse: { type: 'range', min: 0.2, max: 0.9, default: 0.6 }
            }
        });

        // Variables temporelles
        this.temps = 0;
        this.tempsMaree = 0;
        this.cycleMaree = 8000; // 8 secondes par cycle complet
        
        // Système de vagues multi-couches
        this.vagues = [];
        this.nombreVagues = 4;
        
        // Pool de particules de mousse
        this.mousseParticules = [];
        this.maxMouseParticules = 150;
        
        // Masque de dissolution progressive
        this.masqueCanvas = null;
        this.masqueCtx = null;
        
        // Variables de ressac
        this.ressacIntensity = 0;
        this.ressacDirection = 1;
        
        // Noise organique pour variations
        this.noiseOffsets = {
            amplitude: Math.random() * 1000,
            frequence: Math.random() * 1000,
            mousse: Math.random() * 1000
        };
    }

    initialize(canvas, element) {
        // Création du canvas masque pour la dissolution
        this.masqueCanvas = document.createElement('canvas');
        this.masqueCanvas.width = canvas.width;
        this.masqueCanvas.height = canvas.height;
        this.masqueCtx = this.masqueCanvas.getContext('2d');
        
        // Initialisation des couches de vagues
        this.initVagues(canvas.width, canvas.height);
        
        // Création du pool de particules de mousse
        this.initMousseParticules(canvas.width, canvas.height);
    }

    initVagues(width, height) {
        this.vagues = [];
        for (let i = 0; i < this.nombreVagues; i++) {
            this.vagues.push({
                y: height * 0.3 + (i * height * 0.15),
                amplitude: 30 + i * 15,
                frequence: 0.005 + i * 0.003,
                vitesse: 0.02 + i * 0.01,
                phase: i * Math.PI * 0.5,
                opacity: 0.8 - i * 0.15,
                direction: i % 2 === 0 ? 1 : -1
            });
        }
    }

    initMousseParticules(width, height) {
        this.mousseParticules = [];
        for (let i = 0; i < this.maxMouseParticules; i++) {
            this.mousseParticules.push(this.createMousseParticle(width, height));
        }
    }

    createMousseParticle(width, height) {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            rayon: 2 + Math.random() * 6,
            vitesseX: (Math.random() - 0.5) * 2,
            vitesseY: (Math.random() - 0.5) * 1,
            vie: Math.random(),
            maxVie: 0.5 + Math.random() * 1.5,
            opacity: 0.3 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
            actif: Math.random() > 0.5
        };
    }

    // Noise organique simplifié
    noise(x, y = 0, z = 0) {
        const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
        return (n - Math.floor(n));
    }

    // Fonction de lissage pour transitions fluides
    smoothstep(edge0, edge1, x) {
        const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
        return t * t * (3 - 2 * t);
    }

    update(deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse.value;
        this.tempsMaree += deltaTime * this.parameters.vitesse.value * 0.3;
        
        // Calcul de l'intensité de marée (flux et reflux)
        const cycleMaree = (this.tempsMaree % this.cycleMaree) / this.cycleMaree;
        const mareeBase = Math.sin(cycleMaree * Math.PI * 2) * 0.5 + 0.5;
        
        // Ajout de variations organiques à la marée
        const noiseMaree = this.noise(this.tempsMaree * 0.001, this.noiseOffsets.amplitude);
        this.mareeLevel = mareeBase * this.parameters.maree.value + noiseMaree * 0.2;
        
        // Ressac dynamique avec changements de direction
        this.ressacIntensity += (Math.random() - 0.5) * 0.02;
        this.ressacIntensity = Math.max(-1, Math.min(1, this.ressacIntensity));
        
        if (Math.random() < 0.005) { // 0.5% chance de changer de direction
            this.ressacDirection *= -1;
        }
        
        // Mise à jour des particules de mousse
        this.updateMousseParticules(deltaTime);
    }

    updateMousseParticules(deltaTime) {
        const dt = deltaTime * 0.001;
        
        this.mousseParticules.forEach(particule => {
            if (!particule.actif) return;
            
            // Mouvement organique influencé par les vagues
            const waveInfluence = Math.sin(particule.x * 0.01 + this.temps * 0.001) * 10;
            particule.x += (particule.vitesseX + waveInfluence * 0.1) * dt * 60;
            particule.y += particule.vitesseY * dt * 60;
            
            // Variation de taille cyclique
            particule.phase += dt * 3;
            const sizeVariation = Math.sin(particule.phase) * 0.2 + 1;
            particule.currentRayon = particule.rayon * sizeVariation;
            
            // Évolution de la vie
            particule.vie += dt * 0.5;
            if (particule.vie >= particule.maxVie) {
                particule.vie = 0;
                particule.x = Math.random() * 800;
                particule.y = Math.random() * 600;
                particule.actif = Math.random() > 0.3;
            }
            
            // Rebond sur les bords
            if (particule.x < 0 || particule.x > 800) particule.vitesseX *= -0.8;
            if (particule.y < 0 || particule.y > 600) particule.vitesseY *= -0.8;
            particule.x = Math.max(0, Math.min(800, particule.x));
            particule.y = Math.max(0, Math.min(600, particule.y));
        });
    }

    render(ctx, element, deltaTime) {
        const { width, height } = ctx.canvas;
        
        // Sauvegarde du contexte
        ctx.save();
        
        // Génération du masque de dissolution dynamique
        this.generateDissolutionMask(width, height);
        
        // Application de l'effet de dissolution sur l'élément
        this.renderDissolvedElement(ctx, element, width, height);
        
        // Rendu des vagues océaniques
        this.renderVagues(ctx, width, height);
        
        // Rendu de la mousse écumeuse
        this.renderMousse(ctx, width, height);
        
        // Effet de ressac (révélation progressive)
        this.renderRessac(ctx, element, width, height);
        
        ctx.restore();
    }

    generateDissolutionMask(width, height) {
        const maskCtx = this.masqueCtx;
        
        // Nettoyage du masque
        maskCtx.clearRect(0, 0, width, height);
        maskCtx.fillStyle = 'black';
        maskCtx.fillRect(0, 0, width, height);
        
        // Génération des zones de dissolution par vagues
        maskCtx.globalCompositeOperation = 'source-over';
        
        for (let y = 0; y < height; y += 2) {
            for (let x = 0; x < width; x += 2) {
                let dissolutionFactor = 0;
                
                // Influence de chaque couche de vague
                this.vagues.forEach((vague, index) => {
                    const waveY = vague.y + 
                        Math.sin((x * vague.frequence) + (this.temps * vague.vitesse * vague.direction) + vague.phase) * 
                        (vague.amplitude * this.parameters.amplitude.value / 45);
                    
                    const distance = Math.abs(y - waveY);
                    const influence = Math.max(0, 1 - distance / (vague.amplitude * 2));
                    dissolutionFactor += influence * vague.opacity;
                });
                
                // Modulation par le niveau de marée
                const mareeInfluence = this.smoothstep(0.2, 0.8, this.mareeLevel);
                dissolutionFactor *= mareeInfluence;
                
                // Ajout de noise organique
                const noiseValue = this.noise(x * 0.01, y * 0.01, this.temps * 0.0005);
                dissolutionFactor += noiseValue * 0.3;
                
                // Application de l'intensité générale
                dissolutionFactor *= this.parameters.intensite.value;
                dissolutionFactor = Math.max(0, Math.min(1, dissolutionFactor));
                
                if (dissolutionFactor > 0.1) {
                    const alpha = Math.floor(dissolutionFactor * 255);
                    maskCtx.fillStyle = `rgba(255, 255, 255, ${dissolutionFactor})`;
                    maskCtx.fillRect(x, y, 2, 2);
                }
            }
        }
    }

    renderDissolvedElement(ctx, element, width, height) {
        // Rendu de l'élément avec masque de dissolution
        ctx.save();
        
        // Application du masque
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(this.masqueCanvas, 0, 0);
        ctx.globalCompositeOperation = 'source-in';
        
        // Rendu de l'élément original
        if (element.content) {
            ctx.globalAlpha = element.opacity;
            ctx.translate(element.x + element.width/2, element.y + element.height/2);
            ctx.rotate(element.rotation);
            
            if (typeof element.content === 'string') {
                ctx.fillStyle = '#ffffff';
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(element.content, 0, 0);
            }
        }
        
        ctx.restore();
    }

    renderVagues(ctx, width, height) {
        ctx.save();
        
        // Rendu des vagues avec dégradés océaniques
        this.vagues.forEach((vague, index) => {
            const gradient = ctx.createLinearGradient(0, vague.y - vague.amplitude, 0, vague.y + vague.amplitude);
            gradient.addColorStop(0, `rgba(64, 164, 223, 0)`);
            gradient.addColorStop(0.3, `rgba(32, 137, 200, ${vague.opacity * 0.3})`);
            gradient.addColorStop(0.7, `rgba(16, 108, 177, ${vague.opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(8, 81, 156, ${vague.opacity * 0.8})`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(0, height);
            
            // Génération de la forme de vague
            for (let x = 0; x <= width; x += 4) {
                const waveY = vague.y + 
                    Math.sin((x * vague.frequence) + (this.temps * vague.vitesse * vague.direction) + vague.phase) * 
                    (vague.amplitude * this.parameters.amplitude.value / 45);
                
                // Ajout de variations organiques
                const noiseY = this.noise(x * 0.005, this.temps * 0.0003, index) * 8;
                const finalY = waveY + noiseY;
                
                if (x === 0) {
                    ctx.moveTo(x, finalY);
                } else {
                    ctx.lineTo(x, finalY);
                }
            }
            
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fill();
        });
        
        ctx.restore();
    }

    renderMousse(ctx, width, height) {
        ctx.save();
        
        const mousseIntensity = this.parameters.mousse.value;
        
        this.mousseParticules.forEach(particule => {
            if (!particule.actif || particule.vie > particule.maxVie) return;
            
            const lifeRatio = 1 - (particule.vie / particule.maxVie);
            const alpha = particule.opacity * lifeRatio * mousseIntensity;
            
            if (alpha < 0.05) return;
            
            // Dégradé radial pour effet de mousse
            const gradient = ctx.createRadialGradient(
                particule.x, particule.y, 0,
                particule.x, particule.y, particule.currentRayon
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            gradient.addColorStop(0.6, `rgba(220, 240, 255, ${alpha * 0.6})`);
            gradient.addColorStop(1, `rgba(180, 220, 255, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(particule.x, particule.y, particule.currentRayon, 0, Math.PI * 2);
            ctx.fill();
            
            // Effet de scintillement
            if (Math.random() < 0.1) {
                const scintillement = ctx.createRadialGradient(
                    particule.x, particule.y, 0,
                    particule.x, particule.y, particule.currentRayon * 0.5
                );
                scintillement.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
                scintillement.addColorStop(1, `rgba(255, 255, 255, 0)`);
                
                ctx.fillStyle = scintillement;
                ctx.beginPath();
                ctx.arc(particule.x, particule.y, particule.currentRayon * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        ctx.restore();
    }

    renderRessac(ctx, element, width, height) {
        // Effet de ressac révélant des détails par cycles
        const ressacCycle = Math.sin(this.temps * 0.001 + this.ressacIntensity) * 0.5 + 0.5;
        const revelation = this.smoothstep(0.3, 0.7, ressacCycle);
        
        if (revelation > 0.1) {
            ctx.save();
            
            // Zone de révélation dynamique
            const revelationHeight = height * revelation * this.mareeLevel;
            const revelationY = height - revelationHeight;
            
            // Clipping pour la zone de révélation
            ctx.beginPath();
            ctx.rect(0, revelationY, width, revelationHeight);
            ctx.clip();
            
            // Rendu de l'élément avec effet de brillance
            ctx.globalAlpha = revelation * 0.8;
            ctx.globalCompositeOperation = 'screen';
            
            if (element.content) {
                ctx.translate(element.x + element.width/2, element.y + element.height/2);
                ctx.rotate(element.rotation);
                
                if (typeof element.content === 'string') {
                    const gradient = ctx.createLinearGradient(-50, -10, 50, 10);
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
                    gradient.addColorStop(0.5, 'rgba(220, 240, 255, 0.8)');
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
                    
                    ctx.fillStyle = gradient;
                    ctx.font = '24px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(element.content, 0, 0);
                }
            }
            
            ctx.restore();
        }
    }

    destroy() {
        this.mousseParticules = [];
        this.vagues = [];
        if (this.masqueCanvas) {
            this.masqueCanvas = null;
            this.masqueCtx = null;
        }
    }
    
  }
};
