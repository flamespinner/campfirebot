import { MessageActionRow, MessageEmbed, MessageButton, MessageSelectMenu, Constants } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all commands.')
    .addChannelOption(channel => {
        return channel // Add return here
            .setName("command")
            .setDescription("Get specific information to one command")
            .setRequired(false);
    });
export async function execute(interaction) {
    /*const data = [];
    const { commands } = interaction.client;

    let embed = new MessageEmbed()
        .setTitle("A list of all Commands: Use / Help <Command> for a detailed info.");

    for (let command of commands) {
        embed.addField(command[1].data.name, command[1].data.description);
    }

    interaction.reply({ embeds: [embed] });*/

}