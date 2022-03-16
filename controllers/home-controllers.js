const homeController = {

        index: (req, res) => {
            res.render('home/index' , {title: 'zone d\'accueil'});

        },

        about: (req,res)=> {                         // . status defini juste le statut 
            res.render('home/about' , {title: null});                  //envoi directement le statut 


        }

};

module.exports = homeController;