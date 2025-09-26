import { get } from 'svelte/store';
import { locale } from 'svelte-i18n';
import { base } from '$app/paths';

export interface PostMetadata {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  videoId?: string | null;
  availableLanguages?: string[];
}

export interface PostContent {
  metadata: PostMetadata;
  content: string;
  language: string;
}

/**
 * Carrega metadados dos posts considerando o idioma atual
 */
export async function loadPostsMetadata(): Promise<PostMetadata[]> {
  const currentLocale = get(locale) || 'pt';
  
  try {
    // Tenta carregar o posts.json específico do idioma
    const response = await fetch(`${base}/posts.${currentLocale}.json`);
    let posts: PostMetadata[] = [];
    
    if (response.ok) {
      posts = await response.json();
    } else {
      // Fallback para o posts.json padrão
      const fallbackResponse = await fetch(`${base}/posts.json`);
      posts = await fallbackResponse.json();
    }
    
    // Enriquece cada post com informações sobre idiomas disponíveis
    const enrichedPosts: PostMetadata[] = [];
    for (const post of posts) {
      const availableLanguages = await getAvailableLanguages(post.id);
      enrichedPosts.push({
        ...post,
        availableLanguages
      });
    }
    
    return enrichedPosts;
  } catch (error) {
    console.error('Erro ao carregar metadados dos posts:', error);
    return [];
  }
}

/**
 * Carrega o conteúdo de um post específico no idioma atual
 */
export async function loadPostContent(postId: string): Promise<PostContent | null> {
  const currentLocale = get(locale) || 'pt';
  
  try {
    // Primeiro tenta carregar no idioma atual
    let response = await fetch(`${base}/posts/${postId}.${currentLocale}.md`);
    let language = currentLocale;
    
    // Se não encontrar, tenta o idioma padrão (português)
    if (!response.ok && currentLocale !== 'pt') {
      response = await fetch(`${base}/posts/${postId}.pt.md`);
      language = 'pt';
    }
    
    // Se ainda não encontrar, tenta sem sufixo de idioma (compatibilidade)
    if (!response.ok) {
      response = await fetch(`${base}/posts/${postId}.md`);
      language = 'pt'; // Assume português como padrão
    }
    
    if (!response.ok) {
      throw new Error(`Post ${postId} não encontrado`);
    }
    
    const content = await response.text();
    
    // Carrega metadados do post
    const allPosts = await loadPostsMetadata();
    const metadata = allPosts.find(post => post.id === postId);
    
    if (!metadata) {
      throw new Error(`Metadados do post ${postId} não encontrados`);
    }
    
    return {
      metadata,
      content,
      language
    };
  } catch (error) {
    console.error(`Erro ao carregar post ${postId}:`, error);
    return null;
  }
}

/**
 * Verifica quais idiomas estão disponíveis para um post específico
 */
export async function getAvailableLanguages(postId: string): Promise<string[]> {
  const languages = ['pt', 'en'];
  const available: string[] = [];
  
  for (const lang of languages) {
    try {
      const response = await fetch(`${base}/posts/${postId}.${lang}.md`, { method: 'HEAD' });
      if (response.ok) {
        available.push(lang);
      }
    } catch {
      // Ignora erros - apenas não adiciona o idioma
    }
  }
  
  // Se nenhum idioma específico foi encontrado, verifica o arquivo sem sufixo
  if (available.length === 0) {
    try {
      const response = await fetch(`${base}/posts/${postId}.md`, { method: 'HEAD' });
      if (response.ok) {
        available.push('pt'); // Assume português como padrão
      }
    } catch {
      // Post não existe
    }
  }
  
  return available;
}

/**
 * Cria uma versão i18n do posts.json
 */
export async function generateI18nPostsJson(posts: PostMetadata[], targetLanguage: string): Promise<PostMetadata[]> {
  const i18nPosts: PostMetadata[] = [];
  
  for (const post of posts) {
    const availableLanguages = await getAvailableLanguages(post.id);
    const postWithLanguages = {
      ...post,
      availableLanguages
    };
    
    // Se o post tem tradução para o idioma alvo, ajusta os metadados se necessário
    if (availableLanguages.includes(targetLanguage)) {
      i18nPosts.push(postWithLanguages);
    } else if (availableLanguages.includes('pt')) {
      // Fallback para português
      i18nPosts.push(postWithLanguages);
    }
  }
  
  return i18nPosts;
}

/**
 * Obtém a URL do post considerando o idioma
 */
export function getPostUrl(postId: string, language?: string): string {
  const currentLocale = language || get(locale) || 'pt';
  return `${base}/posts/${postId}.${currentLocale}.md`;
}

/**
 * Gera um indicador visual dos idiomas disponíveis
 */
export function getLanguageIndicator(availableLanguages: string[]): string {
  const flags: Record<string, string> = {
    pt: '🇧🇷',
    en: '🇺🇸'
  };
  
  return availableLanguages.map(lang => flags[lang] || '🌐').join(' ');
}