export async function lockScreen() {

    const response = await fetch('/api/lockScreen');
    return await response.json();
}