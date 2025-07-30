
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
export async function testEffectLoading() {
  console.log('🔍 Testing effect loading...');
  
  try {
    // Tester le chargement d'un effet spécifique
    const testUrl = '/JSfile/breathing.effect.js';
    console.log(`Testing URL: ${testUrl}`);
    
    const response = await fetch(testUrl);
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const content = await response.text();
    console.log(`Content length: ${content.length}`);
    console.log(`Content preview:`, content.substring(0, 200) + '...');
    
    // Tester l'import dynamique
    const blob = new Blob([content], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    
    try {
      const module = await import(url);
      console.log('Module loaded successfully');
      console.log('Module exports:', Object.keys(module));
      
      // Analyser le module
      if (module.default) {
        console.log('Default export:', {
          type: typeof module.default,
          hasId: module.default?.id,
          hasName: module.default?.name,
          hasEngine: typeof module.default?.engine === 'function'
        });
      }
      
      return { success: true, module, content };
      
    } finally {
      URL.revokeObjectURL(url);
    }
    
  } catch (error) {
    console.error('Effect loading test failed:', error);
    return { success: false, error: error.message };
  }
}

export function logEffectStructure(effect: any, name: string) {
  console.log(`📋 Effect structure for ${name}:`);
  console.log({
    id: effect?.id,
    name: effect?.name,
    description: effect?.description,
    category: effect?.category,
    type: effect?.type,
    hasEngine: typeof effect?.engine === 'function',
    hasParameters: !!effect?.parameters,
    hasCompatibility: !!effect?.compatibility
  });
}
