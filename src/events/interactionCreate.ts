import { CommandInteractionOptionResolver, Events, MessageFlags } from "discord.js"
import { client } from ".."
import { Event } from "../structures/Event"
import { ExtendedInteraction } from "../typings/Command"

export default new Event(Events.InteractionCreate, async (interaction) => {
    // Chat Input Commands
    console.log(interaction.isChatInputCommand(), interaction.isCommand())
    if (!interaction.isCommand()) return;

    try {
        const command = client.commands.get(interaction.commandName);

        console.log(command, !command);

        console.log(interaction.commandName);
    
        if (!command) return await interaction.followUp('You have used a non existent command');

        await command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    } catch (err) {
        console.log(`[ERROR]`)
        console.error(err);
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
    }
})