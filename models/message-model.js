const mssql = require("mssql");
const { createDbConnection } = require("../utils/db-utils");

const messageModel = {
    
    getAll: async () => {
        const db = await createDbConnection();
        const result = await db.query('SELECT * FROM Message');
        db.close();

        return result.recordset;
    },

    insert: async ( {pseudo , content }) =>{
        let db;
        try{
            db = await createDbConnection();

            const querySQL = ' INSERT INTO MESSAGE (Pseudo , Content)'
            + ' OUTPUT inserted.messageId'
            + ' VALUES(@pseudo, @content)';


            // requete securisée : pas d injection SQL possible ! 
        const request = new mssql.Request();
        request.input('pseudo', mssql.NVarChar, pseudo);
        request.input('content', mssql.NVarChar, content);

    const result = await request.query(querySQL);
    

    
    return result.recordset[0].MessageId;
}
    finally {
        db?.close();     // if(db) {db.close()}
    }
}


};

module.exports = messageModel;
