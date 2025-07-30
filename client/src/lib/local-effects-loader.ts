import { Effect } from '@/types/effects';
import effectsIndex from '@/effects/effectsIndex.json';

export async function loadLocalEffects(): Promise<Effect[]> {
  console.log('📂 Loading effects from local index...');

  try {
    // Validation que effectsIndex est un tableau
    if (!Array.isArray(effectsIndex)) {
      console.error('❌ Effects index is not an array:', effectsIndex);
      return [];
    }

    // Conversion des effets avec validation
    const effects: Effect[] = effectsIndex.map((effect: any) => ({
      id: effect.id || '',
      name: effect.name || 'Unknown Effect',
      description: effect.description || 'No description available',
      file: effect.file || '',
      category: effect.category || 'both',
      type: effect.type || 'special'
    })).filter(effect => effect.id && effect.name);

    console.log(`✅ Successfully loaded ${effects.length} effects from local index`);
    return effects;
  } catch (error) {
    console.error('❌ Error loading local effects:', error);
    return [];
  }
}

// Export par défaut et nommé pour compatibilité
export const localEffectsLoader = {
  loadLocalEffects
};

export default loadLocalEffects;