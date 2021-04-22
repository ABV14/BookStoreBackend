const db = require('mongoose')
const userSchema = new db.Schema({
    userName:String,
    userEmailID:String,
    phoneNo:String,
    password:String,
    createdOn:String,
    userType:String,
    
})

module.exports = db.model('user', userSchema)