
export const breathingEffect = {
  id: "breathing",
  name: "Breathing",
  
  description: `## 🌬️ EFFET : BREATHING

**CATÉGORIE :** IMAGE  
**EFFET DEMANDÉ :** Breathing  
**ID UNIQUE :** breathing-animation-001  
**NOM AFFICHAGE :** Animation Respiration  

**DESCRIPTION :** Effet de respiration naturelle appliqué à l'image avec expansion et contraction douce.

**SPÉCIFICATIONS :**
- Animation cyclique de respiration
- Effet de dilatation/contraction fluide
- Rythme naturel et apaisant
- Transitions douces et organiques`,

  category: "image",
  subcategory: "animation",
  intensity: "low",
  performance: "light",

  compatibility: {
    text: false,
    image: true,
    logo: true,
    background: true
  },

  tags: ["image", "breathing", "animation", "organic", "cycle"],

  parameters: {
    vitesse: {
      type: "range",
      min: 0.1,
      max: 3,
      default: 1,
      description: "Vitesse de respiration"
    },
    intensite: {
      type: "range",
      min: 0,
      max: 1,
      default: 0.3,
      description: "Intensité de l'expansion"
    }
  },

  preview: {
    gif: "breathing.gif",
    duration: 4000,
    loop: true
  },

  engine: (element, params) => {
    if (!element) return;

    const startTime = Date.now();
    const baseScale = 1;
    
    function animate() {
      const elapsed = (Date.now() - startTime) * 0.001;
      const breathingCycle = Math.sin(elapsed * params.vitesse * Math.PI) * params.intensite;
      const scale = baseScale + breathingCycle * 0.1;
      
      element.style.transform = `scale(${scale})`;
      element.style.transformOrigin = 'center center';
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      element.style.transform = '';
      element.style.transformOrigin = '';
    };
  }
};
