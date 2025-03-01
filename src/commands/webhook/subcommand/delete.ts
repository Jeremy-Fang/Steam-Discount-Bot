import { 
    ApplicationCommandOptionType, 
    MessageFlags,
    WebhookClient
} from "discord.js";

import { validate as validUUID } from 'uuid';

import { Subcommand } from "../../../structures/Subcommand";
import { deleteAdaptedUrl, getAdaptedUrl } from "../../../services/adapter";
import { AdapterResponse } from "../../../typings/rest";

export default new Subcommand({
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
        try {
            // get uuid from command parameters
            const uuid = interaction.options.get('uuid').value as string;

            if (!validUUID(uuid)) {
                await interaction.reply({ content: 'UUID provided was not a valid UUID', flags: MessageFlags.Ephemeral });
            } else {
                // check if entry in database exists
                const response = (await getAdaptedUrl(uuid)) as AdapterResponse;

                if (!response || response.status != 200) return await interaction.reply({ content: `${ response?.message }`, flags: MessageFlags.Ephemeral });

                if (!response.document) return await interaction.reply({ content: `document matching uuid: ${ uuid } does not exist`, flags: MessageFlags.Ephemeral }); 
                
                const discordWebhook = new WebhookClient({
                    id: response.document.webhook_id,
                    token: response.document.token
                });

                // delete the webhook on the Discord server
                await discordWebhook.delete();

                // delete entry in database matching provided uuid
                const deleted = (await deleteAdaptedUrl(uuid)) as AdapterResponse;

                if (!deleted || deleted.status != 200) return await interaction.reply({ content: `${ deleted?.message }`, flags: MessageFlags.Ephemeral });

                return await interaction.reply({ 
                    content: `Deleted Webhook for UUID ${ uuid }`, 
                    flags: MessageFlags.Ephemeral 
                });
            }
        } catch (err) {
            console.error(err);

            await interaction.reply({ content: `Something went wrong`, flags: MessageFlags.Ephemeral });
        }
    }       
})
