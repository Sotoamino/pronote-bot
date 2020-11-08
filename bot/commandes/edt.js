const pronote = require('pronote-api');
const Discord = require('discord.js');
//importation//

exports.run = (message, args, user) => {
async function main()
{
    session = await pronote.login(user.url, user.name, user.pwd, user.cas);
    console.log("go")
    console.log(await session.homeworks())
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
