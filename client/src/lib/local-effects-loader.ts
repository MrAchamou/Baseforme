
import type { Effect } from '@/types/effects';

// Mapping des noms de fichiers JSfile vers les métadonnées
const JS_FILE_EFFECTS_MAPPING = {
  'breathing.effect.js': {
    id: 'breathing',
    name: 'BREATHING',
    description: 'Animation de respiration pour texte',
    category: 'text' as const,
    type: 'animation' as const
  },
  'breathing object.effect.js': {
    id: 'breathing-object',
    name: 'BREATHING OBJECT',
    description: 'Effet de respiration sur objet avec animation douce',
    category: 'image' as const,
    type: 'animation' as const
  },
  'crystal grow.effect.js': {
    id: 'crystal-grow',
    name: 'CRYSTAL GROW',
    description: 'Croissance cristalline progressive',
    category: 'image' as const,
    type: 'special' as const
  },
  'crystal shatter.effect.js': {
    id: 'crystal-shatter',
    name: 'CRYSTAL SHATTER',
    description: 'Bris de cristal avec fragments',
    category: 'image' as const,
    type: 'transition' as const
  },
  'dimension shift.effect.js': {
    id: 'dimension-shift',
    name: 'DIMENSION SHIFT',
    description: 'Changement dimensionnel avec déformation',
    category: 'both' as const,
    type: 'special' as const
  },
  'dna build.effect.js': {
    id: 'dna-build',
    name: 'DNA BUILD',
    description: 'Construction ADN hélicoïdale',
    category: 'text' as const,
    type: 'special' as const
  },
  'echo multiple.effect.js': {
    id: 'echo-multiple',
    name: 'ECHO MULTIPLE',
    description: 'Échos multiples avec répétition',
    category: 'text' as const,
    type: 'animation' as const
  },
  'echo trail.effect.js': {
    id: 'echo-trail',
    name: 'ECHO TRAIL',
    description: 'Traînée d\'écho visuel',
    category: 'text' as const,
    type: 'animation' as const
  },
  'electric form.effect.js': {
    id: 'electric-form',
    name: 'ELECTRIC FORM',
    description: 'Formation électrique avec arcs',
    category: 'image' as const,
    type: 'special' as const
  },
  'electric hover.effect.js': {
    id: 'electric-hover',
    name: 'ELECTRIC HOVER',
    description: 'Survol électrique animé',
    category: 'text' as const,
    type: 'animation' as const
  },
  'energy flow.effect.js': {
    id: 'energy-flow',
    name: 'ENERGY FLOW',
    description: 'Flux d\'énergie continu',
    category: 'both' as const,
    type: 'animation' as const
  },
  'energy ionize.effect.js': {
    id: 'energy-ionize',
    name: 'ENERGY IONIZE',
    description: 'Ionisation énergétique',
    category: 'both' as const,
    type: 'special' as const
  },
  'fade layers.effect.js': {
    id: 'fade-layers',
    name: 'FADE LAYERS',
    description: 'Fondu par couches successives',
    category: 'image' as const,
    type: 'transition' as const
  },
  'fire consume.effect.js': {
    id: 'fire-consume',
    name: 'FIRE CONSUME',
    description: 'Consommation par le feu',
    category: 'image' as const,
    type: 'special' as const
  },
  'fire write.effect.js': {
    id: 'fire-write',
    name: 'FIRE WRITE',
    description: 'Écriture enflammée progressive',
    category: 'text' as const,
    type: 'animation' as const
  },
  'float dance.effect.js': {
    id: 'float-dance',
    name: 'FLOAT DANCE',
    description: 'Danse flottante gracieuse',
    category: 'both' as const,
    type: 'animation' as const
  },
  'float physics.effect.js': {
    id: 'float-physics',
    name: 'FLOAT PHYSICS',
    description: 'Flottement avec physique réaliste',
    category: 'image' as const,
    type: 'animation' as const
  },
  'glitch spawn.effect.js': {
    id: 'glitch-spawn',
    name: 'GLITCH SPAWN',
    description: 'Apparition glitchée numérique',
    category: 'both' as const,
    type: 'special' as const
  },
  'gravity reverse.effect.js': {
    id: 'gravity-reverse',
    name: 'GRAVITY REVERSE',
    description: 'Inversion gravitationnelle',
    category: 'image' as const,
    type: 'special' as const
  },
  'gyroscope spin.effect.js': {
    id: 'gyroscope-spin',
    name: 'GYROSCOPE SPIN',
    description: 'Rotation gyroscopique complexe',
    category: 'both' as const,
    type: 'animation' as const
  },
  'heartbeat.effect.js': {
    id: 'heartbeat',
    name: 'HEARTBEAT',
    description: 'Pulsation cardiaque rythmée',
    category: 'text' as const,
    type: 'animation' as const
  },
  'hologram.effect.js': {
    id: 'hologram',
    name: 'HOLOGRAM',
    description: 'Projection holographique',
    category: 'both' as const,
    type: 'special' as const
  },
  'ice freeze.effect.js': {
    id: 'ice-freeze',
    name: 'ICE FREEZE',
    description: 'Cristallisation glacée progressive',
    category: 'image' as const,
    type: 'transition' as const
  },
  'liquid morph.effect.js': {
    id: 'liquid-morph',
    name: 'LIQUID MORPH',
    description: 'Morphing liquide fluide',
    category: 'both' as const,
    type: 'transition' as const
  },
  'liquid pour.effect.js': {
    id: 'liquid-pour',
    name: 'LIQUID POUR',
    description: 'Versement liquide réaliste',
    category: 'image' as const,
    type: 'animation' as const
  },
  'liquid state.effect.js': {
    id: 'liquid-state',
    name: 'LIQUID STATE',
    description: 'État liquide dynamique',
    category: 'both' as const,
    type: 'special' as const
  },
  'magnetic field.effect.js': {
    id: 'magnetic-field',
    name: 'MAGNETIC FIELD',
    description: 'Champ magnétique visualisé',
    category: 'both' as const,
    type: 'special' as const
  },
  'magnetic pull.effect.js': {
    id: 'magnetic-pull',
    name: 'MAGNETIC PULL',
    description: 'Attraction magnétique forte',
    category: 'image' as const,
    type: 'animation' as const
  },
  'mirror reality.effect.js': {
    id: 'mirror-reality',
    name: 'MIRROR REALITY',
    description: 'Réalité miroir déformante',
    category: 'both' as const,
    type: 'special' as const
  },
  'morph 3d.effect.js': {
    id: 'morph-3d',
    name: 'MORPH 3D',
    description: 'Morphing tridimensionnel',
    category: 'image' as const,
    type: 'transition' as const
  },
  'métamorphoses d\'images.effect.js': {
    id: 'metamorphoses-images',
    name: 'MÉTAMORPHOSES D\'IMAGES',
    description: 'Transformation d\'images complexe',
    category: 'image' as const,
    type: 'transition' as const
  },
  'neon glow.effect.js': {
    id: 'neon-glow',
    name: 'NEON GLOW',
    description: 'Lueur néon électrique',
    category: 'text' as const,
    type: 'special' as const
  },
  'neural pulse.effect.js': {
    id: 'neural-pulse',
    name: 'NEURAL PULSE',
    description: 'Impulsion neuronale',
    category: 'both' as const,
    type: 'special' as const
  },
  'orbit dance.effect.js': {
    id: 'orbit-dance',
    name: 'ORBIT DANCE',
    description: 'Danse orbitale gravitationnelle',
    category: 'both' as const,
    type: 'animation' as const
  },
  'particle build.effect.js': {
    id: 'particle-build',
    name: 'PARTICLE BUILD',
    description: 'Construction par particules',
    category: 'text' as const,
    type: 'special' as const
  },
  'particle dissolve.effect.js': {
    id: 'particle-dissolve',
    name: 'PARTICLE DISSOLVE',
    description: 'Dissolution particulaire',
    category: 'image' as const,
    type: 'transition' as const
  },
  'pendulum swing.effect.js': {
    id: 'pendulum-swing',
    name: 'PENDULUM SWING',
    description: 'Balancement pendulaire',
    category: 'image' as const,
    type: 'animation' as const
  },
  'phase through.effect.js': {
    id: 'phase-through',
    name: 'PHASE THROUGH',
    description: 'Traversée phasique',
    category: 'image' as const,
    type: 'special' as const
  },
  'plasma state.effect.js': {
    id: 'plasma-state',
    name: 'PLASMA STATE',
    description: 'État plasma énergétique',
    category: 'both' as const,
    type: 'special' as const
  },
  'prism split.effect.js': {
    id: 'prism-split',
    name: 'PRISM SPLIT',
    description: 'Division prismatique colorée',
    category: 'image' as const,
    type: 'special' as const
  },
  'quantum phase.effect.js': {
    id: 'quantum-phase',
    name: 'QUANTUM PHASE',
    description: 'Phase quantique instable',
    category: 'text' as const,
    type: 'special' as const
  },
  'quantum split.effect.js': {
    id: 'quantum-split',
    name: 'QUANTUM SPLIT',
    description: 'Division quantique multiple',
    category: 'image' as const,
    type: 'special' as const
  },
  'rainbow shift.effect.js': {
    id: 'rainbow-shift',
    name: 'RAINBOW SHIFT',
    description: 'Changement arc-en-ciel',
    category: 'text' as const,
    type: 'special' as const
  },
  'reality glitch.effect.js': {
    id: 'reality-glitch',
    name: 'REALITY GLITCH',
    description: 'Glitch de réalité numérique',
    category: 'image' as const,
    type: 'special' as const
  },
  'rotation 3d.effect.js': {
    id: 'rotation-3d',
    name: 'ROTATION 3D',
    description: 'Rotation tridimensionnelle',
    category: 'text' as const,
    type: 'animation' as const
  },
  'shadow clone.effect.js': {
    id: 'shadow-clone',
    name: 'SHADOW CLONE',
    description: 'Clonage d\'ombres multiples',
    category: 'text' as const,
    type: 'special' as const
  },
  'smoke disperse.effect.js': {
    id: 'smoke-disperse',
    name: 'SMOKE DISPERSE',
    description: 'Dispersion de fumée',
    category: 'image' as const,
    type: 'transition' as const
  },
  'soul aura.effect.js': {
    id: 'soul-aura',
    name: 'SOUL AURA',
    description: 'Aura spirituelle lumineuse',
    category: 'image' as const,
    type: 'special' as const
  },
  'sparkle aura.effect.js': {
    id: 'sparkle-aura',
    name: 'SPARKLE AURA',
    description: 'Aura scintillante magique',
    category: 'text' as const,
    type: 'special' as const
  },
  'star dust form.effect.js': {
    id: 'star-dust-form',
    name: 'STAR DUST FORM',
    description: 'Formation de poussière d\'étoiles',
    category: 'text' as const,
    type: 'special' as const
  },
  'star explosion.effect.js': {
    id: 'star-explosion',
    name: 'STAR EXPLOSION',
    description: 'Explosion stellaire spectaculaire',
    category: 'image' as const,
    type: 'special' as const
  },
  'stellar drift.effect.js': {
    id: 'stellar-drift',
    name: 'STELLAR DRIFT',
    description: 'Dérive stellaire cosmique',
    category: 'image' as const,
    type: 'animation' as const
  },
  'time echo.effect.js': {
    id: 'time-echo',
    name: 'TIME ECHO',
    description: 'Écho temporel répétitif',
    category: 'text' as const,
    type: 'special' as const
  },
  'time rewind.effect.js': {
    id: 'time-rewind',
    name: 'TIME REWIND',
    description: 'Retour temporel inversé',
    category: 'image' as const,
    type: 'special' as const
  },
  'tornado twist.effect.js': {
    id: 'tornado-twist',
    name: 'TORNADO TWIST',
    description: 'Torsion tourbillonnaire',
    category: 'text' as const,
    type: 'animation' as const
  },
  'typewriter.effect.js': {
    id: 'typewriter',
    name: 'TYPEWRITER',
    description: 'Écriture machine à écrire',
    category: 'text' as const,
    type: 'animation' as const
  },
  'wave dissolve.effect.js': {
    id: 'wave-dissolve',
    name: 'WAVE DISSOLVE',
    description: 'Dissolution ondulée',
    category: 'image' as const,
    type: 'transition' as const
  },
  'wave distortion.effect.js': {
    id: 'wave-distortion',
    name: 'WAVE DISTORTION',
    description: 'Distorsion ondulée',
    category: 'both' as const,
    type: 'special' as const
  },
  'wave surf.effect.js': {
    id: 'wave-surf',
    name: 'WAVE SURF',
    description: 'Effet de vague surfante',
    category: 'both' as const,
    type: 'animation' as const
  }
};

export async function loadEffectsFromLocal(): Promise<Effect[]> {
  console.log('📂 Loading effects from JSfile directory...');
  
  try {
    const effects: Effect[] = [];
    
    // Validation : s'assurer que seuls les effets JSfile sont chargés
    Object.entries(JS_FILE_EFFECTS_MAPPING).forEach(([filename, metadata]) => {
      // Vérification que l'effet provient bien du dossier JSfile
      if (!filename.includes('.effect.js')) {
        console.warn(`⚠️ Skipping invalid effect file: ${filename}`);
        return;
      }

      const effect = {
        ...metadata,
        path: `/JSfile/${filename}`,
        scriptUrl: `/JSfile/${filename}`,
        source: 'JSfile' // Marqueur pour identifier la source
      };

      effects.push(effect);
      console.log(`✅ Loaded JSfile effect: ${metadata.name} (${filename})`);
    });

    console.log(`✅ Successfully loaded ${effects.length} effects from JSfile directory`);
    console.log(`🔒 All effects are verified to come from JSfile source`);
    return effects;
    
  } catch (error) {
    console.error('❌ Failed to load effects from JSfile:', error);
    return [];
  }
}

export async function loadEffectScript(scriptUrl: string): Promise<string> {
  try {
    console.log(`📥 Loading script from: ${scriptUrl}`);
    
    // Validation de sécurité : s'assurer que le script provient du dossier JSfile
    if (!scriptUrl.startsWith('/JSfile/') || !scriptUrl.endsWith('.effect.js')) {
      throw new Error(`Security check failed: Script must be from JSfile directory and have .effect.js extension. Got: ${scriptUrl}`);
    }
    
    // Charger le fichier depuis le dossier JSfile
    const response = await fetch(scriptUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const script = await response.text();
    console.log(`✅ JSfile script loaded successfully: ${scriptUrl}`);
    return script;
    
  } catch (error) {
    console.error(`❌ Failed to load JSfile script ${scriptUrl}:`, error);
    throw error;
  }
}
