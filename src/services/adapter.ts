
/**
 * Function which makes POST to adapter API to get a webkhook URL
 * that transforms POST data into readable form by Discord webhooks 
 * 
 * @param url Discord webhook URL
 * @returns AdapterResponse REST response
 */
export const createAdaptedUrl = async (id: string, token: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        const url = `${process.env.DISCORD_WEBHOOK_BASE_URL}/${id}/${token}`;

        const response = await fetch(`${process.env.ADAPTER_API_BASE_URL}/api/adapter/`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ url })
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return null;
    }
}

/**
 * Function which gets a db entry matching the provided uuid
 * 
 * @param uuid UUID
 * @return AdapterResponse REST response 
 */
export const getAdaptedUrl = async (uuid: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        const response = await fetch(`${process.env.ADAPTER_API_BASE_URL}/api/adapter/${uuid}`, {
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
 * Function which makes PATCH to adapter API to replace the webhook URL
 * associated with the UUID provided 
 * 
 * @param uuid UUID
 * @param  Discord webhook URL
 * @returns AdapterResponse REST response
 */
export const updateAdaptedUrl = async (uuid: string, id: string, token: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        const url = `${process.env.DISCORD_WEBHOOK_BASE_URL}/${id}/${token}`;

        const response = await fetch(`${process.env.ADAPTER_API_BASE_URL}/api/adapter/${uuid}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ url })
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return null;
    }
}

/**
 * Function which makes DELETE request to adapter API to delete
 * an entry in the database associated with the provided uuid
 * 
 * @param uuid UUID
 * @returns AdapterResponse REST response
 */
export const deleteAdaptedUrl = async (uuid: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        const response = await fetch(`${process.env.ADAPTER_API_BASE_URL}/api/adapter/${uuid}`, {
            method: 'DELETE',
            headers
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return null;
    }
}