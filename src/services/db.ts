import { TokenMap } from "../db/models/TokenMap";

/**
 * Registers a unique Discord Id with an IsThereAnyDeal access token in the 
 * sqlite database
 *  
 * @param id Discord Id 
 * @param accessToken IsThereAnyDeal access token
 * @returns SQLiteResponse successfully created entry
 */
export const registerToken = async (id: string, accessToken: string) => {
    try {
        // create table if it does not exist
        await TokenMap.sync();

        const entry = await TokenMap.create({ id, accessToken });

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
 * Updates accessToken for entry in sqlite database matching id
 *  
 * @param id Discord Id
 * @param accessToken IsThereAnyDeal access token
 * @returns SQLiteResponse updated entry
 */
export const updateToken = async (id: string, accessToken: string) => {
    try {
        const entry = await TokenMap.findByPk(id);

        if (!entry) return { status: 404, message: '[ERROR] Matching entry not found' };

        const updatedEntry = await TokenMap.update({ accessToken }, { where: { id } });

        if (!updatedEntry) return { status: 500, message: '[ERROR] Unable to update entry' };

        return {status: 200, updatedEntries: updatedEntry[0] };
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
        const entry = await TokenMap.findByPk(id);

        if (!entry) return { status: 404, message: '[ERROR] Matching entry not found' };

        const deletedEntry = await TokenMap.destroy({ where: { id } });

        if (!deletedEntry) return { status: 500, message: '[ERROR] Unable to delete entry' };

        return {status: 200, deletedEntries: deletedEntry };
    } catch (err) {
        console.error(err);

        return null;
    }
}