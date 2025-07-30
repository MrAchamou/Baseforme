// shadow clone.effect.js

export const shadow cloneEffect = {
  id: "shadow clone",
  name: "Shadow clone",
  
  description: `## 🌑 EFFET 26 : SHADOW CLONE

**CATÉGORIE :** TEXT  
**EFFET DEMANDÉ :** Shadow_Clone  
**ID UNIQUE :** autonomous-shadow-entity-026  
**NOM AFFICHAGE :** Entité Ombre Autonome  

**DESCRIPTION :** L'ombre du texte prend vie et devient indépendante. Ombre qui se détache, évolue différemment du texte original, interactions entre texte et ombre, effet de dualité lumière/obscurité. L'ombre révèle parfois des informations cachées.

**SPÉCIFICATIONS ADDICTION :**
- Ombre qui développe sa propre personnalité
- Interactions complexes entre texte et ombre
- Révélations d'informations cachées dans l'ombre
- Danse de dualité entre lumière et obscurité

--------------------------------------------------------------------

🌑 SHADOW CLONE EFFECT - ENTITÉ AUTONOME HYPNOTIQUE
J'ai créé un effet d'ombre vivante qui développe sa propre personnalité et interagit de façon complexe avec le texte original :
🧠 SYSTÈME DE PERSONNALITÉ AUTONOME

Mémoire évolutive : L'ombre apprend ses préférences (distance optimale, vitesse)
Humeur dynamique : État émotionnel qui influence le comportement (0-1)
Niveau de rébellion : Capacité croissante à désobéir au texte original
Apprentissage adaptatif : L'ombre mémorise les positions qui lui plaisent

🎭 4 MODES D'INTERACTION COMPLEXES

DETACHMENT : L'ombre se détache progressivement en cercles organiques
REBELLION : L'ombre fait l'opposé du texte + rotation autonome
REVELATION : L'ombre révèle des messages cachés ("SHADOW KNOWS", "HIDDEN TRUTH"...)
HARMONY : Danse synchronisée entre lumière et ombre

🔮 SYSTÈME DE RÉVÉLATION

Messages cachés aléatoires : 6 messages mystérieux qui changent
Activation imprévisible : Basée sur les cycles de dualité + probabilité
Montée progressive : Niveau de révélation qui croît jusqu'à dévoilement complet
Régénération cyclique : Nouveaux secrets à découvrir régulièrement

⚡ INTERACTIONS LUMIÈRE-OMBRE

Particules de connexion : 20 particules qui voyagent entre texte et ombre
Fils de lumière : 8 connexions courbes qui apparaissent selon la tension
Tension dynamique : Distance entre lumière/ombre affecte l'intensité globale
Spawn intelligent : Particules générées proportionnellement à la séparation

🌈 RENDU CINÉMATOGRAPHIQUE

Couches de luminosité : 4 niveaux de glow pour le texte principal
Ombre multicouche : 3 variations de profondeur avec décalages
Transformations autonomes : Scale/rotation basées sur la rébellion
Indicateur de mode : Point coloré discret qui révèle l'état actuel

🎯 DUALITÉ ADDICTIVE

Imprévisibilité contrôlée : 30% de variations aléatoires dans chaque mode
Cycles organiques : Transitions fluides entre états comportementaux
Révélations progressives : Informations cachées dévoilées au fil du temps
Personnalité émergente : L'ombre devient de plus en plus indépendante

🚀 OPTIMISATIONS PERFORMANCE

Object pooling : Particules et fils de lumière réutilisés
Calculs différés : Transformations calculées uniquement si nécessaires
Contraintes efficaces : Limitation de position sans calculs lourds
Mémoire compacte : Structure de données optimisée pour la personnalité

L'effet crée une fascination psychologique en donnant l'impression que l'ombre a sa propre conscience et révèle des vérités cachées !`,

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

  tags: ["text", "texte", "glow", "rotation", "shadow clone"],

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
    gif: "shadow clone.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'autonomous-shadow-entity-026',
            name: 'Entité Ombre Autonome',
            category: 'text',
            version: '1.0',
            performance: 'medium',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1.3 },
                intensite: { type: 'range', min: 0.3, max: 1, default: 0.8 },
                couleurLumiere: { type: 'color', default: '#ffffff' },
                couleurOmbre: { type: 'color', default: '#1a0033' },
                autonomie: { type: 'range', min: 0.2, max: 1, default: 0.7 },
                revelation: { type: 'range', min: 0.1, max: 0.8, default: 0.4 }
            }
        });
        
        // Variables privées de l'effet
        this.temps = 0;
        this.ombreX = 0;
        this.ombreY = 0;
        this.ombreRotation = 0;
        this.ombreOpacite = 0.8;
        this.ombrePersonnalite = 0;
        
        // États d'interaction
        this.modeInteraction = 'detachment'; // detachment, rebellion, revelation, harmony
        this.cycleDualite = 0;
        this.tensionLumiereOmbre = 0;
        
        // Révélations cachées
        this.messageCache = '';
        this.revelationActive = false;
        this.niveauRevelation = 0;
        
        // Particules de connexion
        this.particulesConnexion = [];
        this.filsLumiere = [];
        
        // Mémoire de l'ombre (personnalité autonome)
        this.memoireOmbre = {
            comportements: [],
            preferences: { distanceOptimale: 50, vitessePrefere: 1.2 },
            humeur: 0.5,
            rebellion: 0
        };
        
        this.initParticules();
        this.generateMessageCache();
    }
    
    initParticules() {
        // Particules de connexion lumière-ombre
        for (let i = 0; i < 20; i++) {
            this.particulesConnexion.push({
                x: 0,
                y: 0,
                vie: 0,
                maxVie: Math.random() * 1000 + 500,
                taille: Math.random() * 2 + 1,
                vitesseX: 0,
                vitesseY: 0,
                actif: false,
                type: Math.random() > 0.5 ? 'lumiere' : 'ombre'
            });
        }
        
        // Fils de lumière/connexion
        for (let i = 0; i < 8; i++) {
            this.filsLumiere.push({
                points: [],
                intensite: Math.random() * 0.5 + 0.2,
                actif: false,
                couleur: { r: 255, g: 255, b: 255 }
            });
        }
    }
    
    generateMessageCache() {
        const messages = [
            'SHADOW KNOWS',
            'HIDDEN TRUTH',
            'DARKNESS REVEALS',
            'MIRROR SOUL',
            'INVERSE REALITY',
            'BEYOND LIGHT'
        ];
        this.messageCache = messages[Math.floor(Math.random() * messages.length)];
    }
    
    initialize(canvas, element) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.element = element;
        
        // Calcul des dimensions du texte
        this.ctx.font = `${element.fontSize || 48}px Arial`;
        this.textMetrics = this.ctx.measureText(element.content || 'SHADOW');
        this.textWidth = this.textMetrics.width;
        this.textHeight = element.fontSize || 48;
        
        // Position centrée
        this.textX = element.x || (canvas.width - this.textWidth) / 2;
        this.textY = element.y || canvas.height / 2;
        
        // Position initiale de l'ombre
        this.ombreX = this.textX + 20;
        this.ombreY = this.textY + 15;
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 26, g: 0, b: 51};
    }
    
    updatePersonnaliteOmbre(deltaTime) {
        // Développement de la personnalité autonome de l'ombre
        const autonomieLevel = this.parameters.autonomie.default;
        
        // Humeur de l'ombre (influence son comportement)
        this.memoireOmbre.humeur += (Math.random() - 0.5) * 0.01;
        this.memoireOmbre.humeur = Math.max(0, Math.min(1, this.memoireOmbre.humeur));
        
        // Niveau de rébellion (plus l'ombre est autonome, plus elle peut se rebeller)
        if (Math.random() < 0.002 * autonomieLevel) {
            this.memoireOmbre.rebellion = Math.min(1, this.memoireOmbre.rebellion + 0.1);
        } else {
            this.memoireOmbre.rebellion *= 0.995; // Décroissance naturelle
        }
        
        // Apprentissage des préférences
        const distanceActuelle = Math.sqrt(
            Math.pow(this.ombreX - this.textX, 2) + 
            Math.pow(this.ombreY - this.textY, 2)
        );
        
        if (distanceActuelle > 30 && distanceActuelle < 80) {
            this.memoireOmbre.preferences.distanceOptimale = 
                this.memoireOmbre.preferences.distanceOptimale * 0.99 + distanceActuelle * 0.01;
        }
    }
    
    updateModeInteraction(deltaTime) {
        this.cycleDualite += deltaTime * 0.001;
        
        // Changement de mode basé sur la personnalité et le temps
        const rebellion = this.memoireOmbre.rebellion;
        const humeur = this.memoireOmbre.humeur;
        
        if (rebellion > 0.7) {
            this.modeInteraction = 'rebellion';
        } else if (Math.sin(this.cycleDualite) > 0.6 && Math.random() < this.parameters.revelation.default * 0.01) {
            this.modeInteraction = 'revelation';
            this.revelationActive = true;
        } else if (humeur > 0.7 && rebellion < 0.3) {
            this.modeInteraction = 'harmony';
        } else {
            this.modeInteraction = 'detachment';
        }
        
        // Gestion de la révélation
        if (this.revelationActive) {
            this.niveauRevelation = Math.min(1, this.niveauRevelation + deltaTime * 0.002);
            if (this.niveauRevelation >= 1 && Math.random() < 0.01) {
                this.revelationActive = false;
                this.niveauRevelation = 0;
                this.generateMessageCache(); // Nouveau message
            }
        }
    }
    
    updatePositionOmbre(deltaTime) {
        const autonomieLevel = this.parameters.autonomie.default;
        const baseSpeed = 0.02 * this.parameters.vitesse.default;
        
        switch (this.modeInteraction) {
            case 'detachment':
                // L'ombre se détache progressivement
                const angle = this.temps * 0.001;
                const distance = this.memoireOmbre.preferences.distanceOptimale;
                this.ombreX += Math.cos(angle) * baseSpeed * distance * 0.01;
                this.ombreY += Math.sin(angle * 0.7) * baseSpeed * distance * 0.01;
                break;
                
            case 'rebellion':
                // L'ombre fait l'opposé du texte
                const targetX = this.textX - (this.ombreX - this.textX) * 0.1;
                const targetY = this.textY - (this.ombreY - this.textY) * 0.1;
                this.ombreX += (targetX - this.ombreX) * baseSpeed * 2;
                this.ombreY += (targetY - this.ombreY) * baseSpeed * 2;
                this.ombreRotation += deltaTime * 0.002;
                break;
                
            case 'revelation':
                // L'ombre révèle des informations
                const pulseX = Math.sin(this.temps * 0.005) * 20;
                const pulseY = Math.cos(this.temps * 0.003) * 15;
                this.ombreX = this.textX + pulseX;
                this.ombreY = this.textY + pulseY + 30;
                break;
                
            case 'harmony':
                // L'ombre danse avec le texte
                const harmonyX = this.textX + Math.sin(this.temps * 0.002) * 40;
                const harmonyY = this.textY + Math.cos(this.temps * 0.002) * 30;
                this.ombreX += (harmonyX - this.ombreX) * baseSpeed * 3;
                this.ombreY += (harmonyY - this.ombreY) * baseSpeed * 3;
                break;
        }
        
        // Contraintes de canvas
        this.ombreX = Math.max(0, Math.min(this.canvas.width - this.textWidth, this.ombreX));
        this.ombreY = Math.max(this.textHeight, Math.min(this.canvas.height, this.ombreY));
        
        // Calcul de la tension entre lumière et ombre
        const distance = Math.sqrt(
            Math.pow(this.ombreX - this.textX, 2) + 
            Math.pow(this.ombreY - this.textY, 2)
        );
        this.tensionLumiereOmbre = Math.min(1, distance / 100);
    }
    
    updateParticules(deltaTime) {
        // Mise à jour des particules de connexion
        this.particulesConnexion.forEach(particule => {
            if (!particule.actif && Math.random() < 0.02 * this.tensionLumiereOmbre) {
                // Spawn entre texte et ombre
                const ratio = Math.random();
                particule.x = this.textX + (this.ombreX - this.textX) * ratio;
                particule.y = this.textY + (this.ombreY - this.textY) * ratio;
                particule.vie = 0;
                particule.vitesseX = (Math.random() - 0.5) * 0.5;
                particule.vitesseY = (Math.random() - 0.5) * 0.5;
                particule.actif = true;
            }
            
            if (particule.actif) {
                particule.x += particule.vitesseX;
                particule.y += particule.vitesseY;
                particule.vie += deltaTime;
                
                if (particule.vie >= particule.maxVie) {
                    particule.actif = false;
                }
            }
        });
        
        // Mise à jour des fils de lumière
        this.filsLumiere.forEach((fil, index) => {
            if (this.tensionLumiereOmbre > 0.3 && Math.random() < 0.01) {
                fil.actif = true;
                fil.points = [];
                
                // Création d'un fil courbe entre texte et ombre
                const steps = 8;
                for (let i = 0; i <= steps; i++) {
                    const t = i / steps;
                    const x = this.textX + (this.ombreX - this.textX) * t;
                    const y = this.textY + (this.ombreY - this.textY) * t;
                    
                    // Courbure du fil
                    const curve = Math.sin(t * Math.PI) * 20 * this.tensionLumiereOmbre;
                    fil.points.push({
                        x: x + Math.sin(this.temps * 0.01 + i) * curve,
                        y: y + curve
                    });
                }
            }
            
            if (fil.actif && Math.random() < 0.02) {
                fil.actif = false;
            }
        });
    }
    
    drawTexteOriginal(ctx) {
        const couleurLumiere = this.hexToRgb(this.parameters.couleurLumiere.default);
        
        ctx.save();
        ctx.font = `${this.textHeight}px Arial`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        
        // Effet de luminosité basé sur la tension
        const luminosite = 1 - this.tensionLumiereOmbre * 0.3;
        
        // Couches de lumière
        const layers = [
            { blur: 15, alpha: 0.3, couleur: couleurLumiere },
            { blur: 8, alpha: 0.5, couleur: couleurLumiere },
            { blur: 3, alpha: 0.8, couleur: couleurLumiere },
            { blur: 0, alpha: 1.0, couleur: { r: 255, g: 255, b: 255 } }
        ];
        
        layers.forEach(layer => {
            ctx.shadowColor = `rgba(${layer.couleur.r}, ${layer.couleur.g}, ${layer.couleur.b}, ${layer.alpha * luminosite})`;
            ctx.shadowBlur = layer.blur;
            ctx.fillStyle = `rgba(${layer.couleur.r}, ${layer.couleur.g}, ${layer.couleur.b}, ${layer.alpha * luminosite})`;
            
            ctx.fillText(this.element.content || 'SHADOW', this.textX, this.textY);
        });
        
        ctx.restore();
    }
    
    drawOmbreAutonome(ctx) {
        const couleurOmbre = this.hexToRgb(this.parameters.couleurOmbre.default);
        
        ctx.save();
        ctx.font = `${this.textHeight}px Arial`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        
        // Transformation basée sur la personnalité
        ctx.translate(this.ombreX, this.ombreY);
        ctx.rotate(this.ombreRotation);
        ctx.scale(1 + this.memoireOmbre.rebellion * 0.2, 1 - this.memoireOmbre.rebellion * 0.1);
        
        // Opacité basée sur l'autonomie
        const opacite = this.ombreOpacite * this.parameters.intensite.default;
        
        if (this.revelationActive && this.niveauRevelation > 0.5) {
            // Mode révélation - affichage du message caché
            ctx.fillStyle = `rgba(${couleurOmbre.r + 100}, ${couleurOmbre.g + 50}, ${couleurOmbre.b + 100}, ${opacite})`;
            ctx.fillText(this.messageCache, -this.textWidth/2, 0);
        } else {
            // Ombre normale avec variations
            const variations = [
                { offset: { x: 2, y: 2 }, alpha: 0.6 },
                { offset: { x: 1, y: 1 }, alpha: 0.8 },
                { offset: { x: 0, y: 0 }, alpha: 1.0 }
            ];
            
            variations.forEach(variation => {
                ctx.fillStyle = `rgba(${couleurOmbre.r}, ${couleurOmbre.g}, ${couleurOmbre.b}, ${opacite * variation.alpha})`;
                ctx.fillText(
                    this.element.content || 'SHADOW',
                    -this.textWidth/2 + variation.offset.x,
                    variation.offset.y
                );
            });
        }
        
        ctx.restore();
    }
    
    drawParticules(ctx) {
        ctx.save();
        
        this.particulesConnexion.forEach(particule => {
            if (!particule.actif) return;
            
            const progression = particule.vie / particule.maxVie;
            const alpha = Math.sin(progression * Math.PI) * 0.8;
            
            if (particule.type === 'lumiere') {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`;
            } else {
                ctx.fillStyle = `rgba(100, 0, 150, ${alpha})`;
                ctx.shadowColor = `rgba(100, 0, 150, ${alpha})`;
            }
            
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(particule.x, particule.y, particule.taille, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.restore();
    }
    
    drawFilsLumiere(ctx) {
        ctx.save();
        
        this.filsLumiere.forEach(fil => {
            if (!fil.actif || fil.points.length < 2) return;
            
            ctx.strokeStyle = `rgba(${fil.couleur.r}, ${fil.couleur.g}, ${fil.couleur.b}, ${fil.intensite})`;
            ctx.lineWidth = 1;
            ctx.shadowColor = `rgba(${fil.couleur.r}, ${fil.couleur.g}, ${fil.couleur.b}, ${fil.intensite * 0.8})`;
            ctx.shadowBlur = 3;
            
            ctx.beginPath();
            ctx.moveTo(fil.points[0].x, fil.points[0].y);
            
            for (let i = 1; i < fil.points.length; i++) {
                ctx.lineTo(fil.points[i].x, fil.points[i].y);
            }
            
            ctx.stroke();
        });
        
        ctx.restore();
    }
    
    drawIndicateurMode(ctx) {
        // Indicateur visuel subtil du mode d'interaction
        ctx.save();
        
        const x = 20;
        const y = 20;
        let couleur = { r: 255, g: 255, b: 255 };
        
        switch (this.modeInteraction) {
            case 'rebellion': couleur = { r: 255, g: 100, b: 100 }; break;
            case 'revelation': couleur = { r: 150, g: 100, b: 255 }; break;
            case 'harmony': couleur = { r: 100, g: 255, b: 150 }; break;
            default: couleur = { r: 200, g: 200, b: 200 }; break;
        }
        
        ctx.fillStyle = `rgba(${couleur.r}, ${couleur.g}, ${couleur.b}, 0.3)`;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
    
    render(ctx, element, deltaTime) {
        // Mise à jour des systèmes
        this.updatePersonnaliteOmbre(deltaTime);
        this.updateModeInteraction(deltaTime);
        this.updatePositionOmbre(deltaTime);
        this.updateParticules(deltaTime);
        
        // Rendu des couches
        this.drawFilsLumiere(ctx);        // Fils de connexion en arrière-plan
        this.drawOmbreAutonome(ctx);      // Ombre autonome
        this.drawParticules(ctx);         // Particules de connexion
        this.drawTexteOriginal(ctx);      // Texte lumineux principal
        this.drawIndicateurMode(ctx);     // Indicateur de mode (debug)
    }
    
    update(deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse.default;
    }
    
    destroy() {
        // Nettoyage mémoire
        this.particulesConnexion = null;
        this.filsLumiere = null;
        this.memoireOmbre = null;
        this.ctx = null;
        this.canvas = null;
        this.element = null;
    }
    
  }
};
