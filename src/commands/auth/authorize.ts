import { MessageFlags } from "discord.js";
import { Command } from "../../structures/Command";

import open, { apps } from 'open';

export default new Command({
    name: 'authorize',
    description: 'Authorizes waitlist access for IsThereAnyDeal account',
    run: async({ interaction }) => {
        // await open('https://google.ca', { app: { name: apps.chrome }, wait: true}).then(res => {
        //     console.log("Hello", res);
        // });

        await interaction.reply({
            content: `Account has been authorized`,
            flags: MessageFlags.Ephemeral
        });
    }
})