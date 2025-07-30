
export async function diagnoseEffects() {
  console.log('🔍 Starting effect diagnostics...');
  
  // Test de connectivité JSfile
  try {
    const response = await fetch('/JSfile/');
    console.log(`📁 JSfile directory access: ${response.ok ? '✅ OK' : '❌ Failed'}`);
  } catch (error) {
    console.error('❌ JSfile directory not accessible:', error);
  }
  
  // Test de chargement d'un effet spécifique
  try {
    const testEffect = 'breathing.effect.js';
    const response = await fetch(`/JSfile/${testEffect}`);
    if (response.ok) {
      const content = await response.text();
      console.log(`📄 Test effect (${testEffect}): ✅ Loaded (${content.length} chars)`);
      console.log(`📄 Content preview:`, content.substring(0, 200) + '...');
    } else {
      console.error(`❌ Test effect failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Test effect loading failed:', error);
  }
  
  // Vérifier les effets dans le loader
  try {
    const { loadEffectsFromLocal } = await import('./local-effects-loader');
    const effects = await loadEffectsFromLocal();
    console.log(`📊 Effects loaded: ${effects.length}`);
    
    effects.slice(0, 5).forEach((effect, index) => {
      console.log(`${index + 1}. ${effect.name} (${effect.id}) - ${effect.scriptUrl}`);
    });
    
    if (effects.length > 5) {
      console.log(`... and ${effects.length - 5} more effects`);
    }
    
  } catch (error) {
    console.error('❌ Effects loading failed:', error);
  }
  
  console.log('🏁 Diagnostics completed');
}
