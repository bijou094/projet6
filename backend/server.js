// importer le package http de node.js pour crée le serveur
const http = require('http');
// importer la'application app
const app = require('./app');
//exigez et configurez dotenv
const dotenv = require('dotenv').config();
//la fonction normalizePort renvoie un port valide,( numéro / chaîne ) 
const normalizePort = val => {

  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
    
  }
  if (port >= 0) {
    return port;
    
  }
  return false;
  
};

//Ajout du port de connection si celui-ci n'est pas declarer 
// Si aucun port n'est fourni on écoutera sur le port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
//attribue le nom du paramètre à la valeur. 

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  // gerer les erreurs
  switch (error.code) {
    //c'est un problème de permission
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    //EADDRINUSE signifie que le numéro de port auquel listen()essaie de lier le serveur est déjà utilisé.
    case 'EADDRINUSE':
      console.error(bind + "est déjà en cours d'utilisation." );
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// création du serveur avec express et utiliser app
const server = http.createServer(app);

//Lance le serveur
// afficher sur quel port se connecter

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Le serveur a démarré on  ' + bind);
});

// Le serveur écoute le port 
server.listen(port);
