// typewriter.effect.js

export const typewriterEffect = {
  id: "typewriter",
  name: "Typewriter",
  
  description: `## 🎭 EFFET 1 : TYPEWRITER

**CATÉGORIE :** TEXT  
**EFFET DEMANDÉ :** TypeWriter  
**ID UNIQUE :** typewriter-classic-001  
**NOM AFFICHAGE :** Machine à Écrire Classique  

**DESCRIPTION :** Effet de machine à écrire vintage avec curseur clignotant, son de frappe simulé visuellement, et micro-tremblements réalistes. Chaque lettre apparaît avec un délai naturel variable, des pauses aux espaces et ponctuations. Le curseur pulse avec un rythme organique et disparaît progressivement après la fin.

**SPÉCIFICATIONS ADDICTION :**
- Rythme irrégulier de frappe (70% régulier, 30% variations)
- Micro-corrections et hésitations simulées
- Curseur avec pulsation respiratoire naturelle
- Effet de machine vintage (tremblements subtils)

-----------------------------------------------------------------------

🎭 TYPEWRITER CLASSIC EFFET CRÉÉ !
✨ CARACTÉRISTIQUES ADDICTIVES IMPLÉMENTÉES :
🎯 FACTEUR ADDICTION 70/30:

Rythme organique : Variations naturelles de frappe (80-200ms base)
Hésitations simulées : 10% des caractères avec pauses 200-1000ms
Micro-corrections : 5% d'erreurs temporaires avec correction automatique
Surprises contrôlées : 30% de variations de timing imprévisibles

🔥 DÉTAILS HYPNOTIQUES:

Curseur respiratoire : Pulsation organique avec sin() naturel
Tremblements vintage : Micro-oscillations X/Y pour effet machine
Particules de frappe : Débris visuels à chaque caractère
Disparition progressive : Curseur s'estompe après la fin

⚡ OPTIMISATIONS PERFORMANCE:

Object pooling : 20 particules réutilisables
Calculs différés : Hésitations/corrections pré-calculées
Rendu conditionnel : Particules inactives ignorées
Text wrapping intelligent

🎨 PARAMÈTRES CONFIGURABLES:

vitesse : Multiplicateur de rapidité de frappe
intensite : Intensité globale des effets
couleur : Couleur du texte principal
couleurCurseur : Couleur du curseur clignotant
tremblements : Intensité des micro-tremblements

🚀 READY FOR INTEGRATION ! L'effet créé des GIF publicitaires CAPTIVANTS avec un réalisme de machine à écrire qui garde les yeux rivés sur l'écran !`,

  category: "text",
  subcategory: "animation",
  intensity: "medium",
  performance: "medium",

  compatibility: {
    text: true,
    image: false,
    logo: true,
    background: false
  },

  tags: ["text", "texte", "typewriter", "pulse"],

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
    gif: "typewriter.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
    super({
      id: 'typewriter-classic-001',
      name: 'Machine à Écrire Classique',
      category: 'text',
      version: '1.0',
      performance: 'medium',
      parameters: {
        vitesse: { type: 'range', min: 0.1, max: 3, default: 1 },
        intensite: { type: 'range', min: 0, max: 1, default: 0.5 },
        couleur: { type: 'color', default: '#2c3e50' },
        couleurCurseur: { type: 'color', default: '#e74c3c' },
        tremblements: { type: 'range', min: 0, max: 2, default: 0.8 }
      }
    });
    
    // Variables d'état
    this.temps = 0;
    this.caractereActuel = 0;
    this.texteAffiche = '';
    this.texteComplet = '';
    this.derniereFrappe = 0;
    this.prochaineFrappe = 0;
    this.fini = false;
    this.finDuree = 0;
    
    // Curseur
    this.curseurVisible = true;
    this.curseurPhase = 0;
    this.curseurIntensity = 1;
    
    // Micro-corrections et hésitations
    this.corrections = [];
    this.hesitations = [];
    this.tremblementX = 0;
    this.tremblementY = 0;
    
    // Pool d'objets pour performance
    this.particulesFrappe = [];
    this.maxParticules = 20;
    
    this.initializeParticlePool();
  }
  
  initializeParticlePool() {
    for (let i = 0; i < this.maxParticules; i++) {
      this.particulesFrappe.push({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        vie: 0,
        maxVie: 0,
        taille: 0,
        alpha: 0
      });
    }
  }
  
  initialize(canvas, element) {
    this.texteComplet = element.content || 'Votre message publicitaire captivant...';
    this.caractereActuel = 0;
    this.texteAffiche = '';
    this.temps = 0;
    this.fini = false;
    this.finDuree = 0;
    this.curseurIntensity = 1;
    
    // Générer hésitations et corrections
    this.genererHesitations();
    this.genererCorrections();
    
    // Premier délai
    this.calculerProchaineFrappe();
  }
  
  genererHesitations() {
    this.hesitations = [];
    const longueur = this.texteComplet.length;
    const nbHesitations = Math.floor(longueur * 0.1); // 10% de chance d'hésitation
    
    for (let i = 0; i < nbHesitations; i++) {
      const position = Math.floor(Math.random() * longueur);
      this.hesitations.push({
        position,
        duree: 200 + Math.random() * 800, // 200-1000ms
        utilisee: false
      });
    }
  }
  
  genererCorrections() {
    this.corrections = [];
    const longueur = this.texteComplet.length;
    const nbCorrections = Math.floor(longueur * 0.05); // 5% de chance de correction
    
    for (let i = 0; i < nbCorrections; i++) {
      const position = Math.floor(Math.random() * (longueur - 2)) + 1;
      this.corrections.push({
        position,
        caractereErrone: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        dureeAffichage: 300 + Math.random() * 500,
        utilisee: false
      });
    }
  }
  
  calculerProchaineFrappe() {
    const caractere = this.texteComplet[this.caractereActuel];
    let delai = 80 + Math.random() * 120; // Base: 80-200ms
    
    // Modifications selon le caractère
    if (caractere === ' ') delai *= 0.5; // Espaces plus rapides
    if (['.', '!', '?'].includes(caractere)) delai *= 2; // Ponctuations plus lentes
    if ([',', ';', ':'].includes(caractere)) delai *= 1.5;
    
    // Variation d'addiction (30% de surprise)
    if (Math.random() < 0.3) {
      delai *= (0.3 + Math.random() * 1.4); // x0.3 à x1.7
    }
    
    // Appliquer vitesse utilisateur
    delai /= this.parameters.vitesse.value;
    
    this.prochaineFrappe = this.temps + delai;
  }
  
  verifierHesitation() {
    const hesitation = this.hesitations.find(h => 
      h.position === this.caractereActuel && !h.utilisee
    );
    
    if (hesitation) {
      hesitation.utilisee = true;
      this.prochaineFrappe += hesitation.duree;
    }
  }
  
  verifierCorrection() {
    const correction = this.corrections.find(c => 
      c.position === this.caractereActuel && !c.utilisee
    );
    
    if (correction) {
      correction.utilisee = true;
      
      // Afficher caractère erroné temporairement
      setTimeout(() => {
        if (this.caractereActuel === correction.position) {
          const avant = this.texteAffiche.slice(0, -1);
          this.texteAffiche = avant + correction.caractereErrone;
          this.creerParticuleFrappe();
          
          // Puis corriger
          setTimeout(() => {
            if (this.caractereActuel === correction.position) {
              this.texteAffiche = avant + this.texteComplet[correction.position];
              this.creerParticuleFrappe();
            }
          }, correction.dureeAffichage);
        }
      }, 50);
    }
  }
  
  creerParticuleFrappe() {
    const particule = this.particulesFrappe.find(p => !p.active);
    if (!particule) return;
    
    particule.active = true;
    particule.x = this.dernierePosX + Math.random() * 20 - 10;
    particule.y = this.dernierePosY + Math.random() * 10 - 5;
    particule.vx = (Math.random() - 0.5) * 2;
    particule.vy = -Math.random() * 2 - 1;
    particule.vie = 0;
    particule.maxVie = 200 + Math.random() * 300;
    particule.taille = 1 + Math.random() * 2;
    particule.alpha = 0.3 + Math.random() * 0.4;
  }
  
  updateParticules(deltaTime) {
    this.particulesFrappe.forEach(particule => {
      if (!particule.active) return;
      
      particule.vie += deltaTime;
      particule.x += particule.vx;
      particule.y += particule.vy;
      particule.vy += 0.1; // Gravité légère
      
      const progression = particule.vie / particule.maxVie;
      particule.alpha = (1 - progression) * 0.5;
      
      if (particule.vie >= particule.maxVie) {
        particule.active = false;
      }
    });
  }
  
  updateTremblements(deltaTime) {
    const intensite = this.parameters.tremblements.value * this.parameters.intensite.value;
    this.tremblementX = Math.sin(this.temps * 0.01) * intensite * 0.5;
    this.tremblementY = Math.cos(this.temps * 0.013) * intensite * 0.3;
  }
  
  update(deltaTime) {
    this.temps += deltaTime;
    
    // Gestion de la frappe
    if (!this.fini && this.temps >= this.prochaineFrappe) {
      if (this.caractereActuel < this.texteComplet.length) {
        this.verifierHesitation();
        this.verifierCorrection();
        
        this.texteAffiche += this.texteComplet[this.caractereActuel];
        this.caractereActuel++;
        this.derniereFrappe = this.temps;
        
        this.creerParticuleFrappe();
        this.calculerProchaineFrappe();
      } else {
        this.fini = true;
        this.finDuree = this.temps;
      }
    }
    
    // Curseur pulsation respiratoire
    this.curseurPhase += deltaTime * 0.003;
    this.curseurVisible = Math.sin(this.curseurPhase) > -0.3;
    
    // Intensité du curseur diminue après la fin
    if (this.fini) {
      const tempsDepuisFin = this.temps - this.finDuree;
      this.curseurIntensity = Math.max(0, 1 - tempsDepuisFin / 2000);
    }
    
    this.updateParticules(deltaTime);
    this.updateTremblements(deltaTime);
  }
  
  render(ctx, element, deltaTime) {
    const { x, y, width, height } = element;
    
    ctx.save();
    
    // Application des tremblements vintage
    ctx.translate(x + this.tremblementX, y + this.tremblementY);
    
    // Style de texte machine à écrire
    ctx.font = `${Math.floor(height * 0.6)}px 'Courier New', monospace`;
    ctx.fillStyle = this.parameters.couleur.value;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    
    // Rendu du texte avec micro-variations
    const lignes = this.wrapText(ctx, this.texteAffiche, width - 40);
    let yOffset = y + height / 2 - (lignes.length - 1) * height * 0.3;
    
    lignes.forEach((ligne, index) => {
      const microTremblement = Math.sin(this.temps * 0.02 + index) * 0.3;
      ctx.fillText(ligne, x + 20, yOffset + microTremblement);
      yOffset += height * 0.6;
    });
    
    // Position du curseur
    const metrics = ctx.measureText(this.texteAffiche);
    this.dernierePosX = x + 20 + (metrics.width % (width - 40));
    this.dernierePosY = yOffset - height * 0.6;
    
    // Rendu du curseur
    if (this.curseurVisible && this.curseurIntensity > 0) {
      ctx.fillStyle = this.parameters.couleurCurseur.value;
      ctx.globalAlpha = this.curseurIntensity * (0.7 + Math.sin(this.curseurPhase * 2) * 0.3);
      
      const curseurWidth = 3;
      const curseurHeight = height * 0.5;
      
      ctx.fillRect(
        this.dernierePosX + 2,
        this.dernierePosY - curseurHeight / 2,
        curseurWidth,
        curseurHeight
      );
      
      ctx.globalAlpha = 1;
    }
    
    // Rendu des particules de frappe
    this.particulesFrappe.forEach(particule => {
      if (!particule.active) return;
      
      ctx.fillStyle = this.parameters.couleur.value;
      ctx.globalAlpha = particule.alpha;
      ctx.fillRect(
        particule.x - particule.taille / 2,
        particule.y - particule.taille / 2,
        particule.taille,
        particule.taille
      );
    });
    
    ctx.restore();
  }
  
  wrapText(ctx, text, maxWidth) {
    const mots = text.split(' ');
    const lignes = [];
    let ligneActuelle = '';
    
    mots.forEach(mot => {
      const testLigne = ligneActuelle + (ligneActuelle ? ' ' : '') + mot;
      const metrics = ctx.measureText(testLigne);
      
      if (metrics.width > maxWidth && ligneActuelle) {
        lignes.push(ligneActuelle);
        ligneActuelle = mot;
      } else {
        ligneActuelle = testLigne;
      }
    });
    
    if (ligneActuelle) {
      lignes.push(ligneActuelle);
    }
    
    return lignes;
  }
  
  destroy() {
    this.particulesFrappe = [];
    this.corrections = [];
    this.hesitations = [];
  }
    
  }
};
