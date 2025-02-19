import { MessageFlags } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'ping',
    description: 'shows client ping',
    run: async({ interaction }) => {
        await interaction.reply({
            content: `Ponger`,
            flags: MessageFlags.Ephemeral
        });
    }
})