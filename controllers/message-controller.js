const res = require("express/lib/response");

const messageController = {

    index: (req,res) =>{

        res.sendStatus(501);

    },

    detail: (req,res) => {
//affichage



    },

    messageFormGET: (req,res) => {
        //Permet d'afficher la page avec le formulaire

        res.sendStatus(501);
    },

//POST
    messageFormPOST:(req,res) => {

        res.sendStatus(501);

    

    }

};

    module.exports = messageController;