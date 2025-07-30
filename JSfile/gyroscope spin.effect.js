// gyroscope spin.effect.js

export const gyroscope spinEffect = {
  id: "gyroscope spin",
  name: "Gyroscope spin",
  
  description: `## 🔄 EFFET 50 : GYROSCOPE SPIN

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Gyroscope_Spin  
**ID UNIQUE :** gyroscopic-stabilization-rotation-050  
**NOM AFFICHAGE :** Stabilisation Gyroscopique Rotation  

**DESCRIPTION :** Rotation gyroscopique avec effet de stabilisation mécanique. Rotation rapide sur axe principal avec précession lente, résistance aux perturbations externes, effet gyroscopique maintenant l'orientation. Visualisation des forces gyroscopiques par déformations subtiles.

**SPÉCIFICATIONS ADDICTION :**
- Rotation avec précession créant des mouvements complexes
- Résistance aux perturbations révélant la stabilité gyroscopique
- Forces gyroscopiques visualisées par micro-déformations
- Axes de rotation multiples créant une danse mécanique hypnotique

--------------------------------------------------------------------------------

⚙️ ANALYSE DE L'EFFET GYROSCOPE SPIN
CATÉGORIE : IMAGE
EFFET ANALYSÉ : GyroscopeSpinEffect
ID UNIQUE : gyroscopic-stabilization-rotation-050
NOM AFFICHAGE : Stabilisation Gyroscopique Rotation
DESCRIPTION : Simulation physique complète d'un gyroscope avec rotation, précession et nutation réalistes. Système de stabilisation gyroscopique résistant aux perturbations externes, visualisation des forces avec vecteurs colorés, anneaux de Cardan déformés et champ de forces centrifuges.
SPÉCIFICATIONS ADDICTION :

3 types de perturbations imprévisibles (vibration, impact, magnétique)
Stabilisation gyroscopique authentique créant résistance fascinante
Révélation progressive de la complexité mécanique via anneaux et axes
Déformation du champ spatial montrant les forces centrifuges


🎭 SYSTÈME GYROSCOPIQUE PHYSIQUE COMPLET :
⚛️ MÉCANIQUE GYROSCOPIQUE TRICOMPLEXE :

Spin principal : Rotation sur axe Z avec vélocité et accélération
Précession : Rotation de l'axe autour d'un point avec rayon variable
Nutation : Oscillation de l'axe de rotation (amplitude 2px)
Moment angulaire calculé : L = inertie × vélocité angulaire

🌀 PERTURBATIONS EXTERNES RÉALISTES :

3-6 sources de perturbation avec types distincts
Vibration : Oscillation sinusoïdale du rayon de précession
Impact : Choc affectant nutation + ralentissement du spin
Magnétique : Force modifiant la vélocité de précession
Durée variable (100-600ms) avec intensité décroissante

🌈 PHYSIQUE MÉCANIQUE ET RÉSISTANCE :
💡 SYSTÈME DE STABILISATION :

Couple de redressement gyroscopique proportionnel au moment angulaire
Résistance aux changements d'orientation (effet gyroscopique)
Stabilisation active de la nutation et précession
Paramètre stabilisation contrôlant la résistance (0-1)

✨ MATRICE DE TRANSFORMATION 3D :

Rotation composée : précession → nutation → spin
Cache des matrices avec clés d'optimisation
Projection 3D vers 2D pour rendu réaliste
Déformation des anneaux selon l'axe (X ou Y)

🔮 CHAMP DE DÉFORMATION SPATIAL :

Grille 12×12 montrant forces centrifuges
Déformation radiale basée sur distance au centre
Intensité proportionnelle à la vitesse de rotation
Visualisation des contraintes mécaniques

🎭 CYCLE GYROSCOPIQUE ADDICTIF :
📈 PHASES MÉCANIQUES :

Accélération : Montée en régime avec stabilisation progressive
Régime nominal : Rotation stable avec petites perturbations
Perturbation : Activation aléatoire des forces externes
Compensation : Effet gyroscopique luttant contre déstabilisation
Réstabilisation : Retour progressif à l'équilibre

🎨 DÉTAILS PROGRESSIFS :

4 anneaux gyroscopiques avec wobble individuel
Vecteurs de force colorés selon type (jaune/rouge/bleu)
Axes de rotation visibles (vert=spin, rouge=précession)
Centre de masse déplacé selon précession

⚡ OPTIMISATIONS AVANCÉES :
🔄 SYSTÈMES D'OPTIMISATION :

Cache Map des matrices de transformation
Pool de perturbations réutilisées avec activation/désactivation
Nettoyage périodique du cache (toutes les 2 secondes)
Calculs différés pour déformation du champ spatial

🎛️ PARAMÈTRES CONFIGURABLES :

Vitesse : Vélocité de rotation principale (0.1-3, défaut: 1.8)
Intensité : Moment d'inertie et forces (0-1, défaut: 0.75)
Précession : Amplitude du mouvement de précession (0-1, défaut: 0.3)
Stabilisation : Résistance gyroscopique (0-1, défaut: 0.8)
Perturbations : Fréquence des forces externes (0-1, défaut: 0.4)

🔬 ALGORITHMES PHYSIQUES AUTHENTIQUES :

Moment angulaire : L = I × ω (inertie × vitesse angulaire)
Précession gyroscopique : Ω = τ / L (couple / moment angulaire)
Nutation : Oscillation avec fréquence 0.003 rad/ms
Forces centrifuges : Déformation radiale = force × distance

🎬 EFFETS VISUELS TECHNIQUES :

Anneaux de Cardan : 4 anneaux avec épaisseur et opacité variables
Marqueurs rotatifs : 8 points par anneau montrant la rotation
Vecteurs forces : Flèches avec pointes et couleurs par type
Glow gyroscopique : Effet lumineux proportionnel à la vitesse
Grille déformée : Lignes horizontales/verticales montrant contraintes

🎯 RÉALISME MÉCANIQUE :

Bruit mécanique : Seeds aléatoires pour roulement, friction, résonance
Résistance inertielle : Changements progressifs de vitesse
Conservation énergie : Perturbations réduisant le spin
Effet de gyroscope : Résistance authentique aux basculements

L'effet simule un véritable gyroscope mécanique avec physique gyroscopique complète et résistance fascinante ! 🚀⚙️`,

  category: "image",
  subcategory: "style",
  intensity: "medium",
  performance: "light",

  compatibility: {
    text: false,
    image: true,
    logo: false,
    background: true
  },

  tags: ["image", "glow", "phase", "3d", "rotation", "gyroscope spin"],

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
    gif: "gyroscope spin.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'gyroscopic-stabilization-rotation-050',
            name: 'Stabilisation Gyroscopique Rotation',
            category: 'image',
            version: '1.0',
            performance: 'medium',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1.8 },
                intensite: { type: 'range', min: 0, max: 1, default: 0.75 },
                precession: { type: 'range', min: 0, max: 1, default: 0.3 },
                stabilisation: { type: 'range', min: 0, max: 1, default: 0.8 },
                perturbations: { type: 'range', min: 0, max: 1, default: 0.4 }
            }
        });

        // Variables privées de l'effet
        this.temps = 0;
        this.centerX = 0;
        this.centerY = 0;
        
        // Système gyroscopique complet
        this.gyroscope = {
            // Rotation principale (spin)
            spin: {
                angle: 0,
                velocity: 0,
                acceleration: 0,
                axis: { x: 0, y: 0, z: 1 } // Axe Z par défaut
            },
            
            // Précession
            precession: {
                angle: 0,
                velocity: 0,
                radius: 0,
                axis: { x: 0, y: 1, z: 0 } // Axe Y par défaut
            },
            
            // Nutation (oscillation de l'axe)
            nutation: {
                angle: 0,
                amplitude: 0,
                frequency: 0
            },
            
            // Moment angulaire
            angularMomentum: { x: 0, y: 0, z: 1 },
            inertia: 1.0,
            
            // Forces externes
            externalForces: [],
            torques: []
        };
        
        // Perturbations externes
        this.perturbationSources = [];
        this.lastPerturbation = 0;
        
        // Visualisation des forces
        this.forceVectors = [];
        this.deformationField = [];
        
        // Anneaux gyroscopiques pour visualisation
        this.gyroRings = [];
        
        // Cache de transformations
        this.transformCache = new Map();
        this.matrixStack = [];
        
        // Générateurs de bruit mécanique
        this.mechanicalNoise = {
            bearing: Math.random() * 1000,
            friction: Math.random() * 1000,
            resonance: Math.random() * 1000
        };
        
        this.initializeGyroscopeSystem();
        this.initializePerturbationSources();
        this.initializeVisualizationRings();
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.element = element;
        this.centerX = element.x + element.width / 2;
        this.centerY = element.y + element.height / 2;
        
        // Initialiser le système gyroscopique
        this.resetGyroscopeState();
        this.generateDeformationField();
    }

    initializeGyroscopeSystem() {
        // Configuration initiale du gyroscope
        const initialSpin = this.getParameter('vitesse') * 0.02;
        this.gyroscope.spin.velocity = initialSpin;
        this.gyroscope.precession.velocity = initialSpin * 0.1;
        this.gyroscope.precession.radius = 15;
        
        // Nutation basée sur les imperfections mécaniques
        this.gyroscope.nutation.amplitude = 2;
        this.gyroscope.nutation.frequency = 0.003;
        
        // Moment d'inertie simulé
        this.gyroscope.inertia = this.getParameter('intensite') * 2 + 0.5;
    }

    initializePerturbationSources() {
        this.perturbationSources = [];
        const perturbationCount = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < perturbationCount; i++) {
            this.perturbationSources.push({
                type: ['vibration', 'impact', 'magnetic'][Math.floor(Math.random() * 3)],
                strength: 0.1 + Math.random() * 0.5,
                frequency: 0.001 + Math.random() * 0.005,
                phase: Math.random() * Math.PI * 2,
                direction: {
                    x: Math.random() - 0.5,
                    y: Math.random() - 0.5,
                    z: Math.random() - 0.5
                },
                active: false,
                duration: 0,
                maxDuration: 100 + Math.random() * 500
            });
        }
    }

    initializeVisualizationRings() {
        this.gyroRings = [];
        const ringCount = 4;
        
        for (let i = 0; i < ringCount; i++) {
            this.gyroRings.push({
                radius: 40 + i * 20,
                thickness: 2 + i,
                opacity: 0.8 - i * 0.15,
                rotationOffset: i * Math.PI / 4,
                wobble: 0,
                axis: i % 2 === 0 ? 'x' : 'y'
            });
        }
    }

    resetGyroscopeState() {
        this.gyroscope.spin.angle = 0;
        this.gyroscope.precession.angle = 0;
        this.gyroscope.nutation.angle = 0;
        
        // Recalculer selon les paramètres
        this.initializeGyroscopeSystem();
    }

    generateDeformationField() {
        this.deformationField = [];
        const gridSize = 12;
        const maxRadius = Math.max(this.element.width, this.element.height) / 2;
        
        for (let x = 0; x < gridSize; x++) {
            this.deformationField[x] = [];
            for (let y = 0; y < gridSize; y++) {
                const worldX = (x / (gridSize - 1) - 0.5) * this.element.width;
                const worldY = (y / (gridSize - 1) - 0.5) * this.element.height;
                const distance = Math.sqrt(worldX * worldX + worldY * worldY);
                
                this.deformationField[x][y] = {
                    strength: Math.max(0, 1 - distance / maxRadius),
                    baseX: worldX,
                    baseY: worldY,
                    currentX: worldX,
                    currentY: worldY
                };
            }
        }
    }

    updateGyroscopicPhysics(deltaTime) {
        const vitesse = this.getParameter('vitesse');
        const intensite = this.getParameter('intensite');
        const precessionParam = this.getParameter('precession');
        const stabilisation = this.getParameter('stabilisation');
        
        // Mise à jour du spin principal
        const targetSpinVelocity = vitesse * 0.02;
        const spinAcceleration = (targetSpinVelocity - this.gyroscope.spin.velocity) * 0.01;
        this.gyroscope.spin.velocity += spinAcceleration * deltaTime;
        this.gyroscope.spin.angle += this.gyroscope.spin.velocity * deltaTime;
        
        // Calcul du moment angulaire
        const L = this.gyroscope.inertia * this.gyroscope.spin.velocity;
        this.gyroscope.angularMomentum.z = L * intensite;
        
        // Précession gyroscopique
        this.updatePrecession(deltaTime, precessionParam, L);
        
        // Nutation (oscillation de l'axe)
        this.updateNutation(deltaTime);
        
        // Application des perturbations externes
        this.applyExternalPerturbations(deltaTime, stabilisation);
        
        // Effet de stabilisation gyroscopique
        this.applyGyroscopicStabilization(deltaTime, stabilisation);
        
        // Mise à jour du champ de déformation
        this.updateDeformationField(deltaTime);
    }

    updatePrecession(deltaTime, precessionParam, angularMomentum) {
        // Précession due au couple gravitationnel simulé
        const precessionRate = precessionParam * 0.001 * (1 / Math.max(angularMomentum, 0.1));
        this.gyroscope.precession.velocity = precessionRate;
        this.gyroscope.precession.angle += this.gyroscope.precession.velocity * deltaTime;
        
        // Rayon de précession variable
        const baseRadius = 15;
        this.gyroscope.precession.radius = baseRadius * (1 + precessionParam * 0.5);
    }

    updateNutation(deltaTime) {
        // Nutation comme oscillation de l'axe de rotation
        this.gyroscope.nutation.angle += this.gyroscope.nutation.frequency * deltaTime;
        
        // Amplitude variable selon la vitesse de rotation
        const spinStability = Math.min(this.gyroscope.spin.velocity * 10, 1);
        this.gyroscope.nutation.amplitude = 2 * (1 - spinStability * 0.7);
    }

    applyExternalPerturbations(deltaTime, stabilisation) {
        const perturbationLevel = this.getParameter('perturbations');
        
        // Générer nouvelles perturbations aléatoirement
        if (Math.random() < perturbationLevel * 0.02) {
            this.activateRandomPerturbation();
        }
        
        // Traiter perturbations actives
        for (let perturbation of this.perturbationSources) {
            if (!perturbation.active) continue;
            
            perturbation.duration += deltaTime;
            if (perturbation.duration > perturbation.maxDuration) {
                perturbation.active = false;
                continue;
            }
            
            // Calcul de la force de perturbation
            const ageRatio = 1 - (perturbation.duration / perturbation.maxDuration);
            const forceIntensity = perturbation.strength * ageRatio;
            
            // Application selon le type
            switch (perturbation.type) {
                case 'vibration':
                    const vibration = Math.sin(this.temps * perturbation.frequency + perturbation.phase);
                    this.gyroscope.precession.radius += vibration * forceIntensity * 5;
                    break;
                    
                case 'impact':
                    // Choc ponctuel affectant la nutation
                    this.gyroscope.nutation.amplitude += forceIntensity * 3;
                    this.gyroscope.spin.velocity *= (1 - forceIntensity * 0.1);
                    break;
                    
                case 'magnetic':
                    // Force magnétique affectant la précession
                    this.gyroscope.precession.velocity += forceIntensity * 0.001;
                    break;
            }
            
            // Enregistrer vecteur de force pour visualisation
            this.forceVectors.push({
                x: perturbation.direction.x * forceIntensity * 50,
                y: perturbation.direction.y * forceIntensity * 50,
                intensity: forceIntensity,
                type: perturbation.type,
                life: 100
            });
        }
        
        // Effet de stabilisation résistant aux perturbations
        const stabilizationFactor = stabilisation * 0.02;
        this.gyroscope.precession.radius *= (1 - stabilizationFactor);
        this.gyroscope.nutation.amplitude *= (1 - stabilizationFactor);
    }

    activateRandomPerturbation() {
        const availablePerturbations = this.perturbationSources.filter(p => !p.active);
        if (availablePerturbations.length === 0) return;
        
        const perturbation = availablePerturbations[Math.floor(Math.random() * availablePerturbations.length)];
        perturbation.active = true;
        perturbation.duration = 0;
        
        // Randomiser direction
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI * 2;
        perturbation.direction.x = Math.cos(angle1) * Math.sin(angle2);
        perturbation.direction.y = Math.sin(angle1) * Math.sin(angle2);
        perturbation.direction.z = Math.cos(angle2);
    }

    applyGyroscopicStabilization(deltaTime, stabilisation) {
        // Couple de redressement gyroscopique
        const gyroscopicTorque = this.gyroscope.angularMomentum.z * stabilisation;
        
        // Résistance aux changements d'orientation
        const resistance = gyroscopicTorque * 0.001;
        
        // Application à la précession (résistance au basculement)
        this.gyroscope.precession.velocity *= (1 - resistance);
        
        // Stabilisation de la nutation
        this.gyroscope.nutation.amplitude *= (1 - resistance * 0.5);
    }

    updateDeformationField(deltaTime) {
        const gyroForce = this.gyroscope.spin.velocity * this.getParameter('intensite');
        
        for (let x = 0; x < this.deformationField.length; x++) {
            for (let y = 0; y < this.deformationField[x].length; y++) {
                const field = this.deformationField[x][y];
                
                // Déformation centrifuge
                const distance = Math.sqrt(field.baseX * field.baseX + field.baseY * field.baseY);
                const centrifugalForce = gyroForce * field.strength * 0.1;
                
                if (distance > 1) {
                    const deformX = (field.baseX / distance) * centrifugalForce;
                    const deformY = (field.baseY / distance) * centrifugalForce;
                    
                    field.currentX = field.baseX + deformX;
                    field.currentY = field.baseY + deformY;
                } else {
                    field.currentX = field.baseX;
                    field.currentY = field.baseY;
                }
            }
        }
    }

    updateForceVectors(deltaTime) {
        // Mettre à jour et nettoyer les vecteurs de force
        for (let i = this.forceVectors.length - 1; i >= 0; i--) {
            const vector = this.forceVectors[i];
            vector.life -= deltaTime;
            
            if (vector.life <= 0) {
                this.forceVectors.splice(i, 1);
            } else {
                vector.intensity *= 0.98; // Fade out
            }
        }
    }

    getRotationMatrix3D() {
        // Matrice de rotation 3D combinée
        const spinAngle = this.gyroscope.spin.angle;
        const precessionAngle = this.gyroscope.precession.angle;
        const nutationOffset = this.gyroscope.nutation.amplitude * 
                              Math.sin(this.gyroscope.nutation.angle);
        
        // Rotation composée: précession -> nutation -> spin
        const cacheKey = `${Math.floor(spinAngle * 100)}_${Math.floor(precessionAngle * 100)}_${Math.floor(nutationOffset * 100)}`;
        
        if (this.transformCache.has(cacheKey)) {
            return this.transformCache.get(cacheKey);
        }
        
        const cos_p = Math.cos(precessionAngle);
        const sin_p = Math.sin(precessionAngle);
        const cos_s = Math.cos(spinAngle);
        const sin_s = Math.sin(spinAngle);
        const nutation = nutationOffset * 0.1;
        
        const matrix = {
            m11: cos_p * cos_s - sin_p * sin_s * Math.cos(nutation),
            m12: -cos_p * sin_s - sin_p * cos_s * Math.cos(nutation),
            m21: sin_p * cos_s + cos_p * sin_s * Math.cos(nutation),
            m22: -sin_p * sin_s + cos_p * cos_s * Math.cos(nutation),
            tx: this.gyroscope.precession.radius * sin_p,
            ty: this.gyroscope.precession.radius * Math.sin(nutation)
        };
        
        this.transformCache.set(cacheKey, matrix);
        return matrix;
    }

    renderGyroscopeRings(ctx) {
        ctx.save();
        
        for (let ring of this.gyroRings) {
            const matrix = this.getRotationMatrix3D();
            const wobble = ring.wobble + this.gyroscope.nutation.amplitude * 0.1;
            
            ctx.save();
            ctx.translate(this.centerX, this.centerY);
            
            // Application transformation gyroscopique
            if (ring.axis === 'x') {
                ctx.transform(matrix.m11, matrix.m12, matrix.m21 * 0.3, matrix.m22, 0, wobble * 2);
            } else {
                ctx.transform(matrix.m11 * 0.3, matrix.m12, matrix.m21, matrix.m22, wobble * 2, 0);
            }
            
            // Rendu de l'anneau
            ctx.strokeStyle = `rgba(100, 150, 200, ${ring.opacity})`;
            ctx.lineWidth = ring.thickness;
            ctx.beginPath();
            ctx.arc(0, 0, ring.radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Marqueurs sur l'anneau pour visualiser la rotation
            const markerCount = 8;
            for (let i = 0; i < markerCount; i++) {
                const angle = (i / markerCount) * Math.PI * 2 + ring.rotationOffset;
                const x = Math.cos(angle) * ring.radius;
                const y = Math.sin(angle) * ring.radius;
                
                ctx.fillStyle = `rgba(150, 180, 220, ${ring.opacity * 0.8})`;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        }
        
        ctx.restore();
    }

    renderForceVectors(ctx) {
        if (this.forceVectors.length === 0) return;
        
        ctx.save();
        
        for (let vector of this.forceVectors) {
            const alpha = vector.intensity;
            if (alpha < 0.1) continue;
            
            ctx.save();
            ctx.translate(this.centerX, this.centerY);
            
            // Couleur selon le type de force
            let color;
            switch (vector.type) {
                case 'vibration': color = `rgba(255, 200, 100, ${alpha})`; break;
                case 'impact': color = `rgba(255, 100, 100, ${alpha})`; break;
                case 'magnetic': color = `rgba(100, 100, 255, ${alpha})`; break;
                default: color = `rgba(200, 200, 200, ${alpha})`;
            }
            
            // Vecteur de force
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(vector.x, vector.y);
            ctx.stroke();
            
            // Pointe de flèche
            const angle = Math.atan2(vector.y, vector.x);
            const arrowLength = 8;
            
            ctx.beginPath();
            ctx.moveTo(vector.x, vector.y);
            ctx.lineTo(
                vector.x - arrowLength * Math.cos(angle - 0.5),
                vector.y - arrowLength * Math.sin(angle - 0.5)
            );
            ctx.moveTo(vector.x, vector.y);
            ctx.lineTo(
                vector.x - arrowLength * Math.cos(angle + 0.5),
                vector.y - arrowLength * Math.sin(angle + 0.5)
            );
            ctx.stroke();
            
            ctx.restore();
        }
        
        ctx.restore();
    }

    renderAxisIndicators(ctx) {
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        
        const matrix = this.getRotationMatrix3D();
        
        // Axe de rotation principal (Z)
        ctx.strokeStyle = `rgba(100, 255, 100, 0.6)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -60);
        ctx.lineTo(0, 60);
        ctx.stroke();
        
        // Axe de précession (Y projeté)
        const precessionLength = 50;
        ctx.strokeStyle = `rgba(255, 100, 100, 0.5)`;
        ctx.beginPath();
        ctx.moveTo(-precessionLength * matrix.m21, -precessionLength * matrix.m22);
        ctx.lineTo(precessionLength * matrix.m21, precessionLength * matrix.m22);
        ctx.stroke();
        
        // Centre de masse
        ctx.fillStyle = 'rgba(255, 255, 100, 0.8)';
        ctx.beginPath();
        ctx.arc(matrix.tx, matrix.ty, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    renderDeformationGrid(ctx) {
        if (this.getParameter('intensite') < 0.5) return;
        
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = 'rgba(100, 150, 200, 0.4)';
        ctx.lineWidth = 1;
        
        // Grille déformée montrant les forces centrifuges
        const gridSize = this.deformationField.length;
        
        // Lignes horizontales
        for (let y = 0; y < gridSize; y++) {
            ctx.beginPath();
            for (let x = 0; x < gridSize; x++) {
                const field = this.deformationField[x][y];
                if (x === 0) {
                    ctx.moveTo(field.currentX, field.currentY);
                } else {
                    ctx.lineTo(field.currentX, field.currentY);
                }
            }
            ctx.stroke();
        }
        
        // Lignes verticales
        for (let x = 0; x < gridSize; x++) {
            ctx.beginPath();
            for (let y = 0; y < gridSize; y++) {
                const field = this.deformationField[x][y];
                if (y === 0) {
                    ctx.moveTo(field.currentX, field.currentY);
                } else {
                    ctx.lineTo(field.currentX, field.currentY);
                }
            }
            ctx.stroke();
        }
        
        ctx.restore();
    }

    render(ctx, element, deltaTime) {
        // Rendu grille de déformation (arrière-plan)
        this.renderDeformationGrid(ctx);
        
        // Rendu anneaux gyroscopiques
        this.renderGyroscopeRings(ctx);
        
        // Rendu indicateurs d'axes
        this.renderAxisIndicators(ctx);
        
        // Rendu de l'image avec transformation gyroscopique
        ctx.save();
        
        const matrix = this.getRotationMatrix3D();
        ctx.translate(this.centerX, this.centerY);
        
        // Application de la transformation gyroscopique complète
        ctx.transform(
            matrix.m11, matrix.m12,
            matrix.m21, matrix.m22,
            matrix.tx, matrix.ty
        );
        
        // Effet de glow gyroscopique
        const glowIntensity = this.gyroscope.spin.velocity * 5;
        ctx.shadowColor = `rgba(100, 150, 255, ${Math.min(glowIntensity, 0.8)})`;
        ctx.shadowBlur = 10;
        
        // Rendu de l'image centrée
        ctx.drawImage(element.image || this.canvas,
                     element.x, element.y, element.width, element.height,
                     -element.width / 2, -element.height / 2,
                     element.width, element.height);
        
        ctx.restore();
        
        // Rendu vecteurs de force (premier plan)
        this.renderForceVectors(ctx);
    }

    update(deltaTime) {
        this.temps += deltaTime;
        
        this.updateGyroscopicPhysics(deltaTime);
        this.updateForceVectors(deltaTime);
        
        // Mise à jour wobble des anneaux
        for (let ring of this.gyroRings) {
            ring.wobble = Math.sin(this.temps * 0.003 + ring.rotationOffset) * 2;
            ring.rotationOffset += 0.001 * deltaTime;
        }
        
        // Nettoyage cache périodique
        if (this.temps % 2000 < deltaTime) {
            this.transformCache.clear();
        }
    }

    destroy() {
        this.gyroscope = null;
        this.perturbationSources = [];
        this.forceVectors = [];
        this.deformationField = [];
        this.gyroRings = [];
        this.transformCache.clear();
        this.transformCache = null;
        this.matrixStack = [];
    }
    
  }
};
