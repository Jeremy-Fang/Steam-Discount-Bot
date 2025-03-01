import { TokenMap } from "../db/models/TokenMap";

/**
 * Registers a unique Discord Id with an IsThereAnyDeal access token in the 
 * sqlite database
 *  
 * @param id Discord Id 
 * @param access_token IsThereAnyDeal access token
 * @returns SQLiteResponse successfully created entry
 */
export const registerToken = async (id: string, access_token: string) => {
    try {
        // create table if it does not exist
        await TokenMap.sync();

        const entry = await TokenMap.create({ id, access_token });

        if (!entry) return { status: 500, message: '[ERROR] Entry could not be created' };

        return { status: 200, message: 'Entry successfully created', document: entry.dataValues };
    } catch (err) {
        console.error(err);

        return { status: 500, message: '[ERROR] Internal Server Error'};
    }
}

/**
 * Gets entry from Token map based on Discord user Id
 * 
 * @param id Discord Id 
 * @returns SQLiteResponse matching entry
 */
export const getToken = async (id: string) => {
    try {
        const entry = await TokenMap.findByPk(id);

        if (!entry) return { status: 404, message: '[ERROR] Matching entry not found' };

        return {status: 200, document: entry.dataValues };
    } catch (err) {
        console.error(err);

        return { status: 500, message: '[ERROR] Internal Server Error'};
    }
}

/**
 * Updates access_token for entry in sqlite database matching id
 *  
 * @param id Discord Id
 * @param access_token IsThereAnyDeal access token
 * @returns SQLiteResponse updated entry
 */
export const updateToken = async (id: string, access_token: string) => {
    try {
        const entry = await TokenMap.findByPk(id);

        if (!entry) return { status: 404, message: '[ERROR] Matching entry not found' };

        const updatedEntry = await TokenMap.update({ access_token }, { where: { id } });

        if (!updatedEntry) return { status: 500, message: '[ERROR] Unable to update entry' };

        return {status: 200, updatedEntry };
    } catch (err) {
        console.error(err);
        
        return { status: 500, message: '[ERROR] Internal Server Error'};
    }
}

/**
 * Deletes entry from sqlite database matching id
 * 
 * @param id Discord Id
 * @returns SQLiteResponse deleted entry 
 */
export const deleteToken = async (id: string) => {
    try {

    } catch (err) {
        console.error(err);

        return null;
    }
}