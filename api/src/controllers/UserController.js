const HydraService = require('../services/hydra');

class UserController {
    async show(req, res) {
        const { id } = req.params;

        const response = await new Promise((resolve, reject) => {
            HydraService.getUserbyId({ id }, (err, res) => {
                if (err) {
                    console.log('UserController err show', err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
        res.send(response);
    }

    async store(req, res) {
        const { email, username, password } = req.body;

        const response = await new Promise((resolve, reject) => {
            HydraService.registerUser({user: { email, username, password }}, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        return res.send(response);
    }
}

module.exports = new UserController();