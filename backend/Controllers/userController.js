import User from "../Models/UserSchema.js";
import Booking from "../Models/BookingSchema.js";
import Doctor from "../Models/DoctorSchema.js"
export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});

        res.status(200).json({success: true, message: "Successfully Updated", data: updatedUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Failed to update'});
    }
}
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Successfully Deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Failed to update'});
    }
}
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select("-password");

        res.status(200).json({success: true, message: "User Found", data: user});
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, error: 'No User found'});
    }
}
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password"); // .select("-password") will filter the data send to the users, i.e it will not send the password to the users..

        res.status(200).json({success: true, message: "Users Found", data: users});
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, error: 'Not found'});
    }
}

export const getUserProfile = async(req, res) => {
    const userID = req.userId;
    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        const [password, ...rest] = user._doc;

        res.status(200).json({success: true, message: "Profile info is getting", data: {...rest}});
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong, cannot get"});
    }
};

export const getMyAppointments = async(req, res)=>{
    try {
        // step:1 : retrive appointments from bookings

        const bookings = await Booking.find({user: req.userID});        

        // step:2 : extract doctor ids from appointments bookings

        const doctorsId = bookings.map(element => element.doctor.id);

        //step:3 : retrive doctors using doctor ids

        const doctors = await Doctor.find({_id: {$in: doctorsId}}).select("-password");


        res.status(200).json({success: true, message: "Appointments are getting", data: doctors});
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong, cannot get"});
    }
}