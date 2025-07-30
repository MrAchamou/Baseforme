import type { Effect } from '@/types/effects';

// Interface pour l'index des effets locaux
interface EffectIndex {
  id: string;
  name: string;
  description: string;
  file: string;
  category: 'text' | 'image' | 'both';
  type: 'animation' | 'transition' | 'special';
}

/**
 * Charge les effets depuis l'index local
 */
export async function loadEffectsFromLocal(): Promise<Effect[]> {
  try {
    console.log('📂 Loading effects from local index...');

    // Charge l'index des effets
    const indexResponse = await fetch('/src/effects/effectsIndex.json');

    if (!indexResponse.ok) {
      console.warn('⚠️ Local effects index not found, using fallback effects');
      return getFallbackEffects();
    }

    const effectsIndex: EffectIndex[] = await indexResponse.json();

    if (!Array.isArray(effectsIndex) || effectsIndex.length === 0) {
      console.warn('⚠️ Empty effects index, using fallback effects');
      return getFallbackEffects();
    }

    // Convertit l'index en format Effect
    const effects: Effect[] = effectsIndex.map(effectData => ({
      id: effectData.id,
      name: effectData.name,
      description: effectData.description,
      scriptUrl: `/src/effects/${effectData.file}`,
      path: `local/${effectData.id}`,
      category: effectData.category || 'both',
      type: effectData.type || 'animation'
    }));

    console.log(`✅ Successfully loaded ${effects.length} effects from local index`);
    return effects;

  } catch (error) {
    console.error('❌ Failed to load local effects:', error);
    console.log('🔄 Using fallback effects');
    return getFallbackEffects();
  }
}

/**
 * Effets de secours si l'index local n'est pas disponible
 */
function getFallbackEffects(): Effect[] {
  return [
    {
      id: 'typewriter',
      name: 'TYPEWRITER',
      description: 'Effet machine à écrire classique avec curseur clignotant',
      scriptUrl: '/src/effects/typewriter.js',
      path: 'local/typewriter',
      category: 'text',
      type: 'animation'
    },
    {
      id: 'neon-glow',
      name: 'NEON GLOW',
      description: 'Effet néon lumineux avec des couleurs vives',
      scriptUrl: '/src/effects/neon-glow.js',
      path: 'local/neon-glow',
      category: 'both',
      type: 'animation'
    },
    {
      id: 'fire-write',
      name: 'FIRE WRITE',
      description: 'Animation de texte enflammé avec particules de feu',
      scriptUrl: '/src/effects/fire-write.js',
      path: 'local/fire-write',
      category: 'text',
      type: 'animation'
    }
  ];
}

/**
 * Vérifie si un effet existe localement
 */
export async function checkEffectExists(effectId: string): Promise<boolean> {
  try {
    const response = await fetch(`/src/effects/${effectId}.js`, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Charge le script d'un effet spécifique
 */
export async function loadEffectScript(scriptUrl: string): Promise<string> {
  try {
    const response = await fetch(scriptUrl);

    if (!response.ok) {
      throw new Error(`Failed to load effect script: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Failed to load effect script:', error);
    throw error;
  }
}

/**
 * Statistiques des effets locaux
 */
export async function getLocalEffectsStats() {
  const effects = await loadEffectsFromLocal();

  const stats = {
    total: effects.length,
    byCategory: {
      text: effects.filter(e => e.category === 'text').length,
      image: effects.filter(e => e.category === 'image').length,
      both: effects.filter(e => e.category === 'both').length
    },
    byType: {
      animation: effects.filter(e => e.type === 'animation').length,
      transition: effects.filter(e => e.type === 'transition').length,
      special: effects.filter(e => e.type === 'special').length
    }
  };

  return stats;
}