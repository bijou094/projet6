// importer le express (Framework de node.js pour crée des application express)
const express = require('express');




const morgan = require('morgan');// importer le package pour  l'enregistreur de requêtes HTTP 

//Dotenv est un module sans dépendance qui charge des variables d'environnement à partir d'un .envfichier dans process.env.
// permet de cacher les information secret
const dotenv = require('dotenv').config();


const mongoose = require('./bd/bd');// relier la base de données à l'application

const helmet = require('helmet');//Helmet sécurise les  applications Express en définissant divers en-têtes HTTP


const userRoutes = require('./routes/user');// la route vers l'utilisateur
const sauceRoutes = require('./routes/sauce');// la route vers la sauce
const path = require('path');// chemain vers les fichiers




const bodyParser = require('body-parser');//d'extraire l'objet JSON des requêtes POST

const app = express();//Création d'une application express


// contourner les erreurs 
// tout le monde peut acceder evec les defferent verbs des requête
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Rendre la requete exploitable


app.use(express.urlencoded({extended: true}));//  rend la requête exploitable et qui  permet de parser les requêtes , on peut y accéder grâce à req.body
app.use(express.json());//// Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable




app.use(helmet());
app.use(morgan("dev"));

app.use('/api/sauces',sauceRoutes); //servir les routes vers les  sauces
app.use('/api/auth', userRoutes);//servir les routes vers les  utilisateurs
app.use('/images', express.static(path.join(__dirname, 'images')));//gére les  ressources  statiquement(charger les fichiers qui sont dans le repertoire images)

  
module.exports = app;//Export de l'application express 
