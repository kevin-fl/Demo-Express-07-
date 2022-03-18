const mssql = require("mssql");
const { createDbConnection } = require("../utils/db-utils");
const { messageMapper } = require("./mappers/message-mapper");

const messageModel = {
    
    getAll: async () => {
        const db = await createDbConnection();
        const result = await db.query('SELECT * FROM Message ORDER BY CreateDate DESC');                      //.query permet d envoyer sur la coneexion une requete vers le server tt de suite
        db.close();                                                                                          //fermer pr pas que ta connection reste active , elle se prendra un timeout a un moment mais cest pas lidée 

        return result.recordset.map(row => messageMapper(row));
    
    },
    
    

    getById: async (id) => {
        let db;
        try {

            db= await createDbConnection();

//Requete SQL parametre 
            const querySQL = 'SELECT * FROM Message WHERE MessageId = @Id;';

            const request = new mssql.Request(db);
            request.input('Id', mssql.BigInt, id);

            //Execution de la requete 
            const result = await request.query(querySQL);

            if(result.recordset.length !== 1) {
                return null;

            }
            
            return messageMapper(result.recordset[0]);


        }
        finally {

            db?.close();
        }

    },

    insert: async ( {pseudo , content }) => {                                          // id 16 genrer par le insert 
        let db;
        try{
            db = await createDbConnection();
            // Protection contre l injection SQL => Pas de concatenation !
            const querySQL = ' INSERT INTO MESSAGE (Pseudo , Content , CreateDate)'
            + ' OUTPUT inserted.messageId'
            + ' VALUES(@pseudo, @content, @createDate)';                                           // le new.mssql.Request permet qu'un utilisateur exteireur ne fasse pas une injection sql et prenent ou rajoute des données . exemple sans .Request a' OR 1=1;# mot de passe injection sql permet de rentrer ds un admin 


            // requete securisée : pas d injection SQL possible !  ajout de parametres pr envoyer les donnees sensible , mecansime de protection des qu'on interagi avec l utilisateur !
        const request = new mssql.Request();
        request.input('pseudo', mssql.NVarChar, pseudo);
        request.input('content', mssql.NVarChar, content);                                                  // .input--> mot content , mot pseudo comme appeler dans la const querySQL
        request.input('createDate', mssql.DateTime2, new Date());                                                  // .input--> mot content , mot pseudo comme appeler dans la const querySQL

    const result = await request.query(querySQL);
    

    
    return result.recordset[0].MessageId;                                                                  //recrodset permet d avoiur ttes les lignes de resultat de  output inserted.MessageId
}
    finally {
        db?.close();     // if(db) {db.close()}                                                           //? permet de verifier que Db existe , qu'il n est pas nul 
    }
}


};

module.exports = messageModel;
