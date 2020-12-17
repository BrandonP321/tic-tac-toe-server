const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const schema = new Schema({
    passcode: {
        type: String,
        trim: true,
        required: "Passcode required to create room"
    },
    player_one: {
        type: String,
        trim: true,
        required: false
    },
    player_two: {
        type: String,
        trim: true,
        required: false
    }
})

const Room = mongoose.model("Room", schema)

module.exports = Room;