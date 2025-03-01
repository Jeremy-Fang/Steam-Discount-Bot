import { ApplicationCommandOptionType, MessageFlags } from "discord.js";

import { Subcommand } from "../../../structures/Subcommand";
import { getToken } from "../../../services/db";
import { ITADResponse, SQLiteResponse } from "../../../typings/rest";
import { addGame } from "../../../services/isThereAnyDeal";

export default new Subcommand({
    name: 'add',
    description: 'Add a game to the authorized IsThereAnyDeal waitlist',
    options: [
        {
            name: 'id',
            description: 'Steam game id to add to waitlist',
            type: ApplicationCommandOptionType.Integer,
            required: true
        }
    ],
    run: async ({ interaction }) => {
        try {
            const steamId = interaction.options.get('id')?.value;
            const user = interaction.user.id;
            const token = (await getToken(user) as SQLiteResponse).document.accessToken;

            const response = await addGame(token, steamId as number) as ITADResponse;

            if (!response || response.status != 204) return await interaction.reply({ content: `${ response?.message }`, flags: MessageFlags.Ephemeral });

            return await interaction.reply({ 
                content: `Added Steam game with Id ${ steamId } to waitlist`, 
                flags: MessageFlags.Ephemeral 
            });
        } catch (err) {
            console.error(err);

            return await interaction.reply({ content: `Something went wrong`, flags: MessageFlags.Ephemeral });
        }
    }       
})
