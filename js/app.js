import { fetchMotori } from './data.js';
import { state } from './state.js';
import { renderKatalog, prikaziState } from './ui.js';
import { inicijalizirajEvente } from './events.js';

async function pokreniAplikaciju() {
    prikaziState('loading');
    try {
        state.motori = await fetchMotori();
        prikaziState('success');
        renderKatalog();
    } catch (error) {
        console.error(error);
        prikaziState('error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    inicijalizirajEvente();
    pokreniAplikaciju();
});