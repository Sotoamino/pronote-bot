const pronote = require('pronote-api');
const Discord = require('discord.js');
const fs = require('fs');
const crypt = require("./ServerCryptLinks.js")
//importation

exports.run = (message, args, session) => {
    //args : username, password
    if(message.channel.type !== "DM") {
        message.channel.send('STOP. Veuillez faire cette commande en message privé avec le bot. Je vous envoie un message ^^')
        return message.author.send('Et voilà, notre échange est désormais sécurisé ;).')
    } 
    if(!args[1] || args[2]) return message.channel.send('Erreur, vous avez fait une erreur sur la commande. ?register <identifiant> <mot de passe>. Votre mot de passe ne doit pas contenir d\'espaces')
    let username = args[0]
    let password = args[1]
	password = crypt.encrypt(password)
    const user = {
        name : username,
        pwd : password
    }
    message.channel.send('Pris en compte :')
    message.channel.send(`identifiant : ${user.name}\nmot de passe enregistré : ${user.pwd} ||${args[1]}||`)
    message.channel.send('Pour rappel, votre mot de passe n\'est pas enregistré sur notre serveur, uniquement sa version crypté visible ci-dessus.')
    fs.writeFileSync(`./data/${message.author.id}.json`, JSON.stringify(user))
}
