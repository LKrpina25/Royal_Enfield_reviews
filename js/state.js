export const state = {
    motori: [],
    filteri: {
        search: '',
        category: 'all',
        onlyFavorites: false
    },
    favoriti: JSON.parse(localStorage.getItem('re_favorites')) || []
};

export function toggleFavorite(id) {
    if (state.favoriti.includes(id)) {
        state.favoriti = state.favoriti.filter(favId => favId !== id);
    } else {
        state.favoriti.push(id);
    }
    localStorage.setItem('re_favorites', JSON.stringify(state.favoriti));
}

export function getFilteredData() {
    return state.motori.filter(motor => {
        const matchesSearch = motor.naziv.toLowerCase().includes(state.filteri.search.toLowerCase());
        const matchesCategory = state.filteri.category === 'all' || motor.kategorija === state.filteri.category;
        const matchesFav = !state.filteri.onlyFavorites || state.favoriti.includes(motor.id);
        return matchesSearch && matchesCategory && matchesFav;
    });
}