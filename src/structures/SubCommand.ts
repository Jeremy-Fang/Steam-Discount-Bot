import { ApplicationCommandOptionType } from 'discord.js';

import { RunFunction } from '../typings/command';
import { SubCommandType } from '../typings/subcommand';

export class Subcommand {
    name: string;
    description: string;
    type: ApplicationCommandOptionType.Subcommand;
    run: RunFunction;

    constructor(subCommandOptions: SubCommandType) {
        Object.assign(this, { type: ApplicationCommandOptionType.Subcommand, ...subCommandOptions });
    }
}