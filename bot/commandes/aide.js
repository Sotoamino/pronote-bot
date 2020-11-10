const pronote = require('pronote-api');
const Discord = require('discord.js');
//importation//

exports.run = (message, args, session) => {
const embed = new Discord.MessageEmbed()
    .setColor("#138266")
    .setTitle("Aide")
    .setDescription("Liste de toutes les commandes du bot")
    .addFields([
        {name: "?aide", value: "Affiche la liste des commandes"},
        {name:'?edt', value : 'Affiche votre emploi du temps'},
        {name: "?info", value: "Affiche vos informations ENT"},
        {name: '?notes', value: "Affiche l'ensemble de vos moyennes"},
        {name: "?register", value : "Vous permet de vous enregistrer (?register <identifiant> <mot de passe>.\nVotre mot de passe est crypté (la version crypté vous sera envoyé). Conseil : Faites cette commande en messages privés avec le bot."},
        {name: "?work", value: "Affiche le travail a faire pour les 7 prochains jours."}
    ])
    .setFooter('Fait par Liam Salamagnon - salamagnon.liam@gmail.com')

    message.channel.send(embed)
}
