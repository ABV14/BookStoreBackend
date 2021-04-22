const db = require('mongoose')
const productSchema = new db.Schema({
    bookID:String,
    bookName:String,
    bookPrice:Number,
    bookAuthor:String,
    bookPublisher:String,
    bookPoster:String,
    bookType:String,
    description:String
})

module.exports = db.model('product', productSchema)


  // router.put('/pro',function(req,res){
  //   let not=new pro(req.body)
  //  let id=req.body.proID
  //  if(!id)
  //  {
  //      res.send("not record found")
  //  }
  //  else{
  //   pro.updateMany(
  //      {
  //          proID:req.body.proID,  // search query
  //      },
  //      {
  //          $set: {
  //              proID:not.proID,
  //              proName :not.proName,
  //              proPrice: not.proPrice,
  //              proManufacturer:not.proManufacturer,
  //              proBrand :not.proBrand

  //          },
  //        },
  //    )
  //    .then(doc => {
  //      console.log(doc)
  //      res.send("updated succesfully")
  //    })
  //    .catch(err => {
  //      console.error(err)
  //    })
  //  }
  // })
