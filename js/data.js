export async function fetchMotori() {
    const response = await fetch('./data/motori.json');
    if (!response.ok) {
        throw new Error('Mrežna pogreška prilikom dohvaćanja podataka.');
    }
    return await response.json();
}