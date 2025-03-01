import { MessageFlags } from "discord.js";
import { Command } from "../../structures/Command";

import { getToken, registerToken } from "../../services/db";

import open, { apps } from 'open';

export default new Command({
    name: 'authorize',
    description: 'Authorizes waitlist access for IsThereAnyDeal account',
    run: async({ interaction }) => {
        // await open('https://google.ca', { app: { name: apps.chrome }, wait: true}).then(res => {
        //     console.log("Hello", res);
        // });

        const document = await getToken("abc");

        console.log("document", document);

        await interaction.reply({
            content: `Account has been authorized`,
            flags: MessageFlags.Ephemeral
        });
    }
})