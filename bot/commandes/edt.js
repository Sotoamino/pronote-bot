const pronote = require('pronote-api');
const Discord = require('discord.js');
//importation//
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

exports.run = (message, args, user) => {
async function main()
{
    console.log(`Requête API : ${message.author.username} sur PronoteAPI via utilisateur ${user.name}`)
    session = await pronote.login(user.url, user.name, user.pwd, user.cas);
	console.log('Requête API : Connexion ...')
    const embed = new Discord.MessageEmbed()
    .setColor("#138266")
    .setTitle("Emploi du temps de "+session.user.name)
    .setDescription("Emploi du temps")
    const tabl = []
    const edt = await session.timetable()
    let cpt = 0
    while(cpt < notes.subjects.length) {
        console.log(edt[cpt])
        //embed.addField(edt[cpt].from.toLocaleDateString('fr-FR', options), )
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
