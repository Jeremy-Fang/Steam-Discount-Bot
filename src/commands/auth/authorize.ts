import { MessageFlags } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'authorize',
    description: 'Authorizes waitlist access for IsThereAnyDeal account',
    run: async({ interaction }) => {
        await interaction.reply({
            content: `Account has been authorized`,
            flags: MessageFlags.Ephemeral
        });
    }
})