import { 
    Client, 
    ClientEvents, 
    Collection,
    RequestData,
    REST,
    Routes
} from 'discord.js';

import { CommandType, DiscordAPIPutResponse } from '../typings/command';
import { glob } from 'glob';
import { Event } from './Event';
import { RegisterCommandsOptions } from '../typings/client';

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor () {
        super({ intents: 32767 });
    }

    start() {
        this.registerModules();
        this.login(process.env.DISCORD_BOT_TOKEN);
    }

    async getCommandFilePaths() {
        return (await glob(`**/../commands/*/*.{ts,js}`, { cwd: __dirname })).map(filePath => filePath.slice(0, filePath.lastIndexOf('.')));
    }

    async getEventFilePaths() {
        return (await glob(`**/../events/*.{ts,js}`, { cwd: __dirname })).map(filePath => filePath.slice(0, filePath.lastIndexOf('.')));
    }

    async importFile(filePath: string) {
        delete require.cache[filePath];

        return (require(filePath))?.default;
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
        const commandFiles = await this.getCommandFilePaths();

        console.log(commandFiles);
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);

            if (!command.name) return;

            console.log(command);

            this.commands.set(command.name, command);
        });


        // Events
        const eventFiles = await this.getEventFilePaths();

        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);

            this.on(event.event, event.run);
        });
    }

    /**
     * Function that registers command name and description to Discord. 
     * Required when adding new commands.
     */
    async deployCommands() {
        try {
            const commandFiles = await this.getCommandFilePaths();
            const commands: CommandType[] = [];

            await commandFiles.forEach(async (file) => {
                delete require.cache[file];
    
                const command: CommandType = await this.importFile(file);

                if (!command.name || !command.description || !command.run) {
                    console.log(`[WARNING] The command at ${file} is missing a required property.`)
    
                    return;
                }
    
                commands.push(command);
            });

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