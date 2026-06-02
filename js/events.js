import { state, toggleFavorite } from './state.js';
import { renderKatalog, otvoriModal, prebaciStranicu } from './ui.js';

export function inicijalizirajEvente() {
    // --- JS HAMBURGER LOGIKA ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('menu'); // Tvoj originalni ID 'menu'

    if (hamburgerBtn && navMenu) {
        // Prvo osigurajmo da JS postavi početno stanje ovisno o ekranu
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
        }

        hamburgerBtn.addEventListener('click', () => {
            console.log("JS Hamburger je uspješno kliknut!"); // Ovo ćeš vidjeti u F12 konzoli

            // Izravna JS provjera i manipulacija stilom u hodu
            if (navMenu.style.display === 'none' || navMenu.style.display === '') {
                navMenu.style.display = 'block';
                hamburgerBtn.textContent = '✕'; // Promijeni ikonu u X kad je otvoreno
                console.log("JS je otvorio izbornik.");
            } else {
                navMenu.style.display = 'none';
                hamburgerBtn.textContent = '☰'; // Vrati u tri crtice kad se zatvori
                console.log("JS je zatvorio izbornik.");
            }
        });

        // Kada se klikne bilo koji link unutar izbornika na mobitelu, JS ga odmah zatvara
        document.querySelectorAll('.nav-btn').forEach(gumb => {
            gumb.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                    hamburgerBtn.textContent = '☰';
                    console.log("JS je zatvorio izbornik nakon odabira stranice.");
                }
            });
        });

        // Ako korisnik rasteže prozor na računalu, JS vraća izbornik natrag
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'block';
            } else {
                if (hamburgerBtn.textContent === '☰') {
                    navMenu.style.display = 'none';
                }
            }
        });
    } else {
        console.error("Greška: JS ne može pronaći gumb (#hamburger-btn) ili izbornik (#menu) u HTML-u!");
    }
    // --- KRAJ JS HAMBURGER LOGIKE ---

    // Navigacija kroz tabove (SPA)
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