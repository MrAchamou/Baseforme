
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSFILE_DIR = path.join(__dirname, '../JSfile');

console.log('🔍 Verifying fixed effects...');

const files = fs.readdirSync(JSFILE_DIR);
const effectFiles = files.filter(f => f.endsWith('.effect.js'));

let validCount = 0;
let invalidCount = 0;

for (const filename of effectFiles) {
  try {
    const filePath = path.join(JSFILE_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifications de base
    const hasExport = content.includes('export default') || content.includes('export {');
    const hasId = content.includes("id: '");
    const hasName = content.includes("name: '");
    const hasEngine = content.includes('engine: function');
    
    if (hasExport && hasId && hasName && hasEngine) {
      console.log(`✅ ${filename} - Valid format`);
      validCount++;
    } else {
      console.log(`❌ ${filename} - Missing:`, {
        export: hasExport,
        id: hasId,
        name: hasName,
        engine: hasEngine
      });
      invalidCount++;
    }
    
  } catch (error) {
    console.error(`❌ Error checking ${filename}:`, error.message);
    invalidCount++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Valid effects: ${validCount}`);
console.log(`   Invalid effects: ${invalidCount}`);
console.log(`   Total: ${validCount + invalidCount}`);

if (invalidCount === 0) {
  console.log('🎉 All effects are properly formatted!');
} else {
  console.log('⚠️ Some effects need to be fixed');
}
