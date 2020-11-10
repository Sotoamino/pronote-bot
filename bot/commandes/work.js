const pronote = require('pronote-api');
const Discord = require('discord.js');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//importation//


exports.run = (message, args, user) => {
async function main()
{
    var weekday = new Array(7);
    weekday[0] = "Dimanche";
    weekday[1] = "Lundi";
    weekday[2] = "Mardi";
    weekday[3] = "Mercredi";
    weekday[4] = "Jeudi";
    weekday[5] = "Vendredi";
    weekday[6] = "Samedi";
    
    console.log(`Requête API : ${message.author.username} sur PronoteAPI via utilisateur ${user.name}`)
    session = await pronote.login(user.url, user.name, user.pwd, user.cas);
	console.log('Requête API : Connexion ...')
    let travaux = await session.homeworks()
    let cpt = 0
    let valid = ""
    let fichier = ""
    const embed = new Discord.MessageEmbed()
        .setColor("#138266")
        .setTitle(`Travail - ${session.user.name}`)
        .setDescription(`Voici votre liste de travail à faire`)
        .setFooter(session.user.id+" - "+session.user.establishment.id)
        .setThumbnail(session.user.avatar)
        console.log("test")
    while(cpt < travaux.length) {
        if(travaux[cpt].done) {
            valid = "✅"
        } else {valid = ""}
        var d = new Date(travaux[cpt].for)
        var n = weekday[d.getDay()];
        let J = d.getDate()
       	let M = d.getMonth()+1
        if(travaux[cpt].file) {
            fichier = "\nFichier joint sur pronote"
        } else {
            fichier = ""
        }
        console.log(travaux[cpt].file)
        embed.addField(travaux[cpt].subject+" "+valid, travaux[cpt].description+"\n Pour le "+J+"/"+M+fichier, true)
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
