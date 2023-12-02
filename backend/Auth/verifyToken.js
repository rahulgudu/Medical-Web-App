import jwt from "jsonwebtoken";
import Doctor from "../Models/DoctorSchema.js";
import User from "../Models/UserSchema.js";

export const authenticate = async (req, res, next) => {
    //get token from headers
    const authToken = req.headers.authorization

    //check token exist or not
    if (!authToken || !authToken.startsWith("Bearer ")){
        return res.status(401).json({success: false, message: 'Please provide a valid token'});
    }

    try{
        console.log(authToken);

        const token = authToken.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decoded.id;
        req.role = decoded.role

        next();
    } catch(err){
        if(err.name === "TokenExpiredError"){
            return res.status(401).send({ success: false, error: 'Your session has expired.' });
        }

        return res.status(401).json({success: false, message: "Invalid Token"});
    }

}

export const restrict = roles => async (req, res, next) => {
    const userId = req.userId;
    
    let user;

    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if (patient) {
        user = patient;
    } else if (doctor) {
        user = doctor;
    } else {
        return res.status(401).json({ success: false, message: "User not found." });
    }

    if (!roles.includes(user.role)) {
        return res.status(401).json({ success: false, message: "You are unauthorized to perform this action." });
    }

    next();
}


// note : we expect token in the format like Bearer and then actual token