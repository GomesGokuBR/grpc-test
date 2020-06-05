const Purchase = require('./models/Purchase');

module.exports =  {
    async getPurchaseById (call, callback) {
        const { id } = call.request;

        const response = await Purchase.findById(id);

        return callback(null, { purchase: response });
    },

    async listPurchases (call, callback) {
        const { userId } = call.request;

        const purchases = await Purchase.find( { userId })

        console.log(purchases);

        return callback(null, { purchases: purchases })
    },

    async purchase (call, callback) {
        const { title, value, userId } = call.request.purchase;

        const purchase = await Purchase.create({ userId, title, value });

        console.log(purchase)

        return callback(null, { purchase: { ...purchase.toObject(), id: purchase._id } })
    }
}