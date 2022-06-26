const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose.connect(
        process.env.CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log("MongoDB Atlas conectado!");
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = connectToDb;