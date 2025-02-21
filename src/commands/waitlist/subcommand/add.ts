import { ApplicationCommandOptionType, MessageFlags } from "discord.js";

import { Subcommand } from "../../../structures/Subcommand";

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
        await interaction.reply({ content: `Added Steam game with Id ${ interaction.options.get('id')?.value } to waitlist`, flags: MessageFlags.Ephemeral })
    }       
})
