import { CommandInteractionOptionResolver, Events, MessageFlags } from "discord.js"
import { client } from ".."
import { Event } from "../structures/Event"
import { ExtendedInteraction } from "../typings/command"

/**
 * Handler for slash commands
 */
export default new Event(Events.InteractionCreate, async (interaction) => {
    // Chat Input Commands
    if (!interaction.isCommand()) return;

    try {
        const command = client.commands.get(interaction.commandName);
    
        if (!command) return await interaction.followUp('You have used a non existent command');

        console.log("command", command);
        
        await command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    } catch (err) {
        console.error(err);
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
    }
})