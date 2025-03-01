
/**
 * Function which makes POST to adapter API to get a webkhook URL
 * that transforms POST data into readable form by Discord webhooks 
 * @param url Discord webhook URL
 * @returns string new webhook URL
 */
export const createAdaptedUrl = async (url: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

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