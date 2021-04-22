const product = require("../../models/product");
const selectedProduct = require("../../models/selectedProducts");
const users=require('../../models/users')
const admin=require('../../models/adminuser')
const order=require('../../models/orders')
const address=require('../../models/address')
let jwt=require('jsonwebtoken')


module.exports = function (router) {
  //Product operations//
  router.get("/product", (req, res) => {
    product.find({}, (err, product) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!product) {
          res.json({ success: false, message: "not data found" });
        } else {
          res.json(product);
        }
      }
    });
  });

  router.post("/product", (req, res) => {
    let data = new product(req.body);
    let id = data.bookID;
    
    product.findOne({ bookID: id }, (err, product) => {
      if (!product) {
        data.save((err, data) => {
          if (err) {
            return res.status(404).json(err);
          }
          return res.status(200).json(data);
        });
      } else {
        res.send("data exists");
      }
    }
    );
  });
  
  router.delete("/product/:id", (req, res) => {
    let id = req.params.id;
    
    if (!req.params.id) {
      res.send("no data provided");
    } else {
      product.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
          res.send("invalid id");
        } else {
            product.remove({ _id: req.params.id }, (err) => {
            if (err) res.send("error");
            else res.send("standup deleted");
         
          });
        }
      });
    }
  });
  router.get('/category/:value',function(req,res){
    let type=req.params.value
    product.find({bookType:type}, (err, product) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!product) {
          res.json({ success: false, message: "not data found" });
        } else {
          res.json(product);
        }
      }
    });
  
  })

  router.put("/product", function (req, res) {
    let not = new product(req.body);
    let id = req.body._id;
    if (!id) {
      res.send("not record found");
    } else {
      product
        .updateMany(
          {
            bookID: req.body.bookID, // search query
          },
          {
            $set: {
              bookName: not.bookName,
              bookPrice: not.bookPrice,
              bookAuthor: not.bookAuthor,
              bookPublisher: not.bookPublisher,
              bookPoster: not.bookPoster,
              bookType:not.bookType,
              description:not.description
            }
          }
        )
        .then((doc) => {
          
          res.send("updated succesfully");
        })
        .catch((err) => {
          
        });
    }
  });
  //Product operations//
  
  
  
  



  
  
  
  
  
  
  //Product operations//

  //Selected Product operations//
  router.get("/selectedProduct", (req, res) => {
    selectedProduct.find({}, (err, product) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!product) {
          res.json({ success: false, message: "not data found" });
        } else {
          res.json(product);
        }
      }
    });
  });
  
  
  
  
    router.post("/selectedProduct", (req, res) => {
      let data = new selectedProduct(req.body);
  
      // 
  
      data.save((err, data) => {
        if (err) {
          return res.status(404).json(err);
        }
        return res.status(200).json(data);
      });
    });
  
    router.delete("/selectedProduct/:id", (req, res) => {
      let id = req.params.id;
      
      if (!req.params.id) {
        res.send("no data provided");
      } else {
        selectedProduct.findOne({ _id: req.params.id }, (err, data) => {
          if (err) {
            res.send("invalid id");
          } else {
              const d1=  selectedProduct.remove({ _id: req.params.id }, (err) => {
              if (err) res.send("error");
              else res.send("standup deleted");
           
            });
          }
        });
      }
    });
  
    router.delete("/selectedProductsAll/:email", (req, res) => {
      let email=req.params.email
       selectedProduct.findOne({emailID:email}, (err, product) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (!product) {
            res.json({ success: false, message: "not data found" });
          } else {
            
           
             let email=product.emailID  
            
              
              selectedProduct.remove({ emailID: email }, 
              (err) => {
                if (err) res.send("error");
              else res.send("standup deleted");
           
              })
            
              
            
          }
        }
      });
      // 
    });
  
    //Product operations//

//User operations//
  router.post("/users", (req, res) => {
    let data = new users(req.body);
    let id = data.userEmailID;
    // 
    users.findOne({ userEmailID: id }, (err, product) => {
      if (!product) {
        data.save((err, data) => {
          if (err) {
            return res.status(404).json(err);
          }
          return res.status(200).json(data);
        });
      } else {
        res.send("user exists");
      }
    });
  });



  router.post('/register',(req,res)=>{
    if(req.body.userType==="Admin"){

      let data = new admin(req.body);
      let id = data.userEmailID;
      // 
      admin.findOne({ userEmailID: id }, (err, product) => {
        if (!product) {
          data.save((err, data) => {
            if (err) {
              return res.status(404).json(err);
            }
            return res.status(200).json(data);
          });
        } else {
          res.send("user exists");
        }
      });
    }
    if(req.body.userType==="Customer"){
      let data = new users(req.body);
      let id = data.userEmailID;
      // 
      users.findOne({ userEmailID: id }, (err, product) => {
        if (!product) {
          data.save((err, data) => {
            if (err) {
              return res.status(404).json(err);
            }
            return res.status(200).json(data);
          });
        } else {
          res.send("user exists");
        }
      });
    }
  })





  router.get("/users", (req, res) => {
    users.find({}, (err, product) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!product) {
          res.json({ success: false, message: "not data found" });
        } else {
          res.json(product);
        }
      }
    });
  });


  router.post("/admin", (req, res) => {
    let data = new admin(req.body);
    let id = data.userEmailID;
    // 
    admin.findOne({ userEmailID: id }, (err, product) => {
      if (!product) {
        data.save((err, data) => {
          if (err) {
            return res.status(404).json(err);
          }
          return res.status(200).json(data);
        });
      } else {
        res.send("user exists");
      }
    });
  });

  router.get("/admin", (req, res) => {
    admin.find({}, (err, product) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!product) {
          res.json({ success: false, message: "not data found" });
        } else {
          res.json(product);
        }
      }
    });
  });
  //Product operations//




//Login operation//
  router.post("/changePassword",(req,res)=>{
    let user=req.body
    let userType=user.userType
    let userName=user.userName
    let email=user.userEmailID;
    let oldpassword=user.password
    let newpassword=user.newPassword
    
    
    
    
    
    if(userType==="Customer"){
      users.findOne({userEmailID:email},(err,emailfound)=>{
        
          if(!emailfound){
              res.send({message:"please register on this mail"})
          }
          else{
             if(emailfound.password===oldpassword){
               users.updateOne({_id:emailfound._id}, {$set:{password:newpassword,userName:userName}},function(err, token){
                 
                  res.send({message:"Password Changed"})
                })
               
             } 
             else{
                 res.send({message:"wrong password"})
             }
          }
          if (err) {
            res.json({ success: false, message: err });
          }
      })}
      if(userType==="Admin"){
        admin.findOne({userEmailID:email},(err,emailfound)=>{
          
          if(!emailfound){
              res.send({message:"please contact Admin and Enroll on this mail"})
          }
          else{
             if(emailfound.password===oldpassword){
               
               admin.updateOne({_id:emailfound._id}, {$set:{password:newpassword,userName:userName}},function(err, token) {
                
                 
                  res.send({message:"PASSWORD CHANGED"})
                })
               
             } 
             else{
                 res.send({message:"wrong password"})
             }
          }
          if (err) {
            res.json({ success: false, message: err });
          }
      })
      }
  })
  router.post("/verifyuser",(req,res)=>{
    let givenuser=req.body;
    let userType=req.body.userType
    let givenemail=givenuser.userEmailID;
    let givenpassword=givenuser.password;
    if(userType==="User"){
    users.findOne({userEmailID:givenemail},(err,emailfound)=>{
        if(!emailfound){
            res.send({message:"please register on this mail"})
        }
        else{
           if(emailfound.password==givenpassword){
             jwt.sign({userName:emailfound.userName},"abcd",{expiresIn: 10000 },function(err, token) {
              let dataToBeSend={
                userName:emailfound.userName,
                userEmailID:emailfound.userEmailID,
                userType:emailfound.userType,
                 phoneNo:emailfound.phoneNo,
                 createdOn:emailfound.createdOn
              }
                res.send({message:"   Login Successful   ",token:token,userobj:dataToBeSend})
              })
             
           } 
           else{
               res.send({message:"wrong password"})
           }
        }
        if (err) {
          res.json({ success: false, message: err });
        }
    })}
    if(userType==="Admin"){
      admin.findOne({userEmailID:givenemail},(err,emailfound)=>{
        if(!emailfound){
          res.send({message:"please contact Admin and Enroll on this mail"})
        }
        else{
           if(emailfound.password==givenpassword){
             jwt.sign({userName:emailfound.userName},"abcd",{expiresIn: 60*60 },function(err, token) {
               let dataToBeSend={
                 userName:emailfound.userName,
                 userEmailID:emailfound.userEmailID,
                 userType:emailfound.userType,
                 phoneNo:emailfound.phoneNo,
                  createdOn:emailfound.createdOn
                 
               }
               
                res.send({message:"   Login Successful   ",token:token,userobj:dataToBeSend})
              })
             
           } 
           else{
               res.send({message:"wrong password"})
           }
        }
        if (err) {
          res.json({ success: false, message: err });
        }
    })
    }
})
//Login  operations//

router.get("/orders", (req, res) => {
  order.find({}, (err, product) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      if (!product) {
        res.json({ success: false, message: "not data found" });
      } else {
        res.json(product);
      }
    }
  });
});

router.post("/orders", (req, res) => {
  let data = new order(req.body);
  data.save((err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    return res.status(200).json(data);
  });
});

router.post("/address", (req, res) => {
  let data = new address(req.body);
  data.save((err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    return res.status(200).json(data);
  });
});

router.get("/address", (req, res) => {
  address.find({}, (err, product) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      if (!product) {
        res.json({ success: false, message: "not data found" });
      } else {
        res.json(product);
      }
    }
  });
});





}














































