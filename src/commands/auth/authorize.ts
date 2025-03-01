import { MessageFlags } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'authorize',
    description: 'Starts authorization flow for waitlist access for IsThereAnyDeal account',
    run: async({ interaction }) => {
        return await interaction.reply({
            content: `Please complete the authorization flow at ${ process.env.ADAPTER_API_BASE_URL }/api/auth/authorize and register the provided access token to your Discord user with the /register command`,
            flags: MessageFlags.Ephemeral
        });
    }
})