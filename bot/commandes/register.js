const pronote = require('pronote-api');
const Discord = require('discord.js');
const fs = require('fs');
const crypt = require("crypto-js")
//importation

exports.run = (message, args, session) => {
    //args : username, password
    if(!args[1] || args[2]) return message.channel.send('Erreur, vous avez fait une erreur sur la commande. ?register <identifiant> <mot de passe>. Votre mot de passe ne doit pas contenir d\'espaces')
    let username = args[0]
    let password = args[1]
    var ciphertext = crypt.AES.encrypt(password, 'HERHDgsrhisgs23ZR23RF');
    password = ciphertext.toString()
    const user = {
        name : username,
        pwd : password
    }
    message.channel.send('Pris en compte :')
    message.channel.send(`identifiant : ${user.name}\nmot de passe enregistré : ${user.pwd} ||${args[1]}||`)
    fs.writeFileSync(`./data/${message.author.id}.json`, JSON.stringify(user))
}