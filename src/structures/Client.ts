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
import { getEventFilePaths } from '../utilities/parser';
import { SubCommandType } from '../typings/subcommand';

import { getCommandMap, getSubcommandMap } from '../utilities/commandsHelper';


export class ExtendedClient extends Client {
    // maps command names to functions to execute
    commands: Collection<string, CommandType> = new Collection();
    // maps subcommand to parent commands
    subcommands: Collection<string, Collection<string, SubCommandType>> = new Collection();

    constructor () {
        super({ intents: 32767 });
    }

    start() {
        this.registerModules();
        this.login(process.env.DISCORD_BOT_TOKEN);
    }

    /**
     * Imports and creates prerequisite maps/event listeners upon bot startup
     */
    async registerModules() {
        // Register sub commands before commands because they are required as options (for parent commands)
        this.subcommands = await getSubcommandMap();

        // Import and map commands
        this.commands = await getCommandMap();

        // Import and instantiate event listeners
        const eventFiles = await getEventFilePaths(__dirname);

        for (const file of eventFiles) {
            const event: Event<keyof ClientEvents> = (await import(file))?.default;

            this.on(event.event, event.run);
        }
    }

    /**
     * Function that registers command name and description to Discord. 
     * Required when adding new commands.
     */
    async deployCommands() {
        try {
            const commands: CommandType[] = [...((await getCommandMap()).values())].map(command => command as CommandType);

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