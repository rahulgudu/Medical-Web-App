import User from "../Models/UserSchema.js";
import Doctor from "../Models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const register = async(req, res) => {
    console.log(req.body);
    const {email, password, name, role, photo, gender} = req.body;
    try {
        let user = null;
        if(role === "patient"){
            user = await User.findOne({email});
        }
        else if(role === "doctor"){
            user = await Doctor.findOne({email});
        }
        
        //check if user exist
        if (user){
            return res.status(409).send("User already exist");
        }


        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if(role === "patient"){
            user = new User({
                name, 
                email, 
                password: hashedPassword, 
                role, 
                photo, 
                gender
            });
        }
        if(role === "doctor"){
            user = new Doctor({
                name, 
                email, 
                password: hashedPassword, 
                role, 
                photo, 
                gender
            });
        }

        await user.save();

        res.status(200).json({success: true, message: "User successfully created"});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal Server Error, Try again"});
    }
}

export const login = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}