import { ApplicationCommandOptionType, MessageFlags } from "discord.js";

import { SubCommand } from "../../../structures/SubCommand";

export default new SubCommand({
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
        await interaction.reply({ content: `Removed Steam game with Id ${ interaction.options.get('id')?.value } from waitlist`, flags: MessageFlags.Ephemeral })
    }       
})
