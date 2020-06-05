const HydraService = require('../services/hydra');

module.exports = async (req, res, next) => {
    try {
        const response = await new Promise((resolve, reject) => {
            HydraService.authenticate({ token: req.headers.authorization }, (err, res) => {
                if (err || res.error) {
                    reject(res.error);
                } else {
                    resolve(res);
                }
            });
        });

        req.userId = response.user.id;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: 'Token invalid'});
    }
}