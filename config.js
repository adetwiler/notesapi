module.exports = {
    port: process.env.PORT || 80,
    mongo: {
        uri: 'mongodb://localhost:27017',
        db: 'notes'
    }
};
