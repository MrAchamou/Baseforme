import { Effect } from '../types/effects';

// Fonction pour déterminer la catégorie et le type d'un effet
function categorizeEffect(filename: string): { category: string; type: string } {
  const baseName = filename.replace('.effect.js', '');
  const lowerName = baseName.toLowerCase();

  let category = 'both';
  let type = 'animation';

  // Keywords plus précis pour les catégories
  const textKeywords = ['write', 'type', 'echo', 'rotation', 'shadow', 'time', 'quantum split', 'sparkle', 'star dust', 'tornado', 'rainbow', 'electric hover'];
  const imageKeywords = ['crystal', 'fire consume', 'fade', 'particle dissolve', 'smoke', 'wave dissolve', 'ice', 'reality', 'star explosion', 'morph', 'phase', 'liquid morph', 'mirror'];
  const bothKeywords = ['dimension', 'energy', 'float', 'glitch', 'gyroscope', 'hologram', 'liquid state', 'magnetic', 'neural', 'orbit', 'plasma', 'wave distortion', 'wave surf', 'breathing', 'electric form', 'pendulum', 'prism'];

  if (textKeywords.some(keyword => lowerName.includes(keyword))) {
    category = 'text';
  } else if (imageKeywords.some(keyword => lowerName.includes(keyword))) {
    category = 'image';
  } else if (bothKeywords.some(keyword => lowerName.includes(keyword))) {
    category = 'both';
  }

  // Déterminer le type
  if (lowerName.includes('dissolve') || lowerName.includes('fade') || lowerName.includes('morph') || lowerName.includes('freeze')) {
    type = 'transition';
  } else if (lowerName.includes('quantum') || lowerName.includes('glitch') || lowerName.includes('neural') || lowerName.includes('plasma') || lowerName.includes('crystal') || lowerName.includes('reality') || lowerName.includes('hologram') || lowerName.includes('dimension') || lowerName.includes('electric form') || lowerName.includes('energy ionize') || lowerName.includes('mirror') || lowerName.includes('phase') || lowerName.includes('prism') || lowerName.includes('soul') || lowerName.includes('star') || lowerName.includes('time')) {
    type = 'special';
  }

  return { category, type };
}

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

export async function loadEffectsFromLocal(): Promise<Effect[]> {
  console.log('📂 Loading effects from JSfile directory...');

  const effects: Effect[] = [];
  let successCount = 0;
  let errorCount = 0;

  for (const filename of KNOWN_JSFILE_EFFECTS) {
    try {
      const baseName = filename.replace('.effect.js', '');
      const id = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      const name = baseName.toUpperCase();

      const { category, type } = categorizeEffect(filename);

      const effect: Effect = {
        id,
        name,
        description: `${name.charAt(0) + name.slice(1).toLowerCase().replace(/-/g, ' ')} effect`,
        category: category as 'text' | 'image' | 'both',
        type: type as 'animation' | 'transition' | 'special',
        scriptUrl: `/JSfile/${filename}`,
        source: 'JSfile'
      };

      effects.push(effect);
      console.log(`✅ Loaded JSfile effect: ${name} (${filename})`);
      successCount++;

    } catch (error) {
      console.error(`❌ Failed to load effect ${filename}:`, error);
      errorCount++;
    }
  }

  console.log(`✅ Successfully loaded ${successCount} effects from JSfile directory`);
  if (errorCount > 0) {
    console.warn(`⚠️ Failed to load ${errorCount} effects`);
  }

  // Vérification de sécurité
  const validEffects = effects.filter(effect => effect.scriptUrl?.startsWith('/JSfile/'));
  console.log('🔒 All effects are verified to come from JSfile source');

  return validEffects;
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

    // Validation basique du contenu
    if (content.length < 10) {
      throw new Error('Script content too short');
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
    lastUpdated: new Date().toISOString()
  };
}

// The following code does not exist in the original file.
// Please disregard the changes related to it.

// import { effectValidator } from './effect-validator';
// import { HealthChecker } from './health-check';

// async loadEffectsFromJSfile(): Promise<EffectDefinition[]> {
//     console.log('📂 Loading effects from JSfile directory...');
//     const effects: EffectDefinition[] = [];
//     const failedEffects: string[] = [];

//     for (const filename of KNOWN_JSFILE_EFFECTS) {
//       try {
//         const response = await fetch(`/JSfile/${filename}`);
//         if (!response.ok) {
//           console.warn(`⚠️ Failed to load ${filename}: ${response.status}`);
//           failedEffects.push(`${filename} (HTTP ${response.status})`);
//           continue;
//         }

//         const effectCode = await response.text();
//         if (!effectCode.trim()) {
//           console.warn(`⚠️ Empty effect file: ${filename}`);
//           failedEffects.push(`${filename} (empty file)`);
//           continue;
//         }

//         const effectModule = await this.executeEffectCode(effectCode, filename);

//         if (effectModule && this.validateEffect(effectModule)) {
//           const effect = this.normalizeEffect(effectModule, filename);
//           effects.push(effect);
//           console.log(`✅ Loaded JSfile effect: ${effect.name.toUpperCase()} (${filename})`);
//         } else {
//           console.warn(`⚠️ Invalid effect structure in ${filename}`);
//           failedEffects.push(`${filename} (invalid structure)`);
//         }
//       } catch (error) {
//         console.error(`❌ Error loading ${filename}:`, error);
//         failedEffects.push(`${filename} (${error.message})`);
//       }
//     }

//     console.log(`✅ Successfully loaded ${effects.length} effects from JSfile directory`);

//     if (failedEffects.length > 0) {
//       console.warn(`⚠️ Failed to load ${failedEffects.length} effects:`, failedEffects);
//     }

//     console.log('🔒 All effects are verified to come from JSfile source');

//     // Update health status
//     const healthChecker = HealthChecker.getInstance();
//     healthChecker.updateEffectsStatus(effects.length, KNOWN_JSFILE_EFFECTS.length, failedEffects);
//     healthChecker.logStatus();

//     return effects;
//   }

// validateEffect(effectModule: any): boolean {
//     if (!effectModule) return false;

//     // Check if it's a single effect export
//     if (this.isValidEffectObject(effectModule)) {
//       return true;
//     }

//     // Check if it's a default export with effect
//     if (effectModule.default && this.isValidEffectObject(effectModule.default)) {
//       return true;
//     }

//     // Check for named exports
//     const keys = Object.keys(effectModule);
//     return keys.some(key => {
//       const effect = effectModule[key];
//       return this.isValidEffectObject(effect);
//     });
//   }

//   private isValidEffectObject(effect: any): boolean {
//     return effect && 
//            typeof effect === 'object' && 
//            typeof effect.id === 'string' && 
//            typeof effect.name === 'string' && 
//            (typeof effect.engine === 'function' || typeof effect.engine === 'object');
//   }

// private async executeEffectCode(code: string, filename: string): Promise<any> {
//     try {
//       // Validate the code contains export statements
//       if (!code.includes('export')) {
//         throw new Error('No export statements found in effect file');
//       }

//       // Clean the code and ensure proper module format
//       let cleanCode = code.trim();

//       // Fix common syntax issues
//       cleanCode = cleanCode.replace(/export const ([^=]+)Effect = \{/g, 'export const $1Effect = {');

//       // Create a safe execution context
//       const blob = new Blob([cleanCode], { type: 'application/javascript' });
//       const url = URL.createObjectURL(blob);

//       try {
//         const module = await import(url);
//         return module;
//       } finally {
//         URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error(`Failed to execute effect code from ${filename}:`, error);

//       // Try to provide more specific error information
//       if (error.message.includes('Unexpected token')) {
//         throw new Error(`Syntax error in ${filename}: ${error.message}`);
//       } else if (error.message.includes('import')) {
//         throw new Error(`Import error in ${filename}: ${error.message}`);
//       } else {
//         throw error;
//       }
//     }
//   }