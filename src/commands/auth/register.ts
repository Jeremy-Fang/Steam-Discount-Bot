import { 
    ApplicationCommandOptionType, 
    MessageFlags
} from "discord.js";
import { Command } from "../../structures/Command";

import { registerToken } from "../../services/db";
import { SQLiteResponse } from "../../typings/rest";


export default new Command({
    name: 'register',
    description: 'Registers waitlist access token for IsThereAnyDeal account with this Discord user',
    options: [
        {
            name: 'access_token',
            description: 'IsThereAnyDeal access token',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async ({ interaction }) => {
        // get Discord user id
        const id = interaction.user.id;
        const access_token = interaction.options.get('access_token')?.value as string;

        // register access token with discord user id in sqlite database
        const response = await registerToken(id, access_token) as SQLiteResponse;
        
        if (!response || response.status != 200) return await interaction.reply({ content: `${ response?.message }`, flags: MessageFlags.Ephemeral });

        return await interaction.reply({ 
            content: `Successfully registered access token to user ${ interaction.user.username }`, 
            flags: MessageFlags.Ephemeral 
        });
    }     
})