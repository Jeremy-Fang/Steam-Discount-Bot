require('dotenv').config();

const { REST, Routes } = require('discord.js');
const { glob } = require('glob');

async function getCommandFilePaths() {
    return (await glob(`**/dist/commands/*/*.{ts,js}`, { cwd: __dirname, absolute: true })).map(filePath => filePath.slice(0, filePath.lastIndexOf('.')));
}

async function start() {
    try {
        const commandFiles = await getCommandFilePaths();
        const commands = [];
    
        // get commands from dist files
        for (const file of commandFiles) {
            delete require.cache[file];
            
            const command = (await require(file))?.default;
    
            if (!command.name || !command.description || !command.run) {
                console.log(`[WARNING] The command at ${file} is missing a required property.`)
                continue;
            }

            commands.push(command);
        }
    
        console.log("commands", commands);
    
        const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN)

        // deploy the commands
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // the put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(
                process.env.APPLICATION_ID
            ),
            { body: commands }
        );

        console.log(data);
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (err) {
        console.error(err);
    }
}

(async() => {
    await start();
})();