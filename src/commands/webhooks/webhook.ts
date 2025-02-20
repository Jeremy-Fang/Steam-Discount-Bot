import {
    Collection,
    CommandInteractionOptionResolver,
    MessageFlags
} from "discord.js";

import { Command } from "../../structures/Command";

import create from './/subcommands/create'
import update from './subcommands/update'

import { getSubCommandFiles } from "../../utilities/parser";
import { SubCommandType } from "../../typings/subcommand";
import { ExtendedInteraction } from "../../typings/command";

import { client } from '../../index';

export default new Command({
    name: "webhook",
    description: "Sub-command group to control IsThereAnyDeal webhooks on this server",
    options: [
        create,
        update,
    ],
    run: async ({ interaction }) => {
        console.log(interaction.options.data);

        if (!interaction.options.data.length) await interaction.reply({ content: 'Invalid Subcommand', flags: MessageFlags.Ephemeral });

        const subCommandFiles = await getSubCommandFiles(__dirname);
        const subCommands = new Collection<string, SubCommandType>();

        for (const file of subCommandFiles) {
            const subCommand: SubCommandType = (await import(file))?.default;

            if (!subCommand.name) return;

            subCommands.set(subCommand.name, subCommand);
        }

        const commandName = interaction.options.data[0].name;
        const command = subCommands.get(commandName);

        await command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
})