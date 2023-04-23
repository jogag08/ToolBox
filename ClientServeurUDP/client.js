const dgram = require('dgram');
const socketClient = dgram.createSocket('udp4');

let message = Buffer.from("Bonjour à vous, ceci est un message de la part du client");
let port = 9999;
let ipaddress = '10.0.0.221';

socketClient.on('message', (msg, pointDistant) => {
    console.log(`Le client reçoit :${msg} de la part de ${pointDistant.address}:${pointDistant.port}:`);
    //client.close();
})

socketClient.on(`error`, (erreur) => {
    console.log(`Erreur du client : ${erreur.stack}`)
    socketClient.close();
});

socketClient.send(message, port, ipaddress, (erreur, octets) => {
    if(erreur){
        console.log(`Erreur: ${erreur.stack}`);
    } else {
        console.log(`Nombre d'octets transmis: ${octets}`)
    }
});
