import { Effect } from '../types/effects';

export async function loadEffectsFromLocal(): Promise<Effect[]> {
  console.log('📂 Loading effects from local Effect directory...');

  const effects: Effect[] = [];

  try {
    console.log('🏠 Loading local effects from converted files...');

    // Charger l'index des effets locaux
    const response = await fetch('/src/effects/effectsIndex.json');
    if (!response.ok) {
      console.warn('⚠️ Local effects index not found');
      return [];
    }

    const effectsIndex = await response.json();
    console.log(`📋 Found ${effectsIndex.length} effects in index`);

    for (const effectData of effectsIndex) {
      try {
        // Vérifier que le fichier existe
        const effectResponse = await fetch(`/src/effects/${effectData.file}`);
        if (!effectResponse.ok) {
          console.warn(`⚠️ Effect file not found: ${effectData.file}`);
          continue;
        }

        const effect: Effect = {
          id: effectData.id,
          name: effectData.name,
          description: effectData.description,
          category: effectData.category as 'text' | 'image' | 'both',
          type: effectData.type as 'animation' | 'transition' | 'special',
          scriptUrl: `/src/effects/${effectData.file}`,
          path: `/src/effects/${effectData.file}`,
          source: 'local',
          tags: [effectData.category, effectData.type, 'local']
        };

        effects.push(effect);
        console.log(`✅ Loaded local effect: ${effect.name} (${effect.category})`);
      } catch (error) {
        console.warn(`⚠️ Failed to load local effect ${effectData.file}:`, error);
      }
    }

    console.log(`🎉 Successfully loaded ${effects.length} local effects`);
    return effects;
  } catch (error) {
    console.error('❌ Local effects loading failed:', error);
    return [];
  }
}

export async function loadEffectScript(scriptUrl: string): Promise<string> {
  // Validation de sécurité
  if (!scriptUrl.startsWith('/src/effects/')) {
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

export function validateLocalEffect(effect: Effect): boolean {
  if (!effect) {
    console.error('Effect is null or undefined');
    return false;
  }

  if (!effect.scriptUrl || !effect.scriptUrl.startsWith('/src/effects/')) {
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
    source: 'local',
    totalEffects: 'dynamic',
    loadingMethod: 'local Effect directory',
    format: 'converted ES6 modules',
    lastUpdated: new Date().toISOString()
  };
}