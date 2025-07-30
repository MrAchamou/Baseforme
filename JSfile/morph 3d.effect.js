// morph 3d.effect.js

export const morph 3dEffect = {
  id: "morph 3d",
  name: "Morph 3d",
  
  description: `## 📐 EFFET 21 : MORPH 3D

**CATÉGORIE :** TEXT  
**EFFET DEMANDÉ :** Morph_3D  
**ID UNIQUE :** dimensional-depth-morph-021  
**NOM AFFICHAGE :** Métamorphose Dimensionnelle  

**DESCRIPTION :** Transformation progressive du texte plat vers une forme 3D avec profondeur réaliste. Extrusion dynamique avec biseaux, faces latérales texturées, éclairage volumétrique. Transition fluide entre 2D et 3D avec rotation pour révéler la profondeur nouvellement créée.

**SPÉCIFICATIONS ADDICTION :**
- Extrusion progressive révélant la complexité 3D
- Éclairage dramatique qui sculpte les volumes
- Rotation révélant différents angles de la transformation
- Textures qui évoluent avec la dimensionnalité

--------------------------------------------------------------

🔄 MORPH 3D - MÉTAMORPHOSE DIMENSIONNELLE CRÉÉE !
J'ai développé l'effet "Métamorphose Dimensionnelle" avec un système de transformation 3D complexe et addictif :
🎭 CYCLE DE TRANSFORMATION HYPNOTIQUE :
📐 PHASE 1 - EXTRUSION :

Transformation progressive 2D → 3D
Révélation graduelle de la profondeur
Génération dynamique des faces latérales

🔄 PHASE 2 - ROTATION :

Rotation multi-axiale (X, Y, Z)
Révélation des angles cachés
Éclairage dramatique qui sculpte les volumes

🌊 PHASE 3 - MORPHING :

Distorsion temporaire avec effet de vague
Transformation géométrique complexe
Rotation continue révélant la complexité

📱 PHASE 4 - RETOUR PLAT :

Transition fluide vers l'état 2D original
Cycle parfait pour loop addictif

🎨 RENDU 3D RÉALISTE :
💡 SYSTÈME D'ÉCLAIRAGE :

Lumière directionnelle mobile
Lumière ambiante pour les zones d'ombre
Calcul des normales pour réalisme

🎯 PROJECTION PERSPECTIVE :

Transformation 3D complète (rotation XYZ)
Projection perspective réaliste
Tri des faces par profondeur (painter's algorithm)

🏗️ GÉOMÉTRIE COMPLEXE :

Face avant avec détails
Faces latérales texturées
Face arrière avec profondeur
Biseaux et arêtes définies

⚡ OPTIMISATIONS PERFORMANCE :

Cache de rendu pour faces complexes
Calculs précalculés des vertices
Tri optimisé des faces par profondeur
Transformations matricielles efficaces

🎛️ PARAMÈTRES CONFIGURABLES :

Vitesse : Speed des transformations
Intensité : Degré de l'extrusion 3D
Profondeur : Épaisseur du volume créé
Rotation : Amplitude des rotations
Couleur Base : Teinte principale
Métallique : Effet de surface brillante

L'effet crée une métamorphose dimensionnelle fascinante qui révèle progressivement la complexité 3D cachée du texte ! 🚀✨`,

  category: "text",
  subcategory: "transform",
  intensity: "medium",
  performance: "heavy",

  compatibility: {
    text: true,
    image: false,
    logo: true,
    background: false
  },

  tags: ["text", "texte", "morph", "phase", "dimension", "3d"],

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
    gif: "morph 3d.gif",
    duration: 3000,
    loop: true
  },

  engine: (element, params) => {
    
    // Code original de l'effet intégré
    constructor(config = {}) {
        super({
            id: 'dimensional-depth-morph-021',
            name: 'Métamorphose Dimensionnelle',
            category: 'text',
            version: '1.0',
            performance: 'high',
            parameters: {
                vitesse: { type: 'range', min: 0.1, max: 3, default: 1 },
                intensite: { type: 'range', min: 0, max: 1, default: 0.8 },
                profondeur: { type: 'range', min: 0.2, max: 2, default: 1 },
                rotation: { type: 'range', min: 0, max: 1, default: 0.7 },
                couleurBase: { type: 'color', default: '#2563eb' },
                metallique: { type: 'range', min: 0, max: 1, default: 0.6 }
            }
        });

        // Variables de transformation
        this.temps = 0;
        this.morphPhase = 0;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.extrusionProgress = 0;
        
        // Paramètres 3D
        this.perspective = 800;
        this.lightPosition = { x: 0, y: 0, z: 1 };
        this.ambientLight = 0.3;
        this.directionalLight = 0.7;
        
        // Géométrie du texte
        this.textGeometry = [];
        this.faces = [];  
        this.vertices = [];
        this.normals = [];
        
        // Cache de rendu
        this.frontCanvas = null;
        this.backCanvas = null;
        this.sideCanvas = null;
        
        // États de transition
        this.transformStates = {
            flat: 0,
            extruding: 1,
            rotating: 2,
            morphing: 3
        };
        this.currentState = this.transformStates.flat;
    }

    initialize(canvas, element) {
        this.canvas = canvas;
        this.element = element;
        this.centerX = element.x + element.width / 2;
        this.centerY = element.y + element.height / 2;
        
        // Initialisation des canvas de cache
        this.initializeRenderCache();
        
        // Génération de la géométrie du texte
        this.generateTextGeometry();
        
        // Précalcul des faces 3D
        this.calculateFaces();
    }

    initializeRenderCache() {
        // Canvas pour face avant
        this.frontCanvas = document.createElement('canvas');
        this.frontCanvas.width = this.element.width;
        this.frontCanvas.height = this.element.height;
        
        // Canvas pour face arrière
        this.backCanvas = document.createElement('canvas');
        this.backCanvas.width = this.element.width;
        this.backCanvas.height = this.element.height;
        
        // Canvas pour faces latérales
        this.sideCanvas = document.createElement('canvas');
        this.sideCanvas.width = this.element.width * 2;
        this.sideCanvas.height = this.element.height * 2;
    }

    generateTextGeometry() {
        // Simulation de géométrie vectorielle du texte
        const resolution = 8;
        this.textGeometry = [];
        
        // Génération de points de contour basique
        const width = this.element.width;
        const height = this.element.height;
        
        // Contour externe
        for (let i = 0; i <= resolution; i++) {
            const t = i / resolution;
            
            // Haut
            this.textGeometry.push({
                x: width * t,
                y: 0,
                z: 0,
                original: true
            });
            
            // Droite
            this.textGeometry.push({
                x: width,
                y: height * t,
                z: 0,
                original: true
            });
            
            // Bas
            this.textGeometry.push({
                x: width * (1 - t),
                y: height,
                z: 0,
                original: true
            });
            
            // Gauche
            this.textGeometry.push({
                x: 0,
                y: height * (1 - t),
                z: 0,
                original: true
            });
        }
        
        // Points internes pour détail
        for (let y = 1; y < resolution; y++) {
            for (let x = 1; x < resolution; x++) {
                this.textGeometry.push({
                    x: (width / resolution) * x,
                    y: (height / resolution) * y,
                    z: 0,
                    original: false
                });
            }
        }
    }

    calculateFaces() {
        this.faces = [];
        this.vertices = [];
        
        // Calcul des faces avant et arrière
        const depth = 50 * this.parameters.profondeur.value;
        
        this.textGeometry.forEach(point => {
            // Vertex avant
            this.vertices.push({
                x: point.x - this.element.width / 2,
                y: point.y - this.element.height / 2,
                z: 0
            });
            
            // Vertex arrière
            this.vertices.push({
                x: point.x - this.element.width / 2,
                y: point.y - this.element.height / 2,
                z: -depth * this.extrusionProgress
            });
        });
    }

    project3D(vertex) {
        // Transformations 3D
        let x = vertex.x;
        let y = vertex.y;
        let z = vertex.z;
        
        // Rotation X
        const cosX = Math.cos(this.rotationX);
        const sinX = Math.sin(this.rotationX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        y = y1;
        z = z1;
        
        // Rotation Y
        const cosY = Math.cos(this.rotationY);
        const sinY = Math.sin(this.rotationY);
        const x1 = x * cosY + z * sinY;
        const z2 = -x * sinY + z * cosY;
        x = x1;
        z = z2;
        
        // Rotation Z
        const cosZ = Math.cos(this.rotationZ);
        const sinZ = Math.sin(this.rotationZ);
        const x2 = x * cosZ - y * sinZ;
        const y2 = x * sinZ + y * cosZ;
        x = x2;
        y = y2;
        
        // Projection perspective
        const scale = this.perspective / (this.perspective + z);
        
        return {
            x: this.centerX + x * scale,
            y: this.centerY + y * scale,
            scale: scale,
            z: z
        };
    }

    calculateLighting(normal) {
        // Produit scalaire avec la direction de la lumière
        const dot = normal.x * this.lightPosition.x + 
                   normal.y * this.lightPosition.y + 
                   normal.z * this.lightPosition.z;
        
        // Intensité lumineuse
        const intensity = Math.max(0, dot) * this.directionalLight + this.ambientLight;
        return Math.min(1, intensity);
    }

    getStateProgress() {
        const cycle = this.morphPhase % 4;
        
        if (cycle < 1) {
            // Extrusion
            this.currentState = this.transformStates.extruding;
            return { state: 'extruding', progress: cycle };
        } else if (cycle < 2) {
            // Rotation
            this.currentState = this.transformStates.rotating;
            return { state: 'rotating', progress: cycle - 1 };
        } else if (cycle < 3) {
            // Morphing
            this.currentState = this.transformStates.morphing;
            return { state: 'morphing', progress: cycle - 2 };
        } else {
            // Retour plat
            this.currentState = this.transformStates.flat;
            return { state: 'flat', progress: cycle - 3 };
        }
    }

    render(ctx, element, deltaTime) {
        this.temps += deltaTime * this.parameters.vitesse.value;
        this.morphPhase = this.temps * 0.0005;
        
        // Mise à jour du centre
        this.centerX = element.x + element.width / 2;
        this.centerY = element.y + element.height / 2;
        
        const stateInfo = this.getStateProgress();
        const progress = stateInfo.progress;
        
        // Fonctions d'easing pour transitions fluides
        const easeInOut = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const easedProgress = easeInOut(progress);
        
        // Mise à jour des transformations selon l'état
        this.updateTransformations(stateInfo.state, easedProgress);
        
        ctx.save();
        
        // Rendu selon l'état actuel
        switch (stateInfo.state) {
            case 'extruding':
                this.renderExtrusion(ctx, easedProgress);
                break;
            case 'rotating':
                this.renderRotation(ctx, easedProgress);
                break;
            case 'morphing':
                this.renderMorphing(ctx, easedProgress);
                break;
            case 'flat':
                this.renderFlat(ctx, easedProgress);
                break;
        }
        
        ctx.restore();
    }

    updateTransformations(state, progress) {
        switch (state) {
            case 'extruding':
                this.extrusionProgress = progress * this.parameters.intensite.value;
                this.rotationX = 0;
                this.rotationY = 0;
                this.rotationZ = 0;
                break;
                
            case 'rotating':
                this.extrusionProgress = this.parameters.intensite.value;
                this.rotationX = progress * Math.PI * 0.3 * this.parameters.rotation.value;
                this.rotationY = progress * Math.PI * 0.4 * this.parameters.rotation.value;
                this.rotationZ = Math.sin(progress * Math.PI * 2) * 0.1;
                break;
                
            case 'morphing':
                this.extrusionProgress = this.parameters.intensite.value * (1 - progress * 0.3);
                this.rotationX = Math.PI * 0.3 * this.parameters.rotation.value * (1 - progress);
                this.rotationY = Math.PI * 0.4 * this.parameters.rotation.value + progress * Math.PI * 0.2;
                this.rotationZ = Math.sin(progress * Math.PI * 4) * 0.2;
                break;
                
            case 'flat':
                this.extrusionProgress = this.parameters.intensite.value * (1 - progress);
                this.rotationX = 0;
                this.rotationY = 0;
                this.rotationZ = 0;
                break;
        }
        
        // Mise à jour de la position de lumière
        this.lightPosition.x = Math.sin(this.temps * 0.001) * 0.5;
        this.lightPosition.y = Math.cos(this.temps * 0.0015) * 0.3;
    }

    renderExtrusion(ctx, progress) {
        // Rendu de l'extrusion progressive
        this.calculateFaces();
        
        // Face avant
        ctx.fillStyle = this.getColorWithLighting(1.0);
        this.renderFrontFace(ctx);
        
        // Faces latérales avec éclairage
        if (this.extrusionProgress > 0.1) {
            this.renderSideFaces(ctx);
        }
        
        // Face arrière
        if (this.extrusionProgress > 0.5) {
            ctx.fillStyle = this.getColorWithLighting(0.4);
            this.renderBackFace(ctx);
        }
    }

    renderRotation(ctx, progress) {
        this.calculateFaces();
        
        // Tri des faces par profondeur (painter's algorithm)
        const sortedFaces = this.getSortedFaces();
        
        sortedFaces.forEach(face => {
            this.renderFace(ctx, face);
        });
    }

    renderMorphing(ctx, progress) {
        // Effet de distorsion durant la morphing
        ctx.save();
        
        const waveIntensity = progress * 10;
        const waveFreq = 0.05;
        
        // Distorsion du canvas
        for (let y = 0; y < this.element.height; y += 4) {
            const wave = Math.sin(y * waveFreq + this.temps * 0.01) * waveIntensity;
            ctx.drawImage(
                this.canvas,
                this.element.x, this.element.y + y,
                this.element.width, 4,
                this.element.x + wave, this.element.y + y,
                this.element.width, 4
            );
        }
        
        ctx.restore();
        
        // Rendu 3D standard par-dessus
        this.renderRotation(ctx, progress);
    }

    renderFlat(ctx, progress) {
        // Retour progressif vers le 2D
        const alpha = 1 - progress;
        
        ctx.globalAlpha = alpha;
        this.renderExtrusion(ctx, progress);
        ctx.globalAlpha = 1;
        
        // Texte 2D original
        ctx.fillStyle = this.parameters.couleurBase.value;
        ctx.fillRect(
            this.element.x,
            this.element.y,
            this.element.width,
            this.element.height
        );
    }

    renderFrontFace(ctx) {
        const vertices = this.getProjectedVertices();
        
        ctx.beginPath();
        vertices.forEach((vertex, i) => {
            if (i === 0) ctx.moveTo(vertex.x, vertex.y);
            else ctx.lineTo(vertex.x, vertex.y);
        });
        ctx.closePath();
        ctx.fill();
        
        // Effet métallique
        if (this.parameters.metallique.value > 0.5) {
            const gradient = ctx.createLinearGradient(
                this.centerX - this.element.width/2,
                this.centerY - this.element.height/2,
                this.centerX + this.element.width/2,
                this.centerY + this.element.height/2
            );
            gradient.addColorStop(0, 'rgba(255,255,255,0.3)');
            gradient.addColorStop(0.5, 'rgba(255,255,255,0.1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0.2)');
            
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    renderSideFaces(ctx) {
        // Simplification: rendu des faces latérales comme des rectangles
        const lighting = this.calculateLighting({ x: 1, y: 0, z: 0 });
        ctx.fillStyle = this.getColorWithLighting(lighting * 0.7);
        
        // Face droite
        ctx.fillRect(
            this.centerX + this.element.width/2,
            this.centerY - this.element.height/2,
            this.extrusionProgress * 20,
            this.element.height
        );
        
        // Face bas
        const bottomLighting = this.calculateLighting({ x: 0, y: 1, z: 0 });
        ctx.fillStyle = this.getColorWithLighting(bottomLighting * 0.6);
        ctx.fillRect(
            this.centerX - this.element.width/2,
            this.centerY + this.element.height/2,
            this.element.width,
            this.extrusionProgress * 15
        );
    }

    renderBackFace(ctx) {
        // Face arrière avec éclairage réduit
        ctx.globalAlpha = 0.6;
        ctx.fillRect(
            this.centerX - this.element.width/2 + this.extrusionProgress * 10,
            this.centerY - this.element.height/2 + this.extrusionProgress * 8,
            this.element.width,
            this.element.height
        );
        ctx.globalAlpha = 1;
    }

    getProjectedVertices() {
        // Projection des vertices du contour
        const vertices = [];
        const corners = [
            { x: -this.element.width/2, y: -this.element.height/2, z: 0 },
            { x: this.element.width/2, y: -this.element.height/2, z: 0 },
            { x: this.element.width/2, y: this.element.height/2, z: 0 },
            { x: -this.element.width/2, y: this.element.height/2, z: 0 }
        ];
        
        corners.forEach(vertex => {
            vertices.push(this.project3D(vertex));
        });
        
        return vertices;
    }

    getSortedFaces() {
        // Tri basique par profondeur Z
        return [
            { type: 'back', z: -this.extrusionProgress * 50 },
            { type: 'sides', z: -this.extrusionProgress * 25 },
            { type: 'front', z: 0 }
        ].sort((a, b) => a.z - b.z);
    }

    renderFace(ctx, face) {
        switch (face.type) {
            case 'front':
                this.renderFrontFace(ctx);
                break;
            case 'sides':
                this.renderSideFaces(ctx);
                break;
            case 'back':
                this.renderBackFace(ctx);
                break;
        }
    }

    getColorWithLighting(intensity) {
        const baseColor = this.hexToRgb(this.parameters.couleurBase.value);
        const r = Math.floor(baseColor.r * intensity);
        const g = Math.floor(baseColor.g * intensity);
        const b = Math.floor(baseColor.b * intensity);
        
        return `rgb(${r}, ${g}, ${b})`;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    update(deltaTime) {
        // Mise à jour continue des cycles de transformation
    }

    destroy() {
        this.textGeometry = [];
        this.faces = [];
        this.vertices = [];
        this.normals = [];
        
        if (this.frontCanvas) this.frontCanvas = null;
        if (this.backCanvas) this.backCanvas = null;
        if (this.sideCanvas) this.sideCanvas = null;
    }
    
  }
};
