// reality glitch.effect.js

export const reality glitchEffect = {
  id: "reality glitch",
  name: "Reality glitch",
  
  description: `## 🌀 EFFET 58 : REALITY GLITCH

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Reality_Glitch  
**ID UNIQUE :** reality-matrix-malfunction-058  
**NOM AFFICHAGE :** Dysfonctionnement Matrice Réalité  

**DESCRIPTION :** Glitches dans la "matrice de réalité" affectant l'image de façon imprévisible. Corruptions de données visuelles, pixels qui refusent d'obéir aux lois physiques, erreurs de rendu créant des impossibilités géométriques. Auto-corrections partielles laissant des traces.

**SPÉCIFICATIONS ADDICTION :**
- Glitches imprévisibles défiant toute logique visuelle
- Corruptions créant des géométries impossibles temporaires
- Auto-corrections partielles laissant des "cicatrices" réalité
- Erreurs en cascade créant des effets domino impossibles

--------------------------------------------------------------------------------

🔴 CARACTÉRISTIQUES HYPNOTIQUES :
⚡ GLITCHES IMPRÉVISIBLES :

9 types d'erreurs : pixel_overflow, dimension_breach, texture_corruption, physics_violation, render_paradox, spatial_inversion, temporal_echo, matrix_leak, data_fragmentation
Logique défiant la réalité : Pixels qui tombent vers le haut, triangles à 4 côtés, objets qui se rendent avant eux-mêmes
Cascades d'erreurs : Une erreur peut déclencher d'autres erreurs en chaîne

🌀 GÉOMÉTRIES IMPOSSIBLES :

Triangles à 4 côtés qui tournent à des vitesses différentes
Inversions spatiales où l'espace se plie sur lui-même
Paradoxes de rendu : objets existant simultanément dans le passé, présent et futur
Dimensions brisées : objets 2.5D flottant entre dimensions

🔧 AUTO-CORRECTIONS PARTIELLES :

Tentatives de réparation aléatoires du système
Cicatrices de réalité permanentes (30% de chance)
Cicatrices qui guérissent progressivement
Corrections ratées créant de nouvelles erreurs

🎨 DÉTAILS ADDICTION :
✨ MICRO-ANIMATIONS :

Code matriciel qui "fuit" dans la réalité (0 et 1 tombant)
Échos temporels avec délais multiples
Grilles de distorsion spatiale animées
Scanlines de corruption balayant l'écran

🔄 IMPRÉVISIBILITÉ CONTRÔLÉE :

Glitches majeurs toutes les 1-5 secondes
30% chance de glitches multiples en cascade
Propagation d'erreurs aléatoire
Récupération matricielle progressive

🎯 RÉVÉLATION PROGRESSIVE :

Structure matricielle révélée par les pannes
Historique d'erreurs dans chaque cellule
Connexions temporelles impossibles visualisées
Profondeur des corruptions découverte graduellement

L'effet crée une fascination technologique en simulant des pannes de "Matrix" réalistes, rendant chaque glitch mystérieux mais cohérent ! 🌀💾`,

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

  tags: ["text", "image", "pixel", "glitch", "dimension", "echo"],

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
    gif: "reality glitch.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'reality-matrix-malfunction-058',
            name: 'Dysfonctionnement Matrice Réalité',
            category: 'image',
            version: '1.0',
            performance: 'medium',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1.5 },
                intensite: { type: 'range', min: 0, max: 1, default: 0.8 },
                couleur: { type: 'color', default: '#00ff00' },
                corruption: { type: 'range', min: 0.1, max: 0.9, default: 0.6 },
                stabilite: { type: 'range', min: 0.1, max: 0.8, default: 0.3 }
            }
        });

        // Variables de glitch
        this.temps = 0;
        this.glitchEvents = [];
        this.corruptedPixels = [];
        this.impossibleGeometries = [];
        this.realityScars = [];
        this.cascadeErrors = [];
        
        // État de la matrice
        this.matrixStability = 1.0;
        this.systemErrors = [];
        this.correctionAttempts = [];
        this.nextMajorGlitch = Math.random() * 2000 + 1000;
        
        // Pool d'objets pour performance
        this.pixelPool = [];
        this.geometryPool = [];
        this.errorPool = [];
        this.maxPixels = 300;
        this.maxGeometries = 50;
        this.maxErrors = 100;
        
        // Types d'erreurs
        this.errorTypes = [
            'pixel_overflow', 'dimension_breach', 'texture_corruption',
            'physics_violation', 'render_paradox', 'data_fragmentation',
            'spatial_inversion', 'temporal_echo', 'matrix_leak'
        ];
        
        this.initializePools();
        this.setupMatrixGrid();
    }

    initializePools() {
        // Pool de pixels corrompus
        for (let i = 0; i < this.maxPixels; i++) {
            this.pixelPool.push({
                x: 0, y: 0, originalX: 0, originalY: 0,
                color: '#ff0000', size: 1, corruption: 0,
                behavior: 'normal', active: false, lifetime: 0,
                velocity: { x: 0, y: 0 }, defyPhysics: false
            });
        }
        
        // Pool de géométries impossibles
        for (let i = 0; i < this.maxGeometries; i++) {
            this.geometryPool.push({
                type: 'triangle', vertices: [], color: '#ffffff',
                impossibility: 0, stability: 1, active: false,
                transformation: 'none', dimension: 2
            });
        }
        
        // Pool d'erreurs système
        for (let i = 0; i < this.maxErrors; i++) {
            this.errorPool.push({
                type: 'generic', x: 0, y: 0, severity: 0,
                spreading: false, correcting: false, active: false,
                cascadeTarget: null, lifespan: 0
            });
        }
    }

    setupMatrixGrid() {
        this.matrixGrid = [];
        const gridSize = 25;
        
        for (let x = 0; x < 800; x += gridSize) {
            for (let y = 0; y < 600; y += gridSize) {
                this.matrixGrid.push({
                    x: x, y: y, size: gridSize,
                    integrity: 1.0, lastError: 0,
                    errorHistory: [], correctionAttempts: 0,
                    isStable: true, visualNoise: 0
                });
            }
        }
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.element = element;
        
        // Créer le buffer de réalité original
        this.originalImageData = this.captureOriginalState();
        
        // Initialiser les premières corruptions
        this.seedInitialCorruptions();
    }

    captureOriginalState() {
        // Simuler la capture de l'état original de l'image
        const imageData = {
            width: this.element.width,
            height: this.element.height,
            pixels: new Array(this.element.width * this.element.height).fill(0)
        };
        
        // Remplir avec des données simulées
        for (let i = 0; i < imageData.pixels.length; i++) {
            imageData.pixels[i] = {
                r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
                a: 255,
                corrupted: false
            };
        }
        
        return imageData;
    }

    seedInitialCorruptions() {
        const corruptionCount = 3 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < corruptionCount; i++) {
            this.triggerGlitchEvent(
                Math.random() * 800,
                Math.random() * 600,
                this.errorTypes[Math.floor(Math.random() * this.errorTypes.length)],
                0.3 + Math.random() * 0.7
            );
        }
    }

    getPooledPixel() {
        return this.pixelPool.find(pixel => !pixel.active);
    }

    getPooledGeometry() {
        return this.geometryPool.find(geom => !geom.active);
    }

    getPooledError() {
        return this.errorPool.find(error => !error.active);
    }

    triggerGlitchEvent(x, y, type, severity) {
        const error = this.getPooledError();
        if (!error) return;
        
        error.type = type;
        error.x = x;
        error.y = y;
        error.severity = severity;
        error.spreading = Math.random() < 0.4;
        error.correcting = false;
        error.active = true;
        error.lifespan = 1000 + Math.random() * 3000;
        error.cascadeTarget = null;
        
        this.systemErrors.push(error);
        
        // Affecter la stabilité de la matrice locale
        this.affectMatrixStability(x, y, severity);
        
        // Créer les effets visuels selon le type
        this.executeGlitchEffect(error);
    }

    affectMatrixStability(x, y, severity) {
        const affectedRadius = 80 + severity * 120;
        
        for (const cell of this.matrixGrid) {
            const dist = Math.sqrt(Math.pow(cell.x - x, 2) + Math.pow(cell.y - y, 2));
            if (dist < affectedRadius) {
                const impact = (1 - dist / affectedRadius) * severity;
                cell.integrity = Math.max(0.1, cell.integrity - impact * 0.3);
                cell.lastError = this.temps;
                cell.errorHistory.push({type: 'glitch', time: this.temps, severity: impact});
                cell.isStable = cell.integrity > 0.7;
            }
        }
    }

    executeGlitchEffect(error) {
        switch (error.type) {
            case 'pixel_overflow':
                this.createPixelOverflow(error);
                break;
            case 'dimension_breach':
                this.createDimensionBreach(error);
                break;
            case 'texture_corruption':
                this.createTextureCorruption(error);
                break;
            case 'physics_violation':
                this.createPhysicsViolation(error);
                break;
            case 'render_paradox':
                this.createRenderParadox(error);
                break;
            case 'spatial_inversion':
                this.createSpatialInversion(error);
                break;
            case 'temporal_echo':
                this.createTemporalEcho(error);
                break;
            case 'matrix_leak':
                this.createMatrixLeak(error);
                break;
        }
    }

    createPixelOverflow(error) {
        const pixelCount = 20 + Math.floor(error.severity * 50);
        
        for (let i = 0; i < pixelCount; i++) {
            const pixel = this.getPooledPixel();
            if (!pixel) break;
            
            pixel.x = error.x + (Math.random() - 0.5) * 100;
            pixel.y = error.y + (Math.random() - 0.5) * 100;
            pixel.originalX = pixel.x;
            pixel.originalY = pixel.y;
            pixel.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            pixel.size = 1 + Math.random() * 3;
            pixel.corruption = error.severity;
            pixel.behavior = 'overflow';
            pixel.active = true;
            pixel.lifetime = 2000 + Math.random() * 3000;
            pixel.defyPhysics = Math.random() < 0.3;
            
            // Comportement qui défie la physique
            if (pixel.defyPhysics) {
                pixel.velocity.x = (Math.random() - 0.5) * 10;
                pixel.velocity.y = -Math.abs(Math.random() * 5); // Vers le haut défiant la gravité
            }
            
            this.corruptedPixels.push(pixel);
        }
    }

    createDimensionBreach(error) {
        const geometry = this.getPooledGeometry();
        if (!geometry) return;
        
        // Créer une géométrie impossible (triangle à 4 côtés, carré avec 5 angles)
        geometry.type = 'impossible_triangle';
        geometry.vertices = [
            {x: error.x, y: error.y},
            {x: error.x + 50, y: error.y},
            {x: error.x + 25, y: error.y - 43},
            {x: error.x + 25, y: error.y + 43} // 4ème vertex pour un "triangle"
        ];
        geometry.color = '#ff00ff';
        geometry.impossibility = error.severity;
        geometry.stability = 1 - error.severity;
        geometry.active = true;
        geometry.transformation = 'dimension_shift';
        geometry.dimension = 2.5; // Entre 2D et 3D
        
        this.impossibleGeometries.push(geometry);
    }

    createTextureCorruption(error) {
        // Créer des zones où les textures se mélangent de façon impossible
        const corruptionZone = {
            x: error.x - 25, y: error.y - 25,
            width: 50, height: 50,
            type: 'texture_mix',
            intensity: error.severity,
            phase: Math.random() * Math.PI * 2,
            active: true
        };
        
        this.glitchEvents.push(corruptionZone);
    }

    createPhysicsViolation(error) {
        // Créer des pixels qui tombent vers le haut ou se déplacent en diagonale impossible
        const violationCount = 10 + Math.floor(error.severity * 20);
        
        for (let i = 0; i < violationCount; i++) {
            const pixel = this.getPooledPixel();
            if (!pixel) break;
            
            pixel.x = error.x + (Math.random() - 0.5) * 60;
            pixel.y = error.y + (Math.random() - 0.5) * 60;
            pixel.originalX = pixel.x;
            pixel.originalY = pixel.y;
            pixel.color = this.parameters.couleur.default;
            pixel.size = 2 + Math.random() * 2;
            pixel.behavior = 'physics_violation';
            pixel.active = true;
            pixel.lifetime = 3000 + Math.random() * 2000;
            
            // Vitesses impossibles
            pixel.velocity.x = Math.sin(i) * 3; // Mouvement circulaire parfait
            pixel.velocity.y = Math.cos(i) * 3;
            pixel.defyPhysics = true;
            
            this.corruptedPixels.push(pixel);
        }
    }

    createRenderParadox(error) {
        // Créer un objet qui se rend avant et après lui-même
        const paradox = {
            x: error.x, y: error.y,
            size: 30 + error.severity * 40,
            phase: 0, intensity: error.severity,
            type: 'render_paradox',
            active: true, lifetime: 4000
        };
        
        this.glitchEvents.push(paradox);
    }

    createSpatialInversion(error) {
        // Zone où l'espace se plie sur lui-même
        const inversion = {
            x: error.x, y: error.y,
            radius: 40 + error.severity * 60,
            strength: error.severity,
            type: 'spatial_inversion',
            active: true, lifetime: 2500,
            angle: 0
        };
        
        this.glitchEvents.push(inversion);
    }

    createTemporalEcho(error) {
        // Créer des échos temporels de l'image
        const echo = {
            x: error.x, y: error.y,
            offset: {x: 10 + Math.random() * 20, y: 5 + Math.random() * 15},
            opacity: error.severity,
            type: 'temporal_echo',
            active: true, lifetime: 3000,
            delay: Math.random() * 500
        };
        
        this.glitchEvents.push(echo);
    }

    createMatrixLeak(error) {
        // Code matriciel qui "fuit" dans la réalité
        const leak = {
            x: error.x, y: error.y,
            characters: '01',
            flow: [],
            type: 'matrix_leak',
            active: true, lifetime: 5000,
            intensity: error.severity
        };
        
        // Créer flux de caractères
        for (let i = 0; i < 8; i++) {
            leak.flow.push({
                char: Math.random() < 0.5 ? '0' : '1',
                x: error.x + (Math.random() - 0.5) * 100,
                y: error.y - Math.random() * 200,
                speed: 2 + Math.random() * 4,
                opacity: Math.random()
            });
        }
        
        this.glitchEvents.push(leak);
    }

    attemptCorrection(error) {
        if (error.correcting) return;
        
        error.correcting = true;
        error.lifespan *= 0.7; // Réduire la durée
        
        // Créer cicatrice de réalité
        const scar = {
            x: error.x, y: error.y,
            size: 5 + error.severity * 15,
            opacity: 0.3 + error.severity * 0.4,
            type: 'reality_scar',
            permanent: Math.random() < 0.3, // 30% chance d'être permanent
            healing: !this.permanent,
            healRate: 0.01 + Math.random() * 0.02
        };
        
        this.realityScars.push(scar);
        
        // Parfois créer erreur en cascade
        if (Math.random() < 0.25 && error.severity > 0.5) {
            this.triggerCascadeError(error);
        }
    }

    triggerCascadeError(sourceError) {
        const distance = 80 + Math.random() * 120;
        const angle = Math.random() * Math.PI * 2;
        
        const cascadeX = sourceError.x + Math.cos(angle) * distance;
        const cascadeY = sourceError.y + Math.sin(angle) * distance;
        
        // Nouvelle erreur déclenchée
        const newErrorType = this.errorTypes[Math.floor(Math.random() * this.errorTypes.length)];
        this.triggerGlitchEvent(cascadeX, cascadeY, newErrorType, sourceError.severity * 0.7);
        
        // Enregistrer la cascade
        this.cascadeErrors.push({
            source: sourceError,
            target: {x: cascadeX, y: cascadeY},
            active: true,
            lifetime: 1000
        });
    }

    update(deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse.default;
        
        // Déclenchement de glitches majeurs
        this.nextMajorGlitch -= deltaTime;
        if (this.nextMajorGlitch <= 0) {
            this.triggerMajorGlitch();
            this.nextMajorGlitch = 1000 + Math.random() * 4000;
        }
        
        // Mise à jour des erreurs système
        this.systemErrors = this.systemErrors.filter(error => {
            if (!error.active) return false;
            
            error.lifespan -= deltaTime;
            
            // Tentative d'auto-correction
            if (!error.correcting && Math.random() < 0.001) {
                this.attemptCorrection(error);
            }
            
            // Propagation d'erreur
            if (error.spreading && Math.random() < 0.005) {
                this.spreadError(error);
            }
            
            if (error.lifespan <= 0) {
                error.active = false;
                return false;
            }
            return true;
        });
        
        // Mise à jour des pixels corrompus
        this.corruptedPixels = this.corruptedPixels.filter(pixel => {
            if (!pixel.active) return false;
            
            pixel.lifetime -= deltaTime;
            
            // Comportements spéciaux
            if (pixel.behavior === 'overflow') {
                pixel.x += Math.sin(this.temps * 0.01 + pixel.originalX) * 0.5;
                pixel.y += Math.cos(this.temps * 0.008 + pixel.originalY) * 0.3;
            } else if (pixel.behavior === 'physics_violation') {
                pixel.x += pixel.velocity.x * deltaTime * 0.01;
                pixel.y += pixel.velocity.y * deltaTime * 0.01;
                
                // Maintenir le mouvement circulaire
                const angle = Math.atan2(pixel.velocity.y, pixel.velocity.x) + 0.02;
                const speed = Math.sqrt(pixel.velocity.x ** 2 + pixel.velocity.y ** 2);
                pixel.velocity.x = Math.cos(angle) * speed;
                pixel.velocity.y = Math.sin(angle) * speed;
            }
            
            if (pixel.lifetime <= 0) {
                pixel.active = false;
                return false;
            }
            return true;
        });
        
        // Mise à jour des géométries impossibles
        this.impossibleGeometries = this.impossibleGeometries.filter(geom => {
            if (!geom.active) return false;
            
            // Instabilité des géométries impossibles
            geom.stability -= deltaTime * 0.0003;
            
            if (geom.type === 'impossible_triangle') {
                // Rotation impossible (plus rapide d'un côté)
                for (let i = 0; i < geom.vertices.length; i++) {
                    const vertex = geom.vertices[i];
                    const centerX = geom.vertices[0].x + 25;
                    const centerY = geom.vertices[0].y;
                    
                    const angle = Math.atan2(vertex.y - centerY, vertex.x - centerX);
                    const newAngle = angle + (deltaTime * 0.001 * (i + 1)); // Vitesses différentes
                    const distance = Math.sqrt((vertex.x - centerX) ** 2 + (vertex.y - centerY) ** 2);
                    
                    vertex.x = centerX + Math.cos(newAngle) * distance;
                    vertex.y = centerY + Math.sin(newAngle) * distance;
                }
            }
            
            if (geom.stability <= 0) {
                geom.active = false;
                return false;
            }
            return true;
        });
        
        // Mise à jour des événements de glitch
        this.glitchEvents = this.glitchEvents.filter(event => {
            if (!event.active) return false;
            
            event.lifetime -= deltaTime;
            
            if (event.type === 'matrix_leak') {
                event.flow.forEach(char => {
                    char.y += char.speed * deltaTime * 0.1;
                    char.opacity *= 0.999;
                });
                event.flow = event.flow.filter(char => char.opacity > 0.01);
            } else if (event.type === 'spatial_inversion') {
                event.angle += deltaTime * 0.002;
            } else if (event.type === 'render_paradox') {
                event.phase += deltaTime * 0.005;
            }
            
            if (event.lifetime <= 0) {
                event.active = false;
                return false;
            }
            return true;
        });
        
        // Mise à jour des cicatrices de réalité
        this.realityScars = this.realityScars.filter(scar => {
            if (scar.healing && !scar.permanent) {
                scar.opacity -= scar.healRate * deltaTime * 0.001;
                return scar.opacity > 0;
            }
            return scar.permanent || scar.opacity > 0;
        });
        
        // Mise à jour erreurs en cascade
        this.cascadeErrors = this.cascadeErrors.filter(cascade => {
            cascade.lifetime -= deltaTime;
            return cascade.lifetime > 0;
        });
        
        // Récupération progressive de la stabilité matricielle
        for (const cell of this.matrixGrid) {
            if (cell.integrity < 1.0) {
                cell.integrity = Math.min(1.0, cell.integrity + deltaTime * 0.0001);
                cell.visualNoise = Math.max(0, (1 - cell.integrity) * 0.5);
            }
        }
    }

    triggerMajorGlitch() {
        const glitchType = this.errorTypes[Math.floor(Math.random() * this.errorTypes.length)];
        const x = 200 + Math.random() * 400;
        const y = 150 + Math.random() * 300;
        const severity = 0.7 + Math.random() * 0.3;
        
        this.triggerGlitchEvent(x, y, glitchType, severity);
        
        // Chance de glitch multiple
        if (Math.random() < 0.3) {
            setTimeout(() => {
                this.triggerGlitchEvent(
                    x + (Math.random() - 0.5) * 100,
                    y + (Math.random() - 0.5) * 100,
                    this.errorTypes[Math.floor(Math.random() * this.errorTypes.length)],
                    severity * 0.6
                );
            }, 200 + Math.random() * 500);
        }
    }

    spreadError(sourceError) {
        const spreadRadius = 60 + sourceError.severity * 80;
        const spreadCount = 2 + Math.floor(sourceError.severity * 3);
        
        for (let i = 0; i < spreadCount; i++) {
            const angle = (Math.PI * 2 * i) / spreadCount + Math.random() * 0.5;
            const distance = 30 + Math.random() * spreadRadius;
            
            const newX = sourceError.x + Math.cos(angle) * distance;
            const newY = sourceError.y + Math.sin(angle) * distance;
            
            this.triggerGlitchEvent(
                newX, newY,
                sourceError.type,
                sourceError.severity * (0.4 + Math.random() * 0.4)
            );
        }
        
        sourceError.spreading = false; // Éviter propagation infinie
    }

    render(ctx, element, deltaTime) {
        ctx.save();
        
        // Rendu de l'élément de base avec distorsions
        this.renderGlitchedElement(ctx, element);
        
        // Rendu des pixels corrompus
        this.renderCorruptedPixels(ctx);
        
        // Rendu des géométries impossibles
        this.renderImpossibleGeometries(ctx);
        
        // Rendu des événements de glitch
        this.renderGlitchEvents(ctx);
        
        // Rendu des cicatrices de réalité
        this.renderRealityScars(ctx);
        
        // Rendu des cascades d'erreurs
        this.renderCascadeErrors(ctx);
        
        // Rendu de la grille matricielle
        this.renderMatrixGrid(ctx);
        
        // Effet de scanlines de corruption
        this.renderCorruptionScanlines(ctx);
        
        ctx.restore();
    }

    renderGlitchedElement(ctx, element) {
        ctx.save();
        
        // Distorsion de base de l'élément
        const segments = 20;
        const segmentHeight = element.height / segments;
        
        for (let i = 0; i < segments; i++) {
            const y = element.y + i * segmentHeight;
            
            // Distorsion horizontale aléatoire
            const glitchOffset = Math.sin(this.temps * 0.01 + i * 0.5) * 
                               (this.parameters.corruption.default * 20);
            
            // Corruption de couleur
            const corruption = Math.abs(Math.sin(this.temps * 0.005 + i)) * 
                             this.parameters.intensite.default;
            
            ctx.save();
            ctx.translate(glitchOffset, 0);
            
            // Filtre de corruption
            if (corruption > 0.3) {
                ctx.filter = `hue-rotate(${corruption * 180}deg) saturate(${2 + corruption}) contrast(${1 + corruption})`;
            }
            
            // Rendu du segment
            if (element.content && element.content.tagName === 'IMG') {
                const sourceY = (i / segments) * element.content.height;
                const sourceHeight = element.content.height / segments;
                
                ctx.drawImage(
                    element.content,
                    0, sourceY, element.content.width, sourceHeight,
                    element.x, y, element.width, segmentHeight
                );
            } else {
                ctx.fillStyle = element.color || '#ffffff';
                ctx.fillRect(element.x, y, element.width, segmentHeight);
            }
            
            ctx.restore();
        }
        
        ctx.restore();
    }

    renderCorruptedPixels(ctx) {
        for (const pixel of this.corruptedPixels) {
            if (!pixel.active) continue;
            
            ctx.save();
            
            // Opacité basée sur la durée de vie
            const lifeRatio = pixel.lifetime / 3000;
            ctx.globalAlpha = lifeRatio * pixel.corruption;
            
            // Couleur clignotante pour les pixels défiant la physique
            if (pixel.defyPhysics) {
                const flicker = Math.sin(this.temps * 0.02) * 0.5 + 0.5;
                ctx.globalAlpha *= flicker;
            }
            
            ctx.fillStyle = pixel.color;
            ctx.fillRect(pixel.x - pixel.size/2, pixel.y - pixel.size/2, pixel.size, pixel.size);
            
            // Traînée pour les pixels en mouvement
            if (pixel.behavior === 'physics_violation') {
                ctx.globalAlpha *= 0.3;
                ctx.fillRect(
                    pixel.x - pixel.velocity.x - pixel.size/2, 
                    pixel.y - pixel.velocity.y - pixel.size/2, 
                    pixel.size, pixel.size
                );
            }
            
            ctx.restore();
        }
    }

    renderImpossibleGeometries(ctx) {
        for (const geom of this.impossibleGeometries) {
            if (!geom.active) continue;
            
            ctx.save();
            ctx.globalAlpha = geom.stability * geom.impossibility;
            ctx.strokeStyle = geom.color;
            ctx.lineWidth = 2 + (1 - geom.stability) * 3;
            
            // Rendu du triangle impossible à 4 côtés
            if (geom.type === 'impossible_triangle' && geom.vertices.length >= 4) {
                ctx.beginPath();
                ctx.moveTo(geom.vertices[0].x, geom.vertices[0].y);
                
                // Connexions impossibles
                ctx.lineTo(geom.vertices[1].x, geom.vertices[1].y);
                ctx.lineTo(geom.vertices[2].x, geom.vertices[2].y);
                ctx.lineTo(geom.vertices[3].x, geom.vertices[3].y); // 4ème côté impossible
                ctx.lineTo(geom.vertices[0].x, geom.vertices[0].y); // Retour au début
                
                // Ligne supplémentaire impossible (traverse l'intérieur)
                ctx.moveTo(geom.vertices[1].x, geom.vertices[1].y);
                ctx.lineTo(geom.vertices[3].x, geom.vertices[3].y);
                
                ctx.stroke();
                
                // Points de jonction impossibles
                for (const vertex of geom.vertices) {
                    ctx.beginPath();
                    ctx.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = geom.color;
                    ctx.fill();
                }
            }
            
            ctx.restore();
        }
    }

    renderGlitchEvents(ctx) {
        for (const event of this.glitchEvents) {
            if (!event.active) continue;
            
            ctx.save();
            
            switch (event.type) {
                case 'texture_mix':
                    this.renderTextureMix(ctx, event);
                    break;
                case 'render_paradox':
                    this.renderRenderParadox(ctx, event);
                    break;
                case 'spatial_inversion':
                    this.renderSpatialInversion(ctx, event);
                    break;
                case 'temporal_echo':
                    this.renderTemporalEcho(ctx, event);
                    break;
                case 'matrix_leak':
                    this.renderMatrixLeak(ctx, event);
                    break;
            }
            
            ctx.restore();
        }
    }

    renderTextureMix(ctx, event) {
        ctx.globalAlpha = event.intensity * 0.7;
        
        // Zones de mélange de textures impossibles
        const gradient = ctx.createRadialGradient(
            event.x, event.y, 0,
            event.x, event.y, 25
        );
        
        const phase1 = Math.sin(this.temps * 0.01 + event.phase);
        const phase2 = Math.cos(this.temps * 0.008 + event.phase + Math.PI);
        
        gradient.addColorStop(0, `hsla(${(phase1 * 180 + 180) % 360}, 100%, 50%, 0.8)`);
        gradient.addColorStop(0.5, `hsla(${(phase2 * 180 + 180) % 360}, 100%, 50%, 0.4)`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(event.x - 25, event.y - 25, event.width, event.height);
        
        // Lignes de fracture texture
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 + phase1;
            const x1 = event.x + Math.cos(angle) * 10;
            const y1 = event.y + Math.sin(angle) * 10;
            const x2 = event.x + Math.cos(angle) * 40;
            const y2 = event.y + Math.sin(angle) * 40;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

    renderRenderParadox(ctx, event) {
        ctx.globalAlpha = event.intensity;
        
        // Objet qui se rend avant et après lui-même
        const size = event.size;
        const phase = event.phase;
        
        // Rendu "futur" (transparent)
        ctx.save();
        ctx.globalAlpha *= 0.3;
        ctx.fillStyle = '#00ffff';
        ctx.translate(event.x + Math.sin(phase * 2) * 10, event.y);
        ctx.rotate(phase);
        ctx.fillRect(-size/2, -size/2, size, size);
        ctx.restore();
        
        // Rendu "présent" (normal)
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.translate(event.x, event.y);
        ctx.rotate(phase * 0.5);
        ctx.fillRect(-size/2, -size/2, size, size);
        ctx.restore();
        
        // Rendu "passé" (fantôme)
        ctx.save();
        ctx.globalAlpha *= 0.5;
        ctx.fillStyle = '#ff0000';
        ctx.translate(event.x - Math.sin(phase * 2) * 10, event.y);
        ctx.rotate(-phase);
        ctx.fillRect(-size/2, -size/2, size, size);
        ctx.restore();
        
        // Liens temporels impossibles
        ctx.strokeStyle = this.parameters.couleur.default;
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 3]);
        
        ctx.beginPath();
        ctx.moveTo(event.x - 10, event.y);
        ctx.lineTo(event.x + 10, event.y);
        ctx.moveTo(event.x, event.y - 10);
        ctx.lineTo(event.x, event.y + 10);
        ctx.stroke();
    }

    renderSpatialInversion(ctx, event) {
        ctx.save();
        ctx.globalAlpha = event.strength * 0.6;
        
        // Zone d'inversion spatiale
        const gradient = ctx.createRadialGradient(
            event.x, event.y, 0,
            event.x, event.y, event.radius
        );
        
        gradient.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
        gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.3)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(event.x, event.y, event.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Grille de distorsion spatiale
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.globalAlpha = event.strength * 0.4;
        
        const gridSize = 15;
        for (let i = -event.radius; i < event.radius; i += gridSize) {
            for (let j = -event.radius; j < event.radius; j += gridSize) {
                const x = event.x + i;
                const y = event.y + j;
                const dist = Math.sqrt(i*i + j*j);
                
                if (dist < event.radius) {
                    const distortion = (1 - dist / event.radius) * event.strength;
                    const offsetX = Math.sin(event.angle + dist * 0.1) * distortion * 5;
                    const offsetY = Math.cos(event.angle + dist * 0.1) * distortion * 5;
                    
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + offsetX, y + offsetY);
                    ctx.stroke();
                }
            }
        }
        
        ctx.restore();
    }

    renderTemporalEcho(ctx, event) {
        ctx.save();
        ctx.globalAlpha = event.opacity * 0.6;
        
        // Écho temporel de l'élément
        const echoX = event.x + event.offset.x;
        const echoY = event.y + event.offset.y;
        
        // Plusieurs échos avec délais différents
        for (let i = 0; i < 3; i++) {
            const delay = (i + 1) * 0.3;
            const echoOpacity = event.opacity * (1 - delay);
            
            if (echoOpacity > 0.1) {
                ctx.save();
                ctx.globalAlpha = echoOpacity;
                ctx.fillStyle = `hsl(${120 + i * 60}, 100%, 50%)`;
                
                const offsetX = event.offset.x * delay;
                const offsetY = event.offset.y * delay;
                
                // Rendu simplifié de l'écho
                ctx.fillRect(
                    echoX - offsetX - 10, 
                    echoY - offsetY - 10, 
                    20, 20
                );
                
                ctx.restore();
            }
        }
        
        // Lignes de connexion temporelle
        ctx.strokeStyle = this.parameters.couleur.default;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        
        ctx.beginPath();
        ctx.moveTo(event.x, event.y);
        ctx.lineTo(echoX, echoY);
        ctx.stroke();
        
        ctx.restore();
    }

    renderMatrixLeak(ctx, event) {
        ctx.save();
        
        // Rendu des caractères de code matriciel
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        
        for (const char of event.flow) {
            ctx.save();
            ctx.globalAlpha = char.opacity * event.intensity;
            ctx.fillStyle = this.parameters.couleur.default;
            
            // Effet de glow
            ctx.shadowColor = this.parameters.couleur.default;
            ctx.shadowBlur = 5;
            
            ctx.fillText(char.char, char.x, char.y);
            ctx.restore();
        }
        
        // Zone de "fuite" de la matrice
        ctx.globalAlpha = event.intensity * 0.3;
        ctx.strokeStyle = this.parameters.couleur.default;
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 1]);
        
        ctx.beginPath();
        ctx.rect(event.x - 20, event.y - 50, 40, 100);
        ctx.stroke();
        
        ctx.restore();
    }

    renderRealityScars(ctx) {
        for (const scar of this.realityScars) {
            ctx.save();
            ctx.globalAlpha = scar.opacity;
            
            // Cicatrice de réalité
            const gradient = ctx.createRadialGradient(
                scar.x, scar.y, 0,
                scar.x, scar.y, scar.size
            );
            
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.4)');
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(scar.x, scar.y, scar.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Lignes de fracture
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < 4; i++) {
                const angle = (Math.PI * 2 * i) / 4 + Math.random() * 0.5;
                const length = scar.size * (0.5 + Math.random() * 0.5);
                
                ctx.beginPath();
                ctx.moveTo(scar.x, scar.y);
                ctx.lineTo(
                    scar.x + Math.cos(angle) * length,
                    scar.y + Math.sin(angle) * length
                );
                ctx.stroke();
            }
            
            ctx.restore();
        }
    }

    renderCascadeErrors(ctx) {
        for (const cascade of this.cascadeErrors) {
            ctx.save();
            
            const progress = 1 - (cascade.lifetime / 1000);
            ctx.globalAlpha = 1 - progress;
            
            // Ligne de propagation d'erreur
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            
            const currentX = cascade.source.x + (cascade.target.x - cascade.source.x) * progress;
            const currentY = cascade.source.y + (cascade.target.y - cascade.source.y) * progress;
            
            ctx.beginPath();
            ctx.moveTo(cascade.source.x, cascade.source.y);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
            
            // Point de propagation
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }

    renderMatrixGrid(ctx) {
        ctx.save();
        
        for (const cell of this.matrixGrid) {
            if (cell.integrity >= 1.0 && cell.visualNoise === 0) continue;
            
            ctx.globalAlpha = (1 - cell.integrity) * 0.3;
            
            // Bruit visuel dans les cellules endommagées
            if (cell.visualNoise > 0) {
                ctx.fillStyle = `rgba(0, 255, 0, ${cell.visualNoise})`;
                
                // Pixels aléatoires dans la cellule
                for (let i = 0; i < cell.visualNoise * 10; i++) {
                    const pixelX = cell.x + Math.random() * cell.size;
                    const pixelY = cell.y + Math.random() * cell.size;
                    ctx.fillRect(pixelX, pixelY, 1, 1);
                }
            }
            
            // Bordure de cellule endommagée
            if (cell.integrity < 0.8) {
                ctx.strokeStyle = this.parameters.couleur.default;
                ctx.lineWidth = 1;
                ctx.setLineDash([2, 2]);
                ctx.strokeRect(cell.x, cell.y, cell.size, cell.size);
            }
        }
        
        ctx.restore();
    }

    renderCorruptionScanlines(ctx) {
        ctx.save();
        
        // Scanlines de corruption qui balayent l'écran
        const scanlineY = (this.temps * 0.1) % 600;
        const scanlineHeight = 3;
        
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = this.parameters.couleur.default;
        ctx.fillRect(0, scanlineY, 800, scanlineHeight);
        
        // Scanlines multiples avec phases différentes
        for (let i = 0; i < 3; i++) {
            const y = ((this.temps * 0.05 + i * 200) % 600);
            ctx.globalAlpha = 0.1 + (i * 0.1);
            ctx.fillRect(0, y, 800, 1);
        }
        
        // Glitches horizontaux aléatoires
        if (Math.random() < 0.02) {
            const glitchY = Math.random() * 600;
            const glitchHeight = 2 + Math.random() * 5;
            
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(0, glitchY, 800, glitchHeight);
        }
        
        ctx.restore();
    }

    destroy() {
        // Désactiver tous les objets poolés
        this.pixelPool.forEach(pixel => pixel.active = false);
        this.geometryPool.forEach(geom => geom.active = false);
        this.errorPool.forEach(error => error.active = false);
        
        // Vider les arrays
        this.glitchEvents.length = 0;
        this.corruptedPixels.length = 0;
        this.impossibleGeometries.length = 0;
        this.realityScars.length = 0;
        this.cascadeErrors.length = 0;
        this.systemErrors.length = 0;
        this.correctionAttempts.length = 0;
        this.matrixGrid.length = 0;
        
        // Reset des variables
        this.temps = 0;
        this.matrixStability = 1.0;
        this.nextMajorGlitch = 0;
        this.originalImageData = null;
    }
    
  }
};
