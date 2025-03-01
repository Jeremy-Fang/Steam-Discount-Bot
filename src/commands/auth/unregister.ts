import { 
    MessageFlags
} from "discord.js";
import { Command } from "../../structures/Command";

import { deleteToken } from "../../services/db";
import { SQLiteResponse } from "../../typings/rest";


export default new Command({
    name: 'unregister',
    description: 'Unregisters access token associated with this Discord user',
    run: async ({ interaction }) => {
        // get Discord user id
        const id = interaction.user.id;

        // delete entry associated with discord user id in sqlite database
        const response = await deleteToken(id) as SQLiteResponse;
        
        if (!response || response.status != 200) return await interaction.reply({ content: `${ response?.message }`, flags: MessageFlags.Ephemeral });

        return await interaction.reply({ 
            content: `Successfully unregistered access token to user ${ interaction.user.username }`, 
            flags: MessageFlags.Ephemeral 
        });
    }     
})