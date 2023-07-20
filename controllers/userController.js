import UserModel from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userRegistration = async(req, res) =>{
    const {name, email, password, password_confirmation, tc }   = req.body
    const user = await UserModel.findOne({email:email})
    if(user){
        res.send({
            "status":"Failed",
            "message":"Email is already there"
        })
    } else{
        if(name && email && password && password_confirmation && tc){
            if(password === password_confirmation){

                try{
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password,salt)
                    const newUser = new UserModel({
                        name:name,
                        password:hashPassword,
                        email:email,
                        tc:tc
                    })
        
                    await newUser.save()

                    const saved_user = await UserModel.findOne({email:email})
                    const token = jwt.sign({userId:saved_user._id}, 
                                            process.env.JWT_SECRET_KEY ,
                                            {expiresIn:'5d'})

                    res.status(201).send({
                        "message":"Success",
                        "token" :token
                    })
                } catch(err){
                    console.log(err)
                    res.status(500).send({
                        "status":"Failed",
                        "message":"failed to register"
                    })
                }
            }
      
        }else{
            res.status(400).send({
                "status":"Failed",
                "message":"All fields are required"
            })
        }
    }
}

export const userLogin = async(req, res) =>{
    try{
        const {email, password} = req.body
        if(email && password){
            const user = await UserModel.findOne({email: email})
            if(user !=null){
                const isMatch = bcrypt.compare(password, user.password)
                if(user.email ===email && isMatch ){
                    const token = jwt.sign({userId:saved_user._id}, 
                                            process.env.JWT_SECRET_KEY ,
                                            {expiresIn:'5d'})

                    res.status(200).send({
                        "status":"success",
                        "message":"Login success",
                        "token":token
                    })
                } else{
                    res.send({
                        "status":"failed",
                        "message":"Password is not valid"
                    })
                }
            } else{
                res.send({
                    "status":"Failed",
                    "message":"user is not registered"
                })
            }
        } else{
            res.send({
                "status":"Failed",
                "message":"please provide email and password"
            })
        }
    }catch(err){

    }
}

export const changePassword = async () =>{
    
    const {password,password_confirmation} = req.body
    if(password !== password_confirmation){
        res.send({
            "status":"Failed",
            "message":"Passwords didn't password"
        })
    }else{

    }
}

