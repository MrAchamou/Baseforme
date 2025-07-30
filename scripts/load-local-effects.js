
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const EFFECT_SOURCE_DIR = path.join(__dirname, '../Effect');
const LOCAL_EFFECTS_DIR = path.join(__dirname, '../client/src/effects');

console.log('🎨 Loading effects from Effect directory...');

function scanEffectDirectory() {
  if (!fs.existsSync(EFFECT_SOURCE_DIR)) {
    throw new Error('Effect directory not found. Please ensure the Effect folder is in the project root.');
  }

  const files = fs.readdirSync(EFFECT_SOURCE_DIR);
  const effectFiles = files.filter(file => file.endsWith('.js'));
  
  console.log(`📁 Found ${effectFiles.length} effect files`);
  
  return effectFiles;
}

function categorizeEffect(filename) {
  if (filename.includes('-texte.js')) {
    return { category: 'text', type: 'animation' };
  } else if (filename.includes('-img.js')) {
    return { category: 'image', type: 'animation' };
  }
  return { category: 'both', type: 'animation' };
}

function convertEffectToLocalFormat(filename, content) {
  const effectInfo = categorizeEffect(filename);
  const baseName = filename.replace(/-(texte|img)\.js$/, '').replace(/-/g, ' ');
  const effectId = baseName.toLowerCase().replace(/\s+/g, '-');
  
  // Analyser le contenu pour extraire la fonction principale
  const functionMatch = content.match(/function\s+(\w+)\s*\([^)]*\)\s*\{/);
  const functionName = functionMatch ? functionMatch[1] : 'effectFunction';
  
  // Créer un export ES6 compatible
  const wrappedContent = `
// Effect: ${baseName.toUpperCase()}
${content}

// Export JSfile compatible
export const ${effectId.replace(/-/g, '')}Effect = {
  id: "${effectId}",
  name: "${baseName.toUpperCase()}",
  description: "Effet ${baseName.toLowerCase()} ${effectInfo.category === 'text' ? 'pour texte' : effectInfo.category === 'image' ? 'pour image' : 'universel'}",
  category: "${effectInfo.category}",
  type: "${effectInfo.type}",
  compatibility: {
    text: ${effectInfo.category === 'text' || effectInfo.category === 'both'},
    image: ${effectInfo.category === 'image' || effectInfo.category === 'both'},
    logo: true,
    background: true
  },
  tags: ["${effectInfo.category}", "${effectInfo.type}", "jsfile"],
  engine: ${functionName}
};

export default ${effectId.replace(/-/g, '')}Effect;
`;

  return {
    id: effectId,
    name: baseName.toUpperCase(),
    description: `Effet ${baseName.toLowerCase()} ${effectInfo.category === 'text' ? 'pour texte' : effectInfo.category === 'image' ? 'pour image' : 'universel'}`,
    category: effectInfo.category,
    type: effectInfo.type,
    filename: `${effectId}.js`,
    content: wrappedContent
  };
}

function loadAllEffects() {
  // Créer le répertoire de destination s'il n'existe pas
  if (!fs.existsSync(LOCAL_EFFECTS_DIR)) {
    fs.mkdirSync(LOCAL_EFFECTS_DIR, { recursive: true });
  }

  const effectFiles = scanEffectDirectory();
  const loadedEffects = [];
  let successCount = 0;
  let errorCount = 0;

  for (const filename of effectFiles) {
    try {
      console.log(`🔄 Processing ${filename}...`);
      
      const sourcePath = path.join(EFFECT_SOURCE_DIR, filename);
      const content = fs.readFileSync(sourcePath, 'utf8');
      
      if (!content.trim()) {
        console.warn(`⚠️ Empty file: ${filename}`);
        errorCount++;
        continue;
      }

      const effectData = convertEffectToLocalFormat(filename, content);
      
      // Sauvegarder l'effet converti
      const destPath = path.join(LOCAL_EFFECTS_DIR, effectData.filename);
      fs.writeFileSync(destPath, effectData.content, 'utf8');
      
      loadedEffects.push({
        id: effectData.id,
        name: effectData.name,
        description: effectData.description,
        file: effectData.filename,
        category: effectData.category,
        type: effectData.type
      });
      
      console.log(`✅ Converted: ${effectData.name} (${effectData.category})`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to process ${filename}:`, error.message);
      errorCount++;
    }
  }

  // Mettre à jour l'index des effets
  const indexPath = path.join(LOCAL_EFFECTS_DIR, 'effectsIndex.json');
  fs.writeFileSync(indexPath, JSON.stringify(loadedEffects, null, 2), 'utf8');

  console.log(`\n🎉 Effect loading completed!`);
  console.log(`✅ Successfully loaded: ${successCount} effects`);
  console.log(`❌ Failed to load: ${errorCount} effects`);
  console.log(`📋 Updated effectsIndex.json with ${loadedEffects.length} effects`);

  return loadedEffects;
}

function validateEffects(effects) {
  console.log('\n🔍 Validating loaded effects...');
  
  const categories = {
    text: effects.filter(e => e.category === 'text').length,
    image: effects.filter(e => e.category === 'image').length,
    both: effects.filter(e => e.category === 'both').length
  };
  
  console.log(`📊 Effect distribution:`);
  console.log(`   Text effects: ${categories.text}`);
  console.log(`   Image effects: ${categories.image}`);
  console.log(`   Universal effects: ${categories.both}`);
  
  return true;
}

function main() {
  try {
    console.log('🚀 Local Effects Loader Started');
    
    const effects = loadAllEffects();
    validateEffects(effects);
    
    console.log('\n🎊 All effects successfully loaded into local system!');
    console.log('🔧 Effects are now ready for use in EffectLab');
    
  } catch (error) {
    console.error('💥 Loading failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { loadAllEffects, validateEffects };
