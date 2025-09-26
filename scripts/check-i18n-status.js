import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script para verificar e reportar o status do sistema de i18n dos posts
 */

const postsDir = path.join(__dirname, '..', 'static', 'posts');
const postsJsonPath = path.join(__dirname, '..', 'static', 'posts.json');

// Lê a lista de posts do posts.json
const posts = JSON.parse(fs.readFileSync(postsJsonPath, 'utf8'));

console.log('📊 Status do Sistema de i18n dos Posts');
console.log('=' .repeat(50));

let totalPosts = posts.length;
let postsWithPt = 0;
let postsWithEn = 0;
let postsWithBothLanguages = 0;
let postsNeedingTranslation = [];

for (const post of posts) {
  const ptFile = path.join(postsDir, `${post.id}.pt.md`);
  const enFile = path.join(postsDir, `${post.id}.en.md`);
  
  const hasPt = fs.existsSync(ptFile);
  const hasEn = fs.existsSync(enFile);
  
  if (hasPt) postsWithPt++;
  if (hasEn) postsWithEn++;
  if (hasPt && hasEn) postsWithBothLanguages++;
  
  // Verifica se o arquivo em inglês é apenas um template
  let isEnglishComplete = false;
  if (hasEn) {
    const enContent = fs.readFileSync(enFile, 'utf8');
    isEnglishComplete = !enContent.includes('This is a placeholder template') && 
                       enContent.length > 1000; // Assume que posts completos têm pelo menos 1000 caracteres
  }
  
  const status = {
    id: post.id,
    title: post.title,
    hasPt,
    hasEn,
    isEnglishComplete,
    needsTranslation: hasEn && !isEnglishComplete
  };
  
  if (status.needsTranslation) {
    postsNeedingTranslation.push(status);
  }
  
  // Status visual
  let statusIcon = '';
  if (hasPt && isEnglishComplete) {
    statusIcon = '✅'; // Completo nos dois idiomas
  } else if (hasPt && hasEn) {
    statusIcon = '🔄'; // Tem os dois arquivos mas inglês é template
  } else if (hasPt) {
    statusIcon = '🇧🇷'; // Apenas português
  } else {
    statusIcon = '❌'; // Problema
  }
  
  console.log(`${statusIcon} ${post.id}`);
  if (!hasPt) console.log(`   ⚠️  Arquivo .pt.md não encontrado`);
  if (!hasEn) console.log(`   📝 Arquivo .en.md não encontrado`);
  if (hasEn && !isEnglishComplete) console.log(`   🔄 Arquivo .en.md é apenas template`);
}

console.log('\n📈 Estatísticas');
console.log('=' .repeat(30));
console.log(`Total de posts: ${totalPosts}`);
console.log(`Posts com versão em PT: ${postsWithPt} (${Math.round(postsWithPt/totalPosts*100)}%)`);
console.log(`Posts com versão em EN: ${postsWithEn} (${Math.round(postsWithEn/totalPosts*100)}%)`);
console.log(`Posts completos em ambos idiomas: ${postsWithBothLanguages} (${Math.round(postsWithBothLanguages/totalPosts*100)}%)`);
console.log(`Posts que precisam de tradução: ${postsNeedingTranslation.length}`);

console.log('\n🔄 Posts Priorizados para Tradução');
console.log('=' .repeat(40));

// Ordena por popularidade/importância (assumindo que posts com mais tags ou mais recentes são mais importantes)
postsNeedingTranslation.sort((a, b) => {
  const postA = posts.find(p => p.id === a.id);
  const postB = posts.find(p => p.id === b.id);
  
  // Prioriza posts com mais tags (mais abrangentes)
  return postB.tags.length - postA.tags.length;
});

postsNeedingTranslation.slice(0, 10).forEach((post, index) => {
  const postData = posts.find(p => p.id === post.id);
  console.log(`${index + 1}. ${post.title}`);
  console.log(`   📂 ${post.id}.en.md`);
  console.log(`   🏷️  ${postData.tags.join(', ')}`);
  console.log('');
});

console.log('\n🎯 Recomendações');
console.log('=' .repeat(20));
console.log('1. Priorize a tradução dos posts listados acima');
console.log('2. Considere usar ferramentas de tradução como base e depois revisar');
console.log('3. Mantenha consistência nos termos técnicos entre idiomas');
console.log('4. Teste o seletor de idiomas no site após cada tradução');

// Verifica se existem arquivos órfãos
console.log('\n🔍 Verificando arquivos órfãos...');
const allFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
const expectedFiles = new Set();

posts.forEach(post => {
  expectedFiles.add(`${post.id}.pt.md`);
  expectedFiles.add(`${post.id}.en.md`);
});

const orphanFiles = allFiles.filter(file => !expectedFiles.has(file));
if (orphanFiles.length > 0) {
  console.log('⚠️  Arquivos órfãos encontrados:');
  orphanFiles.forEach(file => console.log(`   - ${file}`));
} else {
  console.log('✅ Nenhum arquivo órfão encontrado');
}