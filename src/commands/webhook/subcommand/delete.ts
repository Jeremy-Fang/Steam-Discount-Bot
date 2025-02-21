import { ApplicationCommandOptionType, MessageFlags } from "discord.js";

import { SubCommand } from "../../../structures/SubCommand";

export default new SubCommand({
    name: 'delete',
    description: 'Delete Discord webhook identified by a UUID',
    options: [
        {
            name: 'uuid',
            description: 'UUID associated with a Discord webhook',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async ({ interaction }) => {
        await interaction.reply({ content: `Deleted Webhook for UUID ${ interaction.options.get('uuid')?.value }`, flags: MessageFlags.Ephemeral })
    }       
})
