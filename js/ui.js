import { state, getFilteredData } from './state.js';

export function renderKatalog() {
    const container = document.getElementById('motori-container');
    const emptyState = document.getElementById('empty-state');
    const vidljiviMotori = getFilteredData();

    container.innerHTML = '';

    if (vidljiviMotori.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    vidljiviMotori.forEach(motor => {
        const isFav = state.favoriti.includes(motor.id);
        const card = document.createElement('article');
        
        // Koristimo tvoju originalnu klasu iz CSS-a za izgled kartice!
        card.className = 'category-card'; 
        
        card.innerHTML = `
            <img src="${motor.slika}" alt="${motor.naziv}" class="motor-thumbnail" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;">
            <h3>${motor.naziv}</h3>
            <p>${motor.opis.substring(0, 80)}...</p>
            <div class="card-buttons" style="margin-top: 15px; display: flex; gap: 10px;">
                <button class="btn-details" data-id="${motor.id}" style="padding: 8px 12px; cursor:pointer;">Saznaj više</button>
                <button class="btn-fav" data-id="${motor.id}" style="padding: 8px 12px; cursor:pointer; background: none; border: 1px solid #ccc; border-radius: 4px;">
                    ${isFav ? '⭐ Ukloni' : '☆ Favorit'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

export function otvoriModal(id) {
    const motor = state.motori.find(m => m.id === id);
    const modal = document.getElementById('details-modal');
    const content = document.getElementById('modal-content');

    // Postavljanje naslova modala
    document.getElementById('modal-title').textContent = motor.naziv;

    // Generiranje kompletne recenzije sa slikom i listama (Prednosti/Mane) iz tvojih starih stranica!
    content.innerHTML = `
        <div class="motor-review">
            <img src="${motor.slika}" alt="${motor.naziv}" class="motor-image" style="width: 100%; max-height: 350px; object-fit: cover; border-radius: 6px; margin-bottom: 20px;">
            
            <h3>Opis</h3>
            <p>${motor.opis}</p>
            
            <h3>Specifikacije</h3>
            <ul>
                <li><strong>Motor:</strong> ${motor.specifikacije.motor}</li>
                <li><strong>Snaga:</strong> ${motor.specifikacije.snaga}</li>
                <li><strong>Okretni moment:</strong> ${motor.specifikacije.moment}</li>
                <li><strong>Cijena:</strong> ${motor.specifikacije.cijena}</li>
                <li><strong>Napomena:</strong> ${motor.specifikacije.dodatno}</li>
            </ul>
            
            <h3>Prednosti</h3>
            <ul class="prednosti-lista">
                ${motor.prednosti.map(p => `<li>✅ ${p}</li>`).join('')}
            </ul>
            
            <h3>Mane</h3>
            <ul class="mane-lista">
                ${motor.mane.map(m => `<li>❌ ${m}</li>`).join('')}
            </ul>
        </div>
    `;
    modal.showModal(); 
}

export function prebaciStranicu(targetId) {
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(targetId).classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === targetId);
    });
}

export function prikaziState(stateName) {
    document.getElementById('loading-state').classList.toggle('hidden', stateName !== 'loading');
    document.getElementById('error-state').classList.toggle('hidden', stateName !== 'error');
}