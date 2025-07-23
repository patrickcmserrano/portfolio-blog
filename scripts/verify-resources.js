#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🔍 Verificando recursos antes do build...');

// Verificar se os arquivos críticos existem
const criticalFiles = [
    'static/mindmaps/Fundamentos da arquitetura de software.pdf',
    'static/favicon.png',
    'static/posts.json'
];

let hasErrors = false;

criticalFiles.forEach(file => {
    const fullPath = path.join(projectRoot, file);
    if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        console.log(`✅ ${file} (${stats.size} bytes)`);
    } else {
        console.error(`❌ ERRO: ${file} não encontrado!`);
        hasErrors = true;
    }
});

// Verificar URLs corretas nos arquivos
const pageFile = path.join(projectRoot, 'src/routes/blog/[id]/+page.svelte');
if (fs.existsSync(pageFile)) {
    const content = fs.readFileSync(pageFile, 'utf-8');
    
    // Verificar se as URLs estão usando {base} corretamente
    if (content.includes('pdfUrl="{base}/mindmaps/')) {
        console.log('✅ URLs do PDF estão corretas');
    } else {
        console.error('❌ ERRO: URLs do PDF podem estar incorretas!');
        hasErrors = true;
    }
} else {
    console.error(`❌ ERRO: src/routes/blog/[id]/+page.svelte não encontrado!`);
    hasErrors = true;
}

if (hasErrors) {
    console.error('\n💥 Erros encontrados! Corrija antes de fazer o deploy.');
    process.exit(1);
} else {
    console.log('\n✅ Todos os recursos estão OK! Prosseguindo com o build...');
    process.exit(0);
}
