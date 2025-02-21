import { ApplicationCommandOptionType, ChannelType, MessageFlags } from "discord.js";

import { Subcommand } from "../../../structures/Subcommand";

export default new Subcommand({
    name: 'create',
    description: 'Create new Discord webhook',
    options: [
        {
            name: 'channel',
            description: 'Channel to post discount events on',
            type: ApplicationCommandOptionType.Channel,
            channel_types: [ChannelType.GuildText],
            required: true
        }
    ],
    run: async ({ interaction }) => {
        await interaction.reply({ content: `Created Webhook for channel ${ interaction.options.get('channel')?.value }`, flags: MessageFlags.Ephemeral })
    }       
})
