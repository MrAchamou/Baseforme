
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script de vérification des effets JSfile
 */

const JSFILE_DIR = path.join(__dirname, '../JSfile');

async function verifyJSfileEffects() {
  console.log('🔧 Verifying JSfile effects...');
  
  if (!fs.existsSync(JSFILE_DIR)) {
    console.error(`❌ JSfile directory not found: ${JSFILE_DIR}`);
    return false;
  }
  
  const files = fs.readdirSync(JSFILE_DIR);
  const effectFiles = files.filter(file => file.endsWith('.effect.js'));
  const otherFiles = files.filter(file => !file.endsWith('.effect.js') && !file.startsWith('.'));
  
  console.log(`📊 Total files in JSfile: ${files.length}`);
  console.log(`📊 Effect files (.effect.js): ${effectFiles.length}`);
  console.log(`📊 Other files: ${otherFiles.length}`);
  
  // Afficher tous les fichiers d'effets
  console.log('\n📝 Effect files found:');
  effectFiles.sort().forEach((filename, index) => {
    console.log(`   ${index + 1}. ${filename}`);
  });
  
  // Vérification de chaque fichier d'effet
  let validEffects = 0;
  let invalidEffects = 0;
  let emptyEffects = 0;
  
  console.log('\n🔍 Detailed verification:');
  
  for (const filename of effectFiles) {
    const filePath = path.join(JSFILE_DIR, filename);
    
    try {
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath, 'utf8').trim();
      
      if (content.length === 0) {
        console.warn(`⚠️ Empty effect file: ${filename}`);
        emptyEffects++;
        invalidEffects++;
      } else if (content.length < 10) {
        console.warn(`⚠️ Very small effect file: ${filename} (${content.length} chars)`);
        emptyEffects++;
        invalidEffects++;
      } else {
        console.log(`✅ Valid effect: ${filename} (${stats.size} bytes, ${content.length} chars)`);
        validEffects++;
      }
    } catch (error) {
      console.error(`❌ Error reading ${filename}:`, error.message);
      invalidEffects++;
    }
  }
  
  // Vérifier la cohérence avec le loader local
  const loaderPath = path.join(__dirname, '../client/src/lib/local-effects-loader.ts');
  if (fs.existsSync(loaderPath)) {
    const loaderContent = fs.readFileSync(loaderPath, 'utf8');
    const knownEffectsMatch = loaderContent.match(/KNOWN_JSFILE_EFFECTS\s*=\s*\[([\s\S]*?)\]/);
    
    if (knownEffectsMatch) {
      const knownEffectsText = knownEffectsMatch[1];
      const knownEffectsCount = (knownEffectsText.match(/'/g) || []).length / 2;
      
      console.log(`\n🔗 Loader comparison:`);
      console.log(`   Effects in JSfile directory: ${effectFiles.length}`);
      console.log(`   Effects in loader: ${knownEffectsCount}`);
      
      if (effectFiles.length !== knownEffectsCount) {
        console.warn(`⚠️ Mismatch between directory (${effectFiles.length}) and loader (${knownEffectsCount})`);
        
        // Identifier les effets manquants
        const knownEffects = knownEffectsText.match(/'([^']+)'/g) || [];
        const knownEffectsNames = knownEffects.map(e => e.replace(/'/g, ''));
        
        const missingInLoader = effectFiles.filter(f => !knownEffectsNames.includes(f));
        const missingInDirectory = knownEffectsNames.filter(f => !effectFiles.includes(f));
        
        if (missingInLoader.length > 0) {
          console.log(`   📤 Effects in directory but not in loader:`);
          missingInLoader.forEach(f => console.log(`      - ${f}`));
        }
        
        if (missingInDirectory.length > 0) {
          console.log(`   📥 Effects in loader but not in directory:`);
          missingInDirectory.forEach(f => console.log(`      - ${f}`));
        }
      }
    }
  }
  
  console.log(`\n📈 Summary:`);
  console.log(`   Valid effects: ${validEffects}`);
  console.log(`   Empty/Invalid effects: ${invalidEffects}`);
  console.log(`   Empty effects: ${emptyEffects}`);
  console.log(`   Total: ${validEffects + invalidEffects}`);
  
  // Vérification des fichiers non-effet
  if (otherFiles.length > 0) {
    console.log(`\n📄 Other files in JSfile:`);
    otherFiles.forEach(file => {
      const filePath = path.join(JSFILE_DIR, file);
      const stats = fs.statSync(filePath);
      console.log(`   - ${file} (${stats.size} bytes)`);
    });
  }
  
  const success = invalidEffects === 0 && validEffects === effectFiles.length;
  
  if (success) {
    console.log('\n🎉 All JSfile effects are valid!');
  } else {
    console.log('\n💥 Some effects have issues that need attention!');
  }
  
  return success;
}

if (require.main === module) {
  verifyJSfileEffects().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}

module.exports = { verifyJSfileEffects };
