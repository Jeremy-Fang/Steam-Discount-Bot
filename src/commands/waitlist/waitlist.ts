import {
    CommandInteractionOptionResolver,
    MessageFlags
} from "discord.js";

import { client } from '../../index';

import { Command } from "../../structures/Command";
import { ExtendedInteraction } from "../../typings/command";


export default new Command({
    name: "waitlist",
    description: "Sub-command group to control IsThereAnyDeal waitlist on this server",
    run: async ({ interaction }) => {
        if (!interaction.options.data.length) await interaction.reply({ content: 'Invalid Subcommand', flags: MessageFlags.Ephemeral });

        const commandName = interaction.options.data[0].name;
        const command = client.subcommands.get('waitlist')?.get(commandName);

        if (!command) await interaction.reply({ content: 'Something went wrong', flags: MessageFlags.Ephemeral });

        await command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
})