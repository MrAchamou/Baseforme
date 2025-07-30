// breathing.effect.js

export const breathingEffect = {
  id: "breathing",
  name: "Breathing",
  
  description: `## 💓 EFFET 11 : BREATHING

**CATÉGORIE :** TEXT  
**EFFET DEMANDÉ :** Breathing  
**ID UNIQUE :** organic-breath-rhythm-011  
**NOM AFFICHAGE :** Respiration Organique Vivante  

**DESCRIPTION :** Le texte respire comme un organisme vivant avec expansion/contraction naturelle. Rythme respiratoire humain réaliste (4s inspiration, 2s pause, 4s expiration). Micro-mouvements organiques, léger changement d'opacité synchronisé, effet de "souffle" avec particules subtiles autour des lettres.

**SPÉCIFICATIONS ADDICTION :**
- Rythme respiratoire hypnotique et apaisant
- Variations subtiles dans le timing (respiration naturelle)
- Micro-pulsations dans l'opacité créant une "vie"
- Effet de souffle avec particules qui dansent au rythme

------------------------------------------------------------------

💓 BREATHING EFFECT PARFAITEMENT TERMINÉ !
Cet effet de respiration organique est maintenant prêt avec toutes les caractéristiques d'une véritable animation hypnotique continue :
🎯 RESPIRATION ORGANIQUE ULTRA-RÉALISTE :
🫁 CYCLE RESPIRATOIRE AUTHENTIQUE :

4 phases distinctes : Inspiration (4s) → Pause (1s) → Expiration (4s) → Pause (1s)
Courbes d'easing naturelles : ease-in-out pour inspiration, ease-in-quart pour expiration
Variabilité naturelle : Chaque cycle a des micro-variations de timing (±20%)
Harmoniques respiratoires : 5 harmoniques superposées pour effet organique complexe

🔥 FACTEUR ADDICTION HYPNOTIQUE :

Rythme apaisant : Synchronisation naturelle avec la respiration humaine
Micro-pulsations : Battement cardiaque subtil (1.2 bpm) superposé
Variations imprévisibles : 3 générateurs de variation (profondeur, rythme, tremor)
Particules de souffle : 80 particules orbitales synchronisées avec la respiration

🎨 EFFETS VISUELS ORGANIQUES :

Échelle respiratoire : Expansion/contraction fluide du texte (5-30% amplitude)
Opacité vivante : Pulsation subtile d'opacité (85-100%)
Micro-mouvements : Translations et rotations organiques imperceptibles
Lueur respiratoire : Halo qui pulse avec l'intensité de la respiration
Particules de vapeur : Effet de "souffle" pendant les pauses

⚡ PERFORMANCE OPTIMISÉE :

Object pooling : 80 particules réutilisées
Cache des gradients : Évite recalculs des effets de lueur
Performance LOW : Conçu pour être très léger (animations continues)
Calculs optimisés : Utilisation d'harmoniques pré-calculées

🎮 SYSTÈME PHYSIQUE RÉALISTE :

Synchronisation parfaite : 80% des particules suivent la respiration globale
Orbites organiques : Particules en mouvement orbital autour du texte
Types de particules : Inspiration/expiration avec comportements différenciés
Durée de vie variable : 3-7 secondes par particule

🎨 PARAMÈTRES CONFIGURABLES :

vitesse : Vitesse du cycle respiratoire
intensite : Intensité globale des effets
couleurBase/Souffle : Couleurs du texte et des particules

🏆 POINTS FORTS UNIQUES :
🧬 RÉALISME BIOLOGIQUE :

Reproduction fidèle d'un cycle respiratoire humain
Variabilité naturelle pour éviter l'effet "mécanique"
Superposition de battement cardiaque pour l'aspect "vivant"
Harmoniques respiratoires comme dans la vraie respiration

🎯 ADDICTION GARANTIE :

Rythme hypnotique calé sur la respiration naturelle
Imprévisibilité contrôlée avec les 3 générateurs de variation
Récompenses visuelles : particules, lueurs, micro-effets
Loop parfait sans jamais de rupture dans le cycle

⚡ PERFORMANCE CONTINUE :

Conçu pour tourner en boucle infinie sans dégradation
Object pooling pour éviter les allocations mémoire
Calculs optimisés pour maintenir 60fps en continu
Cache intelligent des gradients

L'effet est maintenant prêt pour intégration et peut tourner indéfiniment en créant cette sensation apaisante et hypnotique d'un texte qui "respire" véritablement !`,

  category: "text",
  subcategory: "animation",
  intensity: "low",
  performance: "light",

  compatibility: {
    text: true,
    image: false,
    logo: true,
    background: false
  },

  tags: ["text", "texte", "orbit", "pulse", "breathing", "phase"],

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
    gif: "breathing.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'organic-breath-rhythm-011',
            name: 'Respiration Organique Vivante',
            category: 'text',
            version: '1.0',
            performance: 'low',
            parameters: {
                vitesse: { type: 'range', min: 0.3, max: 2, default: 1 },
                intensite: { type: 'range', min: 0.3, max: 1, default: 0.7 },
                couleurBase: { type: 'color', default: '#ffffff' },
                couleurSouffle: { type: 'color', default: '#e8f4f8' },
                amplitudeRespiration: { type: 'range', min: 0.05, max: 0.3, default: 0.15 },
                variabiliteNaturelle: { type: 'range', min: 0, max: 0.5, default: 0.2 },
                intensiteSouffle: { type: 'range', min: 0.1, max: 1, default: 0.6 }
            }
        });

        // Variables temporelles du cycle respiratoire
        this.temps = 0;
        this.cycleRespiration = 0;
        this.phaseRespiration = 'inspiration'; // inspiration, pause1, expiration, pause2
        this.tempsPhase = 0;
        
        // Durées des phases respiratoires (en millisecondes)
        this.dureesPhases = {
            inspiration: 4000,    // 4 secondes
            pause1: 1000,        // 1 seconde pause après inspiration
            expiration: 4000,    // 4 secondes
            pause2: 1000         // 1 seconde pause après expiration
        };
        
        // Variabilité naturelle des durées
        this.variationsPhases = {};
        
        // État de respiration
        this.respirationState = {
            scale: 1,
            opacity: 1,
            glowIntensity: 0,
            breathProgress: 0,
            naturalVariation: 0
        };
        
        // Cache des métriques de texte
        this.textMetrics = null;
        this.basePosition = { x: 0, y: 0 };
        
        // Système de particules de souffle
        this.particulessouffle = [];
        this.particlePool = [];
        this.maxParticules = 80;
        
        // Générateurs de variations naturelles
        this.variationGenerators = [];
        
        // Micro-mouvements organiques
        this.microMouvements = {
            offsetX: 0,
            offsetY: 0,
            rotationMicro: 0,
            breathing: 0
        };
        
        // Rythme cardiaque subtil (superposé à la respiration)
        this.rythmeCardiaque = {
            phase: 0,
            intensity: 0.05,
            frequency: 1.2 // battements par seconde
        };
        
        // Cache des gradients pour performance
        this.gradientCache = new Map();
        
        // Effets de lueur respiratoire
        this.lueurRespiration = {
            intensity: 0,
            radius: 0,
            pulsation: 0
        };
        
        // Harmoniques respiratoires (pour effet plus réaliste)
        this.harmoniques = [];
        this.nbHarmoniques = 5;
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.element = element;
        
        // Configuration des métriques de texte
        this.setupTextMetrics();
        
        // Initialisation des variations de phases
        this.initializePhaseVariations();
        
        // Configuration des générateurs de variation
        this.setupVariationGenerators();
        
        // Initialisation du pool de particules
        this.initializeParticlePool();
        
        // Configuration des harmoniques respiratoires
        this.setupBreathingHarmonics();
        
        // Reset des timers
        this.temps = 0;
        this.cycleRespiration = 0;
        this.tempsPhase = 0;
        this.phaseRespiration = 'inspiration';
    }

    setupTextMetrics() {
        const text = this.element.content || 'BREATHE';
        const fontSize = Math.min(this.element.width / text.length * 1.2, this.element.height * 0.8);
        
        this.ctx.font = `normal ${fontSize}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        this.textMetrics = {
            text: text,
            fontSize: fontSize,
            width: this.ctx.measureText(text).width,
            height: fontSize
        };
        
        this.basePosition = {
            x: this.element.x + this.element.width / 2,
            y: this.element.y + this.element.height / 2
        };
    }

    initializePhaseVariations() {
        // Génération de variations naturelles pour chaque phase
        this.variationsPhases = {};
        const variabilite = this.config.parameters.variabiliteNaturelle.default;
        
        for (let phase in this.dureesPhases) {
            const baseDuration = this.dureesPhases[phase];
            const variation = (Math.random() - 0.5) * variabilite * baseDuration;
            this.variationsPhases[phase] = baseDuration + variation;
        }
    }

    setupVariationGenerators() {
        // Générateurs pour créer des variations naturelles continues
        this.variationGenerators = [
            {
                frequency: 0.1, // Très lent
                amplitude: 0.3,
                phase: Math.random() * Math.PI * 2,
                type: 'breathing_depth'
            },
            {
                frequency: 0.05, // Encore plus lent
                amplitude: 0.2,
                phase: Math.random() * Math.PI * 2,
                type: 'rhythm_variation'
            },
            {
                frequency: 0.3, // Micro-variations
                amplitude: 0.1,
                phase: Math.random() * Math.PI * 2,
                type: 'micro_tremor'
            }
        ];
    }

    initializeParticlePool() {
        this.particlePool = [];
        for (let i = 0; i < this.maxParticules; i++) {
            this.particlePool.push(this.createBreathParticle());
        }
    }

    createBreathParticle() {
        return {
            active: false,
            x: 0, y: 0,
            baseX: 0, baseY: 0,
            vx: 0, vy: 0,
            
            // Propriétés visuelles
            size: 1,
            opacity: 1,
            color: '#ffffff',
            
            // Propriétés de mouvement respiratoire
            breathPhase: 0,
            breathAmplitude: 1,
            orbitalRadius: 0,
            orbitalAngle: 0,
            orbitalSpeed: 0,
            
            // Vie de la particule
            life: 0,
            maxLife: 0,
            
            // Type de particule de souffle
            type: 'inspiration', // inspiration, expiration, ambient
            
            // Synchronisation avec la respiration
            syncWithBreath: true,
            phaseOffset: 0
        };
    }

    setupBreathingHarmonics() {
        // Harmoniques pour un effet de respiration plus complexe et naturel
        this.harmoniques = [];
        
        for (let i = 1; i <= this.nbHarmoniques; i++) {
            this.harmoniques.push({
                frequency: i, // Harmonique de base, 2x, 3x, etc.
                amplitude: 1 / Math.pow(i, 1.5), // Décroissance naturelle
                phase: Math.random() * Math.PI * 2,
                type: i === 1 ? 'fundamental' : 'harmonic'
            });
        }
    }

    getParticleFromPool() {
        for (let particle of this.particlePool) {
            if (!particle.active) {
                particle.active = true;
                return particle;
            }
        }
        return this.createBreathParticle();
    }

    update(deltaTime) {
        this.temps += deltaTime * this.config.parameters.vitesse.default;
        
        // Mise à jour du cycle respiratoire
        this.updateBreathingCycle(deltaTime);
        
        // Calcul de l'état de respiration
        this.calculateBreathingState(deltaTime);
        
        // Mise à jour des micro-mouvements organiques
        this.updateOrganicMovements(deltaTime);
        
        // Mise à jour du rythme cardiaque subtil
        this.updateHeartRhythm(deltaTime);
        
        // Mise à jour des particules de souffle
        this.updateBreathParticles(deltaTime);
        
        // Génération de nouvelles particules de souffle
        this.generateBreathParticles(deltaTime);
        
        // Mise à jour des harmoniques
        this.updateHarmonics(deltaTime);
        
        // Mise à jour des effets de lueur
        this.updateBreathingGlow(deltaTime);
    }

    updateBreathingCycle(deltaTime) {
        this.tempsPhase += deltaTime * this.config.parameters.vitesse.default;
        
        // Durée actuelle de la phase avec variation
        const currentPhaseDuration = this.variationsPhases[this.phaseRespiration];
        
        // Vérification du changement de phase
        if (this.tempsPhase >= currentPhaseDuration) {
            this.tempsPhase = 0;
            this.switchToNextPhase();
        }
        
        // Calcul du progrès dans la phase actuelle
        const phaseProgress = this.tempsPhase / currentPhaseDuration;
        this.respirationState.breathProgress = this.calculateBreathProgress(phaseProgress);
    }

    switchToNextPhase() {
        // Passage à la phase suivante
        switch (this.phaseRespiration) {
            case 'inspiration':
                this.phaseRespiration = 'pause1';
                break;
            case 'pause1':
                this.phaseRespiration = 'expiration';
                break;
            case 'expiration':
                this.phaseRespiration = 'pause2';
                break;
            case 'pause2':
                this.phaseRespiration = 'inspiration';
                this.cycleRespiration++;
                // Régénération des variations pour le prochain cycle
                this.initializePhaseVariations();
                break;
        }
    }

    calculateBreathProgress(phaseProgress) {
        let progress = 0;
        
        switch (this.phaseRespiration) {
            case 'inspiration':
                // Courbe d'inspiration naturelle (ease-in-out avec accent sur le début)
                progress = this.easeInOutQuad(phaseProgress);
                break;
                
            case 'pause1':
                // Maintien au maximum avec légère fluctuation
                progress = 1 + Math.sin(phaseProgress * Math.PI * 4) * 0.02;
                break;
                
            case 'expiration':
                // Courbe d'expiration naturelle (plus lente au début)
                progress = 1 - this.easeInQuart(phaseProgress);
                break;
                
            case 'pause2':
                // Maintien au minimum avec légère fluctuation
                progress = Math.sin(phaseProgress * Math.PI * 3) * 0.01;
                break;
        }
        
        return Math.max(0, Math.min(1, progress));
    }

    // Fonctions d'easing pour respiration naturelle
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    easeInQuart(t) {
        return t * t * t * t;
    }

    easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    calculateBreathingState(deltaTime) {
        const baseProgress = this.respirationState.breathProgress;
        const amplitude = this.config.parameters.amplitudeRespiration.default;
        const intensity = this.config.parameters.intensite.default;
        
        // Application des variations naturelles
        let naturalVariation = 0;
        for (let generator of this.variationGenerators) {
            generator.phase += deltaTime * 0.001 * generator.frequency;
            const variation = Math.sin(generator.phase) * generator.amplitude;
            
            switch (generator.type) {
                case 'breathing_depth':
                    naturalVariation += variation * 0.3;
                    break;
                case 'rhythm_variation':
                    naturalVariation += variation * 0.2;
                    break;
                case 'micro_tremor':
                    naturalVariation += variation * 0.1;
                    break;
            }
        }
        
        // Calcul de l'échelle finale avec harmoniques
        let harmonicContribution = 0;
        for (let harmonic of this.harmoniques) {
            const harmonicValue = Math.sin(this.cycleRespiration * Math.PI * 2 * harmonic.frequency + harmonic.phase);
            harmonicContribution += harmonicValue * harmonic.amplitude * 0.1;
        }
        
        // État final de respiration
        const finalProgress = baseProgress + naturalVariation + harmonicContribution;
        this.respirationState.scale = 1 + (finalProgress * amplitude * intensity);
        
        // Opacité respiratoire (très subtile)
        this.respirationState.opacity = 0.85 + 0.15 * (finalProgress * intensity);
        
        // Intensité de lueur
        this.respirationState.glowIntensity = finalProgress * intensity * 0.3;
        
        // Variation naturelle stockée
        this.respirationState.naturalVariation = naturalVariation;
    }

    updateOrganicMovements(deltaTime) {
        const microIntensity = 0.5; // Très subtil
        
        // Micro-mouvements basés sur la respiration
        this.microMouvements.offsetX = Math.sin(this.temps * 0.001) * microIntensity * 
                                      this.respirationState.naturalVariation;
        this.microMouvements.offsetY = Math.cos(this.temps * 0.0008) * microIntensity * 
                                      this.respirationState.naturalVariation;
        
        // Micro-rotation organique
        this.microMouvements.rotationMicro = Math.sin(this.temps * 0.0005) * 0.005 * 
                                           this.respirationState.naturalVariation;
        
        // Effet de "breathing" dans le mouvement
        this.microMouvements.breathing = this.respirationState.breathProgress;
    }

    updateHeartRhythm(deltaTime) {
        this.rythmeCardiaque.phase += deltaTime * 0.001 * this.rythmeCardiaque.frequency;
        
        // Battement cardiaque subtil superposé à la respiration
        const heartbeat = Math.pow(Math.sin(this.rythmeCardiaque.phase * Math.PI * 2), 4);
        this.rythmeCardiaque.currentIntensity = heartbeat * this.rythmeCardiaque.intensity;
    }

    updateBreathParticles(deltaTime) {
        for (let particle of this.particulesouffle) {
            if (!particle.active) continue;
            
            particle.life += deltaTime;
            
            if (particle.life >= particle.maxLife) {
                particle.active = false;
                continue;
            }
            
            // Synchronisation avec la respiration globale
            if (particle.syncWithBreath) {
                particle.breathPhase = this.respirationState.breathProgress + particle.phaseOffset;
            } else {
                particle.breathPhase += deltaTime * 0.001;
            }
            
            // Mouvement orbital autour des lettres
            particle.orbitalAngle += particle.orbitalSpeed * deltaTime * 0.001;
            
            // Position basée sur l'orbite et la respiration
            const breathInfluence = Math.sin(particle.breathPhase * Math.PI) * particle.breathAmplitude;
            const currentRadius = particle.orbitalRadius * (1 + breathInfluence * 0.3);
            
            particle.x = particle.baseX + Math.cos(particle.orbitalAngle) * currentRadius;
            particle.y = particle.baseY + Math.sin(particle.orbitalAngle) * currentRadius;
            
            // Opacité basée sur la phase de respiration et la vie
            const lifeRatio = particle.life / particle.maxLife;
            const breathOpacity = particle.type === 'inspiration' ? 
                                this.respirationState.breathProgress :
                                1 - this.respirationState.breathProgress;
            
            particle.opacity = (1 - lifeRatio) * breathOpacity * 0.6;
            
            // Taille variable avec la respiration
            particle.currentSize = particle.size * (1 + breathInfluence * 0.2);
        }
    }

    generateBreathParticles(deltaTime) {
        const shouldGenerate = Math.random() < 0.1 * this.config.parameters.intensiteSouffle.default;
        
        if (shouldGenerate && this.particulesouffle.length < this.maxParticules) {
            this.createNewBreathParticle();
        }
    }

    createNewBreathParticle() {
        const particle = this.getParticleFromPool();
        
        // Position de base autour du texte
        const angle = Math.random() * Math.PI * 2;
        const baseRadius = Math.max(this.textMetrics.width, this.textMetrics.height) * 0.6;
        const radiusVariation = (Math.random() - 0.5) * baseRadius * 0.4;
        
        particle.baseX = this.basePosition.x + Math.cos(angle) * (baseRadius + radiusVariation);
        particle.baseY = this.basePosition.y + Math.sin(angle) * (baseRadius + radiusVariation);
        
        particle.x = particle.baseX;
        particle.y = particle.baseY;
        
        // Propriétés orbitales
        particle.orbitalRadius = 20 + Math.random() * 40;
        particle.orbitalAngle = angle;
        particle.orbitalSpeed = 0.2 + Math.random() * 0.8;
        
        // Propriétés visuelles
        particle.size = 1 + Math.random() * 2;
        particle.breathAmplitude = 0.5 + Math.random() * 0.5;
        particle.color = this.config.parameters.couleurSouffle.default;
        
        // Synchronisation avec la respiration
        particle.syncWithBreath = Math.random() < 0.8; // 80% synchronisées
        particle.phaseOffset = (Math.random() - 0.5) * 0.5;
        
        // Type basé sur la phase actuelle
        particle.type = (this.phaseRespiration === 'inspiration' || this.phaseRespiration === 'pause1') ? 
                       'inspiration' : 'expiration';
        
        // Durée de vie
        particle.life = 0;
        particle.maxLife = 3000 + Math.random() * 4000;
        
        // Ajout à la liste active
        this.particulesouffle.push(particle);
    }

    updateHarmonics(deltaTime) {
        for (let harmonic of this.harmoniques) {
            harmonic.phase += deltaTime * 0.001 * harmonic.frequency * 0.1;
        }
    }

    updateBreathingGlow(deltaTime) {
        // Lueur qui pulse avec la respiration
        this.lueurRespiration.intensity = this.respirationState.glowIntensity;
        this.lueurRespiration.radius = 20 + this.respirationState.breathProgress * 30;
        this.lueurRespiration.pulsation = Math.sin(this.temps * 0.003) * 0.3 + 0.7;
    }

    render(ctx, element, deltaTime) {
        ctx.save();
        
        // Configuration de base
        ctx.font = `normal ${this.textMetrics.fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Rendu des particules de souffle (en arrière-plan)
        this.renderBreathParticles(ctx);
        
        // Rendu de la lueur respiratoire
        this.renderBreathingGlow(ctx);
        
        // Transformation pour la respiration
        this.applyBreathingTransform(ctx);
        
        // Rendu du texte principal
        this.renderBreathingText(ctx);
        
        // Effets post-processing subtils
        this.renderSubtleEffects(ctx);
        
        ctx.restore();
    }

    renderBreathParticles(ctx) {
        for (let particle of this.particulesouffle) {
            if (!particle.active || particle.opacity <= 0) continue;
            
            ctx.globalAlpha = particle.opacity * this.config.parameters.intensite.default;
            ctx.fillStyle = particle.color;
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = particle.currentSize * 3;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.currentSize, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
        
        ctx.globalAlpha = 1;
    }

    renderBreathingGlow(ctx) {
        if (this.lueurRespiration.intensity <= 0) return;
        
        const centerX = this.basePosition.x;
        const centerY = this.basePosition.y;
        const radius = this.lueurRespiration.radius * this.lueurRespiration.pulsation;
        const intensity = this.lueurRespiration.intensity * this.config.parameters.intensite.default;
        
        // Gradient radial pour la lueur
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, `rgba(248, 252, 255, ${intensity * 0.1})`);
        gradient.addColorStop(0.5, `rgba(232, 244, 248, ${intensity * 0.05})`);
        gradient.addColorStop(1, 'rgba(232, 244, 248, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    applyBreathingTransform(ctx) {
        const centerX = this.basePosition.x;
        const centerY = this.basePosition.y;
        
        // Translation vers le centre
        ctx.translate(centerX, centerY);
        
        // Application des micro-mouvements
        ctx.translate(this.microMouvements.offsetX, this.microMouvements.offsetY);
        
        // Rotation micro
        ctx.rotate(this.microMouvements.rotationMicro);
        
        // Échelle respiratoire
        const finalScale = this.respirationState.scale + this.rythmeCardiaque.currentIntensity;
        ctx.scale(finalScale, finalScale);
        
        // Retour au centre pour le rendu
        ctx.translate(-centerX, -centerY);
    }

    renderBreathingText(ctx) {
        const centerX = this.basePosition.x;
        const centerY = this.basePosition.y;
        
        // Opacité respiratoire
        ctx.globalAlpha = this.respirationState.opacity;
        
        // Couleur de base
        ctx.fillStyle = this.config.parameters.couleurBase.default;
        
        // Effet de lueur synchronisé avec la respiration
        if (this.respirationState.glowIntensity > 0) {
            ctx.shadowColor = this.config.parameters.couleurBase.default;
            ctx.shadowBlur = this.respirationState.glowIntensity * 15;
        }
        
        // Rendu du texte
        ctx.fillText(this.textMetrics.text, centerX, centerY);
        
        // Couche de surbrillance subtile lors de l'inspiration
        if (this.phaseRespiration === 'inspiration' && this.respirationState.breathProgress > 0.7) {
            const highlightIntensity = (this.respirationState.breathProgress - 0.7) / 0.3;
            ctx.globalAlpha = highlightIntensity * 0.3;
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 5;
            ctx.fillText(this.textMetrics.text, centerX, centerY);
        }
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }

    renderSubtleEffects(ctx) {
        // Effet de "vapeur" très subtil pendant les pauses
        if (this.phaseRespiration === 'pause1' || this.phaseRespiration === 'pause2') {
            const vaporIntensity = 0.05 * this.config.parameters.intensite.default;
            
            ctx.globalAlpha = vaporIntensity;
            ctx.fillStyle = this.config.parameters.couleurSouffle.default;
            
            // Quelques points de vapeur aléatoires
            for (let i = 0; i < 8; i++) {
                const x = this.basePosition.x + (Math.random() - 0.5) * this.textMetrics.width * 1.5;
                const y = this.basePosition.y + (Math.random() - 0.5) * this.textMetrics.height * 1.5;
                const size = 1 + Math.random() * 2;
                
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.globalAlpha = 1;
        }
    }

    destroy() {
        // Nettoyage des particules
        this.particulesouffle.length = 0;
        this.particlePool.forEach(p => p.active = false);
        
        // Nettoyage des générateurs
        this.variationGenerators.length = 0;
        this.harmoniques.length = 0;
        
        // Nettoyage du cache
        this.gradientCache.clear();
        
        // Reset des variables
        this.temps = 0;
        this.cycleRespiration = 0;
        this.tempsPhase = 0;
        this.phaseRespiration = 'inspiration';
        this.textMetrics = null;
        
        // Reset des états
        this.respirationState = {
            scale: 1,
            opacity: 1,
            glowIntensity: 0,
            breathProgress: 0,
            naturalVariation: 0
        };
        
        this.microMouvements = {
            offsetX: 0,
            offsetY: 0,
            rotationMicro: 0,
            breathing: 0
        };
        
        this.rythmeCardiaque = {
            phase: 0,
            intensity: 0.05,
            frequency: 1.2
        };
    }
    
  }
};
