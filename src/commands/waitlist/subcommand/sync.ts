import { 
    ApplicationCommandOptionType, 
    MessageFlags 
} from "discord.js";

import { Subcommand } from "../../../structures/Subcommand";
import { getToken } from "../../../services/db";
import { ITADResponse, SQLiteResponse } from "../../../typings/rest";
import { syncWithSteam } from "../../../services/isThereAnyDeal";

export default new Subcommand({
    name: 'sync',
    description: 'Sync a Steam wishlist with the authorized IsThereAnyDeal waitlist',
    options: [
        {
            name: 'id',
            description: 'Steam id of user whose wishlist you wish to sync',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async ({ interaction }) => {
        try {
            const steamId = interaction.options.get('id')?.value;
            const user = interaction.user.id;
            const token = (await getToken(user) as SQLiteResponse).document.accessToken;

            const response = await syncWithSteam(token, steamId as string) as ITADResponse;

            if (!response || response.status != 200) return await interaction.reply({ content: `${ response?.message }`, flags: MessageFlags.Ephemeral });

            return await interaction.reply({ 
                content: `Successfully synced waitlist with Steam User ${ interaction.options.get('id')?.value }`, 
                flags: MessageFlags.Ephemeral 
            });
        } catch (err) {
            console.error(err);

            return await interaction.reply({ content: `Something went wrong`, flags: MessageFlags.Ephemeral });
        }
    }       
})
