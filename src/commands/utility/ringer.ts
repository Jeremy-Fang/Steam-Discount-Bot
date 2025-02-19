import { MessageFlags } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'ringer',
    description: 'ring ring ring',
    run: async({ interaction }) => {
        await interaction.reply({
            content: `rings your doorbell`,
            flags: MessageFlags.Ephemeral
        });
    }
})