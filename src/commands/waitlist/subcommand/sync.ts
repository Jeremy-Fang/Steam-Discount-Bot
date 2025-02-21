import { 
    ApplicationCommandOptionType, 
    MessageFlags 
} from "discord.js";

import { Subcommand } from "../../../structures/Subcommand";

export default new Subcommand({
    name: 'sync',
    description: 'Sync a Steam wishlist with the authorized IsThereAnyDeal waitlist',
    options: [
        {
            name: 'id',
            description: 'Steam id of user whose wishlist you wish to sync',
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],
    run: async ({ interaction }) => {
        await interaction.reply({ content: `Successfully synced waitlist with Steam User ${ interaction.options.get('id')?.value }`, flags: MessageFlags.Ephemeral })
    }       
})
