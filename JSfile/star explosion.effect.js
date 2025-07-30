// star explosion.effect.js

export const star explosionEffect = {
  id: "star explosion",
  name: "Star explosion",
  
  description: `## 💫 EFFET 39 : STAR EXPLOSION

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Star_Explosion  
**ID UNIQUE :** supernova-stellar-explosion-039  
**NOM AFFICHAGE :** Explosion Stellaire Supernova  

**DESCRIPTION :** Explosion stellaire avec onde de choc cosmique. Expansion explosive depuis le centre, onde de choc visible déformant l'espace-temps, particules stellaires éjectées à vitesse lumière simulée. Couleurs cosmiques évolutives avec spectre d'émission stellaire.

**SPÉCIFICATIONS ADDICTION :**
- Onde de choc déformant l'espace-temps visuel
- Éjection de matière stellaire avec vélocités variables
- Couleurs cosmiques évoluant selon la température d'explosion
- Formation de nébuleuse résiduelle avec gaz ionisés

-------------------------------------------------------------------

💫 STAR EXPLOSION EFFECT COMPLET !
✨ CARACTÉRISTIQUES COSMIQUES HYPNOTIQUES :
🌟 CYCLE D'EXPLOSION STELLAIRE RÉALISTE :

Pre-Nova (0-15%) : Accumulation d'énergie avec instabilité croissante
Explosion (15-25%) : Flash aveuglant et éjection de matière
Expansion (25-70%) : Onde de choc et refroidissement progressif
Nébuleuse (70-100%) : Formation de gaz ionisés résiduels

🔥 SYSTÈME DE PARTICULES STELLAIRES MULTI-TYPES :

Noyaux lourds : Éléments forgés dans l'étoile
Plasma chaud : Matière ionisée haute énergie
Électrons libres : Particules légères rapides
Photons gamma : Rayonnement électromagnétique

🌈 SPECTRE D'ÉMISSION ÉVOLUTIF :

Température dynamique : 2000K → 50000K → refroidissement
Couleurs réalistes : Spectre stellaire authentique
Transitions fluides : Interpolation thermodynamique
Variations organiques : Pulsations et instabilités

💥 ONDE DE CHOC SPATIO-TEMPORELLE :

Expansion radiale : Vitesse lumière simulée
Distorsion visuelle : Déformation de l'espace-temps
Intensité décroissante : Atténuation réaliste
Ondulations concentriques : Effets de résonance

🌌 NÉBULEUSE RÉSIDUELLE ÉVOLUTIVE :

Gaz ionisés : Hydrogène, Oxygène, Hélium, Soufre
Formation progressive : Activation aléatoire des particules
Couleurs d'émission : Spectre d'ionisation authentique
Croissance organique : Expansion et dilution

🎯 FACTEURS D'ADDICTION INTÉGRÉS :
🔄 Imprévisibilité Contrôlée (30%) :

Instabilité pré-nova : Vibrations aléatoires du centre
Éjection chaotique : Angles et vitesses variables
Formation nébulaire : Activation stochastique
Variations thermiques : Fluctuations de température

🎭 Révélations Progressives :

Accumulation d'énergie visible et crescendo
Flash d'explosion créant suspense
Refroidissement graduel révélant détails
Nébuleuse émergente récompensant l'attention

⚡ Optimisations Performance :

Object pooling : Réutilisation des particules
Rendu conditionnel : Skip si alpha < 0.05
Canvas temporaires : Effets complexes optimisés
Cycles de vie : Gestion mémoire intelligente

🎮 PARAMÈTRES CONFIGURABLES :

Vitesse : Contrôle temporel global
Intensité : Force de l'explosion
Amplitude : Rayon de l'onde de choc
Particules : Densité de matière éjectée
Onde : Intensité de distorsion
Nébuleuse : Formation de gaz résiduels

Cet effet recrée une supernova authentique avec physics stellaire réaliste, créant une expérience cosmique immersive qui maintient l'attention à travers ses 4 phases distinctes et ses révélations progressives !`,

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

  tags: ["image", "plasma", "phase", "explosion", "star explosion"],

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
    gif: "star explosion.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'supernova-stellar-explosion-039',
            name: 'Explosion Stellaire Supernova',
            category: 'image',
            version: '1.0',
            performance: 'high',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1.2 },
                intensite: { type: 'range', min: 0, max: 1, default: 0.8 },
                amplitude: { type: 'range', min: 50, max: 200, default: 120 },
                particules: { type: 'range', min: 100, max: 500, default: 300 },
                onde: { type: 'range', min: 0.2, max: 1, default: 0.7 },
                nebuleuse: { type: 'range', min: 0.3, max: 0.9, default: 0.6 }
            }
        });

        // Temporisation et cycles
        this.temps = 0;
        this.cycleExplosion = 6000; // 6 secondes par cycle complet
        this.phaseExplosion = 'pre-nova'; // pre-nova, explosion, expansion, nebuleuse
        
        // Centre d'explosion dynamique
        this.centreX = 400;
        this.centreY = 300;
        this.centreOriginalX = 400;
        this.centreOriginalY = 300;
        
        // Système de particules stellaires multi-types
        this.particulesStellaires = [];
        this.maxParticules = 400;
        this.particulesNebuleuse = [];
        this.maxParticulesNebuleuse = 200;
        
        // Onde de choc et déformation spatio-temporelle
        this.ondeChoc = {
            rayon: 0,
            intensite: 0,
            vitesse: 0,
            distorsion: 0
        };
        
        // Système de couleurs cosmiques évolutives
        this.spectreStellaire = {
            temperature: 50000, // Kelvin initial
            phase: 0,
            couleurs: []
        };
        
        // Accumulation d'énergie pré-explosion
        this.energieAccumulee = 0;
        this.instabiliteStellaire = 0;
        
        // Nébuleuse résiduelle
        this.gazIonises = [];
        this.formationNebuleuse = 0;
        
        // Canvas temporaires pour effets complexes
        this.canvasDistorsion = null;
        this.ctxDistorsion = null;
        this.canvasGlow = null;
        this.ctxGlow = null;
    }

    initialize(canvas, element) {
        // Position du centre basée sur l'élément
        this.centreX = element.x + element.width / 2;
        this.centreY = element.y + element.height / 2;
        this.centreOriginalX = this.centreX;
        this.centreOriginalY = this.centreY;
        
        // Canvas pour effets de distorsion
        this.canvasDistorsion = document.createElement('canvas');
        this.canvasDistorsion.width = canvas.width;
        this.canvasDistorsion.height = canvas.height;
        this.ctxDistorsion = this.canvasDistorsion.getContext('2d');
        
        // Canvas pour effets de glow
        this.canvasGlow = document.createElement('canvas');
        this.canvasGlow.width = canvas.width;
        this.canvasGlow.height = canvas.height;
        this.ctxGlow = this.canvasGlow.getContext('2d');
        
        // Initialisation des systèmes de particules
        this.initParticulesStellaires();
        this.initSpectreStellaire();
        this.initGazIonises();
    }

    initParticulesStellaires() {
        this.particulesStellaires = [];
        const nombreParticules = Math.floor(this.parameters.particules.value);
        
        for (let i = 0; i < nombreParticules; i++) {
            this.particulesStellaires.push(this.creerParticuleStellaire());
        }
    }

    creerParticuleStellaire() {
        const angle = Math.random() * Math.PI * 2;
        const vitesseBase = 0.5 + Math.random() * 2;
        
        return {
            x: this.centreX,
            y: this.centreY,
            angle: angle,
            vitesse: vitesseBase,
            vitesseOriginale: vitesseBase,
            acceleration: 1 + Math.random() * 3,
            masse: 0.1 + Math.random() * 0.9,
            taille: 1 + Math.random() * 4,
            tailleOriginale: 1 + Math.random() * 4,
            vie: 0,
            maxVie: 3 + Math.random() * 4,
            couleur: this.getCouleurStellaire(Math.random()),
            type: this.getTypeParticule(),
            energie: Math.random(),
            ionisation: 0,
            trainee: [],
            maxTrainee: 15
        };
    }

    getTypeParticule() {
        const rand = Math.random();
        if (rand < 0.3) return 'noyau-lourd';      // Éléments lourds
        if (rand < 0.6) return 'plasma-chaud';     // Plasma haute énergie  
        if (rand < 0.8) return 'electron-libre';   // Électrons libres
        return 'photon-gamma';                     // Rayons gamma
    }

    initSpectreStellaire() {
        // Spectre d'émission stellaire réaliste
        this.spectreStellaire.couleurs = [
            { temp: 50000, r: 155, g: 176, b: 255 }, // Très chaud - bleu
            { temp: 30000, r: 162, g: 192, b: 255 }, // Chaud - bleu-blanc
            { temp: 10000, r: 255, g: 244, b: 234 }, // Blanc
            { temp: 6000, r: 255, g: 214, b: 170 },  // Jaune (soleil)
            { temp: 4000, r: 255, g: 204, b: 111 },  // Orange
            { temp: 3000, r: 255, g: 166, b: 81 },   // Rouge-orange
            { temp: 2000, r: 255, g: 71, b: 0 }      // Rouge froid
        ];
    }

    initGazIonises() {
        this.gazIonises = [];
        for (let i = 0; i < this.maxParticulesNebuleuse; i++) {
            this.gazIonises.push({
                x: this.centreX + (Math.random() - 0.5) * 100,
                y: this.centreY + (Math.random() - 0.5) * 100,
                vitesseX: (Math.random() - 0.5) * 0.5,
                vitesseY: (Math.random() - 0.5) * 0.5,
                taille: 2 + Math.random() * 8,
                opacity: 0,
                couleur: this.getCouleurNebuleuse(),
                ionisation: Math.random(),
                actif: false
            });
        }
    }

    getCouleurStellaire(energie) {
        const temp = 2000 + energie * 48000; // 2000K à 50000K
        return this.interpolateCouleurTemperature(temp);
    }

    getCouleurNebuleuse() {
        const couleurs = [
            'rgba(255, 100, 100, 0.6)', // Hydrogène alpha
            'rgba(100, 255, 100, 0.4)', // Oxygène III
            'rgba(100, 100, 255, 0.5)', // Hélium
            'rgba(255, 255, 100, 0.3)'  // Soufre
        ];
        return couleurs[Math.floor(Math.random() * couleurs.length)];
    }

    interpolateCouleurTemperature(temp) {
        const couleurs = this.spectreStellaire.couleurs;
        
        for (let i = 0; i < couleurs.length - 1; i++) {
            if (temp >= couleurs[i + 1].temp && temp <= couleurs[i].temp) {
                const t = (temp - couleurs[i + 1].temp) / (couleurs[i].temp - couleurs[i + 1].temp);
                const r = Math.floor(couleurs[i + 1].r + t * (couleurs[i].r - couleurs[i + 1].r));
                const g = Math.floor(couleurs[i + 1].g + t * (couleurs[i].g - couleurs[i + 1].g));
                const b = Math.floor(couleurs[i + 1].b + t * (couleurs[i].b - couleurs[i + 1].b));
                return `rgb(${r}, ${g}, ${b})`;
            }
        }
        return 'rgb(255, 255, 255)';
    }

    // Noise simplifié pour variations organiques
    noise(x, y = 0, z = 0) {
        const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
        return (n - Math.floor(n));
    }

    update(deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse.value;
        
        // Calcul de la phase d'explosion
        const cyclePos = (this.temps % this.cycleExplosion) / this.cycleExplosion;
        this.updatePhaseExplosion(cyclePos, deltaTime);
        
        // Mise à jour des systèmes selon la phase
        this.updateOndeChoc(deltaTime);
        this.updateParticulesStellaires(deltaTime);
        this.updateSpectreStellaire(cyclePos);
        this.updateNebuleuse(deltaTime, cyclePos);
        
        // Instabilité du centre stellaire
        this.updateInstabiliteStellaire(cyclePos);
    }

    updatePhaseExplosion(cyclePos, deltaTime) {
        if (cyclePos < 0.15) {
            this.phaseExplosion = 'pre-nova';
            this.energieAccumulee = cyclePos / 0.15;
        } else if (cyclePos < 0.25) {
            this.phaseExplosion = 'explosion';
            this.energieAccumulee = 1;
        } else if (cyclePos < 0.7) {
            this.phaseExplosion = 'expansion';
            this.energieAccumulee = Math.max(0, 1 - (cyclePos - 0.25) / 0.45);
        } else {
            this.phaseExplosion = 'nebuleuse';
            this.formationNebuleuse = (cyclePos - 0.7) / 0.3;
        }
    }

    updateOndeChoc(deltaTime) {
        const dt = deltaTime * 0.001;
        
        if (this.phaseExplosion === 'explosion' || this.phaseExplosion === 'expansion') {
            // Expansion de l'onde de choc
            this.ondeChoc.vitesse = 200 + this.parameters.amplitude.value * 2;
            this.ondeChoc.rayon += this.ondeChoc.vitesse * dt;
            this.ondeChoc.intensite = Math.max(0, 1 - this.ondeChoc.rayon / 400);
            
            // Distorsion spatio-temporelle
            this.ondeChoc.distorsion = this.ondeChoc.intensite * this.parameters.onde.value;
        } else if (this.phaseExplosion === 'pre-nova') {
            // Reset pour nouveau cycle
            if (this.ondeChoc.rayon > 500) {
                this.ondeChoc.rayon = 0;
                this.ondeChoc.intensite = 0;
                this.ondeChoc.distorsion = 0;
                this.resetParticules();
            }
        }
    }

    updateParticulesStellaires(deltaTime) {
        const dt = deltaTime * 0.001;
        const intensite = this.parameters.intensite.value;
        
        this.particulesStellaires.forEach(particule => {
            if (this.phaseExplosion === 'explosion' || this.phaseExplosion === 'expansion') {
                // Accélération explosive
                particule.vitesse = particule.vitesseOriginale * particule.acceleration * intensite;
                
                // Mouvement en éjection radiale
                particule.x += Math.cos(particule.angle) * particule.vitesse * dt * 100;
                particule.y += Math.sin(particule.angle) * particule.vitesse * dt * 100;
                
                // Évolution de la taille selon l'énergie
                const distanceCentre = Math.sqrt(
                    Math.pow(particule.x - this.centreX, 2) + Math.pow(particule.y - this.centreY, 2)
                );
                particule.taille = particule.tailleOriginale * (1 + particule.energie * distanceCentre * 0.01);
                
                // Gestion de la traînée
                particule.trainee.push({ x: particule.x, y: particule.y, alpha: 1 });
                if (particule.trainee.length > particule.maxTrainee) {
                    particule.trainee.shift();
                }
                
                // Diminution de l'alpha des traînées
                particule.trainee.forEach((point, index) => {
                    point.alpha = (index + 1) / particule.trainee.length;
                });
                
                particule.vie += dt;
            }
            
            // Réinitialisation si particule trop éloignée
            if (particule.x < -100 || particule.x > 900 || particule.y < -100 || particule.y > 700) {
                this.resetParticule(particule);
            }
        });
    }

    updateSpectreStellaire(cyclePos) {
        // Évolution de la température selon la phase
        if (this.phaseExplosion === 'pre-nova') {
            this.spectreStellaire.temperature = 10000 + this.energieAccumulee * 40000;
        } else if (this.phaseExplosion === 'explosion') {
            this.spectreStellaire.temperature = 50000;
        } else if (this.phaseExplosion === 'expansion') {
            this.spectreStellaire.temperature = Math.max(3000, 50000 * (1 - cyclePos));
        } else {
            this.spectreStellaire.temperature = 3000 + Math.sin(this.temps * 0.005) * 1000;
        }
    }

    updateNebuleuse(deltaTime, cyclePos) {
        if (this.phaseExplosion === 'nebuleuse') {
            this.gazIonises.forEach(gaz => {
                if (!gaz.actif && Math.random() < 0.02) {
                    gaz.actif = true;
                    gaz.opacity = 0;
                }
                
                if (gaz.actif) {
                    gaz.opacity = Math.min(0.8, gaz.opacity + deltaTime * 0.0005);
                    gaz.x += gaz.vitesseX * deltaTime * 0.01;
                    gaz.y += gaz.vitesseY * deltaTime * 0.01;
                    
                    // Croissance de la nébuleuse
                    const croissance = this.formationNebuleuse * this.parameters.nebuleuse.value;
                    gaz.taille = (2 + Math.random() * 8) * (1 + croissance);
                }
            });
        }
    }

    updateInstabiliteStellaire(cyclePos) {
        if (this.phaseExplosion === 'pre-nova') {
            // Vibrations de plus en plus intenses
            const intensiteVibration = this.energieAccumulee * 10;
            this.centreX = this.centreOriginalX + Math.sin(this.temps * 0.02) * intensiteVibration;
            this.centreY = this.centreOriginalY + Math.cos(this.temps * 0.025) * intensiteVibration;
            this.instabiliteStellaire = this.energieAccumulee;
        } else {
            this.centreX = this.centreOriginalX;
            this.centreY = this.centreOriginalY;
            this.instabiliteStellaire = 0;
        }
    }

    resetParticules() {
        this.particulesStellaires.forEach(particule => {
            this.resetParticule(particule);
        });
    }

    resetParticule(particule) {
        particule.x = this.centreX;
        particule.y = this.centreY;
        particule.vie = 0;
        particule.vitesse = particule.vitesseOriginale;
        particule.taille = particule.tailleOriginale;
        particule.trainee = [];
        particule.angle = Math.random() * Math.PI * 2;
    }

    render(ctx, element, deltaTime) {
        const { width, height } = ctx.canvas;
        
        ctx.save();
        
        // Nettoyage des canvas temporaires
        this.ctxDistorsion.clearRect(0, 0, width, height);
        this.ctxGlow.clearRect(0, 0, width, height);
        
        // Rendu selon la phase d'explosion
        if (this.phaseExplosion === 'pre-nova') {
            this.renderPreNova(ctx, element);
        } else if (this.phaseExplosion === 'explosion') {
            this.renderExplosion(ctx, element);
        } else if (this.phaseExplosion === 'expansion') {
            this.renderExpansion(ctx, element);
        } else {
            this.renderNebuleuse(ctx, element);
        }
        
        // Rendu de l'onde de choc
        this.renderOndeChoc(ctx);
        
        // Rendu des particules stellaires
        this.renderParticulesStellaires(ctx);
        
        // Application des effets de distorsion
        this.applyDistorsionEffects(ctx, width, height);
        
        ctx.restore();
    }

    renderPreNova(ctx, element) {
        ctx.save();
        
        // Étoile instable avec pulsations
        const pulsation = 1 + Math.sin(this.temps * 0.01) * 0.3 * this.instabiliteStellaire;
        const couleurStelaire = this.interpolateCouleurTemperature(this.spectreStellaire.temperature);
        
        // Glow externe intensifiant
        const glowRadius = 30 * pulsation * this.instabiliteStellaire;
        const gradient = ctx.createRadialGradient(
            this.centreX, this.centreY, 0,
            this.centreX, this.centreY, glowRadius
        );
        gradient.addColorStop(0, couleurStelaire);
        gradient.addColorStop(0.3, couleurStelaire.replace('rgb', 'rgba').replace(')', ', 0.8)'));
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.centreX, this.centreY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Cœur stellaire
        ctx.fillStyle = couleurStelaire;
        ctx.beginPath();
        ctx.arc(this.centreX, this.centreY, 8 * pulsation, 0, Math.PI * 2);
        ctx.fill();
        
        // Élément avec distorsion lumineuse croissante
        if (element.content) {
            ctx.globalAlpha = element.opacity * (1 - this.instabiliteStellaire * 0.3);
            ctx.translate(element.x + element.width/2, element.y + element.height/2);
            ctx.rotate(element.rotation);
            
            if (typeof element.content === 'string') {
                ctx.fillStyle = couleurStelaire;
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(element.content, 0, 0);
            }
        }
        
        ctx.restore();
    }

    renderExplosion(ctx, element) {
        ctx.save();
        
        // Flash aveuglant initial
        const flashIntensity = Math.max(0, 1 - this.ondeChoc.rayon / 50);
        if (flashIntensity > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity * 0.8})`;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        
        // Cœur d'explosion ultra-lumineux
        const coreGradient = ctx.createRadialGradient(
            this.centreX, this.centreY, 0,
            this.centreX, this.centreY, 50
        );
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        coreGradient.addColorStop(0.3, this.interpolateCouleurTemperature(50000).replace('rgb', 'rgba').replace(')', ', 0.9)'));
        coreGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(this.centreX, this.centreY, 50, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    renderExpansion(ctx, element) {
        // Rémanence de l'explosion avec cooling
        const coolingFactor = Math.max(0.1, this.energieAccumulee);
        const couleurExpansion = this.interpolateCouleurTemperature(this.spectreStellaire.temperature);
        
        // Sphère en expansion
        const expansionGradient = ctx.createRadialGradient(
            this.centreX, this.centreY, 0,
            this.centreX, this.centreY, this.ondeChoc.rayon
        );
        expansionGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        expansionGradient.addColorStop(0.7, couleurExpansion.replace('rgb', 'rgba').replace(')', `, ${coolingFactor * 0.3})`));
        expansionGradient.addColorStop(1, couleurExpansion.replace('rgb', 'rgba').replace(')', ', 0)'));
        
        ctx.fillStyle = expansionGradient;
        ctx.beginPath();
        ctx.arc(this.centreX, this.centreY, this.ondeChoc.rayon, 0, Math.PI * 2);
        ctx.fill();
    }

    renderNebuleuse(ctx, element) {
        ctx.save();
        
        // Rendu des gaz ionisés
        this.gazIonises.forEach(gaz => {
            if (!gaz.actif || gaz.opacity < 0.1) return;
            
            const gradient = ctx.createRadialGradient(
                gaz.x, gaz.y, 0,
                gaz.x, gaz.y, gaz.taille
            );
            gradient.addColorStop(0, gaz.couleur.replace('0.', `${gaz.opacity * 0.8}.`));
            gradient.addColorStop(1, gaz.couleur.replace('0.', '0.'));
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(gaz.x, gaz.y, gaz.taille, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Élément avec effet nébulaire
        if (element.content) {
            ctx.globalAlpha = element.opacity * 0.7;
            ctx.translate(element.x + element.width/2, element.y + element.height/2);
            ctx.rotate(element.rotation);
            
            if (typeof element.content === 'string') {
                const nebularGlow = ctx.createRadialGradient(-50, -20, 0, 0, 0, 80);
                nebularGlow.addColorStop(0, 'rgba(100, 200, 255, 0.8)');
                nebularGlow.addColorStop(0.5, 'rgba(255, 150, 100, 0.6)');
                nebularGlow.addColorStop(1, 'rgba(200, 100, 255, 0.4)');
                
                ctx.fillStyle = nebularGlow;
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(element.content, 0, 0);
            }
        }
        
        ctx.restore();
    }

    renderOndeChoc(ctx) {
        if (this.ondeChoc.intensite < 0.1) return;
        
        ctx.save();
        
        // Onde de choc visible
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.ondeChoc.intensite * 0.8})`;
        ctx.lineWidth = 3 * this.ondeChoc.intensite;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.arc(this.centreX, this.centreY, this.ondeChoc.rayon, 0, Math.PI * 2);
        ctx.stroke();
        
        // Deuxième onde plus faible
        ctx.strokeStyle = `rgba(100, 200, 255, ${this.ondeChoc.intensite * 0.4})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.centreX, this.centreY, this.ondeChoc.rayon * 1.2, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
    }

    renderParticulesStellaires(ctx) {
        ctx.save();
        
        this.particulesStellaires.forEach(particule => {
            if (particule.vie <= 0) return;
            
            const vieFactor = Math.max(0, 1 - particule.vie / particule.maxVie);
            const alpha = vieFactor * this.parameters.intensite.value;
            
            if (alpha < 0.05) return;
            
            // Traînée de la particule
            if (particule.trainee.length > 1) {
                ctx.strokeStyle = `${particule.couleur.replace('rgb', 'rgba').replace(')', `, ${alpha * 0.3})`)}`;
                ctx.lineWidth = particule.taille * 0.5;
                ctx.beginPath();
                particule.trainee.forEach((point, index) => {
                    const trailAlpha = point.alpha * alpha * 0.3;
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                ctx.stroke();
            }
            
            // Particule principale avec glow
            const particleGlow = ctx.createRadialGradient(
                particule.x, particule.y, 0,
                particule.x, particule.y, particule.taille * 2
            );
            particleGlow.addColorStop(0, `${particule.couleur.replace('rgb', 'rgba').replace(')', `, ${alpha})`)}`);
            particleGlow.addColorStop(0.5, `${particule.couleur.replace('rgb', 'rgba').replace(')', `, ${alpha * 0.6})`)}`);
            particleGlow.addColorStop(1, `${particule.couleur.replace('rgb', 'rgba').replace(')', ', 0)')}`);
            
            ctx.fillStyle = particleGlow;
            ctx.beginPath();
            ctx.arc(particule.x, particule.y, particule.taille * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Noyau solide
            ctx.fillStyle = particule.couleur;
            ctx.beginPath();
            ctx.arc(particule.x, particule.y, particule.taille * 0.5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.restore();
    }

    applyDistorsionEffects(ctx, width, height) {
        if (this.ondeChoc.distorsion < 0.1) return;
        
        // Effet de distorsion spatio-temporelle simplifié
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = this.ondeChoc.distorsion * 0.3;
        
        // Ondulations concentriques
        for (let r = 0; r < this.ondeChoc.rayon; r += 20) {
            const distortionFactor = Math.sin(r * 0.1 + this.temps * 0.01) * this.ondeChoc.distorsion;
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - r/this.ondeChoc.rayon) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(this.centreX, this.centreY, r + distortionFactor * 10, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    destroy() {
        this.particulesStellaires = [];
        this.particulesNebuleuse = [];
        this.gazIonises = [];
        
        if (this.canvasDistorsion) {
            this.canvasDistorsion = null;
            this.ctxDistorsion = null;
        }
        
        if (this.canvasGlow) {
            this.canvasGlow = null;
            this.ctxGlow = null;
        }
    }
    
  }
};
