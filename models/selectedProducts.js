const db = require('mongoose')
const selectedProductSchema = new db.Schema({
    emailID:String,
    userName:String,
    bookID:String,
    bookName:String,
    bookPrice:Number,
    bookAuthor:String,
    bookPublisher:String,
    bookPoster:String,
    bookType:String,
    description:String,
    userType:String
})

module.exports = db.model('selectedProducts', selectedProductSchema)