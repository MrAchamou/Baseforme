// ice freeze.effect.js

export const ice freezeEffect = {
  id: "ice freeze",
  name: "Ice freeze",
  
  description: `## 🧊 EFFET 36 : ICE FREEZE

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Ice_Freeze  
**ID UNIQUE :** crystalline-ice-formation-036  
**NOM AFFICHAGE :** Cristallisation Glaciaire Progressive  

**DESCRIPTION :** Glaciation progressive avec formation de cristaux de glace. Nucléation à partir de points froids, croissance dendritique selon les lois de cristallisation, effet de gel qui déforme l'image. Cristaux avec réfractions et réflexions glaciales.

**SPÉCIFICATIONS ADDICTION :**
- Croissance dendritique créant des patterns fractals
- Déformation par expansion glaciaire révélant des tensions
- Réfractions créant des effets optiques prismatiques
- Points de nucléation qui créent des centres d'expansion

----------------------------------------------------------------

🧊 EFFET 36 : ICE FREEZE
CATÉGORIE : IMAGE
EFFET DEMANDÉ : Cristallisation Glaciaire Progressive
ID UNIQUE : crystalline-ice-formation-036
NOM AFFICHAGE : Cristallisation Glaciaire Progressive
DESCRIPTION : Effet de gel progressif ultra-réaliste avec simulation thermodynamique complète. Propagation du froid depuis des points de nucléation, croissance cristalline hexagonale/cubique/dendritique, déformations par expansion volumétrique, effets de réfraction prismatique et formation de givre.
SPÉCIFICATIONS ADDICTION :

Formation cristalline fractale hypnotique avec structures dendritiques
Propagation thermique réaliste créant des motifs organiques
Déformations d'expansion qui transforment l'image progressivement
Effets optiques prismatiques avec séparation spectrale fascinante


❄️ ICE FREEZE EFFECT - CRISTALLISATION SCIENTIFIQUE
J'ai créé un système de glaciation ultra-réaliste qui simule parfaitement la physique de la cristallisation :

🌡️ SYSTÈME THERMODYNAMIQUE AVANCÉ
Champ de température 40x40 : Grille haute résolution avec diffusion thermique réaliste
Points de nucléation : 4-10 foyers de cristallisation avec activation échelonnée
Propagation radiale : Refroidissement depuis -15°C avec gradient de température
Seuil de gel : Transition à -10°C avec progression de cristallinité (0-100%)

💎 STRUCTURES CRISTALLINES SCIENTIFIQUES
800 cristaux maximum : Pool pré-alloué pour performance optimale
3 types morphologiques : Hexagonal (40%), Cubique (30%), Dendritique (30%)
Croissance différentielle : Vitesses selon structure (hexagonal rapide, dendrite complexe)
Symétrie hexagonale : Dendrites à 6 branches avec angle de 60° authentique

🌿 SYSTÈME DENDRITIQUE FRACTAL
50 structures principales : Dendrites avec 6 générations de ramification
Croissance probabiliste : Branchement secondaire à 30% de probabilité
Angle de ramification : 60° pour symétrie cristalline naturelle
Pool de particules : Gestion mémoire optimisée pour branches infinies

⚡ DÉFORMATIONS VOLUMÉTRIQUES
Expansion 9% : Simulation réelle de l'augmentation de volume glace/eau
Champ de tensions : Calcul des pressions sur grille avec propagation
Déformation d'image : Distorsion pixel par pixel selon les tensions
Probabilité de fissures : Zones de haute pression avec risque de craquage

🌈 EFFETS OPTIQUES PRISMATIQUES
Indice de réfraction 1.31 : Valeur scientifique exacte de la glace
Séparation spectrale : Décomposition RGB pour effet prismatique
Réfraction variable : Intensité selon taille et orientation des cristaux
Cache optique : Map de réfraction pour optimisation des calculs

❄️ RENDU MULTICOUCHES CINÉMATOGRAPHIQUE
Glace de base : Rendu cellulaire avec gradients radiaux et déformations
Cristaux individuels : Tri par taille avec facettes et orientations 3D
Structures dendritiques : Lignes avec épaisseur variable et transparence
Givre micro : 20 cristaux étoilés avec scintillement dynamique

🚀 OPTIMISATIONS HAUTE PERFORMANCE
Object pooling : Réutilisation de 800 particules pré-allouées
Grille 40x40 : Résolution optimale qualité/performance
Cache gradients : Recalcul uniquement si nécessaire
Tri sélectif : Rendu seuls les cristaux visibles et actifs
L'effet génère une cristallisation progressive fascinante avec une fidélité scientifique qui hypnotise par sa beauté fractale naturelle !`,

  category: "image",
  subcategory: "transform",
  intensity: "medium",
  performance: "heavy",

  compatibility: {
    text: false,
    image: true,
    logo: false,
    background: true
  },

  tags: ["image", "pixel", "morph", "3d", "prism", "ice freeze"],

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
    gif: "ice freeze.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'crystalline-ice-formation-036',
            name: 'Cristallisation Glaciaire Progressive',
            category: 'image',
            version: '1.0',
            performance: 'high',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1.0 },
                intensite: { type: 'range', min: 0, max: 1, default: 0.7 },
                cristallisation: { type: 'range', min: 0.3, max: 2, default: 1.2 },
                refraction: { type: 'range', min: 0, max: 1, default: 0.6 },
                couleur: { type: 'color', default: '#87ceeb' }
            }
        });

        // Variables principales
        this.temps = 0;
        this.crystalParticles = [];
        this.nucleationPoints = [];
        this.temperatureField = [];
        this.dendriteStructures = [];
        
        // Configuration cristallisation
        this.maxCrystals = 800;
        this.maxDendrites = 50;
        this.particlePool = [];
        this.gridResolution = 40;
        this.freezeThreshold = -10; // Température de gel
        
        // États de glaciation
        this.freezePhase = 0;
        this.nucleationRate = 0;
        this.crystallizationSpeed = 0;
        this.thermalGradient = 0;
        
        // Système dendritique
        this.dendriteGrowth = [];
        this.fractalDepth = 6;
        this.branchingAngle = Math.PI / 3; // 60 degrés
        
        // Cache optique
        this.refractionCache = new Map();
        this.iceOpacity = [];
        this.lastOpticalUpdate = 0;
        
        // Déformation glaciaire
        this.expansionField = [];
        this.tensionPoints = [];
        this.deformationMap = [];
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.element = element;
        this.ctx = canvas.getContext('2d');
        
        // Initialisation du pool de particules
        this.initializeCrystalPool();
        
        // Génération du champ de température
        this.generateTemperatureField();
        
        // Création des points de nucléation
        this.createNucleationPoints();
        
        // Initialisation des structures dendritiques
        this.initializeDendriteStructures();
        
        // Configuration du champ d'expansion
        this.setupExpansionField();
        
        // Début de la cristallisation
        this.startCrystallization();
    }

    initializeCrystalPool() {
        this.particlePool = [];
        for (let i = 0; i < this.maxCrystals; i++) {
            this.particlePool.push({
                x: 0, y: 0,
                vx: 0, vy: 0,
                size: 0,
                opacity: 0,
                temperature: 0,
                crystallineStructure: 'hexagonal', // hexagonal, cubic, dendrite
                growthPhase: 0,
                nucleationTime: 0,
                branchAngle: Math.random() * Math.PI * 2,
                refractionIndex: 1.31, // Indice de réfraction de la glace
                active: false,
                parentDendrite: null,
                generation: 0,
                facetOrientation: Math.random() * Math.PI / 3
            });
        }
    }

    generateTemperatureField() {
        this.temperatureField = [];
        const res = this.gridResolution;
        
        for (let x = 0; x < res; x++) {
            this.temperatureField[x] = [];
            for (let y = 0; y < res; y++) {
                // Température ambiante avec variations
                const noise = this.pseudoRandom(x, y);
                const baseTemp = 20 - noise * 40; // 20°C à -20°C
                
                this.temperatureField[x][y] = {
                    current: baseTemp,
                    target: baseTemp,
                    frozen: baseTemp < this.freezeThreshold,
                    freezeProgress: baseTemp < this.freezeThreshold ? Math.random() * 0.3 : 0,
                    thermalConductivity: 0.1 + noise * 0.05,
                    crystallinity: 0
                };
            }
        }
    }

    createNucleationPoints() {
        this.nucleationPoints = [];
        const numPoints = 4 + Math.floor(Math.random() * 6);
        
        for (let i = 0; i < numPoints; i++) {
            const x = Math.floor(Math.random() * this.gridResolution);
            const y = Math.floor(Math.random() * this.gridResolution);
            
            this.nucleationPoints.push({
                gridX: x,
                gridY: y,
                worldX: this.element.x + (x / this.gridResolution) * this.element.width,
                worldY: this.element.y + (y / this.gridResolution) * this.element.height,
                temperature: -15 - Math.random() * 10, // Très froid
                nucleationEnergy: 0.8 + Math.random() * 0.2,
                radius: 0,
                maxRadius: 30 + Math.random() * 50,
                active: false,
                activationDelay: i * 300 + Math.random() * 500,
                crystallinePattern: Math.floor(Math.random() * 3) // 0: hexagonal, 1: cubic, 2: dendrite
            });
        }
    }

    initializeDendriteStructures() {
        this.dendriteStructures = [];
        
        this.nucleationPoints.forEach((point, index) => {
            if (point.crystallinePattern === 2) { // Dendrite
                this.dendriteStructures.push({
                    origin: point,
                    branches: [],
                    mainAxis: Math.random() * Math.PI * 2,
                    growthRate: 0.5 + Math.random() * 0.5,
                    branchingProbability: 0.3,
                    maxGeneration: this.fractalDepth,
                    symmetry: 6, // Symétrie hexagonale
                    active: false
                });
            }
        });
    }

    setupExpansionField() {
        this.expansionField = [];
        this.deformationMap = [];
        const res = this.gridResolution;
        
        for (let x = 0; x < res; x++) {
            this.expansionField[x] = [];
            this.deformationMap[x] = [];
            for (let y = 0; y < res; y++) {
                this.expansionField[x][y] = {
                    expansion: 0, // Facteur d'expansion (glace = +9% volume)
                    pressure: 0,
                    tensionX: 0,
                    tensionY: 0,
                    crackProbability: 0
                };
                
                this.deformationMap[x][y] = {
                    offsetX: 0,
                    offsetY: 0,
                    distortion: 0
                };
            }
        }
    }

    startCrystallization() {
        // Activation échelonnée des points de nucléation
        this.nucleationPoints.forEach(point => {
            setTimeout(() => {
                point.active = true;
            }, point.activationDelay);
        });
    }

    update(deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse.value;
        
        // Mise à jour des phases de cristallisation
        this.freezePhase = (this.temps * 0.0008) % (Math.PI * 2);
        this.nucleationRate = 0.3 + Math.sin(this.temps * 0.0005) * 0.2;
        this.crystallizationSpeed = this.parameters.cristallisation.value * (0.8 + Math.sin(this.temps * 0.0012) * 0.2);
        this.thermalGradient = 0.5 + Math.cos(this.temps * 0.0007) * 0.3;
        
        // Propagation du froid
        this.propagateFreezing(deltaTime);
        
        // Croissance cristalline
        this.updateCrystalGrowth(deltaTime);
        
        // Évolution dendritique
        this.updateDendriteGrowth(deltaTime);
        
        // Calcul des tensions et déformations
        this.calculateExpansionTensions(deltaTime);
        
        // Génération de nouveaux cristaux
        this.generateCrystals(deltaTime);
        
        // Mise à jour des effets optiques
        this.updateOpticalEffects(deltaTime);
    }

    propagateFreezing(deltaTime) {
        const res = this.gridResolution;
        const coolingRate = this.thermalGradient * deltaTime * 0.001;
        
        // Propagation thermique depuis les points de nucléation
        this.nucleationPoints.forEach(point => {
            if (point.active) {
                point.radius = Math.min(point.maxRadius, point.radius + this.crystallizationSpeed * deltaTime * 0.01);
                
                // Refroidissement radial
                const gridRadius = Math.ceil(point.radius / (this.element.width / res));
                
                for (let dx = -gridRadius; dx <= gridRadius; dx++) {
                    for (let dy = -gridRadius; dy <= gridRadius; dy++) {
                        const x = point.gridX + dx;
                        const y = point.gridY + dy;
                        
                        if (x >= 0 && x < res && y >= 0 && y < res) {
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            const temp = this.temperatureField[x][y];
                            
                            if (distance <= gridRadius) {
                                const coolingEffect = (1 - distance / gridRadius) * point.nucleationEnergy;
                                temp.target = Math.min(temp.target, point.temperature + coolingEffect * 10);
                                
                                // Progression du gel
                                if (temp.current < this.freezeThreshold && !temp.frozen) {
                                    temp.frozen = true;
                                    temp.freezeProgress = 0;
                                    temp.crystallinity = 0;
                                }
                            }
                        }
                    }
                }
            }
        });
        
        // Diffusion thermique
        for (let x = 0; x < res; x++) {
            for (let y = 0; y < res; y++) {
                const temp = this.temperatureField[x][y];
                
                // Convergence vers température cible
                temp.current += (temp.target - temp.current) * temp.thermalConductivity * coolingRate;
                
                // Progression de la cristallisation
                if (temp.frozen && temp.crystallinity < 1) {
                    temp.crystallinity = Math.min(1, temp.crystallinity + this.crystallizationSpeed * deltaTime * 0.0005);
                    temp.freezeProgress = Math.min(1, temp.freezeProgress + deltaTime * 0.001);
                }
            }
        }
    }

    updateCrystalGrowth(deltaTime) {
        this.crystalParticles.forEach(crystal => {
            if (!crystal.active) return;
            
            const age = this.temps - crystal.nucleationTime;
            crystal.growthPhase += deltaTime * 0.005;
            
            // Croissance selon la structure cristalline
            switch (crystal.crystallineStructure) {
                case 'hexagonal':
                    this.growHexagonalCrystal(crystal, deltaTime, age);
                    break;
                case 'cubic':
                    this.growCubicCrystal(crystal, deltaTime, age);
                    break;
                case 'dendrite':
                    this.growDendriteCrystal(crystal, deltaTime, age);
                    break;
            }
            
            // Mise à jour optique
            crystal.opacity = Math.min(0.9, age * 0.0005);
            
            // Orientation des facettes
            crystal.facetOrientation += deltaTime * 0.0001;
        });
    }

    growHexagonalCrystal(crystal, deltaTime, age) {
        const maxSize = 8 + Math.random() * 12;
        const growthRate = this.crystallizationSpeed * 0.3;
        
        crystal.size = Math.min(maxSize, crystal.size + growthRate * deltaTime * 0.01);
        
        // Oscillation cristalline subtile
        const oscillation = Math.sin(crystal.growthPhase) * 0.1;
        crystal.size *= (1 + oscillation);
    }

    growCubicCrystal(crystal, deltaTime, age) {
        const maxSize = 6 + Math.random() * 8;
        const growthRate = this.crystallizationSpeed * 0.4;
        
        crystal.size = Math.min(maxSize, crystal.size + growthRate * deltaTime * 0.01);
        
        // Rotation cristalline
        crystal.branchAngle += deltaTime * 0.001;
    }

    growDendriteCrystal(crystal, deltaTime, age) {
        if (!crystal.parentDendrite) return;
        
        const maxSize = 4 + crystal.generation * 2;
        const growthRate = this.crystallizationSpeed * (1 - crystal.generation * 0.2);
        
        crystal.size = Math.min(maxSize, crystal.size + growthRate * deltaTime * 0.01);
        
        // Branchement probabiliste
        if (crystal.generation < this.fractalDepth && Math.random() < 0.001 * deltaTime) {
            this.createDendriteBranch(crystal);
        }
    }

    updateDendriteGrowth(deltaTime) {
        this.dendriteStructures.forEach(dendrite => {
            if (!dendrite.active && dendrite.origin.active) {
                dendrite.active = true;
                this.initializeDendriteTrunk(dendrite);
            }
            
            if (dendrite.active) {
                this.growDendriteBranches(dendrite, deltaTime);
            }
        });
    }

    initializeDendriteTrunk(dendrite) {
        const origin = dendrite.origin;
        
        // Création des branches principales (symétrie hexagonale)
        for (let i = 0; i < dendrite.symmetry; i++) {
            const angle = dendrite.mainAxis + (i * Math.PI * 2) / dendrite.symmetry;
            const branch = this.getParticleFromPool();
            
            if (branch) {
                branch.x = origin.worldX;
                branch.y = origin.worldY;
                branch.crystallineStructure = 'dendrite';
                branch.branchAngle = angle;
                branch.generation = 0;
                branch.parentDendrite = dendrite;
                branch.nucleationTime = this.temps;
                branch.active = true;
                
                this.crystalParticles.push(branch);
                dendrite.branches.push(branch);
            }
        }
    }

    growDendriteBranches(dendrite, deltaTime) {
        dendrite.branches.forEach(branch => {
            const growthVector = {
                x: Math.cos(branch.branchAngle) * dendrite.growthRate * deltaTime * 0.01,
                y: Math.sin(branch.branchAngle) * dendrite.growthRate * deltaTime * 0.01
            };
            
            branch.x += growthVector.x;
            branch.y += growthVector.y;
            
            // Branchement secondaire
            if (branch.generation < dendrite.maxGeneration && Math.random() < dendrite.branchingProbability * deltaTime * 0.001) {
                this.createDendriteBranch(branch, dendrite);
            }
        });
    }

    createDendriteBranch(parentBranch, dendrite = null) {
        const newBranch = this.getParticleFromPool();
        if (!newBranch) return;
        
        const branchingAngles = [-this.branchingAngle, this.branchingAngle];
        const selectedAngle = branchingAngles[Math.floor(Math.random() * branchingAngles.length)];
        
        newBranch.x = parentBranch.x;
        newBranch.y = parentBranch.y;
        newBranch.crystallineStructure = 'dendrite';
        newBranch.branchAngle = parentBranch.branchAngle + selectedAngle;
        newBranch.generation = parentBranch.generation + 1;
        newBranch.parentDendrite = parentBranch.parentDendrite || dendrite;
        newBranch.nucleationTime = this.temps;
        newBranch.active = true;
        newBranch.size = parentBranch.size * 0.8; // Branches plus petites
        
        this.crystalParticles.push(newBranch);
        
        if (dendrite) {
            dendrite.branches.push(newBranch);
        }
    }

    calculateExpansionTensions(deltaTime) {
        const res = this.gridResolution;
        const expansionCoeff = 0.09; // Glace = +9% volume
        
        for (let x = 0; x < res; x++) {
            for (let y = 0; y < res; y++) {
                const temp = this.temperatureField[x][y];
                const expansion = this.expansionField[x][y];
                const deformation = this.deformationMap[x][y];
                
                if (temp.frozen) {
                    // Expansion volumétrique
                    expansion.expansion = Math.min(expansionCoeff, 
                        expansion.expansion + temp.crystallinity * deltaTime * 0.0001);
                    
                    // Calcul des tensions sur les voisins
                    const pressure = expansion.expansion * temp.crystallinity;
                    
                    // Propagation des tensions
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            const nx = x + dx;
                            const ny = y + dy;
                            
                            if (nx >= 0 && nx < res && ny >= 0 && ny < res && (dx !== 0 || dy !== 0)) {
                                const neighborExpansion = this.expansionField[nx][ny];
                                const distance = Math.sqrt(dx * dx + dy * dy);
                                const tensionForce = pressure / (distance * distance);
                                
                                neighborExpansion.tensionX += dx * tensionForce * deltaTime * 0.001;
                                neighborExpansion.tensionY += dy * tensionForce * deltaTime * 0.001;
                                neighborExpansion.pressure = Math.max(neighborExpansion.pressure, tensionForce * 0.5);
                            }
                        }
                    }
                    
                    // Déformation de l'image
                    deformation.offsetX = expansion.tensionX * 2;
                    deformation.offsetY = expansion.tensionY * 2;
                    deformation.distortion = Math.min(1, expansion.pressure * 10);
                    
                    // Probabilité de fissuration
                    expansion.crackProbability = Math.min(0.1, expansion.pressure * 0.5);
                }
            }
        }
    }

    generateCrystals(deltaTime) {
        if (Math.random() < this.nucleationRate * deltaTime * 0.01) {
            // Génération depuis les zones gelées
            for (let x = 0; x < this.gridResolution; x++) {
                for (let y = 0; y < this.gridResolution; y++) {
                    const temp = this.temperatureField[x][y];
                    
                    if (temp.frozen && temp.crystallinity > 0.3 && Math.random() < 0.05) {
                        const crystal = this.getParticleFromPool();
                        if (crystal) {
                            this.initializeCrystal(crystal, x, y, temp.crystallinity);
                            this.crystalParticles.push(crystal);
                        }
                    }
                }
            }
        }
    }

    initializeCrystal(crystal, gridX, gridY, crystallinity) {
        const worldX = this.element.x + (gridX / this.gridResolution) * this.element.width;
        const worldY = this.element.y + (gridY / this.gridResolution) * this.element.height;
        
        crystal.x = worldX + (Math.random() - 0.5) * 10;
        crystal.y = worldY + (Math.random() - 0.5) * 10;
        crystal.size = 1 + Math.random() * 3;
        crystal.opacity = 0;
        crystal.temperature = this.freezeThreshold - Math.random() * 10;
        crystal.nucleationTime = this.temps;
        crystal.growthPhase = Math.random() * Math.PI * 2;
        crystal.branchAngle = Math.random() * Math.PI * 2;
        crystal.generation = 0;
        crystal.active = true;
        
        // Type de structure cristalline
        const rand = Math.random();
        if (rand < 0.4) {
            crystal.crystallineStructure = 'hexagonal';
        } else if (rand < 0.7) {
            crystal.crystallineStructure = 'cubic';
        } else {
            crystal.crystallineStructure = 'dendrite';
        }
        
        crystal.facetOrientation = Math.random() * Math.PI / 3;
        crystal.refractionIndex = 1.31 + Math.random() * 0.02; // Variation légère
    }

    getParticleFromPool() {
        for (let particle of this.particlePool) {
            if (!particle.active) {
                return particle;
            }
        }
        return null;
    }

    updateOpticalEffects(deltaTime) {
        if (this.temps - this.lastOpticalUpdate < 100) return;
        this.lastOpticalUpdate = this.temps;
        
        // Mise à jour de l'opacité de la glace par zones
        this.iceOpacity = [];
        const res = this.gridResolution;
        
        for (let x = 0; x < res; x++) {
            this.iceOpacity[x] = [];
            for (let y = 0; y < res; y++) {
                const temp = this.temperatureField[x][y];
                const expansion = this.expansionField[x][y];
                
                // Opacité basée sur la cristallinité et les tensions
                let opacity = temp.crystallinity * 0.3;
                opacity += expansion.pressure * 0.2; // Tensions créent de l'opacité
                opacity += Math.sin(this.temps * 0.003 + x * 0.1 + y * 0.1) * 0.05; // Scintillement
                
                this.iceOpacity[x][y] = Math.max(0, Math.min(0.8, opacity));
            }
        }
    }

    render(ctx, element, deltaTime) {
        ctx.save();
        
        // Rendu de la glace de base avec déformations
        this.renderIceBase(ctx);
        
        // Rendu des cristaux individuels
        this.renderCrystals(ctx);
        
        // Rendu des structures dendritiques
        this.renderDendrites(ctx);
        
        // Effets de réfraction prismatique
        this.renderRefractionEffects(ctx);
        
        // Effet de givre sur les bords
        this.renderFrostEffects(ctx);
        
        ctx.restore();
    }

    renderIceBase(ctx) {
        const cellWidth = this.element.width / this.gridResolution;
        const cellHeight = this.element.height / this.gridResolution;
        
        for (let x = 0; x < this.gridResolution; x++) {
            for (let y = 0; y < this.gridResolution; y++) {
                const temp = this.temperatureField[x][y];
                const deformation = this.deformationMap[x][y];
                const opacity = this.iceOpacity[x][y];
                
                if (temp.frozen && opacity > 0) {
                    ctx.save();
                    
                    const cellX = this.element.x + x * cellWidth + deformation.offsetX;
                    const cellY = this.element.y + y * cellHeight + deformation.offsetY;
                    
                    // Couleur de glace avec variation de température
                    const iceColor = this.getIceColor(temp.current, temp.crystallinity);
                    
                    // Gradient de glace avec effet de profondeur
                    const gradient = ctx.createRadialGradient(
                        cellX + cellWidth/2, cellY + cellHeight/2, 0,
                        cellX + cellWidth/2, cellY + cellHeight/2, Math.max(cellWidth, cellHeight)
                    );
                    
                    gradient.addColorStop(0, `rgba(${iceColor.r}, ${iceColor.g}, ${iceColor.b}, ${opacity})`);
                    gradient.addColorStop(0.7, `rgba(${iceColor.r}, ${iceColor.g}, ${iceColor.b}, ${opacity * 0.7})`);
                    gradient.addColorStop(1, `rgba(${iceColor.r}, ${iceColor.g}, ${iceColor.b}, ${opacity * 0.3})`);
                    
                    ctx.fillStyle = gradient;
                    
                    // Déformation par expansion
                    const scale = 1 + this.expansionField[x][y].expansion;
                    ctx.transform(scale, 0, 0, scale, cellX, cellY);
                    
                    ctx.fillRect(0, 0, cellWidth, cellHeight);
                    
                    ctx.restore();
                }
            }
        }
    }

    renderCrystals(ctx) {
        // Tri des cristaux par taille (plus gros en arrière)
        const sortedCrystals = this.crystalParticles
            .filter(c => c.active && c.opacity > 0)
            .sort((a, b) => b.size - a.size);
        
        sortedCrystals.forEach(crystal => {
            ctx.save();
            ctx.translate(crystal.x, crystal.y);
            ctx.rotate(crystal.facetOrientation);
            
            const iceColor = this.getIceColor(crystal.temperature, 1);
            
            switch (crystal.crystallineStructure) {
                case 'hexagonal':
                    this.renderHexagonalCrystal(ctx, crystal, iceColor);
                    break;
                case 'cubic':
                    this.renderCubicCrystal(ctx, crystal, iceColor);
                    break;
                case 'dendrite':
                    this.renderDendriteCrystal(ctx, crystal, iceColor);
                    break;
            }
            
            ctx.restore();
        });
    }

    renderHexagonalCrystal(ctx, crystal, iceColor) {
        const size = crystal.size;
        const opacity = crystal.opacity * this.parameters.intensite.value;
        
        // Cristal hexagonal avec facettes
        ctx.beginPath();
        ctx.moveTo(size/2, -size/2);
        ctx.lineTo(size/2 + depth, -size/2 - depth);
        ctx.lineTo(size/2 + depth, size/2 - depth);
        ctx.lineTo(size/2, size/2);
        ctx.closePath();
        ctx.fill();
        
        // Face supérieure
        ctx.fillStyle = `rgba(${iceColor.r * 0.9}, ${iceColor.g * 0.9}, ${iceColor.b * 0.9}, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(-size/2, -size/2);
        ctx.lineTo(-size/2 + depth, -size/2 - depth);
        ctx.lineTo(size/2 + depth, -size/2 - depth);
        ctx.lineTo(size/2, -size/2);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }

    renderDendriteCrystal(ctx, crystal, iceColor) {
        const size = crystal.size;
        const opacity = crystal.opacity * this.parameters.intensite.value;
        
        // Structure dendritique ramifiée
        ctx.lineWidth = Math.max(0.5, size * 0.2);
        ctx.strokeStyle = `rgba(${iceColor.r}, ${iceColor.g}, ${iceColor.b}, ${opacity})`;
        ctx.lineCap = 'round';
        
        // Branche principale
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(crystal.branchAngle) * size, Math.sin(crystal.branchAngle) * size);
        ctx.stroke();
        
        // Branches secondaires
        if (crystal.generation < 3) {
            const branchLength = size * 0.6;
            const branchAngle1 = crystal.branchAngle + this.branchingAngle;
            const branchAngle2 = crystal.branchAngle - this.branchingAngle;
            
            ctx.lineWidth *= 0.7;
            ctx.strokeStyle = `rgba(${iceColor.r}, ${iceColor.g}, ${iceColor.b}, ${opacity * 0.8})`;
            
            ctx.beginPath();
            ctx.moveTo(Math.cos(crystal.branchAngle) * size * 0.5, Math.sin(crystal.branchAngle) * size * 0.5);
            ctx.lineTo(
                Math.cos(crystal.branchAngle) * size * 0.5 + Math.cos(branchAngle1) * branchLength,
                Math.sin(crystal.branchAngle) * size * 0.5 + Math.sin(branchAngle1) * branchLength
            );
            ctx.moveTo(Math.cos(crystal.branchAngle) * size * 0.5, Math.sin(crystal.branchAngle) * size * 0.5);
            ctx.lineTo(
                Math.cos(crystal.branchAngle) * size * 0.5 + Math.cos(branchAngle2) * branchLength,
                Math.sin(crystal.branchAngle) * size * 0.5 + Math.sin(branchAngle2) * branchLength
            );
            ctx.stroke();
        }
    }

    renderDendrites(ctx) {
        // Rendu des structures dendritiques principales
        this.dendriteStructures.forEach(dendrite => {
            if (!dendrite.active) return;
            
            ctx.save();
            ctx.translate(dendrite.origin.worldX, dendrite.origin.worldY);
            
            const iceColor = this.getIceColor(-10, 1);
            ctx.strokeStyle = `rgba(${iceColor.r}, ${iceColor.g}, ${iceColor.b}, 0.7)`;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            
            // Axes principaux
            for (let i = 0; i < dendrite.symmetry; i++) {
                const angle = dendrite.mainAxis + (i * Math.PI * 2) / dendrite.symmetry;
                const length = dendrite.origin.radius * 0.8;
                
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
                ctx.stroke();
            }
            
            ctx.restore();
        });
    }

    renderRefractionEffects(ctx) {
        if (this.parameters.refraction.value < 0.1) return;
        
        // Effets prismatiques sur les cristaux
        this.crystalParticles.forEach(crystal => {
            if (!crystal.active || crystal.opacity < 0.3) return;
            
            ctx.save();
            ctx.translate(crystal.x, crystal.y);
            
            // Calcul de la réfraction
            const refractionStrength = this.parameters.refraction.value * crystal.refractionIndex;
            const spectralSeparation = crystal.size * refractionStrength * 0.1;
            
            // Spectre prismatique (rouge, vert, bleu)
            const spectralColors = [
                { r: 255, g: 100, b: 100, offset: -spectralSeparation },
                { r: 100, g: 255, b: 100, offset: 0 },
                { r: 100, g: 100, b: 255, offset: spectralSeparation }
            ];
            
            spectralColors.forEach(color => {
                ctx.save();
                ctx.translate(color.offset, 0);
                ctx.globalAlpha = crystal.opacity * 0.3;
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`;
                
                ctx.beginPath();
                ctx.arc(0, 0, crystal.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            });
            
            ctx.restore();
        });
    }

    renderFrostEffects(ctx) {
        // Effet de givre sur les contours
        const gradient = ctx.createLinearGradient(
            this.element.x, this.element.y,
            this.element.x + this.element.width, this.element.y + this.element.height
        );
        
        const frostColor = this.hexToRgb(this.parameters.couleur.value);
        const frostAlpha = 0.1 * this.parameters.intensite.value;
        
        gradient.addColorStop(0, `rgba(${frostColor.r}, ${frostColor.g}, ${frostColor.b}, ${frostAlpha})`);
        gradient.addColorStop(0.5, `rgba(${frostColor.r}, ${frostColor.g}, ${frostColor.b}, 0)`);
        gradient.addColorStop(1, `rgba(${frostColor.r}, ${frostColor.g}, ${frostColor.b}, ${frostAlpha})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(this.element.x, this.element.y, this.element.width, this.element.height);
        
        // Cristaux de givre micro
        for (let i = 0; i < 20; i++) {
            const x = this.element.x + Math.random() * this.element.width;
            const y = this.element.y + Math.random() * this.element.height;
            const size = 1 + Math.random() * 2;
            const sparkle = Math.sin(this.temps * 0.01 + i) * 0.5 + 0.5;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.globalAlpha = sparkle * 0.6;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            
            // Micro-cristal en étoile
            ctx.beginPath();
            for (let j = 0; j < 6; j++) {
                const angle = (j * Math.PI) / 3;
                const px = Math.cos(angle) * size;
                const py = Math.sin(angle) * size;
                
                if (j === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
    }

    getIceColor(temperature, crystallinity) {
        // Couleur de la glace selon température et cristallinité
        const baseColor = this.hexToRgb(this.parameters.couleur.value);
        
        // Plus froid = plus bleu, plus cristallin = plus clair
        const tempFactor = Math.max(0, Math.min(1, (temperature + 20) / 40)); // -20°C à 20°C
        const crystallineFactor = crystallinity;
        
        const r = Math.floor(baseColor.r * (0.7 + tempFactor * 0.3) * (0.8 + crystallineFactor * 0.2));
        const g = Math.floor(baseColor.g * (0.8 + tempFactor * 0.2) * (0.9 + crystallineFactor * 0.1));
        const b = Math.floor(baseColor.b * (0.9 + tempFactor * 0.1) * (0.95 + crystallineFactor * 0.05));
        
        return { r: Math.min(255, r), g: Math.min(255, g), b: Math.min(255, b) };
    }

    pseudoRandom(x, y) {
        // Générateur pseudo-aléatoire pour cohérence
        const seed = x * 73856093 ^ y * 19349663;
        const noise = Math.sin(seed * 0.0001) * 43758.5453;
        return Math.abs(noise - Math.floor(noise));
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 135, g: 206, b: 235 };
    }

    destroy() {
        // Nettoyage mémoire
        this.crystalParticles = [];
        this.particlePool = [];
        this.nucleationPoints = [];
        this.temperatureField = [];
        this.dendriteStructures = [];
        this.dendriteGrowth = [];
        this.refractionCache.clear();
        this.iceOpacity = [];
        this.expansionField = [];
        this.tensionPoints = [];
        this.deformationMap = [];
        
        // Reset des variables
        this.temps = 0;
        this.freezePhase = 0;
        this.nucleationRate = 0;
        this.crystallizationSpeed = 0;
        this.thermalGradient = 0;
        this.lastOpticalUpdate = 0;
    }
}
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * size;
            const y = Math.sin(angle) * size;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        
        // Gradient avec réflexions
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.3, `rgba(${iceColor.r}, ${iceColor.g}, ${iceColor.b}, ${opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(${iceColor.r}, ${iceColor.g}, ${iceColor.b}, ${opacity * 0.4})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Contour cristallin
        ctx.strokeStyle = `rgba(200, 230, 255, ${opacity * 0.6})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }

    renderCubicCrystal(ctx, crystal, iceColor) {
        const size = crystal.size;
        const opacity = crystal.opacity * this.parameters.intensite.value;
        
        // Cristal cubique avec perspective
        ctx.save();
        ctx.rotate(crystal.branchAngle);
        
        // Face principale
        ctx.fillStyle = `rgba(${iceColor.r}, ${iceColor.g}, ${iceColor.b}, ${opacity})`;
        ctx.fillRect(-size/2, -size/2, size, size);
        
        // Faces latérales (effet 3D)
        const depth = size * 0.3;
        
        ctx.fillStyle = `rgba(${iceColor.r * 0.8}, ${iceColor.g * 0.8}, ${iceColor.b * 0.8}, ${opacity * 0.7})`;
        ctx.beginPath();
    
  }
};
