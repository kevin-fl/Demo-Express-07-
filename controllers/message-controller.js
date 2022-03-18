const { messageSchema } = require("../data-validators/message-validator");
const messageModel = require('../models/message-model');
const {getErrorMessage} =require('../utils/error-utils');

const messageController = {
    
    index: (req, res) => {

        //Affichage de la liste des messages
        messageModel.getAll()
        .then(messages => {
            console.log(messages);
            res.render();

        })
        res.render('message/index' , { title: `liste des messages ${messages}` });

    },

    detail: (req,res) => {
//affichage le detail d'un message

        const { id } = req.params;

        //recup les datas 
        messageModel.getById(id)
        .then(message => {

            if(!message)//  not message
                return res.sendStatus(404);

        })

        const optionDate = {
            dateStyle: 'long',
            timeStyle: 'short'

        }

        res.render('message/detail' ,{
            title: `Detail du message ${id}`,
            message,
            formattedCreateDate: message.createDate.toLocaleString('fr-be', optionDate )
        });
        


    },

    //GET

    messageFormGET: (req,res) => {
        //Permet d'afficher la page avec le formulaire

       // res.sendStatus(501);
    res.render('message/newMessage' , { title: 'Nouveau message' , errors: null, data: {pseudo: {} }}); 
    },



    //POST
    messageFormPOST:(req, res) => {
        //permet de traiter les données du formulaire
      //  console.log(req.body);

    messageSchema.validate(req.body, {abortEarly: false })
        .then((data) => {
            console.log('data' , data);
            messageModel.insert({
                pseudo: data.pseudo,
                content: data.msg
            }).then(id => {
                console.log(`Message ${id}` );
            // TODO Ajouter dans la DB

          //  res.sendStatus(501);
        res.redirect('/message');
        })})

        .catch((validationError) => {
          //  console.log(err);
            const errors = getErrorMessage(validationError);
            const data = validationError.value;

            res.render('message/newMessage' , { title: 'Corrige ton message',errors, data })
        });
    }

          //  res.sendStatus(501);

}

    module.exports = messageController;




    // en gros cet exo permet de fiare une validation de formulaire propre 