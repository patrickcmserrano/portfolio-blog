// src/lib/stores/fontScale.js
import { writable } from 'svelte/store';

export const fontScale = writable(1.0); // Fator de escala inicial (1.0 = 100%)

fontScale.subscribe(scale => {
    if (typeof window !== 'undefined') {
        // Aplica o fator de escala ao elemento raiz
        document.documentElement.style.setProperty('--font-scale', scale.toString());
    }
});