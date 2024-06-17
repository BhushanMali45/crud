const Userdb = require('../model/model');

// Create and save new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty!" }); // 400 Bad Request
    }

    // New user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // Save user in the database
    user.save(user)
        .then(data => {
            res.status(201).redirect('/add-user'); // 201 Created
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation." // 500 Internal Server Error
            });
        });
}

// Retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id }); // 404 Not Found
                } else {
                    res.status(200).send(data); // 200 OK
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id }); // 500 Internal Server Error
            });
    } else {
        Userdb.find()
            .then(user => {
                res.status(200).send(user); // 200 OK
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred while retrieving user information." }); // 500 Internal Server Error
            });
    }
}

// Update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty!" }); // 400 Bad Request
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with id ${id}. Maybe user not found!` }); // 404 Not Found
            } else {
                res.status(200).send(data); // 200 OK
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating user information." }); // 500 Internal Server Error
        });
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user with id ${id}. Maybe id is wrong.` }); // 404 Not Found
            } else {
                res.status(200).send({ message: "User was deleted successfully!" }); // 200 OK
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete user with id=" + id }); // 500 Internal Server Error
        });
}

















