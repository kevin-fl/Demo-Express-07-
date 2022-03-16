const getErrorMessage = (validationError) =>{
    const results = validationError.inner.reduce((errors , current) => {
        const { path , message } = current;
        if (!errors[path]) {
            errors[path] = message;

        }
        return errors;
    }, {});                                                      // {}objet vide c est la valeur initiale de reduce , permet d intialiser la valeur initiale sinon ce serait en undefined et poserait probleme
        return results; 
};

module.exports = {
    getErrorMessage
};
