
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSFILE_DIR = path.join(__dirname, '../JSfile');

console.log('🔍 EffectLab Application Diagnostic');
console.log('=====================================\n');

// Check JSfile directory
console.log('📁 JSfile Directory Analysis:');
if (!fs.existsSync(JSFILE_DIR)) {
  console.error('❌ JSfile directory not found');
  process.exit(1);
}

const files = fs.readdirSync(JSFILE_DIR);
const effectFiles = files.filter(f => f.endsWith('.effect.js'));
const otherFiles = files.filter(f => !f.endsWith('.effect.js'));

console.log(`   Total files: ${files.length}`);
console.log(`   Effect files: ${effectFiles.length}`);
console.log(`   Other files: ${otherFiles.length}`);

// Analyze effect files
let validEffects = 0;
let invalidEffects = 0;
const errors = [];

for (const file of effectFiles) {
  const filePath = path.join(JSFILE_DIR, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const stats = fs.statSync(filePath);
    
    if (content.trim().length === 0) {
      errors.push(`${file}: Empty file`);
      invalidEffects++;
      continue;
    }
    
    if (!content.includes('export')) {
      errors.push(`${file}: No export statements`);
      invalidEffects++;
      continue;
    }
    
    if (stats.size > 100000) {
      errors.push(`${file}: Large file (${Math.round(stats.size/1024)}KB)`);
    }
    
    validEffects++;
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
    invalidEffects++;
  }
}

console.log(`   Valid effects: ${validEffects}`);
console.log(`   Invalid effects: ${invalidEffects}`);

if (errors.length > 0) {
  console.log('\n⚠️ Issues found:');
  errors.forEach(error => console.log(`   - ${error}`));
}

// Check client dependencies
console.log('\n📦 Dependencies Check:');
const packagePath = path.join(__dirname, '../package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log(`   React: ${packageJson.dependencies?.react || 'Not found'}`);
  console.log(`   TypeScript: ${packageJson.devDependencies?.typescript || 'Not found'}`);
  console.log(`   Vite: ${packageJson.devDependencies?.vite || 'Not found'}`);
} else {
  console.error('❌ package.json not found');
}

// Check server configuration
console.log('\n🚀 Server Configuration:');
const serverPath = path.join(__dirname, '../server/index.ts');
if (fs.existsSync(serverPath)) {
  const serverContent = fs.readFileSync(serverPath, 'utf8');
  const hasJSfileRoute = serverContent.includes('/JSfile');
  const hasPort = serverContent.includes('PORT');
  
  console.log(`   JSfile route configured: ${hasJSfileRoute ? '✅' : '❌'}`);
  console.log(`   Port configuration: ${hasPort ? '✅' : '❌'}`);
} else {
  console.error('❌ server/index.ts not found');
}

// Final summary
console.log('\n📊 Summary:');
const overallHealth = invalidEffects === 0 && errors.length === 0 ? 'HEALTHY' : 'NEEDS ATTENTION';
console.log(`   Overall status: ${overallHealth}`);
console.log(`   Effect files ready: ${validEffects}/${effectFiles.length}`);

if (overallHealth === 'NEEDS ATTENTION') {
  console.log('\n💡 Recommendations:');
  console.log('   1. Fix invalid effect files');
  console.log('   2. Ensure all effects follow the correct export format');
  console.log('   3. Check server configuration for JSfile routing');
}

console.log('\n🎯 Diagnostic completed!');
