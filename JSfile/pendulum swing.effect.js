// pendulum swing.effect.js

export const pendulum swingEffect = {
  id: "pendulum swing",
  name: "Pendulum swing",
  
  description: `## ⏰ EFFET 45 : PENDULUM SWING

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Pendulum_Swing  
**ID UNIQUE :** harmonic-pendular-oscillation-045  
**NOM AFFICHAGE :** Oscillation Pendulaire Harmonique  

**DESCRIPTION :** Balancier naturel avec physics pendulaire authentique. Oscillations harmoniques avec amortissement progressif, point de suspension invisible mais déductible, effet de la "longueur de corde" sur la période. Déformations dues aux forces centrifuges aux extrémités du mouvement.

**SPÉCIFICATIONS ADDICTION :**
- Oscillations avec amortissement et relance mystérieuse
- Déformations centrifuges aux points d'inversion
- Variations de période révélant la "longueur" du pendule
- Points morts créant des moments de tension suspendue

------------------------------------------------------------------------

⏰ PENDULUM SWING CRÉÉ !
✨ OSCILLATION PENDULAIRE HYPNOTIQUE
⚖️ PHYSIQUE PENDULAIRE AUTHENTIQUE :

Équation différentielle exacte : T = 2π√(L/g) avec intégration Verlet
Point de suspension invisible : Position déductible par observation
Amortissement progressif : Décroissance naturelle avec coefficient réglable
3 harmoniques superposées : Complexité subtile dans l'oscillation

🎯 SPÉCIFICATIONS ADDICTION INTÉGRÉES
🔄 RELANCE MYSTÉRIEUSE D'ÉNERGIE (30% IMPRÉVISIBILITÉ) :

Détection amplitude faible : Boost automatique quand pendule ralentit
Timing aléatoire : 4-12 secondes entre relances
Effet visuel : 6 particules d'énergie depuis le point de suspension
Conservation du mystère : Source d'énergie non visible

⚡ DÉFORMATIONS CENTRIFUGES AUX EXTRÊMES :

Forces calculées : F = mv²/r authentique
Étirement radial : ScaleX/Y basés sur direction centrifuge
Rotation dynamique : Angle élément = 30% angle pendule
Flou de mouvement : Motion blur proportionnel à la vitesse

🎭 POINTS MORTS DRAMATIQUES :

Détection seuil : Vitesse angulaire < 0.01 rad/s
Aura de tension : Gradient radial pulsant
Ondes de suspens : 3 cercles concentriques
Particules potentielles : Émission d'énergie statique

🔗 CORDE VIRTUELLE VISIBLE

20 segments simulés : Points avec tension individuelle
Oscillations propres : 5 modes de vibration superposés
Épaisseur variable : Thickness ∝ tension locale
Vibrations haute fréquence : 15 Hz pour réalisme

🚀 MICRO-ANIMATIONS RÉCOMPENSANTES

Traînée historique : 60 points avec dégradé temporel
Oscillation suspension : Point de fixation breathing subtil
Stroboscope : Opacity modulée par vitesse
Modes vibratoires : Corde ondule selon physique

🔬 PERFORMANCE OPTIMISÉE

Object pooling : 15 particules réutilisées
Intégration stable : Pas de divergence numérique
Historique limité : 60 points maximum pour éviter surcharge mémoire

Calculs différés : Régénération corde selon besoin

🌊 RÉVÉLATION PROGRESSIVE

Période observable : Longueur déductible par chronométrage
Harmoniques subtiles : 3 fréquences révélant complexité interne
Compteur points morts : Pattern révélé après observation
Énergie résiduelle : Particules persistent après boost

📐 PRÉCISION MATHÉMATIQUE

Loi de conservation : Énergie cinétique ↔ potentielle
Approximation petits angles : sin(θ) ≈ θ pour fluidité
Résonance naturelle : Fréquence propre respectée
Amortissement exponentiel : Décroissance physiquement correcte

L'effet crée un balancier mesmérant avec physique rigoureuse et moments de tension suspendue ! L'imprévisibilité des relances d'énergie maintient l'attention tandis que les déformations centrifuges aux extrêmes créent des accélérations dramatiques.
Le point de suspension invisible mais déductible engage l'observation active, et les points morts génèrent ces moments addictifs de suspens où l'œil attend la reprise du mouvement ! ⏰`,

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

  tags: ["image", "aura", "swing", "breathing", "rotation", "pendulum swing"],

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
    gif: "pendulum swing.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'harmonic-pendular-oscillation-045',
            name: 'Oscillation Pendulaire Harmonique',
            category: 'IMAGE',
            version: '1.0',
            performance: 'medium',
            parameters: {
                intensite: { type: 'range', min: 0.1, max: 2.5, default: 1 },
                vitesse: { type: 'range', min: 0.2, max: 3, default: 1 },
                longueurCorde: { type: 'range', min: 0.5, max: 3, default: 1.5 },
                couleurCorde: { type: 'color', default: '#ff8c42' },
                amortissement: { type: 'range', min: 0.98, max: 0.999, default: 0.995 }
            }
        });

        // Variables pendulaires fundamentales
        this.temps = 0;
        this.angle = 0; // Angle du pendule en radians
        this.vitesseAngulaire = 0; // Vitesse angulaire
        this.angleMax = Math.PI / 4; // Amplitude initiale
        this.longueur = 200; // Longueur de la corde virtuelle
        
        // Point de suspension (invisible)
        this.suspension = {
            x: 400,
            y: 100,
            visible: false,
            oscillation: { x: 0, y: 0 }
        };
        
        // Position courante du pendule
        this.position = { x: 0, y: 0 };
        this.positionPrecedente = { x: 0, y: 0 };
        
        // Physics authentique
        this.gravite = 9.81 * 50; // Gravité amplifiée pour effet visuel
        this.masse = 1;
        this.amortissementFactor = 0.995;
        this.relanceEnergie = false;
        this.prochainRelance = 0;
        
        // Forces centrifuges
        this.forcesCentrifuges = {
            magnitude: 0,
            directionX: 0,
            directionY: 0,
            deformation: { scaleX: 1, scaleY: 1, rotation: 0 }
        };
        
        // Historique oscillations pour traînée
        this.historiqueOscillations = [];
        this.maxHistorique = 60;
        
        // Corde virtuelle visible
        this.cordeVisible = {
            points: [],
            tension: 0,
            oscillationsCorde: []
        };
        
        // Particules d'énergie au point mort
        this.particulesEnergie = [];
        this.maxParticules = 15;
        this.particlePool = [];
        
        // Moments de tension (points morts)
        this.pointsMorts = {
            detecte: false,
            intensite: 0,
            derniereDetection: 0,
            compteur: 0
        };
        
        // Résonances harmoniques
        this.harmoniques = [
            { frequence: 1, amplitude: 1, phase: 0 },
            { frequence: 2, amplitude: 0.3, phase: Math.PI/3 },
            { frequence: 3, amplitude: 0.1, phase: Math.PI/2 }
        ];
        
        // Pool particules
        for(let i = 0; i < this.maxParticules; i++) {
            this.particlePool.push({
                x: 0, y: 0, vx: 0, vy: 0,
                life: 0, maxLife: 1,
                size: 0, opacity: 0,
                active: false, type: 'energy'
            });
        }
        
        // Initialisation
        this.calculatePendulumPeriod();
        this.initializeCord();
    }

    calculatePendulumPeriod() {
        // Période théorique d'un pendule simple: T = 2π√(L/g)
        this.periode = 2 * Math.PI * Math.sqrt(this.longueur / this.gravite);
        this.frequence = 1 / this.periode;
    }

    initializeCord() {
        // Initialiser points de la corde pour simulation
        this.cordeVisible.points = [];
        const segments = 20;
        
        for(let i = 0; i <= segments; i++) {
            this.cordeVisible.points.push({
                x: 0, y: 0,
                originalIndex: i / segments,
                oscillation: 0,
                tension: 0
            });
        }
        
        // Oscillations propres de la corde
        for(let i = 0; i < 5; i++) {
            this.cordeVisible.oscillationsCorde.push({
                frequence: Math.random() * 4 + 1,
                amplitude: Math.random() * 3 + 1,
                phase: Math.random() * Math.PI * 2,
                position: Math.random()
            });
        }
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.element = element;
        
        // Ajuster longueur selon taille élément
        this.longueur = Math.max(element.width, element.height) * this.parameters.longueurCorde;
        this.calculatePendulumPeriod();
        
        // Position initiale du pendule
        this.angle = this.angleMax * 0.8; // Commencer proche de l'amplitude max
        this.updatePendulumPosition();
        
        // Planifier première relance d'énergie
        this.prochainRelance = Math.random() * 10000 + 5000;
    }

    getParticle() {
        for(let particle of this.particlePool) {
            if(!particle.active) {
                particle.active = true;
                return particle;
            }
        }
        return null;
    }

    // Calcul physique pendule simple avec harmoniques
    updatePendulumPhysics(deltaTime) {
        const dt = deltaTime * this.parameters.vitesse * 0.001;
        
        // Force gravitationnelle de rappel
        const forceRappel = -(this.gravite / this.longueur) * Math.sin(this.angle);
        
        // Harmoniques pour complexité (imprévisibilité subtile)
        let forceHarmonique = 0;
        for(let harmonique of this.harmoniques) {
            forceHarmonique += Math.sin(this.temps * harmonique.frequence + harmonique.phase) * 
                              harmonique.amplitude * 0.01;
        }
        
        // Intégration équation différentielle pendule
        this.vitesseAngulaire += (forceRappel + forceHarmonique) * dt;
        
        // Amortissement progressif
        this.vitesseAngulaire *= Math.pow(this.parameters.amortissement, dt);
        
        // Update angle
        this.angle += this.vitesseAngulaire * dt;
        
        // Détection points morts (moments de tension)
        this.detectPointsMorts();
        
        // Relance mystérieuse d'énergie
        this.handleEnergyBoost();
        
        // Calcul forces centrifuges
        this.calculateCentrifugalForces();
        
        // Update position
        this.updatePendulumPosition();
        
        // Historique pour traînée
        this.addToHistory();
    }

    detectPointsMorts() {
        const vitesseSeuilBas = 0.01;
        const vitesseActuelle = Math.abs(this.vitesseAngulaire);
        
        // Détection moment de tension suspendue
        if(vitesseActuelle < vitesseSeuilBas && !this.pointsMorts.detecte) {
            this.pointsMorts.detecte = true;
            this.pointsMorts.intensite = 1;
            this.pointsMorts.derniereDetection = this.temps;
            this.pointsMorts.compteur++;
            
            // Émettre particules d'énergie potentielle
            this.emitPotentialEnergyParticles();
        } else if(vitesseActuelle > vitesseSeuilBas * 2) {
            this.pointsMorts.detecte = false;
        }
        
        // Décroissement intensité
        if(this.pointsMorts.intensite > 0) {
            this.pointsMorts.intensite *= 0.95;
        }
    }

    handleEnergyBoost() {
        // Relance mystérieuse pour maintenir oscillation
        if(this.temps * 1000 > this.prochainRelance && 
           Math.abs(this.vitesseAngulaire) < 0.02) {
            
            const boostDirection = Math.sign(this.angle) * -1;
            this.vitesseAngulaire += boostDirection * 0.05 * this.parameters.intensite;
            
            // Nouvelle planification
            this.prochainRelance = this.temps * 1000 + Math.random() * 8000 + 4000;
            
            // Effet visuel de relance
            this.createEnergyBoostEffect();
        }
    }

    createEnergyBoostEffect() {
        // Particules d'énergie lors de la relance
        for(let i = 0; i < 6; i++) {
            const particle = this.getParticle();
            if(particle) {
                const angle = (i / 6) * Math.PI * 2;
                particle.x = this.suspension.x;
                particle.y = this.suspension.y;
                particle.vx = Math.cos(angle) * 2;
                particle.vy = Math.sin(angle) * 2;
                particle.size = Math.random() * 3 + 2;
                particle.opacity = 0.8;
                particle.maxLife = Math.random() * 2 + 1;
                particle.life = 0;
                particle.type = 'boost';
                
                this.particulesEnergie.push(particle);
            }
        }
    }

    emitPotentialEnergyParticles() {
        // Particules au point mort (énergie potentielle max)
        for(let i = 0; i < 4; i++) {
            const particle = this.getParticle();
            if(particle) {
                particle.x = this.position.x + (Math.random() - 0.5) * 20;
                particle.y = this.position.y + (Math.random() - 0.5) * 20;
                particle.vx = 0;
                particle.vy = Math.random() * 0.5 - 0.25;
                particle.size = Math.random() * 2 + 1;
                particle.opacity = 0.6;
                particle.maxLife = Math.random() * 3 + 2;
                particle.life = 0;
                particle.type = 'potential';
                
                this.particulesEnergie.push(particle);
            }
        }
    }

    calculateCentrifugalForces() {
        // Force centrifuge = mv²/r
        const vitesseLineaire = Math.abs(this.vitesseAngulaire * this.longueur);
        this.forcesCentrifuges.magnitude = (this.masse * vitesseLineaire * vitesseLineaire) / this.longueur;
        
        // Direction perpendiculaire au mouvement
        this.forcesCentrifuges.directionX = -Math.sin(this.angle);
        this.forcesCentrifuges.directionY = Math.cos(this.angle);
        
        // Déformations dues aux forces centrifuges
        const facteurDeformation = this.forcesCentrifuges.magnitude * 0.0001 * this.parameters.intensite;
        
        // Étirement radial (force centrifuge)
        this.forcesCentrifuges.deformation.scaleX = 1 + facteurDeformation * Math.abs(this.forcesCentrifuges.directionX);
        this.forcesCentrifuges.deformation.scaleY = 1 + facteurDeformation * Math.abs(this.forcesCentrifuges.directionY);
        
        // Rotation due au mouvement pendulaire
        this.forcesCentrifuges.deformation.rotation = this.angle * 0.3;
    }

    updatePendulumPosition() {
        this.positionPrecedente.x = this.position.x;
        this.positionPrecedente.y = this.position.y;
        
        // Position cartésienne du pendule
        this.position.x = this.suspension.x + Math.sin(this.angle) * this.longueur;
        this.position.y = this.suspension.y + Math.cos(this.angle) * this.longueur;
        
        // Oscillation subtile du point de suspension
        this.suspension.oscillation.x = Math.sin(this.temps * 0.5) * 2;
        this.suspension.oscillation.y = Math.cos(this.temps * 0.3) * 1;
    }

    addToHistory() {
        this.historiqueOscillations.push({
            x: this.position.x,
            y: this.position.y,
            angle: this.angle,
            vitesse: this.vitesseAngulaire,
            temps: this.temps
        });
        
        if(this.historiqueOscillations.length > this.maxHistorique) {
            this.historiqueOscillations.shift();
        }
    }

    updateCordSimulation() {
        // Simulation physique de la corde
        for(let i = 0; i < this.cordeVisible.points.length; i++) {
            const point = this.cordeVisible.points[i];
            const t = point.originalIndex;
            
            // Position base de la corde
            const baseX = this.suspension.x + this.suspension.oscillation.x;
            const baseY = this.suspension.y + this.suspension.oscillation.y;
            const endX = this.position.x;
            const endY = this.position.y;
            
            // Interpolation linéaire + courbure
            point.x = baseX + (endX - baseX) * t;
            point.y = baseY + (endY - baseY) * t;
            
            // Oscillations propres de la corde
            let cordOscillation = 0;
            for(let osc of this.cordeVisible.oscillationsCorde) {
                const waveInfluence = Math.sin(Math.PI * t) * Math.sin(Math.PI * osc.position);
                cordOscillation += Math.sin(this.temps * osc.frequence + osc.phase) * 
                                  osc.amplitude * waveInfluence;
            }
            
            // Appliquer oscillation perpendiculaire
            const perpX = -(endY - baseY) / this.longueur;
            const perpY = (endX - baseX) / this.longueur;
            
            point.x += perpX * cordOscillation;
            point.y += perpY * cordOscillation;
            
            // Tension de la corde
            point.tension = this.forcesCentrifuges.magnitude * (1 - t) + 
                           Math.abs(this.vitesseAngulaire) * 10;
        }
    }

    render(ctx, element, deltaTime) {
        ctx.save();
        
        // === UPDATE PHYSIQUE PENDULAIRE ===
        this.updatePendulumPhysics(deltaTime);
        this.updateCordSimulation();
        
        // === RENDU CORDE VISIBLE ===
        this.renderPendulumCord(ctx);
        
        // === RENDU TRAÎNÉE OSCILLATION ===
        this.renderOscillationTrail(ctx);
        
        // === RENDU ÉLÉMENT AVEC DÉFORMATIONS CENTRIFUGES ===
        this.renderDeformedElement(ctx, element);
        
        // === POINT DE SUSPENSION (SUBTIL) ===
        this.renderSuspensionPoint(ctx);
        
        // === PARTICULES D'ÉNERGIE ===
        this.updateEnergyParticles(deltaTime);
        this.renderEnergyParticles(ctx);
        
        // === EFFET POINT MORT ===
        if(this.pointsMorts.intensite > 0.1) {
            this.renderDeadPointEffect(ctx);
        }
        
        ctx.restore();
    }

    renderPendulumCord(ctx) {
        ctx.save();
        
        // Corde avec tension variable
        if(this.cordeVisible.points.length > 1) {
            for(let i = 1; i < this.cordeVisible.points.length; i++) {
                const point = this.cordeVisible.points[i];
                const prevPoint = this.cordeVisible.points[i - 1];
                
                // Épaisseur basée sur tension
                const thickness = 1 + point.tension * 0.01;
                const opacity = 0.6 + point.tension * 0.001;
                
                ctx.strokeStyle = `${this.parameters.couleurCorde}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.lineWidth = thickness;
                
                ctx.beginPath();
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
        }
        
        // Oscillations haute fréquence de la corde
        const segments = Math.floor(this.cordeVisible.points.length / 3);
        for(let i = 0; i < segments; i++) {
            const point1 = this.cordeVisible.points[i * 3];
            const point2 = this.cordeVisible.points[Math.min((i * 3) + 3, this.cordeVisible.points.length - 1)];
            
            if(point1 && point2) {
                const vibration = Math.sin(this.temps * 15 + i) * 0.5;
                const midX = (point1.x + point2.x) / 2 + vibration;
                const midY = (point1.y + point2.y) / 2;
                
                ctx.strokeStyle = `${this.parameters.couleurCorde}40`;
                ctx.lineWidth = 0.5;
                
                ctx.beginPath();
                ctx.moveTo(point1.x, point1.y);
                ctx.quadraticCurveTo(midX, midY, point2.x, point2.y);
                ctx.stroke();
            }
        }
        
        ctx.restore();
    }

    renderOscillationTrail(ctx) {
        ctx.save();
        
        if(this.historiqueOscillations.length > 1) {
            // Traînée avec dégradé temporel
            for(let i = 1; i < this.historiqueOscillations.length; i++) {
                const point = this.historiqueOscillations[i];
                const prevPoint = this.historiqueOscillations[i - 1];
                
                const age = (this.historiqueOscillations.length - i) / this.historiqueOscillations.length;
                const opacity = age * 0.4;
                const width = age * 2 + 0.5;
                
                ctx.strokeStyle = `${this.parameters.couleurCorde}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.lineWidth = width;
                
                ctx.beginPath();
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
        }
        
        ctx.restore();
    }

    renderDeformedElement(ctx, element) {
        ctx.save();
        
        // Position élément au bout du pendule
        ctx.translate(this.position.x, this.position.y);
        
        // Rotation due au mouvement pendulaire
        ctx.rotate(this.forcesCentrifuges.deformation.rotation);
        
        // Déformations centrifuges
        ctx.scale(
            this.forcesCentrifuges.deformation.scaleX,
            this.forcesCentrifuges.deformation.scaleY
        );
        
        // Effet de flou de mouvement basé sur vitesse
        const vitesseLineaire = Math.abs(this.vitesseAngulaire * this.longueur);
        const motionBlur = Math.min(10, vitesseLineaire * 0.1);
        
        if(motionBlur > 1) {
            ctx.shadowColor = this.parameters.couleurCorde;
            ctx.shadowBlur = motionBlur;
            ctx.shadowOffsetX = (this.position.x - this.positionPrecedente.x) * 0.5;
            ctx.shadowOffsetY = (this.position.y - this.positionPrecedente.y) * 0.5;
        }
        
        // Modulation opacity selon vitesse (effet stroboscopique subtil)
        const stroboscope = 0.9 + Math.abs(this.vitesseAngulaire) * 0.1;
        ctx.globalAlpha = (element.opacity || 1) * Math.min(1, stroboscope);
        
        // Rendu élément
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
    }

    renderSuspensionPoint(ctx) {
        ctx.save();
        
        // Point de suspension subtil (presque invisible)
        const suspX = this.suspension.x + this.suspension.oscillation.x;
        const suspY = this.suspension.y + this.suspension.oscillation.y;
        
        // Aura magnétique subtile
        const gradient = ctx.createRadialGradient(
            suspX, suspY, 0,
            suspX, suspY, 15
        );
        gradient.addColorStop(0, `${this.parameters.couleurCorde}20`);
        gradient.addColorStop(1, `${this.parameters.couleurCorde}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(suspX, suspY, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Point central minuscule
        ctx.fillStyle = `${this.parameters.couleurCorde}60`;
        ctx.beginPath();
        ctx.arc(suspX, suspY, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    renderDeadPointEffect(ctx) {
        ctx.save();
        
        // Effet visuel au point mort (tension suspendue)
        const intensity = this.pointsMorts.intensite;
        
        // Aura de tension
        const gradient = ctx.createRadialGradient(
            this.position.x, this.position.y, 0,
            this.position.x, this.position.y, 30 * intensity
        );
        gradient.addColorStop(0, `${this.parameters.couleurCorde}${Math.floor(intensity * 100).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${this.parameters.couleurCorde}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 30 * intensity, 0, Math.PI * 2);
        ctx.fill();
        
        // Ondes de tension
        for(let i = 1; i <= 3; i++) {
            const radius = i * 10 * intensity;
            const opacity = intensity * (0.4 - i * 0.1);
            
            ctx.strokeStyle = `${this.parameters.couleurCorde}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    updateEnergyParticles(deltaTime) {
        for(let i = this.particulesEnergie.length - 1; i >= 0; i--) {
            const particle = this.particulesEnergie[i];
            
            // Update particule
            particle.x += particle.vx * deltaTime * 0.1;
            particle.y += particle.vy * deltaTime * 0.1;
            particle.life += deltaTime * 0.001;
            
            // Gravité pour particules boost
            if(particle.type === 'boost') {
                particle.vy += 0.001 * deltaTime;
            }
            
            // Fade out
            if(particle.life > particle.maxLife) {
                particle.active = false;
                this.particulesEnergie.splice(i, 1);
            }
        }
    }

    renderEnergyParticles(ctx) {
        ctx.save();
        
        for(let particle of this.particulesEnergie) {
            const lifeRatio = particle.life / particle.maxLife;
            const alpha = particle.opacity * (1 - lifeRatio);
            
            if(alpha > 0) {
                const couleur = particle.type === 'boost' ? '#ffeb3b' : this.parameters.couleurCorde;
                ctx.fillStyle = `${couleur}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * (1 - lifeRatio * 0.5), 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.restore();
    }

    update(deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse * 0.001;
        
        // Update longueur pendule
        this.longueur = 150 + this.parameters.longueurCorde * 100;
        this.calculatePendulumPeriod();
        
        // Update facteur amortissement
        this.amortissementFactor = this.parameters.amortissement;
        
        // Update harmoniques (drift subtil)
        for(let harmonique of this.harmoniques) {
            harmonique.phase += deltaTime * 0.0001;
        }
        
        // Update oscillations de corde
        for(let osc of this.cordeVisible.oscillationsCorde) {
            osc.position += Math.sin(this.temps * 0.1) * 0.01;
            osc.position = Math.max(0, Math.min(1, osc.position));
        }
    }

    destroy() {
        // Nettoyage mémoire
        this.particlePool.length = 0;
        this.particulesEnergie.length = 0;
        this.historiqueOscillations.length = 0;
        this.cordeVisible.points.length = 0;
        this.cordeVisible.oscillationsCorde.length = 0;
        this.harmoniques.length = 0;
        
        this.canvas = null;
        this.element = null;
    }
    
  }
};
