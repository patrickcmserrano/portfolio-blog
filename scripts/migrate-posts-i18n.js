import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script para migrar posts existentes para o formato de i18n
 * Renomeia posts .md para .pt.md e cria templates para versões em inglês
 */

const postsDir = path.join(__dirname, '..', 'static', 'posts');
const postsJsonPath = path.join(__dirname, '..', 'static', 'posts.json');

// Lê a lista de posts do posts.json
const posts = JSON.parse(fs.readFileSync(postsJsonPath, 'utf8'));

// Processamento dos arquivos existentes
for (const post of posts) {
  const originalFile = path.join(postsDir, `${post.id}.md`);
  const ptFile = path.join(postsDir, `${post.id}.pt.md`);
  const enFile = path.join(postsDir, `${post.id}.en.md`);
  
  // Verifica se o arquivo original existe
  if (fs.existsSync(originalFile)) {
    // Se ainda não foi migrado, renomeia para .pt.md
    if (!fs.existsSync(ptFile)) {
      console.log(`📝 Migrando: ${post.id}.md → ${post.id}.pt.md`);
      fs.renameSync(originalFile, ptFile);
    }
    
    // Cria template em inglês se não existir
    if (!fs.existsSync(enFile)) {
      console.log(`🌍 Criando template em inglês: ${post.id}.en.md`);
      const englishTemplate = createEnglishTemplate(post);
      fs.writeFileSync(enFile, englishTemplate);
    }
  } else if (fs.existsSync(ptFile)) {
    console.log(`✅ Já migrado: ${post.id}`);
    
    // Cria template em inglês se não existir
    if (!fs.existsSync(enFile)) {
      console.log(`🌍 Criando template em inglês: ${post.id}.en.md`);
      const englishTemplate = createEnglishTemplate(post);
      fs.writeFileSync(enFile, englishTemplate);
    }
  } else {
    console.log(`⚠️  Arquivo não encontrado: ${post.id}.md`);
  }
}

function createEnglishTemplate(post) {
  return `# ${post.title} (English Version)

> **Note**: This post is currently available only in Portuguese. English translation is in progress.
> 
> **Nota**: Este post está atualmente disponível apenas em português. A tradução para o inglês está em andamento.

## Summary / Resumo

${post.excerpt}

---

## Translation Status / Status da Tradução

- [ ] Title translated / Título traduzido
- [ ] Content translated / Conteúdo traduzido
- [ ] Code examples translated / Exemplos de código traduzidos
- [ ] Technical review completed / Revisão técnica concluída

---

## Contribution / Contribuição

If you'd like to help translate this content to English, please feel free to contribute!

Se você gostaria de ajudar a traduzir este conteúdo para o inglês, sinta-se à vontade para contribuir!

---

*This is a placeholder template. The complete English translation will be available soon.*

*Este é um template temporário. A tradução completa em inglês estará disponível em breve.*
`;
}

console.log('\n✨ Migração concluída!');
console.log('📋 Próximos passos:');
console.log('1. Revisar os templates criados em inglês');
console.log('2. Traduzir o conteúdo dos posts principais');
console.log('3. Testar o seletor de idiomas no site');
console.log('4. Atualizar os metadados nos arquivos posts.pt.json e posts.en.json');