const pronote = require('pronote-api');
const Discord = require('discord.js');
//importation//

exports.run = (message, args, user) => {
async function main()
{
    session = await pronote.login(user.url, user.name, user.pwd, user.cas);

    let notes = await session.marks()
    let cpt = 0
    const embed = new Discord.MessageEmbed()
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