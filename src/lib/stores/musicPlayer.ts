import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Track } from '$lib/music/playlist';

export interface MusicPlayerState {
	isPlaying: boolean;
	currentTime: number;
	duration: number;
	volume: number;
	isMinimized: boolean;
	isLoaded: boolean;
	currentTrack: Track | null;
	shuffle: boolean;
	repeat: 'none' | 'one' | 'all';
}

const defaultState: MusicPlayerState = {
	isPlaying: false,
	currentTime: 0,
	duration: 0,
	volume: 0.3,
	isMinimized: false,
	isLoaded: false,
	currentTrack: null,
	shuffle: false,
	repeat: 'none'
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
		
		setCurrentTrack: (track: Track) => update(state => ({ 
			...state, 
			currentTrack: track,
			currentTime: 0,
			isLoaded: false 
		})),
		
		toggleMinimized: () => update(state => ({ ...state, isMinimized: !state.isMinimized })),
		setMinimized: (minimized: boolean) => update(state => ({ ...state, isMinimized: minimized })),
		
		toggleShuffle: () => update(state => ({ ...state, shuffle: !state.shuffle })),
		setShuffle: (shuffle: boolean) => update(state => ({ ...state, shuffle })),
		
		setRepeat: (repeat: 'none' | 'one' | 'all') => update(state => ({ ...state, repeat })),
		toggleRepeat: () => update(state => ({
			...state,
			repeat: state.repeat === 'none' ? 'all' : state.repeat === 'all' ? 'one' : 'none'
		})),
		
		setLoaded: (loaded: boolean) => update(state => ({ ...state, isLoaded: loaded })),
		
		// Persistência
		saveToLocalStorage: (state: MusicPlayerState) => {
			if (browser) {
				localStorage.setItem('musicPlayerState', JSON.stringify({
					isPlaying: false, // Não restaurar reprodução automática
					currentTime: 0, // Reiniciar do início
					volume: state.volume,
					isMinimized: state.isMinimized,
					currentTrack: state.currentTrack,
					shuffle: state.shuffle,
					repeat: state.repeat
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
							volume: savedState.volume ?? defaultState.volume,
							isMinimized: savedState.isMinimized ?? defaultState.isMinimized,
							currentTrack: savedState.currentTrack ?? null,
							shuffle: savedState.shuffle ?? defaultState.shuffle,
							repeat: savedState.repeat ?? defaultState.repeat,
							// Sempre começar pausado e do início
							isPlaying: false,
							currentTime: 0,
							isLoaded: false
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
