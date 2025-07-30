
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSFILE_DIR = path.join(__dirname, '../JSfile');

console.log('🔍 Debugging effect formats in JSfile directory...');

const files = fs.readdirSync(JSFILE_DIR);
const effectFiles = files.filter(f => f.endsWith('.effect.js')).slice(0, 5); // Premiers 5 effets

effectFiles.forEach(filename => {
  console.log(`\n📁 Analyzing: ${filename}`);
  
  const filePath = path.join(JSFILE_DIR, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`📊 Size: ${content.length} characters`);
  console.log(`📄 First 200 characters:`);
  console.log(content.substring(0, 200) + '...');
  
  console.log(`🔍 Contains 'export':`, content.includes('export'));
  console.log(`🔍 Contains 'function':`, content.includes('function'));
  console.log(`🔍 Contains 'const':`, content.includes('const'));
  console.log(`🔍 Contains 'module.exports':`, content.includes('module.exports'));
});
