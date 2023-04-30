const mongoose = require("mongoose")

const wineSchema = mongoose.Schema(
    {
        wineId: {
            type: String,
            required:true
        },

        wineName: {
            type:String,
            required:true
        },

        picture: {
            type:String,
            default: "../client/public/uploads/wineImages/random-wine.jpg",
            required:true
        },

        year: {
            type:Number,
            required:true
        },

        cépage: {
            type:String,
            required:true
        },

        comments: {
            type: [
                {
                    commenterId: String,
                    commenterName: String,
                    text:String,
                    timestamp: Number,
                }
            ],
            required:true,
        },

        likedBy: {
            type: [String]
        },
    },

    {timestamps: true},
)

const wineModel = mongoose.model("wine", wineSchema)
module.exports = wineModel