const db = require('mongoose')
const adminuserSchema = new db.Schema({
    userName:String,
    userEmailID:String,
    phoneNo:String,
    password:String,
    
    userType:String,
    
})

module.exports = db.model('adminuser', adminuserSchema)