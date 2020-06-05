const NixService = require('../services/nix');

class PurchaseController {
    async index(req, res) {
        const response = await new Promise((resolve, reject) => {
            NixService.listPurchases({ userId: req.userId }, (err, res) => {
                if (err) {
                    console.log('Err PurchaseController', err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        return res.send(response);
    }

    async show (req, res) {
        const { id } = req.params;

        const response = await new Promise((resolve, reject) => {
            NixService.getPurchaseById({ id }, (err, res) => {
                if (err) {
                    console.log('Err PurchaseController', err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
        return res.send(response);
    }

    async store (req, res) {
        const { userId } = req;
        const { title, value } = req.body;

        const response = await new Promise((resolve, reject) => {
            NixService.purchase({ purchase: { title, value, userId: userId } }, (err, res) => {
                if (err) {
                    console.log('Err PurchaseController', err);
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        return res.send(response);
    }
}

module.exports = new PurchaseController();