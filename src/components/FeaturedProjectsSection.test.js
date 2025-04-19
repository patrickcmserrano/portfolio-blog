import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import FeaturedProjectsSection from './FeaturedProjectsSection.svelte';
import '@testing-library/jest-dom';

describe('FeaturedProjectsSection', () => {
	const projects = [
		{
			title: 'Módulo de Inteligência',
			year: '2024',
			description: 'Descrição do projeto',
			impact: ['Impacto 1'],
			tags: ['Tag 1']
		}
	];

	it('deve renderizar o título corretamente', () => {
		render(FeaturedProjectsSection, { props: { title: 'Projetos em Destaque', projects } });
		expect(screen.getByText('Projetos em Destaque')).toBeInTheDocument();
	});

	it('deve renderizar os projetos corretamente', () => {
		render(FeaturedProjectsSection, { props: { title: 'Projetos em Destaque', projects } });
		expect(screen.getByText('Módulo de Inteligência')).toBeInTheDocument();
		expect(screen.getByText('2024')).toBeInTheDocument();
		expect(screen.getByText('Descrição do projeto')).toBeInTheDocument();
		expect(screen.getByText('Impacto 1')).toBeInTheDocument();
		expect(screen.getByText('Tag 1')).toBeInTheDocument();
	});

	it('deve lidar com uma lista de projetos vazia', () => {
		render(FeaturedProjectsSection, { props: { title: 'Projetos em Destaque', projects: [] } });
		expect(screen.getByText('Nenhum projeto encontrado')).toBeInTheDocument();
	});
});
