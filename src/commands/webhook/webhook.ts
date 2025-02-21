import {
    CommandInteractionOptionResolver,
    MessageFlags
} from "discord.js";

import { Command } from "../../structures/Command";

import create from './subcommand/create';
import update from './subcommand/update';
import _delete from './subcommand/delete'

import { ExtendedInteraction } from "../../typings/command";

import { client } from '../../index';

export default new Command({
    name: "webhook",
    description: "Sub-command group to control IsThereAnyDeal webhooks on this server",
    options: [
        create,
        update,
        _delete
    ],
    run: async ({ interaction }) => {
        if (!interaction.options.data.length) await interaction.reply({ content: 'Invalid Subcommand', flags: MessageFlags.Ephemeral });

        const commandName = interaction.options.data[0].name;
        const command = client.subCommands.get('webhook')?.get(commandName);

        if (!command) await interaction.reply({ content: 'Something went wrong', flags: MessageFlags.Ephemeral });

        await command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
})