import { CommandInteractionOptionResolver, Events, MessageFlags } from "discord.js"
import { client } from ".."
import { Event } from "../structures/Event"
import { ExtendedInteraction } from "../typings/command"
import { getToken } from "../services/db"

/**
 * Handler for slash commands
 */
export default new Event(Events.InteractionCreate, async (interaction) => {
    // Chat Input Commands
    if (!interaction.isCommand()) return;
    
    try {
        const command = client.commands.get(interaction.commandName);
        const user = interaction.user.id;

        if (!command) return await interaction.reply({ content: 'You have used a non existent command', flags: MessageFlags.Ephemeral });
        
        // check if the user has an access code to run protected commands
        if (interaction.commandName == 'waitlist') {
            const entry = await getToken(user);

            if (!entry || entry.status != 200) {
                return await interaction.reply({ 
                    content: 'You have not registered an IsThereAnyDeal access token with the bot. Thus you do not have access to waitlist commands', 
                    flags: MessageFlags.Ephemeral 
                });
            }
        }

        console.log("command: ", interaction.commandName);
        
        return await command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    } catch (err) {
        console.error(err);
        
        if (interaction.replied || interaction.deferred) {
            return await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
        else {
            return await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
    }
})