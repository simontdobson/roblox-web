export async function getRobloxStatus() {

    const response = await fetch('/api/robloxStatus');
    return await response.json();
}