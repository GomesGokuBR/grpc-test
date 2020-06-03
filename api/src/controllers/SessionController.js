const { promisify } = require('util');

const HydraService = require('../services/hydra');

const loginUser = promisify(HydraService.loginUser);

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const response = await promisify(HydraService.loginUser({ email, password }));

        return res.json(response);
    }
}

module.exports = new SessionController();