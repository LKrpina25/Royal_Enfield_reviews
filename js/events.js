import { state, toggleFavorite } from './state.js';
import { renderKatalog, otvoriModal, prebaciStranicu } from './ui.js';

export function inicijalizirajEvente() {
    // SPA Navigacija kroz tabove
    document.querySelectorAll('.nav-btn').forEach(gumb => {
        gumb.addEventListener('click', (e) => {
            prebaciStranicu(e.target.dataset.target);
        });
    });

    // Filtar: Unos teksta (Pretraga)
    document.getElementById('search-input').addEventListener('input', (e) => {
        state.filteri.search = e.target.value;
        renderKatalog();
    });

    // Filtar: Odabir kategorije iz padajućeg izbornika
    document.getElementById('category-filter').addEventListener('change', (e) => {
        state.filteri.category = e.target.value;
        renderKatalog();
    });

    // Filtar: Checkbox za favorite
    document.getElementById('favorites-filter').addEventListener('change', (e) => {
        state.filteri.onlyFavorites = e.target.checked;
        renderKatalog();
    });

    // Delegacija klikova za gumbe na karticama koji se dinamički stvaraju
    document.getElementById('motori-container').addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        if (e.target.classList.contains('btn-details')) {
            otvoriModal(id);
        } else if (e.target.classList.contains('btn-fav')) {
            toggleFavorite(id);
            renderKatalog(); // Ponovno iscrtaj da se promijeni srce/zvjezdica
        }
    });

    // Zatvaranje modala na klik gumba X
    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('details-modal').close();
    });

    // Validacija kontakt forme bez osvježavanja stranice (preventDefault)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        // Validacija imena
        const nameInput = document.getElementById('name');
        const nameError = nameInput.nextElementSibling;
        if (nameInput.value.trim().length < 3) {
            nameError.textContent = 'Ime i prezime moraju imati barem 3 znaka.';
            isFormValid = false;
        } else {
            nameError.textContent = '';
        }

        // Validacija emaila
        const emailInput = document.getElementById('email');
        const emailError = emailInput.nextElementSibling;
        if (!emailInput.value.includes('@') || emailInput.value.length < 5) {
            emailError.textContent = 'Molimo unesite ispravnu email adresu.';
            isFormValid = false;
        } else {
            emailError.textContent = '';
        }

        // Ako je sve u redu, prikaži uspjeh
        if (isFormValid) {
            const successDiv = document.getElementById('form-success');
            successDiv.textContent = `Uspjeh! Hvala Vam, ${nameInput.value}. Vaša poruka je poslana (simulirano).`;
            successDiv.classList.remove('hidden');
            form.reset();
        }
    });
}