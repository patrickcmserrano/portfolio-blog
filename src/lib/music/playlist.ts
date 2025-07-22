import { base } from '$app/paths';

export interface Track {
	id: string;
	title: string;
	artist: string;
	filename: string;
	duration?: number;
	genre: string;
}

export const playlist: Track[] = [
	{
		id: 'samurai-lofi',
		title: 'Samurai Japanese Lofi HipHop Mix',
		artist: 'Various Artists',
		filename: 'Samurai Japanese Lofi HipHop Mix.mp3',
		genre: 'Lo-Fi Hip Hop'
	},
	{
		id: 'villain-playlist',
		title: 'A Playlist to Feel Like a 19th Century Villain Who Won the Game',
		artist: 'Various Artists', 
		filename: 'A Playlist to Feel Like a 19th Century Villain Who Won the Game.mp3',
		genre: 'Dark Academia'
	},
	{
		id: 'monodrone-city',
		title: '街で夜を過ごす (Spend The Night In The City)',
		artist: 'Monodrone',
		filename: 'Monodrone _ 街で夜を過ごす (Spend The Night In The City).mp3',
		genre: 'Synthwave'
	},
	{
		id: 'tree-of-savior',
		title: 'Tree of Savior Music - Game Soundtrack Best of Mix',
		artist: 'IMC Games',
		filename: 'Tree of Savior Music - Game Soundtrack Best of Mix.mp3',
		genre: 'Game Soundtrack'
	}
];

export function getTrackUrl(track: Track): string {
	return `${base}/music/${track.filename}`;
}

export function getTrackById(id: string): Track | undefined {
	return playlist.find(track => track.id === id);
}

export function getNextTrack(currentId: string): Track {
	const currentIndex = playlist.findIndex(track => track.id === currentId);
	const nextIndex = (currentIndex + 1) % playlist.length;
	return playlist[nextIndex];
}

export function getPreviousTrack(currentId: string): Track {
	const currentIndex = playlist.findIndex(track => track.id === currentId);
	const previousIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
	return playlist[previousIndex];
}
