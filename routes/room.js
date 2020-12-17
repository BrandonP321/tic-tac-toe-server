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

router.put('/room/join/:passcode', (req, res) => {
    // get passcode from url
    const { passcode } = req.params;
    // first check that room doesn't already have 2 players in it
    db.Room.find({ passcode: passcode }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let player_one = data[0].player_one
            let player_two = data[0].player_two

            // check number of players in room
            if (player_one && player_two) {
                // if room has 2 players, send status 500
                res.status(500).end();
            } else {
                // if a spot is open in the room, add new player to the room based on which player slot is open and send status 200
                if (!player_one) {
                    db.Room.updateOne({ passcode: passcode }, { $set: { player_one: req.body.user } }, (err, data ) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.json(data)
                        }
                    })
                } else {
                    db.Room.updateOne({ passcode: passcode }, { $set: { player_two: req.body.user } }, (err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.json(data)
                        }
                    })
                }
            }
        }
    })
})

router.delete('/room/delete/:passcode', (req, res) => {
    // delete room with passcode from url
    db.Room.deleteOne({ passcode: req.params.passcode }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;