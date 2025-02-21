import { Collection } from 'discord.js';

import {
    getCommandFilePaths, 
    getSubCommandFiles 
} from './parser';

import { Subcommand } from '../structures/Subcommand';
import { CommandType } from '../typings/command';
import { SubCommandType } from '../typings/subcommand';

/**
 * Function that pattern matches file structure to determine subcommand structure
 * and returns a nested Collection maping the parent command to subcommands
 * @returns Collection<string, Collection<string, SubCommandType>> map of subcommands
 */
export const getSubcommandMap = async () => {
    const subcommandFiles = await getSubCommandFiles(__dirname);
    const subcommands: Collection<string, Collection<string, SubCommandType>> = new Collection();

    // Register sub commands before commands because they are required as options (for parent commands)
    for (const file of subcommandFiles) {
        delete require.cache[file];

        const subcommand: SubCommandType = (await import(file))?.default;
        const directories = file.split('/');
        const parentDirectory = directories[directories.length - 3];

        if (!subcommand.name || !subcommand.description || !subcommand.run) continue;

        if (!subcommands.get(parentDirectory)) {
            subcommands.set(parentDirectory, new Collection<string, SubCommandType>());
        }

        subcommands.get(parentDirectory).set(subcommand.name, subcommand);
    }

    return subcommands;
}

/**
 * Function that pattern matches file structure to determine command structure
 * and returns a Collection maping command names to command Objects denoted by 
 * the Discord API
 * @returns Collection<string, CommandType> map of commands
 */
export const getCommandMap = async () => {
    const commandFiles = await getCommandFilePaths(__dirname);
    
    const commands: Collection<string, CommandType> = new Collection();
    const subcommands = await getSubcommandMap();

    for (const file of commandFiles) {
        delete require.cache[file];

        const command: CommandType = (await import(file))?.default;

        if (!command.name) continue;

        if ([...subcommands.keys()].includes(command.name)) {
            // If the command is a subcommand group, set the subcommands as options here
            commands.set(command.name, { ...command, options: [...subcommands.get(command.name).values()].map(subcommand => subcommand as Subcommand) })
        } else {
            commands.set(command.name, command);
        }
    }

    return commands;
}