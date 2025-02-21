import { 
    Client, 
    ClientEvents, 
    Collection,
    REST,
    Routes
} from 'discord.js';

import { CommandType } from '../typings/command';
import { DiscordAPIPutResponse } from '../typings/rest';

import { Event } from './Event';
import { RegisterCommandsOptions } from '../typings/client';
import { getCommandFilePaths, getEventFilePaths, getSubCommandFiles } from '../utilities/parser';
import { SubCommandType } from '../typings/subcommand';


export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    subCommands: Collection<string, Collection<string, SubCommandType>> = new Collection();

    constructor () {
        super({ intents: 32767 });
    }

    start() {
        this.registerModules();
        this.login(process.env.DISCORD_BOT_TOKEN);
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log(`Registering global commands`);
        }
    }

    async registerModules() {
        // Commands
        const commandFiles = await getCommandFilePaths(__dirname);

        commandFiles.forEach(async (filePath) => {
            const command: CommandType = (await import(filePath))?.default;

            if (!command.name) return;

            this.commands.set(command.name, command);
        });

        const subCommandFiles = await getSubCommandFiles(__dirname);

        // SubCommands
        subCommandFiles.forEach(async (filePath) => {
            const subCommand: SubCommandType = (await import(filePath))?.default;
            const directories = filePath.split('/');
            const parentDirectory = directories[directories.length-3];

            if (!subCommand.name) return;

            if (!this.subCommands.get(parentDirectory)) {
                this.subCommands.set(parentDirectory, new Collection<string, SubCommandType>());
            }

            this.subCommands.get(parentDirectory).set(subCommand.name, subCommand);
        });

        // Events
        const eventFiles = await getEventFilePaths(__dirname);

        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = (await import(filePath))?.default;

            this.on(event.event, event.run);
        });
    }

    /**
     * Function that registers command name and description to Discord. 
     * Required when adding new commands.
     */
    async deployCommands() {
        try {
            const commandFiles = await getCommandFilePaths(__dirname);
            const commands: CommandType[] = [];

            for (const file of commandFiles) {
                delete require.cache[file];
    
                const command: CommandType = (await import(file))?.default;

                if (!command.name || !command.description || !command.run) {
                    console.log(`[WARNING] The command at ${file} is missing a required property.`)
    
                    return;
                }
    
                commands.push(command);
            }

            console.log("commands", commands);
    
            const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);
    
            // deploy the commands
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
            await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: commands })
                .then((data: DiscordAPIPutResponse) => {
                    console.log(data);
                    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
                });
        } catch (err) {
            console.error(err)
        }
    }
}