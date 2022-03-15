const homeController = {

        index: (req,res) =>{
            res.render('home/index');

        },

        about: (req,res)=>{                         // . status defini juste le statut 
            res.sendstatus('home/about');                  //envoi directement le statut 


        }

};

module.exports = homeController;