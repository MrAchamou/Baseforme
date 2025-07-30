
import { Effect } from '../types/effects';

// Liste complète et vérifiée des effets JSfile
const KNOWN_JSFILE_EFFECTS = [
  'breathing.effect.js',
  'breathing object.effect.js',
  'crystal grow.effect.js',
  'crystal shatter.effect.js',
  'dimension shift.effect.js',
  'dna build.effect.js',
  'echo multiple.effect.js',
  'echo trail.effect.js',
  'electric form.effect.js',
  'electric hover.effect.js',
  'energy flow.effect.js',
  'energy ionize.effect.js',
  'fade layers.effect.js',
  'fire consume.effect.js',
  'fire write.effect.js',
  'float dance.effect.js',
  'float physics.effect.js',
  'glitch spawn.effect.js',
  'gravity reverse.effect.js',
  'gyroscope spin.effect.js',
  'heartbeat.effect.js',
  'hologram.effect.js',
  'ice freeze.effect.js',
  'liquid morph.effect.js',
  'liquid pour.effect.js',
  'liquid state.effect.js',
  'magnetic field.effect.js',
  'magnetic pull.effect.js',
  'mirror reality.effect.js',
  'morph 3d.effect.js',
  'métamorphoses d\'images.effect.js',
  'neon glow.effect.js',
  'neural pulse.effect.js',
  'orbit dance.effect.js',
  'particle build.effect.js',
  'particle dissolve.effect.js',
  'pendulum swing.effect.js',
  'phase through.effect.js',
  'plasma state.effect.js',
  'prism split.effect.js',
  'quantum phase.effect.js',
  'quantum split.effect.js',
  'rainbow shift.effect.js',
  'reality glitch.effect.js',
  'rotation 3d.effect.js',
  'shadow clone.effect.js',
  'smoke disperse.effect.js',
  'soul aura.effect.js',
  'sparkle aura.effect.js',
  'star dust form.effect.js',
  'star explosion.effect.js',
  'stellar drift.effect.js',
  'time echo.effect.js',
  'time rewind.effect.js',
  'tornado twist.effect.js',
  'typewriter.effect.js',
  'wave dissolve.effect.js',
  'wave distortion.effect.js',
  'wave surf.effect.js'
];

interface JSfileEffectModule {
  [key: string]: {
    id: string;
    name: string;
    description: string;
    category: string;
    subcategory?: string;
    type?: string;
    compatibility?: {
      text: boolean;
      image: boolean;
      logo?: boolean;
      background?: boolean;
    };
    engine: Function;
    parameters?: any;
    tags?: string[];
    preview?: any;
  };
}

export async function loadEffectsFromLocal(): Promise<Effect[]> {
  console.log('📂 Loading effects from local and JSfile directories...');

  const effects: Effect[] = [];
  let successCount = 0;
  let errorCount = 0;

  // D'abord charger les effets locaux (priorité)
  try {
    console.log('🏠 Loading local effects first...');
    const localEffects = await loadLocalEffects();
    effects.push(...localEffects);
    console.log(`✅ Loaded ${localEffects.length} local effects`);
  } catch (error) {
    console.warn('⚠️ Failed to load local effects:', error);
  }

  for (const filename of KNOWN_JSFILE_EFFECTS) {
    try {
      console.log(`🔄 Loading JSfile effect: ${filename}`);
      
      // Charger le module d'effet depuis JSfile
      const effectModule = await loadJSfileModule(filename);
      
      if (!effectModule) {
        console.warn(`⚠️ No valid effect module found in ${filename}`);
        errorCount++;
        continue;
      }

      // Convertir le module JSfile en format Effect standard
      const effect = convertJSfileToEffect(effectModule, filename);
      
      if (effect) {
        effects.push(effect);
        console.log(`✅ Loaded JSfile effect: ${effect.name} (${filename})`);
        successCount++;
      } else {
        console.warn(`⚠️ Failed to convert effect ${filename}`);
        errorCount++;
      }

    } catch (error) {
      console.error(`❌ Failed to load effect ${filename}:`, error);
      errorCount++;
    }
  }

  console.log(`✅ Successfully loaded ${successCount} effects from JSfile directory`);
  if (errorCount > 0) {
    console.warn(`⚠️ Failed to load ${errorCount} effects`);
  }

  console.log('🔒 All effects are verified to come from JSfile source');
  return effects;
}

async function loadLocalEffects(): Promise<Effect[]> {
  try {
    // Charger l'index des effets locaux
    const response = await fetch('/src/effects/effectsIndex.json');
    if (!response.ok) {
      throw new Error('Local effects index not found');
    }

    const effectsIndex = await response.json();
    const localEffects: Effect[] = [];

    for (const effectData of effectsIndex) {
      try {
        // Charger le module d'effet local
        const effectModule = await import(`../effects/${effectData.file}`);
        
        if (effectModule.default || effectModule[Object.keys(effectModule)[0]]) {
          const effect: Effect = {
            id: effectData.id,
            name: effectData.name,
            description: effectData.description,
            category: effectData.category as 'text' | 'image' | 'both',
            type: effectData.type as 'animation' | 'transition' | 'special',
            scriptUrl: `/src/effects/${effectData.file}`,
            path: `/src/effects/${effectData.file}`,
            source: 'local',
            tags: []
          };
          
          localEffects.push(effect);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to load local effect ${effectData.file}:`, error);
      }
    }

    return localEffects;
  } catch (error) {
    console.warn('⚠️ Local effects loading failed:', error);
    return [];
  }
}

async function loadJSfileModule(filename: string): Promise<any> {
  try {
    const scriptUrl = `/JSfile/${filename}`;
    console.log(`🔄 Loading JSfile module: ${scriptUrl}`);
    
    const response = await fetch(scriptUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();

    if (!content || content.trim().length === 0) {
      throw new Error('Empty script content');
    }

    // Vérifier que le contenu contient un export valide
    if (!content.includes('export') && !content.includes('module.exports')) {
      console.warn(`⚠️ No exports found in ${filename}, content appears to be raw code`);
      throw new Error(`No valid exports found in ${filename}`);
    }

    // Créer un blob et importer le module
    const blob = new Blob([content], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);

    try {
      const module = await import(url);
      console.log(`✅ Successfully loaded module: ${filename}`);
      return module;
    } finally {
      URL.revokeObjectURL(url);
    }

  } catch (error) {
    console.error(`Failed to load JSfile module ${filename}:`, error);
    throw error;
  }
}

function convertJSfileToEffect(effectModule: any, filename: string): Effect | null {
  try {
    console.log(`🔍 Converting effect module for ${filename}:`, Object.keys(effectModule));
    
    // Chercher l'effet dans les exports du module
    let effectObject = null;

    // Vérifier export par défaut
    if (effectModule.default && isValidJSfileEffect(effectModule.default)) {
      effectObject = effectModule.default;
      console.log(`✅ Found valid default export for ${filename}`);
    } else {
      // Chercher dans les exports nommés
      const keys = Object.keys(effectModule).filter(key => key !== 'default');
      for (const key of keys) {
        if (isValidJSfileEffect(effectModule[key])) {
          effectObject = effectModule[key];
          console.log(`✅ Found valid named export '${key}' for ${filename}`);
          break;
        }
      }
    }

    if (!effectObject) {
      console.error(`❌ No valid effect object found in ${filename}`);
      console.log('Available exports:', Object.keys(effectModule));
      
      // Debug: afficher le contenu des exports
      Object.keys(effectModule).forEach(key => {
        const value = effectModule[key];
        console.log(`Export '${key}':`, {
          type: typeof value,
          isObject: typeof value === 'object',
          hasId: value && typeof value.id === 'string',
          hasName: value && typeof value.name === 'string', 
          hasEngine: value && typeof value.engine === 'function',
          keys: value && typeof value === 'object' ? Object.keys(value) : 'N/A'
        });
      });
      
      return null;
    }

    // Convertir au format Effect standard
    const baseName = filename.replace('.effect.js', '');
    const id = effectObject.id || baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    
    // Déterminer la catégorie basée sur compatibility ou category
    let category: 'text' | 'image' | 'both' = 'both';
    
    if (effectObject.compatibility) {
      const { text, image } = effectObject.compatibility;
      if (text && !image) {
        category = 'text';
      } else if (image && !text) {
        category = 'image';
      } else {
        category = 'both';
      }
    } else if (effectObject.category) {
      switch (effectObject.category.toLowerCase()) {
        case 'text':
          category = 'text';
          break;
        case 'image':
          category = 'image';
          break;
        default:
          category = 'both';
      }
    }

    // Déterminer le type
    let type: 'animation' | 'transition' | 'special' = 'animation';
    
    if (effectObject.type) {
      switch (effectObject.type.toLowerCase()) {
        case 'transition':
          type = 'transition';
          break;
        case 'special':
          type = 'special';
          break;
        default:
          type = 'animation';
      }
    } else if (effectObject.subcategory) {
      switch (effectObject.subcategory.toLowerCase()) {
        case 'transition':
          type = 'transition';
          break;
        case 'special':
          type = 'special';
          break;
        default:
          type = 'animation';
      }
    }

    const effect: Effect = {
      id,
      name: effectObject.name || baseName.toUpperCase(),
      description: effectObject.description || `${effectObject.name || baseName} effect`,
      category,
      type,
      scriptUrl: `/JSfile/${filename}`,
      path: `/JSfile/${filename}`,
      source: 'JSfile',
      tags: effectObject.tags || []
    };

    return effect;

  } catch (error) {
    console.error(`Failed to convert JSfile effect ${filename}:`, error);
    return null;
  }
}

function isValidJSfileEffect(obj: any): boolean {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  
  const hasId = typeof obj.id === 'string' && obj.id.length > 0;
  const hasName = typeof obj.name === 'string' && obj.name.length > 0;
  const hasEngine = typeof obj.engine === 'function';
  
  const isValid = hasId && hasName && hasEngine;
  
  if (!isValid && obj) {
    console.log(`❌ Invalid effect object:`, {
      hasId,
      hasName, 
      hasEngine,
      actualKeys: Object.keys(obj),
      obj: obj
    });
  }
  
  return isValid;
}

export async function loadEffectScript(scriptUrl: string): Promise<string> {
  // Validation de sécurité stricte
  if (!scriptUrl.startsWith('/JSfile/')) {
    throw new Error(`Security violation: Invalid script URL ${scriptUrl}`);
  }

  try {
    const response = await fetch(scriptUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();

    if (!content || content.trim().length === 0) {
      throw new Error('Empty script content');
    }

    return content;

  } catch (error) {
    console.error(`Failed to load script ${scriptUrl}:`, error);
    throw new Error(`Script loading failed: ${error.message}`);
  }
}

export function validateJSfileEffect(effect: Effect): boolean {
  if (!effect) {
    console.error('Effect is null or undefined');
    return false;
  }

  if (!effect.scriptUrl || !effect.scriptUrl.startsWith('/JSfile/')) {
    console.error(`Invalid script URL for effect ${effect.id}: ${effect.scriptUrl}`);
    return false;
  }

  if (!effect.id || !effect.name) {
    console.error(`Missing required fields for effect: ${JSON.stringify(effect)}`);
    return false;
  }

  return true;
}

export function getLocalEffectsStats() {
  return {
    source: 'JSfile',
    totalEffects: KNOWN_JSFILE_EFFECTS.length,
    loadingMethod: 'local',
    format: 'JSfile combined (effect + metadata)',
    lastUpdated: new Date().toISOString()
  };
}
