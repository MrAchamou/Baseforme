// magnetic pull.effect.js

export const magnetic pullEffect = {
  id: "magnetic pull",
  name: "Magnetic pull",
  
  description: `## 🧲 EFFET 43 : MAGNETIC PULL

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Magnetic_Pull  
**ID UNIQUE :** electromagnetic-attraction-field-043  
**NOM AFFICHAGE :** Champ d'Attraction Électromagnétique  

**DESCRIPTION :** Attraction magnétique vers sources invisibles avec déformation de l'image. Étirement progressif vers les pôles magnétiques, lignes de champ visibles, particules métalliques de l'image qui réagissent différemment. Inversions de polarité créant des mouvements de rejet/attraction cycliques.

**SPÉCIFICATIONS ADDICTION :**
- Déformations suivant les lignes de champ magnétique
- Particules métalliques simulées réagissant indépendamment
- Inversions de polarité créant des renversements dramatiques
- Champ magnétique visualisé par ondulations de l'espace

--------------------------------------------------------------------------

🧲 MAGNETIC PULL CRÉÉ !
✨ EFFET ÉLECTROMAGNÉTIQUE HYPNOTIQUE
⚡ ATTRACTION MAGNÉTIQUE RÉALISTE :

Pôles magnétiques invisibles : 3 sources avec polarités opposées
Déformation progressive : Étirement de l'image suivant lignes de champ
Forces inversement proportionnelles : Physique magnétique authentique
Grille de déformation : 20x20 points calculant forces locales

🎯 SPÉCIFICATIONS ADDICTION INTÉGRÉES
🔄 INVERSIONS DRAMATIQUES (30% IMPRÉVISIBILITÉ) :

Renversements de polarité : Attraction ↔ Répulsion cycliques
Ondes de choc visuelles : Particules émises lors des inversions
Transition smooth : Évite les à-coups, maintient la fluidité

🌊 LIGNES DE CHAMP VISIBLES :

Courbes paraboliques animées entre pôles opposés
Intensité variable : Brillance selon force du champ
Ondulations spatiales : 8 zones de distorsion de l'espace

⚙️ PARTICULES MÉTALLIQUES INDÉPENDANTES :

15 particules simulées dans l'image avec masse/charge différentes
Physique individuelle : Chaque particule réagit selon ses propriétés
3 types métalliques : Argent, or, cuivre avec comportements distincts

🚀 MICRO-ANIMATIONS RÉCOMPENSANTES

Auras des pôles pulsantes selon intensité
Brillance métallique des particules avec reflets
Déformation respiratoire de l'élément principal
Traînées magnétiques suivant les mouvements

🔬 PERFORMANCE OPTIMISÉE

Object pooling : 30 particules réutilisées
Grille de déformation calculée une fois par frame
Régénération périodique des lignes de champ (évite surcharge)

L'effet crée une attraction électromagnétique viscérale avec renversements dramatiques !`,

  category: "image",
  subcategory: "style",
  intensity: "medium",
  performance: "medium",

  compatibility: {
    text: false,
    image: true,
    logo: false,
    background: true
  },

  tags: ["image", "aura", "magnetic pull"],

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
    gif: "magnetic pull.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'electromagnetic-attraction-field-043',
            name: 'Champ d\'Attraction Électromagnétique',
            category: 'IMAGE',
            version: '1.0',
            performance: 'medium',
            parameters: {
                intensite: { type: 'range', min: 0.1, max: 2.5, default: 1 },
                vitesse: { type: 'range', min: 0.2, max: 3, default: 1 },
                forceChamp: { type: 'range', min: 0.3, max: 2, default: 1 },
                couleurChamp: { type: 'color', default: '#ff4d6d' },
                polariteFreq: { type: 'range', min: 0.1, max: 2, default: 0.8 }
            }
        });

        // Variables electromagnétiques core
        this.temps = 0;
        this.polarite = 1; // 1 = attraction, -1 = répulsion
        this.nextPolaritySwitch = 0;
        this.transitionPolarite = 1;
        
        // Pôles magnétiques invisibles
        this.polesMagnetiques = [
            { 
                x: 150, y: 200, 
                force: 1, polarite: 1,
                phase: 0, drift: { x: 0, y: 0 }
            },
            { 
                x: 650, y: 400, 
                force: 0.8, polarite: -1,
                phase: Math.PI, drift: { x: 0, y: 0 }
            },
            { 
                x: 400, y: 100, 
                force: 0.6, polarite: 1,
                phase: Math.PI/2, drift: { x: 0, y: 0 }
            }
        ];
        
        // Grille de déformation magnétique
        this.gridSize = 20;
        this.deformationGrid = [];
        this.initializeDeformationGrid();
        
        // Particules métalliques simulées
        this.particulesMetalliques = [];
        this.maxParticulesMetal = 30;
        this.particlePool = [];
        
        // Lignes de champ magnétique
        this.lignesChamp = [];
        this.generateFieldLines();
        
        // Ondulations spatiales
        this.ondulaionsEspace = [];
        for(let i = 0; i < 8; i++) {
            this.ondulaionsEspace.push({
                x: Math.random() * 800,
                y: Math.random() * 600,
                rayon: Math.random() * 100 + 50,
                frequence: Math.random() * 2 + 0.5,
                amplitude: Math.random() * 10 + 5,
                phase: Math.random() * Math.PI * 2
            });
        }
        
        // Pool particules pour performance
        for(let i = 0; i < this.maxParticulesMetal; i++) {
            this.particlePool.push({
                x: 0, y: 0, vx: 0, vy: 0,
                taille: 0, masse: 0, charge: 0,
                opacity: 0, couleur: '#ffffff',
                active: false, life: 0
            });
        }
        
        // Matrice de transformation pour déformation
        this.transformMatrix = {
            scaleX: 1, scaleY: 1,
            skewX: 0, skewY: 0,
            rotation: 0
        };
    }

    initializeDeformationGrid() {
        this.deformationGrid = [];
        const cols = Math.ceil(800 / this.gridSize);
        const rows = Math.ceil(600 / this.gridSize);
        
        for(let y = 0; y < rows; y++) {
            for(let x = 0; x < cols; x++) {
                this.deformationGrid.push({
                    x: x * this.gridSize,
                    y: y * this.gridSize,
                    originalX: x * this.gridSize,
                    originalY: y * this.gridSize,
                    forceX: 0,
                    forceY: 0,
                    intensity: 0
                });
            }
        }
    }

    generateFieldLines() {
        this.lignesChamp = [];
        
        // Génération lignes entre pôles
        for(let i = 0; i < this.polesMagnetiques.length; i++) {
            const pole1 = this.polesMagnetiques[i];
            
            for(let j = 0; j < this.polesMagnetiques.length; j++) {
                if(i !== j) {
                    const pole2 = this.polesMagnetiques[j];
                    
                    // Créer courbe de champ magnétique
                    const ligne = {
                        start: pole1,
                        end: pole2,
                        points: [],
                        intensity: Math.abs(pole1.force * pole2.force),
                        visible: pole1.polarite !== pole2.polarite
                    };
                    
                    // Calculer points de la courbe de champ
                    for(let t = 0; t <= 1; t += 0.1) {
                        const x = this.interpolateMagneticField(pole1.x, pole2.x, t);
                        const y = this.interpolateMagneticField(pole1.y, pole2.y, t);
                        
                        ligne.points.push({ x, y, t });
                    }
                    
                    this.lignesChamp.push(ligne);
                }
            }
        }
    }

    interpolateMagneticField(start, end, t) {
        // Courbe parabolique simulant lignes de champ
        const linear = start + (end - start) * t;
        const curve = Math.sin(t * Math.PI) * 20 * (Math.random() - 0.5);
        return linear + curve;
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.element = element;
        
        // Initialiser particules métalliques dans l'élément
        this.initializeMetalParticles(element);
        
        // Planifier première inversion de polarité
        this.nextPolaritySwitch = Math.random() * 3000 + 2000;
    }

    initializeMetalParticles(element) {
        // Simuler particules métalliques dans l'image
        for(let i = 0; i < 15; i++) {
            const particle = this.getParticle();
            if(particle) {
                particle.x = element.x + Math.random() * element.width;
                particle.y = element.y + Math.random() * element.height;
                particle.vx = 0;
                particle.vy = 0;
                particle.taille = Math.random() * 2 + 1;
                particle.masse = Math.random() * 0.8 + 0.2;
                particle.charge = (Math.random() > 0.5 ? 1 : -1) * Math.random();
                particle.opacity = Math.random() * 0.6 + 0.4;
                particle.couleur = ['#c0c0c0', '#ffd700', '#ff6b35'][Math.floor(Math.random() * 3)];
                particle.life = 0;
                
                this.particulesMetalliques.push(particle);
            }
        }
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

    // Calcul forces magnétiques sur point
    calculateMagneticForce(x, y) {
        let totalForceX = 0;
        let totalForceY = 0;
        let totalIntensity = 0;
        
        for(let pole of this.polesMagnetiques) {
            const dx = x - pole.x;
            const dy = y - pole.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if(distance > 0) {
                // Force magnétique inversement proportionnelle au carré
                const forceMagnitude = (pole.force * this.parameters.forceChamp * 1000) / 
                                     (distance * distance + 100);
                
                // Direction basée sur polarité
                const direction = pole.polarite * this.polarite * this.transitionPolarite;
                
                totalForceX += (dx / distance) * forceMagnitude * direction;
                totalForceY += (dy / distance) * forceMagnitude * direction;
                totalIntensity += Math.abs(forceMagnitude);
            }
        }
        
        return { 
            x: totalForceX, 
            y: totalForceY, 
            intensity: totalIntensity 
        };
    }

    // Inversion de polarité dramatique
    handlePolaritySwitch(deltaTime) {
        if(this.temps * 1000 > this.nextPolaritySwitch) {
            // Déclenchement inversion
            this.polarite *= -1;
            this.transitionPolarite = 0;
            
            // Nouvelle planification
            this.nextPolaritySwitch = this.temps * 1000 + 
                                    (Math.random() * 4000 + 2000) / this.parameters.polariteFreq;
            
            // Effet visuel d'inversion
            this.createPolarityShockwave();
        }
        
        // Transition smooth de polarité
        if(this.transitionPolarite < 1) {
            this.transitionPolarite = Math.min(1, this.transitionPolarite + deltaTime * 0.003);
        }
    }

    createPolarityShockwave() {
        // Créer onde de choc lors inversion
        for(let pole of this.polesMagnetiques) {
            for(let i = 0; i < 8; i++) {
                const particle = this.getParticle();
                if(particle) {
                    const angle = (i / 8) * Math.PI * 2;
                    particle.x = pole.x;
                    particle.y = pole.y;
                    particle.vx = Math.cos(angle) * 5;
                    particle.vy = Math.sin(angle) * 5;
                    particle.taille = 3;
                    particle.opacity = 0.8;
                    particle.couleur = this.parameters.couleurChamp;
                    particle.life = 0;
                    
                    this.particulesMetalliques.push(particle);
                }
            }
        }
    }

    render(ctx, element, deltaTime) {
        ctx.save();
        
        // === GESTION INVERSION POLARITÉ ===
        this.handlePolaritySwitch(deltaTime);
        
        // === CALCUL DÉFORMATION MAGNÉTIQUE ===
        this.updateDeformationGrid();
        
        // === RENDU CHAMP MAGNÉTIQUE VISUEL ===
        this.renderMagneticField(ctx);
        
        // === ONDULATIONS SPATIALES ===
        this.renderSpaceDistortions(ctx);
        
        // === DÉFORMATION ET RENDU ÉLÉMENT ===
        this.renderDeformedElement(ctx, element);
        
        // === PARTICULES MÉTALLIQUES ===
        this.updateMetalParticles(deltaTime);
        this.renderMetalParticles(ctx);
        
        ctx.restore();
    }

    updateDeformationGrid() {
        // Calculer déformation pour chaque point de la grille
        for(let point of this.deformationGrid) {
            const force = this.calculateMagneticForce(point.originalX, point.originalY);
            
            // Appliquer déformation
            const deformFactor = this.parameters.intensite * 0.1;
            point.x = point.originalX + force.x * deformFactor;
            point.y = point.originalY + force.y * deformFactor;
            point.forceX = force.x;
            point.forceY = force.y;
            point.intensity = force.intensity;
        }
    }

    renderMagneticField(ctx) {
        ctx.save();
        
        // Rendu lignes de champ magnétique
        for(let ligne of this.lignesChamp) {
            if(ligne.visible) {
                const opacity = ligne.intensity * 0.3 * 
                               (0.7 + Math.sin(this.temps * 2) * 0.3);
                
                ctx.strokeStyle = `${this.parameters.couleurChamp}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.lineWidth = 1 + ligne.intensity * 0.5;
                
                ctx.beginPath();
                for(let i = 0; i < ligne.points.length; i++) {
                    const point = ligne.points[i];
                    const waveOffset = Math.sin(this.temps * 3 + point.t * Math.PI * 2) * 5;
                    
                    if(i === 0) {
                        ctx.moveTo(point.x + waveOffset, point.y);
                    } else {
                        ctx.lineTo(point.x + waveOffset, point.y);
                    }
                }
                ctx.stroke();
            }
        }
        
        // Rendu pôles magnétiques (invisibles mais avec aura)
        for(let pole of this.polesMagnetiques) {
            const intensity = pole.force * (0.8 + Math.sin(this.temps * 1.5 + pole.phase) * 0.2);
            const rayon = 15 + intensity * 10;
            
            // Aura du pôle
            const gradient = ctx.createRadialGradient(
                pole.x, pole.y, 0,
                pole.x, pole.y, rayon
            );
            
            const couleurPole = pole.polarite > 0 ? this.parameters.couleurChamp : '#4dabf7';
            gradient.addColorStop(0, `${couleurPole}20`);
            gradient.addColorStop(1, `${couleurPole}00`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(pole.x, pole.y, rayon, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }

    renderSpaceDistortions(ctx) {
        ctx.save();
        
        // Ondulations de l'espace dues au champ magnétique
        for(let ondulation of this.ondulaionsEspace) {
            const phase = this.temps * ondulation.frequence + ondulation.phase;
            const amplitude = ondulation.amplitude * this.parameters.intensite;
            const rayon = ondulation.rayon + Math.sin(phase) * amplitude;
            
            ctx.strokeStyle = `${this.parameters.couleurChamp}15`;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 10]);
            
            ctx.beginPath();
            ctx.arc(ondulation.x, ondulation.y, rayon, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.setLineDash([]);
        ctx.restore();
    }

    renderDeformedElement(ctx, element) {
        ctx.save();
        
        // Calculer déformation moyenne de l'élément
        const centerX = element.x + element.width / 2;
        const centerY = element.y + element.height / 2;
        const force = this.calculateMagneticForce(centerX, centerY);
        
        // Appliquer transformation magnétique
        ctx.translate(centerX, centerY);
        
        // Étirement vers les pôles
        const stretchFactor = 1 + force.intensity * 0.0001 * this.parameters.intensite;
        const skewX = force.x * 0.00005;
        const skewY = force.y * 0.00005;
        
        ctx.transform(
            stretchFactor, skewY,
            skewX, stretchFactor,
            force.x * 0.01, force.y * 0.01
        );
        
        // Effet de distorsion électromagnétique
        const waveDistortion = Math.sin(this.temps * 2) * force.intensity * 0.00002;
        ctx.scale(1 + waveDistortion, 1 - waveDistortion * 0.5);
        
        // Rendu élément avec effet magnétique
        const magneticGlow = force.intensity * 0.001;
        ctx.shadowColor = this.parameters.couleurChamp;
        ctx.shadowBlur = magneticGlow * 20;
        
        ctx.globalAlpha = element.opacity || 1;
        
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

    updateMetalParticles(deltaTime) {
        // Update particules métalliques indépendamment
        for(let i = this.particulesMetalliques.length - 1; i >= 0; i--) {
            const particle = this.particulesMetalliques[i];
            
            // Forces magnétiques sur particule
            const force = this.calculateMagneticForce(particle.x, particle.y);
            
            // Accélération basée sur masse et charge
            const ax = (force.x * particle.charge) / particle.masse;
            const ay = (force.y * particle.charge) / particle.masse;
            
            // Update vélocité et position
            particle.vx += ax * deltaTime * 0.01;
            particle.vy += ay * deltaTime * 0.01;
            
            // Friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            particle.x += particle.vx * deltaTime * 0.1;
            particle.y += particle.vy * deltaTime * 0.1;
            
            // Vieillissement
            particle.life += deltaTime * 0.001;
            
            // Suppression particules sortant des limites ou trop vieilles
            if(particle.x < -50 || particle.x > 850 || 
               particle.y < -50 || particle.y > 650 || 
               particle.life > 10) {
                particle.active = false;
                this.particulesMetalliques.splice(i, 1);
            }
        }
    }

    renderMetalParticles(ctx) {
        ctx.save();
        
        for(let particle of this.particulesMetalliques) {
            const alpha = particle.opacity * (1 - particle.life * 0.1);
            
            if(alpha > 0) {
                ctx.fillStyle = `${particle.couleur}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
                
                // Traînée magnétique
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.taille, 0, Math.PI * 2);
                ctx.fill();
                
                // Effet de brillance métallique
                ctx.fillStyle = `#ffffff${Math.floor(alpha * 0.5 * 255).toString(16).padStart(2, '0')}`;
                ctx.beginPath();
                ctx.arc(particle.x - 0.5, particle.y - 0.5, particle.taille * 0.3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.restore();
    }

    update(deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse * 0.001;
        
        // Update positions pôles magnétiques (mouvement subtil)
        for(let pole of this.polesMagnetiques) {
            pole.drift.x += Math.sin(this.temps * 0.5 + pole.phase) * 0.1;
            pole.drift.y += Math.cos(this.temps * 0.3 + pole.phase) * 0.1;
            
            pole.x += pole.drift.x * deltaTime * 0.01;
            pole.y += pole.drift.y * deltaTime * 0.01;
            
            // Limites
            pole.x = Math.max(100, Math.min(700, pole.x));
            pole.y = Math.max(100, Math.min(500, pole.y));
        }
        
        // Update ondulations spatiales
        for(let ondulation of this.ondulaionsEspace) {
            ondulation.x += Math.sin(this.temps + ondulation.phase) * 0.2;
            ondulation.y += Math.cos(this.temps * 0.7 + ondulation.phase) * 0.15;
        }
        
        // Régénération lignes de champ périodique
        if(Math.floor(this.temps * 10) % 50 === 0) {
            this.generateFieldLines();
        }
    }

    destroy() {
        // Nettoyage mémoire
        this.particlePool.length = 0;
        this.particulesMetalliques.length = 0;
        this.deformationGrid.length = 0;
        this.lignesChamp.length = 0;
        this.ondulaionsEspace.length = 0;
        this.polesMagnetiques.length = 0;
        
        this.canvas = null;
        this.element = null;
    }
    
  }
};
