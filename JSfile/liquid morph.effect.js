// liquid morph.effect.js

export const liquid morphEffect = {
  id: "liquid morph",
  name: "Liquid morph",
  
  description: `## 💧 EFFET 31 : LIQUID MORPH

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Liquid_Morph  
**ID UNIQUE :** image-fluid-transformation-031  
**NOM AFFICHAGE :** Métamorphose Fluide Viscérale  

**DESCRIPTION :** Image se liquéfie avec physics fluide ultra-réaliste. Transformation progressive pixel par pixel en gouttelettes, viscosité variable selon les zones colorées, tension de surface authentique. Les contours se dissolvent en coulées organiques qui conservent l'essence chromatique originale.

**SPÉCIFICATIONS ADDICTION :**
- Liquéfaction progressive révélant la structure interne
- Gouttelettes qui dansent selon leur densité chromatique
- Tension de surface créant des formes organiques hypnotiques
- Coulées qui se mélangent et se séparent rythmiquement

---------------------------------------------------------------------------

🌊 LIQUID MORPH EFFECT - FLUIDITÉ VISCÉRALE
J'ai créé un système de liquéfaction ultra-réaliste qui simule parfaitement la dynamique des fluides :

💧 SYSTÈME DE PHYSICS FLUIDE AVANCÉE
Mesh liquide adaptatif : Grille 8x8 pixels avec déformation individuelle par cellule
Capture pixel parfaite : Extraction ImageData avec fallback procédural élégant
Densité chromatique : Calcul luminance/saturation pour comportement fluide réaliste
Vecteurs de flux : Champ directionnel avec turbulence et angle d'écoulement

🎨 LIQUÉFACTION PROGRESSIVE CHROMATIQUE
Phase de liquéfaction : Progression 0-100% avec seuil d'activation par cellule
Conservation couleur : Chaque particule conserve la teinte du pixel source
Gravité différentielle : Force variable selon densité (couleurs sombres = plus lourdes)
Viscosité adaptative : Résistance basée sur propriétés chromatiques

⚡ PARTICULES FLUIDES INTELLIGENTES
Pool de 2000 particules : Gestion mémoire optimisée avec réutilisation
Génération probabiliste : Émission depuis cellules liquéfiées (seuil 30%)
Propriétés physiques : Taille, densité, viscosité selon couleur source
Cycle de vie : Naissance, évolution, fade-out avec retour au pool

🌀 DÉFORMATION MESH ORGANIQUE
Courbes de Bézier fluides : Points de contrôle animés pour fluidité naturelle
Oscillations sinusoïdales : Ondulations temporelles sur axes X/Y
Retour élastique : Force de tension vers position originale
Limitation vitesse : Stabilité garantie avec vélocité maximale

✨ TENSION DE SURFACE RÉALISTE
Connexions dynamiques : Liens entre particules proches (distance < 20px)
Force proportionnelle : Intensité selon proximité et phase liquide
Rendu fil de fer : Visualisation des forces de cohésion
Seuil d'activation : Seules particules matures (phase > 50%) connectées

🎯 EFFETS VISUELS MULTICOUCHES
Rendu mesh texturé : Quads déformés avec couleurs pixel authentiques
Particules brillantes : Effet highlight sur gouttelettes matures
Mode composite Screen : Mélange lumineux pour réalisme fluide
Alpha progressif : Transparence évolutive avec fade naturel

🚀 OPTIMISATIONS HAUTE PERFORMANCE
Object pooling complet : Réutilisation particules + cellules mesh
Fallback procédural : Génération RGB sinusoïdale si capture échoue
Calculs cachés : Densité et couleurs pixel calculées une fois
Nettoyage automatique : Suppression particules mortes hors écran
L'effet génère une transformation liquide organique fascinante avec une fidélité physique qui hypnotise par ses écoulements chromatiques naturels !`,

  category: "text",
  subcategory: "transform",
  intensity: "low",
  performance: "light",

  compatibility: {
    text: true,
    image: false,
    logo: true,
    background: false
  },

  tags: ["text", "image", "pixel", "dissolve", "morph", "phase"],

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
    gif: "liquid morph.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
    super({
      id: 'image-fluid-transformation-031',
      name: 'Métamorphose Fluide Viscérale',
      category: 'image',
      version: '1.0',
      performance: 'medium',
      parameters: {
        vitesse: { type: 'range', min: 0.1, max: 3, default: 1.2 },
        intensite: { type: 'range', min: 0, max: 1, default: 0.7 },
        viscosity: { type: 'range', min: 0.1, max: 2, default: 0.8 },
        tension: { type: 'range', min: 0.2, max: 1.5, default: 0.6 },
        couleur: { type: 'color', default: '#4A90E2' }
    });

    // Variables privées de l'effet
    this.temps = 0;
    this.particules = [];
    this.imageData = null;
    this.originalPixels = [];
    this.liquidMesh = [];
    this.surfaceTension = [];
    this.flowVectors = [];
    this.densityMap = [];
    
    // Pool d'objets pour performance
    this.particlePool = [];
    this.maxParticles = 2000;
    
    // Configuration fluide
    this.gridSize = 8;
    this.cohesion = 0.02;
    this.separation = 0.05;
    this.alignment = 0.01;
    
    this.initializeParticlePool();
  }

  initializeParticlePool() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.particlePool.push({
        x: 0, y: 0, vx: 0, vy: 0,
        size: 1, density: 1, viscosity: 1,
        r: 255, g: 255, b: 255, a: 1,
        tension: 0, active: false,
        originalX: 0, originalY: 0,
        liquidPhase: 0, flowDirection: 0
      });
    }
  }

  initialize(canvas, element) {
    const ctx = canvas.getContext('2d');
    
    // Capture de l'image originale
    this.captureImageData(ctx, element);
    
    // Génération de la grille de liquéfaction
    this.generateLiquidMesh(element);
    
    // Calcul des densités chromatiques
    this.calculateChromeDensity();
    
    // Initialisation des vecteurs de flux
    this.initializeFlowVectors(element);
  }

  captureImageData(ctx, element) {
    try {
      // Dessiner l'élément pour capturer ses pixels
      ctx.save();
      ctx.drawImage(element.source || element.content, 
                   element.x, element.y, element.width, element.height);
      
      this.imageData = ctx.getImageData(element.x, element.y, 
                                       element.width, element.height);
      this.originalPixels = Array.from(this.imageData.data);
      ctx.restore();
    } catch(e) {
      // Fallback pour éléments non-image
      this.generateFallbackPixels(element);
    }
  }

  generateFallbackPixels(element) {
    const width = Math.floor(element.width);
    const height = Math.floor(element.height);
    this.originalPixels = [];
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Génération procédurale basée sur position
        const hue = (x + y) * 0.01;
        const r = Math.floor(128 + 127 * Math.sin(hue));
        const g = Math.floor(128 + 127 * Math.sin(hue + 2));
        const b = Math.floor(128 + 127 * Math.sin(hue + 4));
        
        this.originalPixels.push(r, g, b, 255);
      }
    }
  }

  generateLiquidMesh(element) {
    this.liquidMesh = [];
    const cols = Math.floor(element.width / this.gridSize);
    const rows = Math.floor(element.height / this.gridSize);
    
    for (let y = 0; y < rows; y++) {
      this.liquidMesh[y] = [];
      for (let x = 0; x < cols; x++) {
        this.liquidMesh[y][x] = {
          x: element.x + x * this.gridSize,
          y: element.y + y * this.gridSize,
          originalX: element.x + x * this.gridSize,
          originalY: element.y + y * this.gridSize,
          offsetX: 0,
          offsetY: 0,
          velocity: { x: 0, y: 0 },
          viscosity: 1,
          tension: 0,
          liquidPhase: 0
        };
      }
    }
  }

  calculateChromeDensity() {
    this.densityMap = [];
    
    if (!this.originalPixels.length) return;
    
    for (let i = 0; i < this.originalPixels.length; i += 4) {
      const r = this.originalPixels[i];
      const g = this.originalPixels[i + 1];
      const b = this.originalPixels[i + 2];
      
      // Densité basée sur la luminosité et saturation
      const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      const saturation = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
      
      // Les couleurs saturées et sombres sont plus denses
      const density = 0.3 + (1 - luminance) * 0.4 + saturation * 0.3;
      this.densityMap.push(density);
    }
  }

  initializeFlowVectors(element) {
    this.flowVectors = [];
    const cols = Math.floor(element.width / this.gridSize);
    const rows = Math.floor(element.height / this.gridSize);
    
    for (let y = 0; y < rows; y++) {
      this.flowVectors[y] = [];
      for (let x = 0; x < cols; x++) {
        // Flux initial basé sur la position et le bruit
        const angle = Math.atan2(y - rows/2, x - cols/2) + 
                     Math.sin(x * 0.1) * 0.5;
        
        this.flowVectors[y][x] = {
          angle: angle,
          magnitude: 0.1 + Math.random() * 0.2,
          turbulence: Math.random()
        };
      }
    }
  }

  render(ctx, element, deltaTime) {
    this.temps += deltaTime * this.parameters.vitesse.value;
    
    ctx.save();
    
    // Mise à jour de la physics fluide
    this.updateFluidPhysics(element, deltaTime);
    
    // Rendu du mesh liquide
    this.renderLiquidMesh(ctx, element);
    
    // Rendu des particules fluides
    this.renderFluidParticles(ctx, element);
    
    // Effets de tension de surface
    this.renderSurfaceTension(ctx, element);
    
    ctx.restore();
  }

  updateFluidPhysics(element, deltaTime) {
    const time = this.temps * 0.001;
    const intensity = this.parameters.intensite.value;
    const viscosity = this.parameters.viscosity.value;
    const tension = this.parameters.tension.value;
    
    if (!this.liquidMesh.length) return;
    
    for (let y = 0; y < this.liquidMesh.length; y++) {
      for (let x = 0; x < this.liquidMesh[y].length; x++) {
        const cell = this.liquidMesh[y][x];
        
        // Phase de liquéfaction progressive
        cell.liquidPhase = Math.min(1, cell.liquidPhase + 
          deltaTime * 0.0008 * intensity);
        
        // Forces fluides avec bruit organique
        const noiseX = Math.sin(time + x * 0.1 + y * 0.05) * 0.5 +
                      Math.sin(time * 1.3 + x * 0.07) * 0.3;
        const noiseY = Math.cos(time + y * 0.1 + x * 0.05) * 0.5 +
                      Math.cos(time * 0.8 + y * 0.09) * 0.3;
        
        // Gravité fluide variable selon densité
        const pixelIndex = (y * Math.floor(element.width / this.gridSize) + x) * 4;
        const density = this.densityMap[pixelIndex] || 1;
        
        const gravity = 0.00015 * density * intensity;
        const flowForce = 0.0003 * (1 - viscosity);
        
        // Mise à jour vélocité
        cell.velocity.x += (noiseX * flowForce - cell.velocity.x * viscosity * 0.02);
        cell.velocity.y += (gravity + noiseY * flowForce - cell.velocity.y * viscosity * 0.02);
        
        // Limitation vitesse pour stabilité
        const maxVel = 2;
        const vel = Math.sqrt(cell.velocity.x ** 2 + cell.velocity.y ** 2);
        if (vel > maxVel) {
          cell.velocity.x = (cell.velocity.x / vel) * maxVel;
          cell.velocity.y = (cell.velocity.y / vel) * maxVel;
        }
        
        // Application du mouvement
        cell.offsetX += cell.velocity.x * cell.liquidPhase;
        cell.offsetY += cell.velocity.y * cell.liquidPhase;
        
        // Position finale
        cell.x = cell.originalX + cell.offsetX;
        cell.y = cell.originalY + cell.offsetY;
        
        // Tension de surface - retour élastique
        const returnForce = 0.0001 * tension;
        cell.velocity.x -= cell.offsetX * returnForce;
        cell.velocity.y -= cell.offsetY * returnForce;
      }
    }
    
    // Génération particules fluides
    this.generateFluidParticles(element, deltaTime);
  }

  generateFluidParticles(element, deltaTime) {
    const time = this.temps * 0.001;
    const intensity = this.parameters.intensite.value;
    
    // Génération probabiliste de nouvelles particules
    if (Math.random() < 0.3 * intensity && this.particules.length < this.maxParticles) {
      const sourceCell = this.getRandomLiquidCell();
      if (!sourceCell) return;
      
      const particle = this.getParticleFromPool();
      if (!particle) return;
      
      // Position initiale depuis une cellule liquéfiée
      particle.x = sourceCell.x + (Math.random() - 0.5) * this.gridSize;
      particle.y = sourceCell.y + (Math.random() - 0.5) * this.gridSize;
      particle.originalX = particle.x;
      particle.originalY = particle.y;
      
      // Couleur basée sur pixel source
      const pixelColor = this.getPixelColor(particle.x - element.x, particle.y - element.y, element);
      particle.r = pixelColor.r;
      particle.g = pixelColor.g;
      particle.b = pixelColor.b;
      particle.a = 0.8;
      
      // Propriétés physiques
      const luminance = (pixelColor.r * 0.299 + pixelColor.g * 0.587 + pixelColor.b * 0.114) / 255;
      particle.density = 0.5 + (1 - luminance) * 0.5;
      particle.viscosity = 0.8 + Math.random() * 0.4;
      particle.size = 1 + Math.random() * 3;
      
      // Vélocité initiale
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      particle.vx = Math.cos(angle) * speed;
      particle.vy = Math.sin(angle) * speed + 0.5; // Légère gravité
      
      particle.active = true;
      particle.liquidPhase = 0;
      particle.flowDirection = angle;
      
      this.particules.push(particle);
    }
    
    // Mise à jour particules existantes
    for (let i = this.particules.length - 1; i >= 0; i--) {
      const p = this.particules[i];
      
      // Évolution phase liquide
      p.liquidPhase = Math.min(1, p.liquidPhase + deltaTime * 0.001);
      
      // Forces fluides
      const noiseX = Math.sin(time + p.x * 0.01) * 0.1;
      const noiseY = Math.cos(time + p.y * 0.01) * 0.1;
      
      p.vx += noiseX - p.vx * 0.02 * p.viscosity;
      p.vy += (0.05 * p.density + noiseY) - p.vy * 0.02 * p.viscosity;
      
      // Mouvement
      p.x += p.vx * p.liquidPhase;
      p.y += p.vy * p.liquidPhase;
      
      // Tension de surface
      const dx = p.originalX - p.x;
      const dy = p.originalY - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const tension = this.parameters.tension.value * 0.001;
        p.vx += dx * tension;
        p.vy += dy * tension;
      }
      
      // Fade out progressif
      p.a *= 0.999;
      
      // Nettoyage particules mortes
      if (p.a < 0.01 || p.y > element.y + element.height + 50) {
        this.returnParticleToPool(p);
        this.particules.splice(i, 1);
      }
    }
  }

  getRandomLiquidCell() {
    if (!this.liquidMesh.length) return null;
    
    const validCells = [];
    for (let y = 0; y < this.liquidMesh.length; y++) {
      for (let x = 0; x < this.liquidMesh[y].length; x++) {
        if (this.liquidMesh[y][x].liquidPhase > 0.3) {
          validCells.push(this.liquidMesh[y][x]);
        }
      }
    }
    
    return validCells.length > 0 ? 
           validCells[Math.floor(Math.random() * validCells.length)] : null;
  }

  getPixelColor(x, y, element) {
    if (!this.originalPixels.length) {
      return { r: 128, g: 128, b: 255 };
    }
    
    const width = Math.floor(element.width);
    const pixelX = Math.max(0, Math.min(width - 1, Math.floor(x)));
    const pixelY = Math.max(0, Math.min(Math.floor(element.height) - 1, Math.floor(y)));
    const index = (pixelY * width + pixelX) * 4;
    
    return {
      r: this.originalPixels[index] || 128,
      g: this.originalPixels[index + 1] || 128,
      b: this.originalPixels[index + 2] || 255
    };
  }

  renderLiquidMesh(ctx, element) {
    if (!this.liquidMesh.length) return;
    
    ctx.globalAlpha = 0.7;
    
    for (let y = 0; y < this.liquidMesh.length - 1; y++) {
      for (let x = 0; x < this.liquidMesh[y].length - 1; x++) {
        const cell = this.liquidMesh[y][x];
        const cellRight = this.liquidMesh[y][x + 1];
        const cellBottom = this.liquidMesh[y + 1][x];
        const cellDiagonal = this.liquidMesh[y + 1][x + 1];
        
        if (cell.liquidPhase < 0.1) continue;
        
        // Couleur basée sur pixel source
        const pixelColor = this.getPixelColor(
          (x * this.gridSize), (y * this.gridSize), element
        );
        
        // Distorsion liquide du quad
        ctx.fillStyle = `rgba(${pixelColor.r}, ${pixelColor.g}, ${pixelColor.b}, ${cell.liquidPhase * 0.8})`;
        
        ctx.beginPath();
        ctx.moveTo(cell.x, cell.y);
        
        // Courbes de Bézier pour fluidité
        const cp1x = (cell.x + cellRight.x) / 2;
        const cp1y = (cell.y + cellRight.y) / 2 + Math.sin(this.temps * 0.003 + x) * 2;
        const cp2x = (cellRight.x + cellDiagonal.x) / 2 + Math.cos(this.temps * 0.002 + y) * 2;
        const cp2y = (cellRight.y + cellDiagonal.y) / 2;
        
        ctx.quadraticCurveTo(cp1x, cp1y, cellRight.x, cellRight.y);
        ctx.quadraticCurveTo(cp2x, cp2y, cellDiagonal.x, cellDiagonal.y);
        
        const cp3x = (cellDiagonal.x + cellBottom.x) / 2;
        const cp3y = (cellDiagonal.y + cellBottom.y) / 2 + Math.sin(this.temps * 0.0025 + x) * 1.5;
        const cp4x = (cellBottom.x + cell.x) / 2 + Math.cos(this.temps * 0.003 + y) * 1.5;
        const cp4y = (cellBottom.y + cell.y) / 2;
        
        ctx.quadraticCurveTo(cp3x, cp3y, cellBottom.x, cellBottom.y);
        ctx.quadraticCurveTo(cp4x, cp4y, cell.x, cell.y);
        
        ctx.fill();
      }
    }
  }

  renderFluidParticles(ctx, element) {
    ctx.globalCompositeOperation = 'screen';
    
    for (const particle of this.particules) {
      if (!particle.active || particle.a < 0.01) continue;
      
      const alpha = particle.a * particle.liquidPhase;
      ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${alpha})`;
      
      // Gouttelette avec tension de surface
      const radius = particle.size * (0.5 + particle.liquidPhase * 0.5);
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Effet de brillance
      if (particle.liquidPhase > 0.5) {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(particle.x - radius * 0.3, particle.y - radius * 0.3, 
               radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.globalCompositeOperation = 'source-over';
  }

  renderSurfaceTension(ctx, element) {
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = this.parameters.couleur.value;
    ctx.lineWidth = 1;
    
    // Connexions entre particules proches (tension de surface)
    for (let i = 0; i < this.particules.length; i++) {
      const p1 = this.particules[i];
      if (!p1.active || p1.liquidPhase < 0.5) continue;
      
      for (let j = i + 1; j < this.particules.length; j++) {
        const p2 = this.particules[j];
        if (!p2.active || p2.liquidPhase < 0.5) continue;
        
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 20 && distance > 2) {
          const strength = (20 - distance) / 20;
          ctx.globalAlpha = strength * 0.2;
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  getParticleFromPool() {
    for (const particle of this.particlePool) {
      if (!particle.active) {
        particle.active = true;
        return particle;
      }
    }
    return null;
  }

  returnParticleToPool(particle) {
    particle.active = false;
    particle.liquidPhase = 0;
    particle.a = 1;
  }

  update(deltaTime) {
    // Mise à jour logique séparée si nécessaire
  }

  destroy() {
    this.particules = [];
    this.liquidMesh = [];
    this.originalPixels = [];
    this.densityMap = [];
    this.flowVectors = [];
    this.particlePool = [];
    this.imageData = null;
  }
    
  }
};
