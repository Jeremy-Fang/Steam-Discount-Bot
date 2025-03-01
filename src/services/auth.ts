
/**
 * Function which registers a access_token with a unique Discord user id
 * 
 * @param id Discord user id
 * @param accessToken IsThereAnyDeal account access token
 * @returns AuthResponse REST response
 */
export const registerAccessToken = async (id: string, accessToken: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        const response = await fetch(`${process.env.ADAPTER_API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ id, access_token: accessToken })
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return null;
    }
}