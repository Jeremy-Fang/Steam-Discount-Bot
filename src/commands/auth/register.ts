import { 
    ApplicationCommandOptionType, 
    MessageFlags
} from "discord.js";

import { Command } from "../../structures/Command";
import { registerAccessToken } from "../../services/auth";
import { AuthResponse } from "../../typings/rest";

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

        const response = (await registerAccessToken(id, access_token)) as AuthResponse;
        
        if (!response || response.status != 200) return await interaction.reply({ content: `${ response?.message }`, flags: MessageFlags.Ephemeral });

        return await interaction.reply({ 
            content: `Successfully registered access token to user ${ interaction.user.username }`, 
            flags: MessageFlags.Ephemeral 
        });
    }     
})