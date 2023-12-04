import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";
const reviewSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: "Doctor"
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "Doctor"
    },

    reviewText: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },
    
}, {timestamps: true} );

reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: "name photo",
    });

    next();
});

//statics in mongoDB
reviewSchema.statics.calcAverageRatings = async function (doctorID) {
    // this points the current review
        const stats = await this.aggregate([{
            $match:{doctor: doctorID}
        },
        {
            $group:{
                _id: '$doctor',
                numOfRating: {$sum: 1},
                avgRating: {$avg: '$rating'}
            }
        }
    ]);
    Doctor.findByIdAndUpdate(doctorID, {
        totalRating: stats[0].numOfRating,
        averageRating: stats[0].avgRating,
    });
}

reviewSchema.post('save', function(){
    this.constructor.calcAverageRatings(this.doctor);
})

export default mongoose.model("Review", reviewSchema);