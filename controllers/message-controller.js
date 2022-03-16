const { messageSchema } = require("../data-validators/message-validator");

const messageController = {

    
    index: (req, res) => {

        res.render('message/index' , { title: 'liste des messages' });

    },

    detail: (req,res) => {
//affichage le detail d'un message
        res.render('message/detail' , {title: `Detail du message ${id}` });


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
        console.log(req.body);

    messageSchema.validate(req.body, {abortEarly: false })
        .then((data) => {
            console.log('data' , data);
            // TODO Ajouter dans la DB

          //  res.sendStatus(501);
        res.redirect('/message');
        })

        .catch((validationError) => {
          //  console.log(err);
            const errors = getErrorMessage(validationError);
            const data = validationError.value;

            res.render('message/newMessage' , { title: 'Corrige ton message',errors, data })
        });
    }
};
          //  res.sendStatus(501);



    module.exports = messageController;




    // en gros cet exo permet de fiare une validation de formulaire propre 