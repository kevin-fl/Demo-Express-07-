const mssql = require ('mssql');
//const connectionString = process.env.DB_CONNECTIONSTRING;




    /**
     * Methode permettant de creer une connexion vers la DB
     * @returns {Promise<mssql.ConnectionPool} la connexion pool
     */

const createDbConnection= async () => {

        const createdb = await mssql.connect(process.env.DB_CONNECTIONSTRING);                    // ou supprimer const connectionString et la rajouter ligne 14 await mssql.connect(process.env.DB_CONNECTIONSTRING)
        return createdb;

    };

/**
 * Methode pour tester la connexion vers la DB
 */

const  testDbConnection = async () => {

        try {
            const testdb = await createDbConnection();
            testdb.close();
            console.log('Salut la DB');
        }

        catch (error) {
        console.error(error.message);
        process.exit();


        }
    
};

module.exports = {
    createDbConnection,
    testDbConnection

};