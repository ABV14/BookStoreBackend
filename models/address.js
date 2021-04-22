const db = require('mongoose')
const addressSchema = new db.Schema({
    emailD:String,
    houseNO:String,
    locality:String,
    city:String,
    state:String,
    pinCode:String,
    userType:String
    
})

module.exports = db.model('Address', addressSchema)