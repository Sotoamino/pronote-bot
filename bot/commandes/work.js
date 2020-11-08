const pronote = require('pronote-api');
const Discord = require('discord.js');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//importation//


exports.run = (message, args, user) => {
async function main()
{
    session = await pronote.login(user.url, user.name, user.pwd, user.cas);
    let travaux = await session.homeworks()
    let cpt = 0
    const embed = new Discord.MessageEmbed()
        .setTitle(`Notes - ${session.user.name}`)
        .setDescription(`Voici votre liste de travail à faire`)
        .setFooter(session.user.id+" - "+session.user.establishment.id)
        .setThumbnail(session.user.avatar)
        console.log("test")
    while(cpt < travaux.length) {
        console.log(travaux[cpt].subject, travaux.description+"\n Pour le"+travaux.for.toLocaleDateString('fr-FR', options))
        embed.addField(travaux[cpt].subject, travaux.description+"\n Pour le"+travaux.for.toLocaleDateString('fr-FR', options), true)
        cpt +=1
    }
    message.channel.send(embed)
}

main().catch(err => {
    if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
        return message.channel.send('Mauvais identifiants');    
    } if(err.response.status === 503) {
        return message.channel.send("Erreur, l'accès à l'ENT est actuellemement indisponible.")

    }
    
    else {
        console.error(err);
    }
});
}
