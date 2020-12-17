const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const schema = new Schema({

})

const Room = mongoose.model("Room", schema)

module.exports = Room;