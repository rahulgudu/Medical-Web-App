import Doctor from "../Models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set: req.body}, {new: true});

        res.status(200).json({success: true, message: "Successfully Updated", data: updatedDoctor});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Failed to update'});
    }
}
export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        await Doctor.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Successfully Deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Failed to update'});
    }
}
export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id).select("-password");

        res.status(200).json({success: true, message: "Doctor Found", data: doctor});
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, error: 'No Doctor found'});
    }
}
export const getAllDoctor = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select("-password"); // .select("-password") will filter the data send to the Doctors, i.e it will not send the password to the Doctors..

        res.status(200).json({success: true, message: "Doctors Found", data: doctors});
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, error: 'Not found'});
    }
}