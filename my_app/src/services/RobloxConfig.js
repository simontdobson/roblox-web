export async function getRobloxConfig() {
    console.log('RobloxConfig.js getRobloxConfig');
    const response = await fetch('/api/robloxConfig');
    return await response.json();
}

export async function updateConfig(payload) {
	console.log('in function RobloxConfig.updateConfig ' + JSON.stringify(payload));
    const response = await fetch(`/api/robloxConfig`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: payload})
      })
    return await response.json();
}