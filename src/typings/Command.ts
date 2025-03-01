import { 
    ChatInputApplicationCommandData, 
    CommandInteraction, 
    CommandInteractionOptionResolver, 
    GuildMember, 
    PermissionResolvable
} from "discord.js";

import { ExtendedClient } from "../structures/Client";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

export type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions ?: PermissionResolvable[];
    cooldown ?: number;
    run: RunFunction;
} & ChatInputApplicationCommandData;