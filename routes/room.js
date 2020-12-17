const router = require('express').Router();
const db = require('../models')

// function to create a random 6 character string
function randomString() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    // string to contain passcode
    let str = ''

    for (let i = 0; i < 6; i++) {
        // generate random int between 0 and 25
        const randInt = Math.floor(Math.random() * 25)
        // index letter from alphabet and add to passcode string
        const char = alphabet[randInt]
        str += char
    }

    return str
}

// get all rooms in db (for development purposes)
router.get('/rooms/all', (req, res) => {
    db.Room.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

router.post('/room/create', (req, res) => {
    // create random 6 character string passcode for room
    const passcode = randomString()
    console.log(passcode)
    // create new room with passcode and new user
    db.Room.create({
        passcode: passcode,
        player_one: req.body.user
    }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;