const messageMapper = (messageRow) => {

return {

    messageId: messageRow [0]['Message_Id'],                                                      //chnager l ecriture du messageId par exemple en Message_Id
    pseudo : messageRow [0]['pseudo'],
    content: messageRow [0]['content'],
    createDate: messageRow [0]['CreateDate']
    };
};

module.exports = {
    messageMapper
};
