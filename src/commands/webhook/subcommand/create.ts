import { 
    ApplicationCommandOptionType, 
    ChannelType, 
    MessageFlags,
    TextChannel,
} from "discord.js";

import { Subcommand } from "../../../structures/Subcommand";
import { createAdaptedUrl } from "../../../services/adapter";
import { AdapterResponse } from "../../../typings/rest";
import { stringify } from "uuid";

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
        try {
            // get channel from command parameters
            const channel = interaction.options.get('channel').channel as TextChannel;
            const channelName = channel.name;

            // Creates Discord webhook
            const webhook = await channel.createWebhook({
                name: 'Steam Discount Bot',
                avatar: 'https://cdn.freebiesupply.com/images/large/2x/steam-logo-transparent.png',
            });
    
            if (!webhook) {
                return await interaction.reply({ 
                    content: 'Something went wrong when creating the webhook', 
                    flags: MessageFlags.Ephemeral 
                
                });
            } else {
                // add webhook id, token to database
                const response = (await createAdaptedUrl(webhook.id, webhook.token)) as AdapterResponse;

                if (!response || response.status != 200) return await interaction.reply({ content: `${ response?.message }`, flags: MessageFlags.Ephemeral });

                // converts UUID to string
                const uuid = stringify(Uint8Array.from(response.document.uuid.data));

                // New adapted webhook Url
                const adaptedUrl = `${process.env.ADAPTER_API_BASE_URL}/api/adapter/${uuid}`;

                // test if webhook works
                await webhook.send("o/");

                return await interaction.reply({ 
                    content: `Created Webhook for channel #${ channelName } with a webhook URL of ${ adaptedUrl }`, 
                    flags: MessageFlags.Ephemeral 
                });
            }
        } catch (err) {
            console.error(err);

            await interaction.reply({ content: `Something went wrong`, flags: MessageFlags.Ephemeral });
        }
    }       
})
