import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface MusicPlayerState {
	isPlaying: boolean;
	currentTime: number;
	duration: number;
	volume: number;
	isMinimized: boolean;
	isLoaded: boolean;
}

const defaultState: MusicPlayerState = {
	isPlaying: false,
	currentTime: 0,
	duration: 0,
	volume: 0.3,
	isMinimized: false,
	isLoaded: false
};

function createMusicPlayerStore() {
	const { subscribe, set, update } = writable<MusicPlayerState>(defaultState);

	return {
		subscribe,
		set,
		update,
		
		// Actions
		play: () => update(state => ({ ...state, isPlaying: true })),
		pause: () => update(state => ({ ...state, isPlaying: false })),
		
		setCurrentTime: (time: number) => update(state => ({ ...state, currentTime: time })),
		setDuration: (duration: number) => update(state => ({ ...state, duration })),
		setVolume: (volume: number) => update(state => ({ ...state, volume })),
		
		toggleMinimized: () => update(state => ({ ...state, isMinimized: !state.isMinimized })),
		setMinimized: (minimized: boolean) => update(state => ({ ...state, isMinimized: minimized })),
		
		setLoaded: (loaded: boolean) => update(state => ({ ...state, isLoaded: loaded })),
		
		// Persistência
		saveToLocalStorage: (state: MusicPlayerState) => {
			if (browser) {
				localStorage.setItem('musicPlayerState', JSON.stringify({
					isPlaying: state.isPlaying,
					currentTime: state.currentTime,
					volume: state.volume,
					isMinimized: state.isMinimized
				}));
			}
		},
		
		loadFromLocalStorage: () => {
			if (browser) {
				try {
					const saved = localStorage.getItem('musicPlayerState');
					if (saved) {
						const savedState = JSON.parse(saved);
						update(state => ({
							...state,
							...savedState
						}));
						return savedState;
					}
				} catch (error) {
					console.warn('Erro ao carregar estado do player:', error);
				}
			}
			return null;
		},
		
		reset: () => set(defaultState)
	};
}

export const musicPlayerStore = createMusicPlayerStore();

// Store para controlar se o áudio deve tentar tocar automaticamente
export const autoplayAllowed = writable(false);
