const dgram = require('dgram');
const socketServeur = dgram.createSocket('udp4');

const port = 9999;

socketServeur.on('message', (msg, pointDistant) => {
    let reponse = "Salut à toi, ceci est un message de la part du serveur.";

    console.log(`Le serveur reçoit : ${msg} de la part de ${pointDistant.address}:${pointDistant.port}`);
    socketServeur.send(Buffer.from(reponse), pointDistant.port, pointDistant.address);
});

socketServeur.on('error', (erreur) => {
    console.log(`Erreur du serveur : ${erreur.stack}`);
    socketServeur.close();
})

socketServeur.on('listening', () => {
    const address = socketServeur.address();
    console.log(`Le serveur est en écoute sur le port ${address.address}:${address.port}`);
});

socketServeur.bind(port);