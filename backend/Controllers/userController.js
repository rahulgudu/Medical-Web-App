import User from "../Models/UserSchema.js";

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