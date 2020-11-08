
const Discord = require('discord.js');
const fs = require('fs');
const parametres = require('./config');
const crypt = require('crypto-js')
const client = new Discord.Client()
const pronote = require('pronote-api')
client.login(parametres.bot.configuration.token)


client.on('ready', () => {
    console.log('i | Bot Avaible');
    let opt = parametres.bot.public.status
    let status = ""
    let array = opt.botStatus
    setInterval(() => {
        status = array[getRandomInt(array.length)]
        if(status.activity === "test") {
            slideText(client)
        } else {
            client.user.setActivity(status.activity, { type: status.type })
        }
      }, opt.time*1000);
})


client.on('message', (message) => {

    //commandes Publique
    let session = {}
    let password = ""
    let servData = require('./config.js');
    let prefix = servData.bot.configuration.prefix //set prefix a prefix du serveur
    if(message.author.bot) return; //filtrer à utilisateur n'est pas bot
    if(!message.content.startsWith(prefix)) return; //filtrer à message commençant par prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/g); //clean uo de la commande
    let commandeName = args.shift()
    fs.stat(`./data/${message.author.id}.json`, function(err) {
        if (!err) {
            console.log("ok")
            user = JSON.parse(fs.readFileSync(`./data/${message.author.id}.json`,function(err,data){
                if (err){
                    return message.channel.send('Vous ne vous êtes jamais enregistré sur la base de donnée du bot. Faites ?register')
                }}))
            password = crypt.AES.decrypt(user.pwd, 'HERHDgsrhisgs23ZR23RF').toString(crypt.enc.Utf8);
            session = {url : 'https://0760056y.index-education.net/pronote',name :  user.name, pwd : password, cas : "ac-rouen"}
        }
    });
 //récupérer le nom de la commande
    fs.stat(`./commandes/${commandeName}.js`, function(err, stat) { //vérifier si la commande existe
        if (err === null) {  //si pas d'erreur
            const commandeAction = require(`./commandes/${commandeName}.js`) //require la commande
            commandeAction.run(message,args, session) //lancer la commande
            message.delete() // supprimer le message d'initialisation
        }
        else { //sinon
            message.channel.send("Commande non-trouvé.") //commande introuvable
        }
    });
})


client.on('guildCreate', guild => {
    let transfer = JSON.parse(fs.readFileSync('./transfer.json'))
    console.log(`+ | Serveur rejoint : ${guild.name} [${guild.id}].`)
    transfer.servers += 1
    fs.writeFileSync('./transfer.json', JSON.stringify(transfer))

})

client.on("guildDelete", guild => {
    console.log(`- | Serveur quitté : ${guild.name} [${guild.id}].`)
    let transfer = JSON.parse(fs.readFileSync('./transfer.json'))
    transfer.servers -= 1
    fs.writeFileSync('./transfer.json', JSON.stringify(transfer))
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }



  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

// Exemple


