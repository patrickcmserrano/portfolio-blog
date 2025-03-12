// Mock dos módulos SvelteKit primeiro
vi.mock('$app/stores', () => ({
  page: {
    subscribe: vi.fn()
  }
}));

vi.mock('$app/paths', () => ({
  base: ''
}));

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/svelte';
import BlogPost from '../../routes/blog/[id]/+page.svelte';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { page } from '$app/stores';
import type { Mock } from 'vitest';

// Helper para criar mock responses
const createMockResponse = (body: string | null, options: ResponseInit & { ok?: boolean } = {}) => {
  const { ok = true, ...responseInit } = options;
  const response = new Response(body, responseInit);
  Object.defineProperty(response, 'ok', { value: ok });
  return response;
};

describe('BlogPost Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Configurar o mock do store page
    (page.subscribe as Mock).mockImplementation((callback) => {
      callback({ params: { id: 'test-post' } });
      return () => {};
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exibe o indicador de carregamento inicialmente', () => {
    const { container } = render(BlogPost);
    const loader = container.querySelector('.animate-spin');
    expect(loader).toBeInTheDocument();
  });

  it('obtém o postId dos parâmetros da página corretamente', () => {
    const { component } = render(BlogPost);
    expect(component.$$.ctx[component.$$.props['postId']]).toBe('test-post');
  });

  it('exibe mensagem de erro quando a busca falha', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Post não encontrado'));

    const { getByText } = render(BlogPost);

    await waitFor(() => {
      expect(getByText('Erro ao carregar o post')).toBeInTheDocument();
      expect(getByText('Post não encontrado')).toBeInTheDocument();
    });
  });

  it('exibe mensagem de erro quando o post não é encontrado', async () => {
    const mockResponse = createMockResponse(null, {
      status: 404,
      statusText: 'Not Found',
      ok: false
    });

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const { getByText } = render(BlogPost);

    await waitFor(() => {
      expect(getByText('Erro ao carregar o post')).toBeInTheDocument();
      expect(getByText('Post não encontrado')).toBeInTheDocument();
    });
  });

  it('renderiza o conteúdo do post após busca bem-sucedida', async () => {
    const mockMarkdown = '# Título\n\nConteúdo do post';
    const mockResponse = createMockResponse(mockMarkdown, {
      status: 200,
      statusText: 'OK'
    });
    
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const { container } = render(BlogPost);

    await waitFor(() => {
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
      const expectedHtml = DOMPurify.sanitize(marked.parse(mockMarkdown));
      expect(article?.innerHTML).toContain(expectedHtml);
    });
  });

  it('sanitiza o HTML malicioso do conteúdo', async () => {
    const mockContent = '<script>alert("malicious")</script><p>Conteúdo seguro</p>';
    const mockResponse = createMockResponse(mockContent, {
      status: 200,
      statusText: 'OK'
    });
    
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const { container } = render(BlogPost);

    await waitFor(() => {
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
      expect(article?.innerHTML).not.toContain('<script>');
      expect(article?.innerHTML).toContain('<p>Conteúdo seguro</p>');
    });
  });

  it('usa a URL correta para buscar o post', async () => {
    const mockResponse = createMockResponse('', {
      status: 200,
      statusText: 'OK'
    });

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    render(BlogPost);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/posts/test-post.md');
    });
  });
});
