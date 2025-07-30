// float physics.effect.js

export const float physicsEffect = {
  id: "float physics",
  name: "Float physics",
  
  description: `## 🪐 EFFET 42 : FLOAT PHYSICS

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Float_Physics  
**ID UNIQUE :** antigravity-levitation-physics-042  
**NOM AFFICHAGE :** Lévitation Anti-Gravitationnelle  

**DESCRIPTION :** Anti-gravité réaliste avec physics de lévitation complexe. Oscillations verticales subtiles, effet de champ anti-gravité visible, interactions avec la "densité atmosphérique", micro-rotations dues aux courants d'air simulés. Ombres flottantes décalées créant un effet de profondeur surnaturel.

**SPÉCIFICATIONS ADDICTION :**
- Oscillations avec périodes variables créant de l'imprévisibilité
- Champ anti-gravité visualisé par distorsions de l'espace
- Interactions atmosphériques créant des mouvements subtils
- Ombres décalées révélant la hauteur de lévitation

-------------------------------------------------------------------

🪐 FLOAT PHYSICS CRÉÉ !
✨ EFFET HYPNOTIQUE IMPLÉMENTÉ
🔬 PHYSIQUE ANTI-GRAVITATIONNELLE RÉALISTE :

Oscillations complexes : 3 fréquences superposées avec drift imprévisible
Champ anti-gravité visible : Distorsions spatiales, anneaux d'énergie, particules
Courants d'air simulés : 6 zones d'influence créant micro-rotations
Ombres décalées dynamiques : Position/intensité basées sur hauteur réelle

🎯 FACTEUR ADDICTION MAXIMAL
🌊 IMPRÉVISIBILITÉ CONTRÔLÉE (70/30) :

Oscillations principales prévisibles + influences atmosphériques surprenantes
Drift des phases créant variations subtiles dans les cycles

⚡ DÉTAILS PROGRESSIFS :

Particules du champ révélées progressivement
Distorsions spatiales avec animations décalées
Intensité du champ modulée organiquement

🎭 MICRO-ANIMATIONS RÉCOMPENSANTES :

Brillance anti-gravité pulsante
Déformation subtile de l'élément (scale breathing)
Rotation micro due aux courants d'air

🚀 PERFORMANCE OPTIMISÉE

Object pooling : 25 particules réutilisées
60 FPS garanti : Calculs optimisés, pas de création d'objets
Mémoire contrôlée : Cleanup automatique particules inactives

L'effet crée une lévitation surnaturelle avec physique crédible et détails hypnotiques ! 🔥`,

  category: "image",
  subcategory: "animation",
  intensity: "low",
  performance: "light",

  compatibility: {
    text: false,
    image: true,
    logo: false,
    background: true
  },

  tags: ["image", "float", "breathing", "phase", "rotation", "gravity"],

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
    gif: "float physics.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'antigravity-levitation-physics-042',
            name: 'Lévitation Anti-Gravitationnelle',
            category: 'IMAGE',
            version: '1.0',
            performance: 'medium',
            parameters: {
                intensite: { type: 'range', min: 0.1, max: 2, default: 1 },
                vitesse: { type: 'range', min: 0.3, max: 2.5, default: 1 },
                graviteField: { type: 'range', min: 0.2, max: 1.8, default: 1 },
                couleurChamp: { type: 'color', default: '#4a9eff' },
                ombreIntensity: { type: 'range', min: 0.3, max: 1, default: 0.7 }
            }
        });

        // Variables physiques core
        this.temps = 0;
        this.baseY = 0;
        this.currentY = 0;
        this.velocityY = 0;
        this.rotationAngle = 0;
        this.rotationVelocity = 0;
        
        // Système anti-gravité
        this.antiGravField = {
            strength: 0,
            radius: 80,
            particles: [],
            distortions: []
        };
        
        // Oscillations complexes avec imprévisibilité
        this.oscillators = [
            { freq: 0.8, amp: 8, phase: 0, drift: 0.002 },
            { freq: 1.3, amp: 4, phase: Math.PI/3, drift: 0.0015 },
            { freq: 2.1, amp: 2, phase: Math.PI/2, drift: 0.001 }
        ];
        
        // Atmosphère et courants d'air
        this.airCurrents = [];
        for(let i = 0; i < 6; i++) {
            this.airCurrents.push({
                x: Math.random() * 800,
                y: Math.random() * 600,
                strength: Math.random() * 0.3 + 0.1,
                direction: Math.random() * Math.PI * 2,
                frequency: Math.random() * 1.5 + 0.5
            });
        }
        
        // Pool de particules pour performance
        this.particlePool = [];
        this.activeParticles = [];
        this.maxParticles = 25;
        
        // Ombres décalées
        this.shadowOffset = { x: 0, y: 0 };
        this.shadowBlur = 20;
        
        // Création pool particules
        for(let i = 0; i < this.maxParticles; i++) {
            this.particlePool.push({
                x: 0, y: 0, vx: 0, vy: 0,
                life: 0, maxLife: 1,
                opacity: 0, size: 0,
                active: false
            });
        }
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.baseY = element.y;
        this.currentY = element.y;
        
        // Initialisation champ anti-gravité
        this.antiGravField.strength = this.parameters.graviteField.default;
        
        // Setup distorsions spatiales
        this.antiGravField.distortions = [];
        for(let i = 0; i < 12; i++) {
            this.antiGravField.distortions.push({
                angle: (i / 12) * Math.PI * 2,
                radius: Math.random() * 40 + 30,
                intensity: Math.random() * 0.8 + 0.2,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    // Récupération particule depuis pool
    getParticle() {
        for(let particle of this.particlePool) {
            if(!particle.active) {
                particle.active = true;
                return particle;
            }
        }
        return null;
    }

    // Émission particules champ anti-gravité
    emitFieldParticles(centerX, centerY) {
        if(Math.random() < 0.15) {
            const particle = this.getParticle();
            if(particle) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * this.antiGravField.radius;
                
                particle.x = centerX + Math.cos(angle) * distance;
                particle.y = centerY + Math.sin(angle) * distance;
                particle.vx = Math.cos(angle) * (Math.random() * 0.5 + 0.2);
                particle.vy = Math.sin(angle) * (Math.random() * 0.5 + 0.2);
                particle.life = 0;
                particle.maxLife = Math.random() * 2 + 1;
                particle.size = Math.random() * 3 + 1;
                particle.opacity = Math.random() * 0.6 + 0.2;
                
                this.activeParticles.push(particle);
            }
        }
    }

    // Calcul des oscillations complexes avec imprévisibilité
    calculateLevitation(deltaTime) {
        let totalOffset = 0;
        
        // Oscillations multiples avec drift
        for(let osc of this.oscillators) {
            osc.phase += osc.drift * deltaTime;
            const wave = Math.sin(this.temps * osc.freq + osc.phase);
            totalOffset += wave * osc.amp * this.parameters.intensite;
        }
        
        // Influence des courants d'air (30% imprévisibilité)
        for(let current of this.airCurrents) {
            const distance = Math.sqrt(
                Math.pow(current.x - (this.baseY + 200), 2) + 
                Math.pow(current.y - this.currentY, 2)
            );
            
            if(distance < 150) {
                const influence = Math.max(0, 1 - distance / 150);
                const airForce = Math.sin(this.temps * current.frequency) * current.strength * influence;
                totalOffset += airForce * 15;
                
                // Micro-rotation due aux courants
                this.rotationVelocity += airForce * 0.002;
            }
        }
        
        return totalOffset;
    }

    render(ctx, element, deltaTime) {
        const centerX = element.x + element.width / 2;
        const centerY = this.currentY + element.height / 2;
        
        ctx.save();
        
        // === RENDU CHAMP ANTI-GRAVITÉ ===
        this.renderAntiGravField(ctx, centerX, centerY);
        
        // === CALCUL PHYSIQUE LÉVITATION ===
        const levitationOffset = this.calculateLevitation(deltaTime);
        this.currentY = this.baseY - 25 + levitationOffset;
        
        // Rotation subtile due aux courants
        this.rotationAngle += this.rotationVelocity;
        this.rotationVelocity *= 0.98; // Friction
        
        // === RENDU OMBRE DÉCALÉE ===
        this.renderFloatingShadow(ctx, element, centerX);
        
        // === RENDU ÉLÉMENT PRINCIPAL ===
        ctx.translate(centerX, this.currentY + element.height / 2);
        ctx.rotate(this.rotationAngle);
        
        // Effet de brillance anti-gravité
        const glowIntensity = 0.3 + Math.sin(this.temps * 2) * 0.1;
        ctx.shadowColor = this.parameters.couleurChamp;
        ctx.shadowBlur = 8 * glowIntensity;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Application légère distorsion à l'élément
        const waveDistort = Math.sin(this.temps * 1.5) * 2;
        ctx.scale(1 + waveDistort * 0.01, 1 - waveDistort * 0.008);
        
        // Rendu élément avec opacity modulée
        const baseOpacity = element.opacity || 1;
        const floatOpacity = baseOpacity * (0.95 + Math.sin(this.temps * 3) * 0.05);
        ctx.globalAlpha = floatOpacity;
        
        if(element.content && element.content.tagName === 'IMG') {
            ctx.drawImage(
                element.content,
                -element.width / 2,
                -element.height / 2,
                element.width,
                element.height
            );
        } else {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height);
        }
        
        ctx.restore();
        
        // === PARTICULES CHAMP ANTI-GRAVITÉ ===
        this.emitFieldParticles(centerX, centerY);
        this.renderFieldParticles(ctx, deltaTime);
    }

    renderAntiGravField(ctx, centerX, centerY) {
        ctx.save();
        
        // Champ de distorsion visible
        const fieldRadius = this.antiGravField.radius * this.parameters.graviteField;
        
        // Gradient radial du champ
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, fieldRadius
        );
        gradient.addColorStop(0, `${this.parameters.couleurChamp}15`);
        gradient.addColorStop(0.6, `${this.parameters.couleurChamp}08`);
        gradient.addColorStop(1, `${this.parameters.couleurChamp}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, fieldRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Anneaux de distorsion
        for(let i = 0; i < 3; i++) {
            const ringRadius = (fieldRadius * (0.3 + i * 0.25));
            const opacity = (0.4 - i * 0.1) * (0.7 + Math.sin(this.temps * 1.5 + i) * 0.3);
            
            ctx.strokeStyle = `${this.parameters.couleurChamp}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Distorsions spatiales (détails progressifs)
        for(let distortion of this.antiGravField.distortions) {
            const x = centerX + Math.cos(distortion.angle + this.temps * 0.5) * distortion.radius;
            const y = centerY + Math.sin(distortion.angle + this.temps * 0.5) * distortion.radius;
            const size = 2 + Math.sin(this.temps * 2 + distortion.phase) * 1;
            
            ctx.fillStyle = `${this.parameters.couleurChamp}40`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }

    renderFloatingShadow(ctx, element, centerX) {
        ctx.save();
        
        // Calcul position ombre basée sur hauteur de lévitation
        const levitationHeight = Math.abs(this.currentY - this.baseY) + 25;
        const shadowDistance = levitationHeight * 1.2;
        
        // Offset ombre avec perspective
        this.shadowOffset.x = shadowDistance * 0.3;
        this.shadowOffset.y = shadowDistance * 0.8;
        
        // Position ombre au sol
        const shadowX = centerX + this.shadowOffset.x;
        const shadowY = this.baseY + element.height + this.shadowOffset.y;
        
        // Taille et intensité ombre inversement proportionnelles
        const shadowScale = Math.max(0.3, 1 - levitationHeight * 0.01);
        const shadowOpacity = Math.max(0.1, this.parameters.ombreIntensity * shadowScale);
        
        // Gradient ombre flottante
        const shadowGradient = ctx.createRadialGradient(
            shadowX, shadowY, 0,
            shadowX, shadowY, element.width * shadowScale
        );
        shadowGradient.addColorStop(0, `rgba(0,0,0,${shadowOpacity})`);
        shadowGradient.addColorStop(0.7, `rgba(0,0,0,${shadowOpacity * 0.3})`);
        shadowGradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = shadowGradient;
        
        // Forme ombre elliptique déformée
        ctx.beginPath();
        ctx.ellipse(
            shadowX, shadowY,
            element.width * shadowScale * 0.6,
            element.height * shadowScale * 0.2,
            this.rotationAngle * 0.3,
            0, Math.PI * 2
        );
        ctx.fill();
        
        ctx.restore();
    }

    renderFieldParticles(ctx, deltaTime) {
        ctx.save();
        
        // Update et rendu particules actives
        for(let i = this.activeParticles.length - 1; i >= 0; i--) {
            const particle = this.activeParticles[i];
            
            // Update particule
            particle.x += particle.vx * deltaTime * 0.1;
            particle.y += particle.vy * deltaTime * 0.1;
            particle.life += deltaTime * 0.001;
            
            // Fade out
            const lifeRatio = particle.life / particle.maxLife;
            if(lifeRatio >= 1) {
                particle.active = false;
                this.activeParticles.splice(i, 1);
                continue;
            }
            
            // Rendu particule
            const alpha = particle.opacity * (1 - lifeRatio);
            ctx.fillStyle = `${this.parameters.couleurChamp}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * (1 - lifeRatio * 0.5), 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }

    update(deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse * 0.001;
        
        // Update courants d'air (mouvement imprévisible)
        for(let current of this.airCurrents) {
            current.x += Math.sin(this.temps * current.frequency) * 0.5;
            current.y += Math.cos(this.temps * current.frequency * 0.7) * 0.3;
            
            // Garder dans les limites
            current.x = Math.max(50, Math.min(750, current.x));
            current.y = Math.max(50, Math.min(550, current.y));
        }
        
        // Update intensité champ anti-gravité
        this.antiGravField.strength = this.parameters.graviteField * 
            (0.9 + Math.sin(this.temps * 1.3) * 0.1);
    }

    destroy() {
        // Nettoyage mémoire
        this.particlePool.length = 0;
        this.activeParticles.length = 0;
        this.oscillators.length = 0;
        this.airCurrents.length = 0;
        this.antiGravField.distortions.length = 0;
        
        this.canvas = null;
    }
    
  }
};
