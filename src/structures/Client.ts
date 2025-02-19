import { 
    Client, 
    ClientEvents, 
    Collection 
} from 'discord.js';

import { CommandType } from '../typings/command';
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
}