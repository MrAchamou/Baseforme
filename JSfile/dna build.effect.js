// dna build.effect.js

export const dna buildEffect = {
  id: "dna build",
  name: "Dna build",
  
  description: `## 🧬 EFFET 2 : DNA BUILD

**CATÉGORIE :** TEXT  
**EFFET DEMANDÉ :** DNA_Build  
**ID UNIQUE :** dna-helix-builder-002  
**NOM AFFICHAGE :** Construction Spirale ADN  

**DESCRIPTION :** Les lettres se forment via une double hélice d'ADN qui se déroule. Chaque caractère émerge de la spirale avec des particules bio-luminescentes. La hélice tourne en 3D simulé, les brins se connectent et se déconnectent rythmiquement. Couleurs organiques évolutives (vert → bleu → violet).

**SPÉCIFICATIONS ADDICTION :**
- Rotation hypnotique continue de la spirale
- Particules qui dansent le long des brins
- Pulsations bioluminescentes synchronisées
- Révélation progressive des liaisons moléculaires

--------------------------------------------------------------------

🧬 DNA HELIX BUILDER EFFET CRÉÉ !
✨ CARACTÉRISTIQUES BIO-ADDICTIVES IMPLÉMENTÉES :
🎯 ROTATION HYPNOTIQUE 3D:

Double hélice authentique : Brins A/B avec décalage π parfait
Rotation continue : Paramètre rotationSpeed pour contrôle
Projection 3D → 2D : Profondeur et perspective réalistes
Pulsations synchronisées : Chaque brin pulse indépendamment

🔬 SYSTÈME BIO-LUMINESCENT:

100 particules poolées : nucleotide, liaison, enzyme
Attraction vers l'hélice : Forces physiques réalistes
Pulsations respiratoires : sin() avec phases aléatoires
Anti-gravité biologique : Particules flottent vers le haut

🌈 ÉVOLUTION CHROMATIQUE:

4 phases couleur : Vert → Turquoise → Violet → Rose
Transition fluide : Interpolation RGB progressive
Synchronisation globale : Toutes particules évoluent ensemble

⚡ RÉVÉLATION PROGRESSIVE:

Émergence spirale : Caractères apparaissent de la double hélice
Explosion particulaire : 8 particules par caractère révélé
Liaisons hydrogène : Connexions entre brins qui pulsent
Glow dynamique : Ombres colorées sur texte + particules

🎮 PARAMÈTRES CONFIGURABLES:

vitesse : Rapidité de révélation des caractères
intensite : Intensité globale des effets
rotationSpeed : Vitesse de rotation de l'hélice
particleDensity : Densité des particules bio-luminescentes

🚀 PRÊT POUR INTÉGRATION ! Cet effet transforme ton texte en SÉQUENCE GÉNÉTIQUE HYPNOTIQUE avec un réalisme scientifique qui captive instantanément !`,

  category: "text",
  subcategory: "animation",
  intensity: "medium",
  performance: "light",

  compatibility: {
    text: true,
    image: false,
    logo: true,
    background: false
  },

  tags: ["text", "texte", "particle", "glow", "pulse", "phase"],

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
    gif: "dna build.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
    super({
      id: 'dna-helix-builder-002',
      name: 'Construction Spirale ADN',
      category: 'text',
      version: '1.0',
      performance: 'medium',
      parameters: {
        vitesse: { type: 'range', min: 0.1, max: 3, default: 1 },
        intensite: { type: 'range', min: 0, max: 1, default: 0.7 },
        couleurBase: { type: 'color', default: '#00ff88' },
        rotationSpeed: { type: 'range', min: 0.1, max: 2, default: 0.8 },
        particleDensity: { type: 'range', min: 0.1, max: 2, default: 1 }
      }
    });
    
    // Variables d'état
    this.temps = 0;
    this.caractereActuel = 0;
    this.texteComplet = '';
    this.caracteres = [];
    this.rotationGlobale = 0;
    this.phaseEvolution = 0;
    
    // Système de particules bio-luminescentes
    this.particulesBio = [];
    this.maxParticules = 100;
    this.connexionsBrins = [];
    
    // Double hélice
    this.heliceA = [];
    this.heliceB = [];
    this.rayonHelice = 80;
    this.hauteurHelice = 40;
    
    // Couleurs évolutives
    this.paletteEvolution = [
      { r: 0, g: 255, b: 136 },    // Vert initial
      { r: 64, g: 224, b: 208 },   // Turquoise
      { r: 138, g: 43, b: 226 },   // Violet
      { r: 255, g: 20, b: 147 }    // Rose final
    ];
    
    this.initializeParticlePool();
  }
  
  initializeParticlePool() {
    for (let i = 0; i < this.maxParticules; i++) {
      this.particulesBio.push({
        active: false,
        x: 0, y: 0, z: 0,
        vx: 0, vy: 0, vz: 0,
        vie: 0, maxVie: 0,
        taille: 0, alpha: 0,
        couleur: { r: 0, g: 255, b: 136 },
        pulsation: Math.random() * Math.PI * 2,
        typeParticule: 'nucleotide' // nucleotide, liaison, enzyme
      });
    }
  }
  
  initialize(canvas, element) {
    this.texteComplet = element.content || 'EVOLUTION GÉNÉTIQUE';
    this.caractereActuel = 0;
    this.caracteres = [];
    this.temps = 0;
    this.rotationGlobale = 0;
    this.phaseEvolution = 0;
    
    // Initialiser les caractères avec positions spirales
    for (let i = 0; i < this.texteComplet.length; i++) {
      this.caracteres.push({
        char: this.texteComplet[i],
        visible: false,
        progression: 0,
        angleHelice: (i * Math.PI * 0.3),
        hauteur: i * this.hauteurHelice,
        pulsation: Math.random() * Math.PI * 2,
        tempsRevele: 0,
        particulesSuivantes: []
      });
    }
    
    this.genererHelices();
  }
  
  genererHelices() {
    this.heliceA = [];
    this.heliceB = [];
    this.connexionsBrins = [];
    
    const resolution = 200;
    for (let i = 0; i < resolution; i++) {
      const t = (i / resolution) * Math.PI * 8; // 4 tours complets
      const hauteur = (i / resolution) * this.texteComplet.length * this.hauteurHelice;
      
      // Brin A
      this.heliceA.push({
        angle: t,
        hauteur: hauteur,
        x: Math.cos(t) * this.rayonHelice,
        z: Math.sin(t) * this.rayonHelice,
        intensite: 0,
        pulsation: Math.random() * Math.PI * 2
      });
      
      // Brin B (décalé de π)
      this.heliceB.push({
        angle: t + Math.PI,
        hauteur: hauteur,
        x: Math.cos(t + Math.PI) * this.rayonHelice,
        z: Math.sin(t + Math.PI) * this.rayonHelice,
        intensite: 0,
        pulsation: Math.random() * Math.PI * 2
      });
      
      // Connexions entre brins (liaisons hydrogène)
      if (i % 8 === 0) { // Une liaison tous les 8 points
        this.connexionsBrins.push({
          indexA: i,
          indexB: i,
          force: 0,
          pulsation: Math.random() * Math.PI * 2,
          visible: false
        });
      }
    }
  }
  
  creerParticuleBio(x, y, z, type = 'nucleotide') {
    const particule = this.particulesBio.find(p => !p.active);
    if (!particule) return;
    
    particule.active = true;
    particule.x = x + (Math.random() - 0.5) * 20;
    particule.y = y + (Math.random() - 0.5) * 20;
    particule.z = z + (Math.random() - 0.5) * 20;
    
    const vitesse = 0.5 + Math.random() * 1.5;
    const angle = Math.random() * Math.PI * 2;
    particule.vx = Math.cos(angle) * vitesse;
    particule.vy = (Math.random() - 0.7) * vitesse;
    particule.vz = Math.sin(angle) * vitesse;
    
    particule.vie = 0;
    particule.maxVie = 1000 + Math.random() * 2000;
    particule.taille = type === 'liaison' ? 2 : 3 + Math.random() * 4;
    particule.alpha = 0.8 + Math.random() * 0.2;
    particule.typeParticule = type;
    particule.pulsation = Math.random() * Math.PI * 2;
    
    // Couleur selon l'évolution
    particule.couleur = this.getCouleurEvolution();
  }
  
  getCouleurEvolution() {
    const phase = (this.phaseEvolution % (this.paletteEvolution.length - 1));
    const t = phase - Math.floor(phase);
    const index = Math.floor(phase);
    
    const couleurA = this.paletteEvolution[index];
    const couleurB = this.paletteEvolution[index + 1];
    
    return {
      r: Math.floor(couleurA.r + (couleurB.r - couleurA.r) * t),
      g: Math.floor(couleurA.g + (couleurB.g - couleurA.g) * t),
      b: Math.floor(couleurA.b + (couleurB.b - couleurA.b) * t)
    };
  }
  
  updateHelices(deltaTime) {
    this.rotationGlobale += deltaTime * 0.001 * this.parameters.rotationSpeed.value;
    this.phaseEvolution += deltaTime * 0.0005;
    
    // Mise à jour intensité des brins
    this.heliceA.forEach((point, i) => {
      point.pulsation += deltaTime * 0.003;
      const distanceCaractere = Math.abs(point.hauteur - (this.caractereActuel * this.hauteurHelice));
      point.intensite = Math.max(0, 1 - distanceCaractere / 200) * 
                       (0.7 + Math.sin(point.pulsation) * 0.3);
    });
    
    this.heliceB.forEach((point, i) => {
      point.pulsation += deltaTime * 0.003;
      const distanceCaractere = Math.abs(point.hauteur - (this.caractereActuel * this.hauteurHelice));
      point.intensite = Math.max(0, 1 - distanceCaractere / 200) * 
                       (0.7 + Math.sin(point.pulsation + Math.PI * 0.3) * 0.3);
    });
    
    // Mise à jour connexions
    this.connexionsBrins.forEach(connexion => {
      connexion.pulsation += deltaTime * 0.004;
      const hauteurConnexion = this.heliceA[connexion.indexA].hauteur;
      const distanceCaractere = Math.abs(hauteurConnexion - (this.caractereActuel * this.hauteurHelice));
      
      connexion.visible = distanceCaractere < 150;
      connexion.force = Math.max(0, 1 - distanceCaractere / 150) * 
                       (0.5 + Math.sin(connexion.pulsation) * 0.5);
    });
  }
  
  updateCaracteres(deltaTime) {
    // Révélation progressive des caractères
    const tempsParCaractere = 300 / this.parameters.vitesse.value;
    const caractereAPParaitre = Math.floor(this.temps / tempsParCaractere);
    
    if (caractereAPParaitre > this.caractereActuel && this.caractereActuel < this.texteComplet.length) {
      this.caracteres[this.caractereActuel].visible = true;
      this.caracteres[this.caractereActuel].tempsRevele = this.temps;
      
      // Créer explosion de particules bio
      const angle = this.caracteres[this.caractereActuel].angleHelice + this.rotationGlobale;
      const x = Math.cos(angle) * this.rayonHelice;
      const z = Math.sin(angle) * this.rayonHelice;
      const y = this.caracteres[this.caractereActuel].hauteur;
      
      for (let i = 0; i < 8 * this.parameters.particleDensity.value; i++) {
        this.creerParticuleBio(x, y, z, i < 4 ? 'nucleotide' : 'liaison');
      }
      
      this.caractereActuel++;
    }
    
    // Animation des caractères visibles
    this.caracteres.forEach((char, index) => {
      if (!char.visible) return;
      
      const tempsDepuisRevele = this.temps - char.tempsRevele;
      char.progression = Math.min(1, tempsDepuisRevele / 500);
      char.pulsation += deltaTime * 0.002;
      
      // Génération continue de particules pour les caractères actifs
      if (Math.random() < 0.02 * this.parameters.particleDensity.value) {
        const angle = char.angleHelice + this.rotationGlobale;
        const x = Math.cos(angle) * this.rayonHelice * 0.7;
        const z = Math.sin(angle) * this.rayonHelice * 0.7;
        const y = char.hauteur;
        
        this.creerParticuleBio(x, y, z, 'enzyme');
      }
    });
  }
  
  updateParticules(deltaTime) {
    this.particulesBio.forEach(particule => {
      if (!particule.active) return;
      
      particule.vie += deltaTime;
      particule.pulsation += deltaTime * 0.005;
      
      // Mouvement avec attraction vers l'hélice
      const attractionForce = 0.02;
      const angle = Math.atan2(particule.z, particule.x);
      const distance = Math.sqrt(particule.x * particule.x + particule.z * particule.z);
      const targetDistance = this.rayonHelice * 0.8;
      
      if (distance > targetDistance) {
        particule.vx -= Math.cos(angle) * attractionForce;
        particule.vz -= Math.sin(angle) * attractionForce;
      }
      
      particule.x += particule.vx;
      particule.y += particule.vy;
      particule.z += particule.vz;
      
      // Friction et gravité légère
      particule.vx *= 0.98;
      particule.vy += 0.01; // Légère gravité vers le haut (anti-gravité biologique)
      particule.vz *= 0.98;
      
      // Pulsation bioluminescente
      const progression = particule.vie / particule.maxVie;
      particule.alpha = (1 - progression) * (0.6 + Math.sin(particule.pulsation * 2) * 0.4);
      
      if (particule.vie >= particule.maxVie) {
        particule.active = false;
      }
    });
  }
  
  update(deltaTime) {
    this.temps += deltaTime;
    this.updateHelices(deltaTime);
    this.updateCaracteres(deltaTime);
    this.updateParticules(deltaTime);
  }
  
  // Projection 3D vers 2D
  project3D(x, y, z, centerX, centerY) {
    const distance = 400;
    const scale = distance / (distance + z);
    return {
      x: centerX + x * scale,
      y: centerY - y * scale,
      scale: scale
    };
  }
  
  render(ctx, element, deltaTime) {
    const { x, y, width, height } = element;
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    
    ctx.save();
    
    // Rendu de l'hélice A
    ctx.strokeStyle = `rgba(${this.getCouleurEvolution().r}, ${this.getCouleurEvolution().g}, ${this.getCouleurEvolution().b}, 0.6)`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let premierPoint = true;
    this.heliceA.forEach((point, i) => {
      if (point.intensite <= 0) return;
      
      const rotatedX = point.x * Math.cos(this.rotationGlobale) - point.z * Math.sin(this.rotationGlobale);
      const rotatedZ = point.x * Math.sin(this.rotationGlobale) + point.z * Math.cos(this.rotationGlobale);
      
      const projected = this.project3D(rotatedX, point.hauteur, rotatedZ, centerX, centerY);
      
      ctx.globalAlpha = point.intensite * 0.8;
      
      if (premierPoint) {
        ctx.moveTo(projected.x, projected.y);
        premierPoint = false;
      } else {
        ctx.lineTo(projected.x, projected.y);
      }
    });
    ctx.stroke();
    
    // Rendu de l'hélice B
    const couleurB = this.getCouleurEvolution();
    ctx.strokeStyle = `rgba(${couleurB.r}, ${Math.floor(couleurB.g * 0.7)}, ${couleurB.b}, 0.6)`;
    ctx.beginPath();
    
    premierPoint = true;
    this.heliceB.forEach((point, i) => {
      if (point.intensite <= 0) return;
      
      const rotatedX = point.x * Math.cos(this.rotationGlobale) - point.z * Math.sin(this.rotationGlobale);
      const rotatedZ = point.x * Math.sin(this.rotationGlobale) + point.z * Math.cos(this.rotationGlobale);
      
      const projected = this.project3D(rotatedX, point.hauteur, rotatedZ, centerX, centerY);
      
      ctx.globalAlpha = point.intensite * 0.8;
      
      if (premierPoint) {
        ctx.moveTo(projected.x, projected.y);
        premierPoint = false;
      } else {
        ctx.lineTo(projected.x, projected.y);
      }
    });
    ctx.stroke();
    
    // Rendu des connexions entre brins
    this.connexionsBrins.forEach(connexion => {
      if (!connexion.visible || connexion.force <= 0) return;
      
      const pointA = this.heliceA[connexion.indexA];
      const pointB = this.heliceB[connexion.indexB];
      
      const rotatedAX = pointA.x * Math.cos(this.rotationGlobale) - pointA.z * Math.sin(this.rotationGlobale);
      const rotatedAZ = pointA.x * Math.sin(this.rotationGlobale) + pointA.z * Math.cos(this.rotationGlobale);
      const rotatedBX = pointB.x * Math.cos(this.rotationGlobale) - pointB.z * Math.sin(this.rotationGlobale);
      const rotatedBZ = pointB.x * Math.sin(this.rotationGlobale) + pointB.z * Math.cos(this.rotationGlobale);
      
      const projectedA = this.project3D(rotatedAX, pointA.hauteur, rotatedAZ, centerX, centerY);
      const projectedB = this.project3D(rotatedBX, pointB.hauteur, rotatedBZ, centerX, centerY);
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${connexion.force * 0.3})`;
      ctx.lineWidth = 2;
      ctx.globalAlpha = connexion.force;
      
      ctx.beginPath();
      ctx.moveTo(projectedA.x, projectedA.y);
      ctx.lineTo(projectedB.x, projectedB.y);
      ctx.stroke();
    });
    
    // Rendu des particules bioluminescentes
    this.particulesBio.forEach(particule => {
      if (!particule.active || particule.alpha <= 0) return;
      
      const rotatedX = particule.x * Math.cos(this.rotationGlobale) - particule.z * Math.sin(this.rotationGlobale);
      const rotatedZ = particule.x * Math.sin(this.rotationGlobale) + particule.z * Math.cos(this.rotationGlobale);
      
      const projected = this.project3D(rotatedX, particule.y, rotatedZ, centerX, centerY);
      
      ctx.fillStyle = `rgba(${particule.couleur.r}, ${particule.couleur.g}, ${particule.couleur.b}, ${particule.alpha})`;
      ctx.globalAlpha = particule.alpha;
      
      const taille = particule.taille * projected.scale;
      ctx.fillRect(projected.x - taille/2, projected.y - taille/2, taille, taille);
      
      // Effet de glow pour les particules
      if (particule.typeParticule === 'nucleotide') {
        ctx.shadowColor = `rgba(${particule.couleur.r}, ${particule.couleur.g}, ${particule.couleur.b}, 0.5)`;
        ctx.shadowBlur = 8 * projected.scale;
        ctx.fillRect(projected.x - taille/4, projected.y - taille/4, taille/2, taille/2);
        ctx.shadowBlur = 0;
      }
    });
    
    // Rendu des caractères
    this.caracteres.forEach((char, index) => {
      if (!char.visible || char.progression <= 0) return;
      
      const angle = char.angleHelice + this.rotationGlobale;
      const rotatedX = Math.cos(angle) * this.rayonHelice * 0.3;
      const rotatedZ = Math.sin(angle) * this.rayonHelice * 0.3;
      
      const projected = this.project3D(rotatedX, char.hauteur, rotatedZ, centerX, centerY);
      
      const couleur = this.getCouleurEvolution();
      const pulsation = 0.8 + Math.sin(char.pulsation * 3) * 0.2;
      const taille = Math.floor(height * 0.4 * char.progression * projected.scale * pulsation);
      
      ctx.font = `bold ${taille}px 'Courier New', monospace`;
      ctx.fillStyle = `rgba(${couleur.r}, ${couleur.g}, ${couleur.b}, ${char.progression})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = char.progression * pulsation;
      
      // Effet de glow sur le texte
      ctx.shadowColor = `rgba(${couleur.r}, ${couleur.g}, ${couleur.b}, 0.8)`;
      ctx.shadowBlur = 10;
      ctx.fillText(char.char, projected.x, projected.y);
      ctx.shadowBlur = 0;
    });
    
    ctx.restore();
  }
  
  destroy() {
    this.particulesBio = [];
    this.heliceA = [];
    this.heliceB = [];
    this.connexionsBrins = [];
    this.caracteres = [];
  }
    
  }
};
