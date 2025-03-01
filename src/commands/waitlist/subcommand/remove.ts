import { 
    ApplicationCommandOptionType, 
    MessageFlags 
} from "discord.js";

import { Subcommand } from "../../../structures/Subcommand";
import { getToken } from "../../../services/db";
import { ITADResponse, SQLiteResponse } from "../../../typings/rest";
import { removeGame } from "../../../services/isThereAnyDeal";

export default new Subcommand({
    name: 'remove',
    description: 'Remove a game from the authorized IsThereAnyDeal waitlist',
    options: [
        {
            name: 'id',
            description: 'Steam game id to remove from waitlist',
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],
    run: async ({ interaction }) => {
        try {
            const steamId = interaction.options.get('id')?.value;
            const user = interaction.user.id;
            const token = (await getToken(user) as SQLiteResponse).document.accessToken;

            const response = await removeGame(token, steamId as number) as ITADResponse;

            if (!response || response.status != 200) return await interaction.reply({ content: `${ response?.message }`, flags: MessageFlags.Ephemeral });

            return await interaction.reply({ 
                content: `Removed Steam game with Id ${ steamId } from waitlist`, 
                flags: MessageFlags.Ephemeral 
            });
        } catch (err) {
            console.error(err);

            return await interaction.reply({ content: `Something went wrong`, flags: MessageFlags.Ephemeral });
        }
    }       
})
