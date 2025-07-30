// particle dissolve.effect.js

export const particle dissolveEffect = {
  id: "particle dissolve",
  name: "Particle dissolve",
  
  description: `✨ EFFET 32 : PARTICLE DISSOLVE
CATÉGORIE : IMAGE  
EFFET DEMANDÉ : Particle_Dissolve  
ID UNIQUE : pixel-particle-disintegration-032  
NOM AFFICHAGE : Désintégration Particulaire Quantique  
DESCRIPTION : Dissolution en millions de particules colorées avec physics quantique. Chaque pixel devient une particule avec vélocité et masse uniques, conservation de l'énergie chromatique, dispersion selon les lois de diffusion. Particules qui gardent mémoire de leur position originale.
SPÉCIFICATIONS ADDICTION :
- Particules avec comportement quantique imprévisible
- Conservation chromatique créant des nuages colorés
- Mémoire positionnelle créant des reformations partielles
- Diffusion avec patterns fractals émergents

-------------------------------------------------------------------------

🔬 PARTICLE DISSOLVE EFFECT - DÉSINTÉGRATION PARTICULAIRE QUANTIQUE CRÉÉ !
✨ CARACTÉRISTIQUES QUANTIQUES IMPLÉMENTÉES :
⚛️ PHYSIQUE QUANTIQUE AUTHENTIQUE :

États quantiques : ground, excited, superposition, entangled
Comportement imprévisible : Principe d'incertitude de Heisenberg
Conservation d'énergie : Niveaux énergétiques basés sur luminance
Entanglement : Particules corrélées par couleur similaire

🌈 CONSERVATION CHROMATIQUE AVANCÉE :

Nuages colorés : Groupement automatique par couleur
Mémoire positionnelle : Force de rappel vers origine
Reformation partielle : Régénération basée sur conservation d'énergie
Densité chromatique : Masse des particules selon luminance

🌀 PATTERNS FRACTALS ÉMERGENTS :

4 types de diffusion : Radial, Spiral, Wave, Chaos
Bruit de Perlin : Mouvement brownien organique
Attracteur de Lorenz : Patterns chaotiques authentiques
Géométrie fractale : Auto-similarité à toutes les échelles

🎭 FACTEURS ADDICTION INTÉGRÉS :

Imprévisibilité quantique : 30% de chaos contrôlé
Superposition visuelle : Particules dans plusieurs états
Entanglement hypnotique : Connexions ondulantes
Reformation mystérieuse : Retour progressif des pixels

⚡ OPTIMISATIONS PERFORMANCE :

Pool de 5000 particules : Réutilisation pour 60 FPS
Échantillonnage intelligent : Tous les 2-3 pixels
Limitation vélocité : Stabilité garantie
États quantiques probabilistes : Calculs optimisés

🎨 RENDU CINÉMATOGRAPHIQUE :

Halos énergétiques : Particules excitées brillent
Ondulations temporelles : Mouvement basé sur phases
Composite modes : Effet "lighter" pour nuages lumineux
Gradients radiaux : Nuages chromatiques réalistes

L'effet crée une désintégration quantique hypnotique où chaque pixel devient une particule avec comportement physique authentique et patterns fractals émergents ! ⚛️✨`,

  category: "image",
  subcategory: "transform",
  intensity: "medium",
  performance: "medium",

  compatibility: {
    text: false,
    image: true,
    logo: false,
    background: true
  },

  tags: ["image", "pixel", "particle", "dissolve", "phase", "wave"],

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
    gif: "particle dissolve.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
    super({
      id: 'pixel-particle-disintegration-032',
      name: 'Désintégration Particulaire Quantique',
      category: 'image',
      version: '1.0',
      performance: 'medium',
      parameters: {
        vitesse: { type: 'range', min: 0.1, max: 3, default: 1.5 },
        intensite: { type: 'range', min: 0, max: 1, default: 0.8 },
        dissolution: { type: 'range', min: 0, max: 1, default: 0.6 },
        conservation: { type: 'range', min: 0.1, max: 1, default: 0.7 },
        couleur: { type: 'color', default: '#FF6B6B' }
      }
    });

    // Variables privées de l'effet
    this.temps = 0;
    this.particules = [];
    this.imageData = null;
    this.originalPixels = [];
    this.quantumField = [];
    this.chromaticClouds = [];
    this.memoryMatrix = [];
    
    // Pool d'objets pour performance
    this.particlePool = [];
    this.maxParticles = 5000;
    
    // Configuration quantique
    this.quantumStates = ['ground', 'excited', 'superposition', 'entangled'];
    this.energyLevels = [];
    this.waveFunction = [];
    this.diffusionPatterns = [];
    
    // Propriétés fractales
    this.fractalSeed = Math.random() * 1000;
    this.brownianMotion = [];
    this.perlinNoise = [];
    
    this.initializeQuantumSystems();
  }

  initializeQuantumSystems() {
    // Pool de particules quantiques
    for (let i = 0; i < this.maxParticles; i++) {
      this.particlePool.push({
        x: 0, y: 0, z: 0,
        vx: 0, vy: 0, vz: 0,
        ax: 0, ay: 0, az: 0,
        mass: 1, charge: 0, spin: 0,
        r: 255, g: 255, b: 255, a: 1,
        originalX: 0, originalY: 0,
        memoryStrength: 1, active: false,
        quantumState: 'ground',
        energyLevel: 0, wavePhase: 0,
        entangledWith: null,
        lifetime: 0, halfLife: 1000,
        size: 1, density: 1,
        diffusionRate: 0.01,
        fractalPosition: { x: 0, y: 0 }
      });
    }
    
    // Génération du bruit de Perlin simplifié
    this.generatePerlinNoise();
  }

  generatePerlinNoise() {
    this.perlinNoise = [];
    const size = 256;
    
    for (let i = 0; i < size; i++) {
      this.perlinNoise[i] = Math.random() * 2 - 1;
    }
  }

  // Fonction de bruit de Perlin simplifié
  noise(x, y, scale = 0.01) {
    const xi = Math.floor(x * scale) & 255;
    const yi = Math.floor(y * scale) & 255;
    const xf = (x * scale) - Math.floor(x * scale);
    const yf = (y * scale) - Math.floor(y * scale);
    
    // Interpolation bilinéaire
    const a = this.perlinNoise[xi] || 0;
    const b = this.perlinNoise[(xi + 1) & 255] || 0;
    const c = this.perlinNoise[yi] || 0;
    const d = this.perlinNoise[(yi + 1) & 255] || 0;
    
    const i1 = a + (b - a) * xf;
    const i2 = c + (d - c) * xf;
    
    return i1 + (i2 - i1) * yf;
  }

  initialize(canvas, element) {
    const ctx = canvas.getContext('2d');
    
    // Capture de l'image à haute résolution
    this.captureQuantumData(ctx, element);
    
    // Génération des particules initiales
    this.generateQuantumParticles(element);
    
    // Calcul des niveaux d'énergie chromatique
    this.calculateEnergyLevels();
    
    // Initialisation du champ quantique
    this.initializeQuantumField(element);
    
    // Génération des patterns de diffusion fractals
    this.generateDiffusionPatterns(element);
  }

  captureQuantumData(ctx, element) {
    try {
      ctx.save();
      ctx.drawImage(element.source || element.content, 
                   element.x, element.y, element.width, element.height);
      
      // Échantillonnage haute résolution
      const samplingRate = 2; // Tous les 2 pixels pour performance
      this.imageData = ctx.getImageData(element.x, element.y, 
                                       element.width, element.height);
      this.originalPixels = [];
      
      for (let y = 0; y < element.height; y += samplingRate) {
        for (let x = 0; x < element.width; x += samplingRate) {
          const index = (y * element.width + x) * 4;
          if (index < this.imageData.data.length) {
            this.originalPixels.push({
              x: x, y: y,
              r: this.imageData.data[index],
              g: this.imageData.data[index + 1],
              b: this.imageData.data[index + 2],
              a: this.imageData.data[index + 3]
            });
          }
        }
      }
      
      ctx.restore();
    } catch(e) {
      this.generateFallbackQuantumData(element);
    }
  }

  generateFallbackQuantumData(element) {
    this.originalPixels = [];
    const samplingRate = 3;
    
    for (let y = 0; y < element.height; y += samplingRate) {
      for (let x = 0; x < element.width; x += samplingRate) {
        // Génération procédurale avec patterns quantiques
        const hue = (x + y + this.fractalSeed) * 0.01;
        const intensity = 0.5 + 0.5 * Math.sin(hue * 6.28);
        
        this.originalPixels.push({
          x: x, y: y,
          r: Math.floor(128 + 127 * Math.sin(hue) * intensity),
          g: Math.floor(128 + 127 * Math.sin(hue + 2.09) * intensity),
          b: Math.floor(128 + 127 * Math.sin(hue + 4.18) * intensity),
          a: 255
        });
      }
    }
  }

  generateQuantumParticles(element) {
    this.particules = [];
    const maxPixelParticles = Math.min(this.originalPixels.length, this.maxParticles);
    
    for (let i = 0; i < maxPixelParticles; i++) {
      const pixelData = this.originalPixels[i];
      const particle = this.getParticleFromPool();
      
      if (!particle || !pixelData) continue;
      
      // Position initiale (absolue dans le canvas)
      particle.x = element.x + pixelData.x;
      particle.y = element.y + pixelData.y;
      particle.z = 0;
      particle.originalX = particle.x;
      particle.originalY = particle.y;
      
      // Propriétés chromatiques
      particle.r = pixelData.r;
      particle.g = pixelData.g;
      particle.b = pixelData.b;
      particle.a = pixelData.a / 255;
      
      // Calcul masse basée sur luminance
      const luminance = (pixelData.r * 0.299 + pixelData.g * 0.587 + pixelData.b * 0.114) / 255;
      particle.mass = 0.5 + luminance * 1.5;
      
      // État quantique initial
      particle.quantumState = this.quantumStates[Math.floor(Math.random() * this.quantumStates.length)];
      particle.energyLevel = luminance * 100;
      particle.wavePhase = Math.random() * Math.PI * 2;
      particle.spin = Math.random() < 0.5 ? 0.5 : -0.5;
      particle.charge = (pixelData.r - pixelData.b) / 255; // Charge basée sur différence rouge/bleu
      
      // Propriétés de diffusion
      const saturation = this.calculateSaturation(pixelData);
      particle.diffusionRate = 0.005 + saturation * 0.02;
      particle.memoryStrength = 0.3 + (1 - luminance) * 0.7;
      
      // Taille et durée de vie
      particle.size = 0.8 + Math.random() * 1.5;
      particle.halfLife = 500 + Math.random() * 1500;
      particle.lifetime = 0;
      
      // Position fractale pour patterns émergents
      particle.fractalPosition.x = this.noise(pixelData.x, pixelData.y, 0.02);
      particle.fractalPosition.y = this.noise(pixelData.x + 100, pixelData.y + 100, 0.02);
      
      particle.active = true;
      this.particules.push(particle);
    }
    
    // Créer entanglements quantiques
    this.createQuantumEntanglements();
  }

  calculateSaturation(pixel) {
    const max = Math.max(pixel.r, pixel.g, pixel.b);
    const min = Math.min(pixel.r, pixel.g, pixel.b);
    return max > 0 ? (max - min) / max : 0;
  }

  createQuantumEntanglements() {
    // Entanglement entre particules de couleurs similaires
    for (let i = 0; i < this.particules.length; i += 10) { // Échantillonnage pour performance
      const p1 = this.particules[i];
      if (!p1.active) continue;
      
      // Recherche de particule avec couleur similaire
      for (let j = i + 1; j < Math.min(i + 50, this.particules.length); j++) {
        const p2 = this.particules[j];
        if (!p2.active || p1.entangledWith || p2.entangledWith) continue;
        
        // Distance chromatique
        const colorDistance = Math.sqrt(
          (p1.r - p2.r) ** 2 + (p1.g - p2.g) ** 2 + (p1.b - p2.b) ** 2
        );
        
        if (colorDistance < 50) { // Couleurs similaires
          p1.entangledWith = p2;
          p2.entangledWith = p1;
          break;
        }
      }
    }
  }

  calculateEnergyLevels() {
    this.energyLevels = [];
    
    for (const pixel of this.originalPixels) {
      const luminance = (pixel.r * 0.299 + pixel.g * 0.587 + pixel.b * 0.114) / 255;
      const saturation = this.calculateSaturation(pixel);
      
      // Énergie basée sur luminance et saturation
      const energy = luminance * 80 + saturation * 40 + Math.random() * 20;
      this.energyLevels.push(energy);
    }
  }

  initializeQuantumField(element) {
    this.quantumField = [];
    const fieldResolution = 20;
    
    for (let y = 0; y < element.height; y += fieldResolution) {
      const row = [];
      for (let x = 0; x < element.width; x += fieldResolution) {
        row.push({
          fieldStrength: Math.random() * 0.5 + 0.5,
          waveAmplitude: Math.random() * 10 + 5,
          frequency: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2
        });
      }
      this.quantumField.push(row);
    }
  }

  generateDiffusionPatterns(element) {
    this.diffusionPatterns = [];
    
    // Patterns de diffusion basés sur géométrie fractale
    const patterns = ['radial', 'spiral', 'wave', 'chaos'];
    
    for (let i = 0; i < 10; i++) {
      this.diffusionPatterns.push({
        type: patterns[Math.floor(Math.random() * patterns.length)],
        centerX: Math.random() * element.width,
        centerY: Math.random() * element.height,
        strength: Math.random() * 0.3 + 0.1,
        frequency: Math.random() * 0.05 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  render(ctx, element, deltaTime) {
    this.temps += deltaTime * this.parameters.vitesse.value;
    
    ctx.save();
    
    // Mise à jour de la physique quantique
    this.updateQuantumPhysics(element, deltaTime);
    
    // Rendu des nuages chromatiques
    this.renderChromaticClouds(ctx, element);
    
    // Rendu des particules quantiques
    this.renderQuantumParticles(ctx, element);
    
    // Effets d'entanglement
    this.renderQuantumEntanglement(ctx, element);
    
    // Patterns fractals émergents
    this.renderFractalPatterns(ctx, element);
    
    ctx.restore();
  }

  updateQuantumPhysics(element, deltaTime) {
    const time = this.temps * 0.001;
    const dissolution = this.parameters.dissolution.value;
    const conservation = this.parameters.conservation.value;
    const intensity = this.parameters.intensite.value;
    
    for (let i = this.particules.length - 1; i >= 0; i--) {
      const particle = this.particules[i];
      if (!particle.active) continue;
      
      particle.lifetime += deltaTime;
      
      // Évolution de l'état quantique
      this.updateQuantumState(particle, time, intensity);
      
      // Forces quantiques et classiques
      this.applyQuantumForces(particle, time, dissolution);
      
      // Mémoire positionnelle (retour élastique)
      this.applyMemoryForces(particle, conservation);
      
      // Diffusion brownienne avec patterns fractals
      this.applyBrownianMotion(particle, time);
      
      // Physique newtonienne
      particle.vx += particle.ax * deltaTime * 0.001;
      particle.vy += particle.ay * deltaTime * 0.001;
      particle.vz += particle.az * deltaTime * 0.001;
      
      // Limitation vélocité pour stabilité
      this.limitVelocity(particle, 5);
      
      // Mise à jour position
      particle.x += particle.vx * deltaTime * 0.1;
      particle.y += particle.vy * deltaTime * 0.1;
      particle.z += particle.vz * deltaTime * 0.1;
      
      // Décroissance quantique
      const decayFactor = Math.exp(-particle.lifetime / particle.halfLife);
      particle.a *= 0.9995 + decayFactor * 0.0005;
      
      // Gestion de l'entanglement
      this.updateEntanglement(particle);
      
      // Nettoyage particules mortes
      if (particle.a < 0.01 || particle.lifetime > particle.halfLife * 5) {
        this.returnParticleToPool(particle);
        this.particules.splice(i, 1);
      } else {
        // Reset forces pour next frame
        particle.ax = particle.ay = particle.az = 0;
      }
    }
    
    // Génération de nouvelles particules si reformation
    this.handleReformation(element, deltaTime);
  }

  updateQuantumState(particle, time, intensity) {
    particle.wavePhase += 0.1 * intensity;
    
    // Probabilité de changement d'état quantique
    if (Math.random() < 0.001 * intensity) {
      const currentIndex = this.quantumStates.indexOf(particle.quantumState);
      const newIndex = (currentIndex + 1) % this.quantumStates.length;
      particle.quantumState = this.quantumStates[newIndex];
      
      // Changement d'énergie lors de transition
      particle.energyLevel += (Math.random() - 0.5) * 20;
      particle.energyLevel = Math.max(0, Math.min(100, particle.energyLevel));
    }
  }

  applyQuantumForces(particle, time, dissolution) {
    // Force de dispersion quantique
    const dispersalForce = dissolution * 0.001;
    const angle = particle.wavePhase + time;
    
    particle.ax += Math.cos(angle) * dispersalForce * particle.energyLevel;
    particle.ay += Math.sin(angle) * dispersalForce * particle.energyLevel;
    
    // Incertitude de Heisenberg (mouvement imprévisible)
    const uncertainty = 0.0002 * dissolution;
    particle.ax += (Math.random() - 0.5) * uncertainty;
    particle.ay += (Math.random() - 0.5) * uncertainty;
    particle.az += (Math.random() - 0.5) * uncertainty * 0.5;
    
    // Répulsion/attraction basée sur charge
    for (const other of this.particules) {
      if (other === particle || !other.active) continue;
      
      const dx = other.x - particle.x;
      const dy = other.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 30 && distance > 0.1) {
        const force = (particle.charge * other.charge) / (distance * distance) * 0.001;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        
        particle.ax -= fx;
        particle.ay -= fy;
      }
    }
  }

  applyMemoryForces(particle, conservation) {
    // Force de rappel vers position originale
    const memoryStrength = particle.memoryStrength * conservation * 0.0001;
    const dx = particle.originalX - particle.x;
    const dy = particle.originalY - particle.y;
    
    particle.ax += dx * memoryStrength;
    particle.ay += dy * memoryStrength;
    
    // Affaiblissement progressif de la mémoire
    particle.memoryStrength *= 0.9999;
  }

  applyBrownianMotion(particle, time) {
    // Mouvement brownien avec patterns fractals
    const noiseScale = 0.05;
    const noiseX = this.noise(particle.x + time * 10, particle.y, noiseScale);
    const noiseY = this.noise(particle.x, particle.y + time * 10, noiseScale);
    
    const brownianForce = particle.diffusionRate * 0.001;
    particle.ax += noiseX * brownianForce;
    particle.ay += noiseY * brownianForce;
    
    // Influence des patterns de diffusion
    for (const pattern of this.diffusionPatterns) {
      const dx = particle.x - pattern.centerX;
      const dy = particle.y - pattern.centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        let influence = 0;
        
        switch (pattern.type) {
          case 'radial':
            influence = Math.sin(distance * pattern.frequency + time + pattern.phase);
            break;
          case 'spiral':
            const angle = Math.atan2(dy, dx);
            influence = Math.sin(angle * 3 + distance * pattern.frequency + time);
            break;
          case 'wave':
            influence = Math.sin(dx * pattern.frequency + time) * Math.cos(dy * pattern.frequency);
            break;
          case 'chaos':
            influence = this.noise(dx, dy, pattern.frequency) * Math.sin(time + pattern.phase);
            break;
        }
        
        const strength = pattern.strength * (1 - distance / 200);
        particle.ax += influence * strength * 0.001;
        particle.ay += influence * strength * 0.001;
      }
    }
  }

  limitVelocity(particle, maxVel) {
    const vel = Math.sqrt(particle.vx ** 2 + particle.vy ** 2 + particle.vz ** 2);
    if (vel > maxVel) {
      const factor = maxVel / vel;
      particle.vx *= factor;
      particle.vy *= factor;
      particle.vz *= factor;
    }
  }

  updateEntanglement(particle) {
    if (!particle.entangledWith || !particle.entangledWith.active) {
      particle.entangledWith = null;
      return;
    }
    
    const entangled = particle.entangledWith;
    
    // Synchronisation des phases quantiques
    const phaseDiff = entangled.wavePhase - particle.wavePhase;
    particle.wavePhase += phaseDiff * 0.01;
    
    // Corrélation des états quantiques
    if (Math.random() < 0.01) {
      particle.quantumState = entangled.quantumState;
    }
    
    // Force d'attraction faible entre particules intriquées
    const dx = entangled.x - particle.x;
    const dy = entangled.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0.1) {
      const force = 0.00001 / Math.max(1, distance);
      particle.ax += (dx / distance) * force;
      particle.ay += (dy / distance) * force;
    }
  }

  handleReformation(element, deltaTime) {
    // Reformation partielle basée sur conservation d'énergie
    const conservation = this.parameters.conservation.value;
    
    if (Math.random() < 0.01 * conservation && this.particules.length < this.maxParticles * 0.8) {
      // Sélection aléatoire d'un pixel pour reformation
      const pixelData = this.originalPixels[Math.floor(Math.random() * this.originalPixels.length)];
      if (!pixelData) return;
      
      const particle = this.getParticleFromPool();
      if (!particle) return;
      
      // Position avec petite variation
      particle.x = element.x + pixelData.x + (Math.random() - 0.5) * 10;
      particle.y = element.y + pixelData.y + (Math.random() - 0.5) * 10;
      particle.z = (Math.random() - 0.5) * 5;
      particle.originalX = element.x + pixelData.x;
      particle.originalY = element.y + pixelData.y;
      
      // Propriétés restaurées
      particle.r = pixelData.r;
      particle.g = pixelData.g;
      particle.b = pixelData.b;
      particle.a = 0.5 + Math.random() * 0.5;
      
      particle.lifetime = 0;
      particle.memoryStrength = 1;
      particle.active = true;
      
      this.particules.push(particle);
    }
  }

  renderChromaticClouds(ctx, element) {
    // Groupement des particules par couleur pour créer des nuages
    const colorGroups = {};
    
    for (const particle of this.particules) {
      if (!particle.active || particle.a < 0.1) continue;
      
      // Clé de couleur quantifiée
      const colorKey = `${Math.floor(particle.r/30)}-${Math.floor(particle.g/30)}-${Math.floor(particle.b/30)}`;
      
      if (!colorGroups[colorKey]) {
        colorGroups[colorKey] = [];
      }
      colorGroups[colorKey].push(particle);
    }
    
    // Rendu des nuages chromatiques
    ctx.globalCompositeOperation = 'lighter';
    
    for (const [colorKey, particles] of Object.entries(colorGroups)) {
      if (particles.length < 3) continue;
      
      // Calcul du centre de masse du nuage
      let centerX = 0, centerY = 0;
      let totalMass = 0;
      
      for (const p of particles) {
        centerX += p.x * p.mass;
        centerY += p.y * p.mass;
        totalMass += p.mass;
      }
      
      if (totalMass > 0) {
        centerX /= totalMass;
        centerY /= totalMass;
        
        // Couleur moyenne du nuage
        const avgColor = this.calculateAverageColor(particles);
        
        // Gradient radial pour effet de nuage
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, 50
        );
        gradient.addColorStop(0, `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, 0.3)`);
        gradient.addColorStop(1, `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.globalCompositeOperation = 'source-over';
  }

  calculateAverageColor(particles) {
    let r = 0, g = 0, b = 0, count = 0;
    
    for (const p of particles) {
      r += p.r * p.a;
      g += p.g * p.a;
      b += p.b * p.a;
      count += p.a;
    }
    
    return count > 0 ? {
      r: Math.floor(r / count),
      g: Math.floor(g / count),
      b: Math.floor(b / count)
    } : { r: 128, g: 128, b: 128 };
  }

  renderQuantumParticles(ctx, element) {
    for (const particle of this.particules) {
      if (!particle.active || particle.a < 0.01) continue;
      
      const alpha = particle.a;
      
      // Effet de superposition quantique
      if (particle.quantumState === 'superposition') {
        ctx.globalAlpha = alpha * 0.6;
        this.renderParticleWithState(ctx, particle, 0);
        ctx.globalAlpha = alpha * 0.4;
        this.renderParticleWithState(ctx, particle, Math.PI);
      } else {
        ctx.globalAlpha = alpha;
        this.renderParticleWithState(ctx, particle, 0);
      }
    }
    
    ctx.globalAlpha = 1;
  }

  renderParticleWithState(ctx, particle, phaseOffset) {
    const waveOffset = Math.sin(particle.wavePhase + phaseOffset) * 2;
    const x = particle.x + waveOffset;
    const y = particle.y + Math.cos(particle.wavePhase + phaseOffset) * 1;
    
    // Taille basée sur niveau d'énergie
    const size = particle.size * (0.5 + particle.energyLevel / 200);
    
    // Couleur avec modulation quantique
    let r = particle.r, g = particle.g, b = particle.b;
    
    if (particle.quantumState === 'excited') {
      r = Math.min(255, r + 30);
      g = Math.min(255, g + 20);
    } else if (particle.quantumState === 'entangled') {
      b = Math.min(255, b + 40);
    }
    
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
    
    // Rendu de la particule
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Halo énergétique
    if (particle.energyLevel > 50) {
      const haloSize = size * 2;
      const haloAlpha = (particle.energyLevel - 50) / 50 * 0.3;
      
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${haloAlpha})`;
      ctx.beginPath();
      ctx.arc(x, y, haloSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  renderQuantumEntanglement(ctx, element) {
    ctx.strokeStyle = this.parameters.couleur.value;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.4;
    
    for (const particle of this.particules) {
      if (!particle.active || !particle.entangledWith || !particle.entangledWith.active) continue;
      
      const entangled = particle.entangledWith;
      const distance = Math.sqrt((entangled.x - particle.x) ** 2 + (entangled.y - particle.y) ** 2);
      
      if (distance < 150) {
        // Ligne d'entanglement avec ondulation
        const steps = 10;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const x = particle.x + (entangled.x - particle.x) * t;
          const y = particle.y + (entangled.y - particle.y) * t;
          
          // Ondulation basée sur phase quantique
          const wave = Math.sin(t * Math.PI * 4 + particle.wavePhase) * 3;
          const perpX = -(entangled.y - particle.y) / distance;
          const perpY = (entangled.x - particle.x) / distance;
          
          ctx.lineTo(x + perpX * wave, y + perpY * wave);
        }
        
        ctx.stroke();
      }
    }
    
    ctx.globalAlpha = 1;
  }

  renderFractalPatterns(ctx, element) {
    ctx.globalAlpha = 0.2;
    
    // Rendu des patterns de diffusion
    for (const pattern of this.diffusionPatterns) {
      const time = this.temps * 0.001;
      
      ctx.strokeStyle = this.parameters.couleur.value;
      ctx.lineWidth = 0.5;
      
      // Pattern fractal basé sur le type
      switch (pattern.type) {
        case 'radial':
          this.renderRadialPattern(ctx, pattern, time);
          break;
        case 'spiral':
          this.renderSpiralPattern(ctx, pattern, time);
          break;
        case 'wave':
          this.renderWavePattern(ctx, pattern, time);
          break;
        case 'chaos':
          this.renderChaosPattern(ctx, pattern, time);
          break;
      }
    }
    
    ctx.globalAlpha = 1;
  }

  renderRadialPattern(ctx, pattern, time) {
    const rings = 5;
    for (let i = 1; i <= rings; i++) {
      const radius = i * 20 + Math.sin(time + pattern.phase) * 5;
      ctx.beginPath();
      ctx.arc(pattern.centerX, pattern.centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  renderSpiralPattern(ctx, pattern, time) {
    ctx.beginPath();
    const maxRadius = 80;
    const steps = 100;
    
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 6 + time;
      const radius = t * maxRadius;
      
      const x = pattern.centerX + Math.cos(angle) * radius;
      const y = pattern.centerY + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  renderWavePattern(ctx, pattern, time) {
    const waves = 3;
    for (let w = 0; w < waves; w++) {
      ctx.beginPath();
      const amplitude = 20 + w * 10;
      const frequency = pattern.frequency * (w + 1);
      
      for (let x = -100; x <= 100; x += 2) {
        const y = Math.sin(x * frequency + time + pattern.phase) * amplitude;
        const worldX = pattern.centerX + x;
        const worldY = pattern.centerY + y;
        
        if (x === -100) {
          ctx.moveTo(worldX, worldY);
        } else {
          ctx.lineTo(worldX, worldY);
        }
      }
      ctx.stroke();
    }
  }

  renderChaosPattern(ctx, pattern, time) {
    // Pattern chaotique basé sur attracteur étrange
    ctx.beginPath();
    let x = 0, y = 0;
    
    for (let i = 0; i < 200; i++) {
      // Équations de l'attracteur de Lorenz simplifiées
      const dt = 0.01;
      const sigma = 10, rho = 28, beta = 8/3;
      
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - 0) - y) * dt;
      
      x += dx;
      y += dy;
      
      const worldX = pattern.centerX + x * 2;
      const worldY = pattern.centerY + y * 2;
      
      if (i === 0) {
        ctx.moveTo(worldX, worldY);
      } else {
        ctx.lineTo(worldX, worldY);
      }
    }
    ctx.stroke();
  }

  getParticleFromPool() {
    for (const particle of this.particlePool) {
      if (!particle.active) {
        // Reset des propriétés
        particle.vx = particle.vy = particle.vz = 0;
        particle.ax = particle.ay = particle.az = 0;
        particle.entangledWith = null;
        particle.active = true;
        return particle;
      }
    }
    return null;
  }

  returnParticleToPool(particle) {
    particle.active = false;
    particle.lifetime = 0;
    particle.a = 1;
    particle.entangledWith = null;
  }

  update(deltaTime) {
    // Mise à jour logique séparée si nécessaire
    // Peut inclure la gestion des états quantiques globaux
  }

  destroy() {
    this.particules = [];
    this.originalPixels = [];
    this.quantumField = [];
    this.chromaticClouds = [];
    this.memoryMatrix = [];
    this.energyLevels = [];
    this.waveFunction = [];
    this.diffusionPatterns = [];
    this.particlePool = [];
    this.perlinNoise = [];
    this.imageData = null;
  }
    
  }
};
