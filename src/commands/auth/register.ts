import { 
    ApplicationCommandOptionType, 
    MessageFlags
} from "discord.js";

import { Command } from "../../structures/Command";

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

        console.log(interaction.user.id);
        
        await interaction.reply({ 
            content: `Registered access token ${ interaction.options.get('access_token')?.value } to user ${ interaction.user.username }`, 
            flags: MessageFlags.Ephemeral 
        });
    }     
})