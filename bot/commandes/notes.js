const pronote = require('pronote-api');
const Discord = require('discord.js');
//importation//

exports.run = (message, args, user) => {
async function main()
{
    console.log(`Requête API : ${message.author.username} sur PronoteAPI via utilisateur ${user.name}`)
    session = await pronote.login(user.url, user.name, user.pwd, user.cas);
	console.log('Requête API : Connexion ...')

    let notes = await session.marks()
    let cpt = 0
    const embed = new Discord.MessageEmbed()
        .setColor("#138266")
        .setTitle(`Notes - ${session.user.name}`)
        .setDescription(`Liste des notes de ${session.user.name}\nMoyenne élève : ${notes.averages.student} | Moyenne de la classe : ${notes.averages.studentClass}`)
        .setFooter(session.user.id+" - "+session.user.establishment.id)
        .setThumbnail(session.user.avatar)
    console.log(notes.subjects[cpt].name, notes.subjects[cpt].averages)
    const tabl = []
    while(cpt < notes.subjects.length) {
        embed.addField(notes.subjects[cpt].name, `élève : ${notes.subjects[cpt].averages.student} | classe : ${notes.subjects[cpt].averages.studentClass}`, true)
        cpt +=1
    }
    message.channel.send(embed).then(() => {
        console.log('Requête API: Accepté')
    })
}

main().catch(err => {
        if(err) {
        console.error('Requête API : ERROR !')
    }
    if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
        console.error(`${message.author.username} - Mauvais identifiants`)
        return message.channel.send('Mauvais identifiants');    
    } if(err.code === "ETIMEDOUT") {
        console.error(`${message.author.username} - Problème de connexion`)
        return message.channel.send('Erreur de connexion, veuillez refaire la commande.')
    }if(err.response) {
        if(err.response.status === 503){
            console.error(`${message.author.username} - Pas d'accès ENT`)
            return message.channel.send("Erreur, l'accès à l'ENT est actuellemement indisponible.")
        }
    }
});
}
