const HydraService = require('../services/hydra');

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const response = await new Promise((resolve, reject) => {
            HydraService.loginUser({user: { email, password } }, (err, res) => {
                if (err) {
                    console.error('Error', err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        return res.send(response);
    }
}

module.exports = new SessionController();