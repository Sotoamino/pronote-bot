let fs = require('fs');

exports.bot = {
    configuration : {
        token : "IDENTIFIANT DU BOT : SECRET",
        prefix : "?"
    },
    public : {
        status : {
            time : 10,
            botStatus :  [
                {activity : "Lis vos cours sur pronote 👓", type: "PLAYING"},
                {activity : servers(), type: "WATCHING"},
                {activity : version(), type: "PLAYING"}
            ]
        }
    }
}

function version(){
    let data = JSON.parse(fs.readFileSync(`./transfer.json`))
    return(`version : ${data.version}`)
}
function servers() {
    let data = JSON.parse(fs.readFileSync(`./transfer.json`))
    let text = "serveurs"
    if(data.servers <= 1 ) {
        text = "serveur"
    }
    return(`${data.servers} ${text}.`)
}
