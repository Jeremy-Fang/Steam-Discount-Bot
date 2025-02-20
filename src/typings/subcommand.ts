import { RunFunction } from "./command";
import { ApplicationCommandSubCommandData } from "discord.js";

export type SubCommandType = {
    run: RunFunction;
} & Omit<ApplicationCommandSubCommandData, 'type'>;
