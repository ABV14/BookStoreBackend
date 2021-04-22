const db = require('mongoose')
const orderSchema = new db.Schema({
    emailID:String,
    order:Array
})

module.exports = db.model('order', orderSchema)
