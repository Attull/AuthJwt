import UserModel from "../models/User.js"


export const userRegistration = async(req, res) =>{
    const {name, email, password, password_confirmation, tc }   = req.body
    console.log("eamil//",email)
    const user =  UserModel.findOne({email:email})
    console.log("user...", user)
    if(user){
        res.send({
            "status":"Failed",
            "message":"Email is already there"
        })
    } else{
        if(name && email && password && password_confirmation && tc){
            if(password === password_confirmation){
                try{
                    const newUser = new UserModel({
                        name:name,
                        password:password,
                        email:email,
                        tc:tc
                    })
        
                    await newUser.save()
                } catch(err){
                    console.log(err)
                    res.send({
                        "status":"Failed",
                        "message":"failed to register"
                    })
                }
            }
      
        }else{
            res.send({
                "status":"Failed",
                "message":"All fields are required"
            })
        }
    }
}