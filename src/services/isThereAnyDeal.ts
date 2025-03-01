
/**
 * Returns Object containing IsThereAnyDeal waitlist associated with the users
 * accessToken
 * 
 * @param accessToken IsThereAnyDeal access token
 * @returns ITADResponse IsThereAnyDeal waitlist
 */
export const getList = async (accessToken: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ accessToken }`
        };

        const response = await fetch(`${process.env.ADAPTER_API_BASE_URL}/api/itad/waitlist/`, {
            method: 'GET',
            headers
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return null;
    }
}

/**
 * Returns response stating whether or not the game was successfully added to the waitlist
 * 
 * @param accessToken IsThereAnyDeal access token 
 * @param steamGameId Steam game Id
 * @returns ITADResponse Response with status code and message
 */
export const addGame = async (accessToken: string, steamGameId: number) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ accessToken }`
        };

        const response = await fetch(`${process.env.ADAPTER_API_BASE_URL}/api/itad/waitlist/add`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ ids: [ steamGameId.toString() ] })
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return null;
    }
}

/**
 * Returns response stating whether or not the game was successfully removed from the waitlist
 * 
 * @param accessToken IsThereAnyDeal access token 
 * @param steamGameId Steam game Id
 * @returns ITADResponse Response with status code and message
 */
export const removeGame = async (accessToken: string, steamGameId: number) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ accessToken }`
        };

        const response = await fetch(`${process.env.ADAPTER_API_BASE_URL}/api/itad/waitlist/remove`, {
            method: 'DELETE',
            headers,
            body: JSON.stringify({ ids: [ steamGameId.toString() ] })
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return null;
    }
}

/**
 * Adds all games on a Steam wishlist to the IsThereAnyDeal waitlist of the User
 * identified by the access token
 * 
 * @param accessToken IsThereAnyDeal access token 
 * @param steamId Steam game Id
 * @returns ITADResponse Response with status code and message
 */
export const syncWithSteam = async (accessToken: string, steamId: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ accessToken }`
        };

        const response = await fetch(`${process.env.ADAPTER_API_BASE_URL}/api/itad/waitlist/steamid/${steamId}`, {
            method: 'POST',
            headers
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return null;
    }
}