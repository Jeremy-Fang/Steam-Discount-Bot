import { MessageFlags } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: 'pong',
    description: 'shows client pong',
    run: async({ interaction }) => {
        await interaction.reply({
            content: `Ping ping`,
            flags: MessageFlags.Ephemeral
        });
    }
})