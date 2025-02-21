import { MessageFlags } from "discord.js";

import { Subcommand } from "../../../structures/Subcommand";

export default new Subcommand({
    name: 'display',
    description: 'Displays authorized IsThereAnyDeal waitlist',
    run: async ({ interaction }) => {
        await interaction.reply({ content: `Displayed waitlist`, flags: MessageFlags.Ephemeral })
    }       
})
