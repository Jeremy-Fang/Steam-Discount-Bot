import { MessageFlags } from "discord.js";

import { Subcommand } from "../../../structures/Subcommand";
import { getList } from "../../../services/isThereAnyDeal";
import { getToken } from "../../../services/db";
import { SQLiteResponse } from "../../../typings/rest";

export default new Subcommand({
    name: 'display',
    description: 'Displays authorized IsThereAnyDeal waitlist',
    run: async ({ interaction }) => {
        try {
            const user = interaction.user.id;
            const token = (await getToken(user) as SQLiteResponse).document.accessToken;
            const waitlist = await getList(token);

            console.log("waitlist", waitlist);

            return await interaction.reply({ content: `Displayed waitlist`, flags: MessageFlags.Ephemeral });
        } catch (err) {
            console.error(err);

            return await interaction.reply({ content: `Something went wrong`, flags: MessageFlags.Ephemeral });
        }
    }       
})
