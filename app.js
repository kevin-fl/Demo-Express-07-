const express = require('express');
const homeRouter = require('./routes/home-router');
const messageRouter = require('./routes/message-router');



// Chargement des variables d environnements
require('dotenv-flow').config();
//console.log(process.env);


//Test de la base de données
require('./utils/db-utils').testDbConnection();


//Variable de config
const {PORT, NODE_ENV } = process.env;
//const port = 8080;
//const mode = 'dev';

//Génération du serveur web
const app= express();


//Configuration  du moteur de vue 

app.set('view engine' , 'ejs');
app.set('views', './views');

//Ajout des dossiers statiques
app.use(express.static('public'))

//Ajout du middleware pour les données ""
app.use(express.urlencoded({extended: true}))

// Ajouter le systeme de router
app.use(homeRouter);
app.use(messageRouter);


//Erreur 404 custom (après les routes !!!)
app.use((req,res) =>{

res.status(404).send('Perdu ?');

});
//demarrage du server 

app.listen(PORT , () => {
    console.log(`Server up on port ${PORT} [${NODE_ENV}]`);              // ${port}    [${mode}]

});





