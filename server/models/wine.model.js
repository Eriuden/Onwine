const mongoose = require("mongoose")

const wineSchema = mongoose.Schema(
    {
        wineId: {
            type: String,
            required:true
        },

        name: {
            type:String,
            required:true
        },

        picture: {
            type:String,
            default: "../client/public/uploads/wineImages/random-wine.jpg",
            required:true
        },

        Year: {
            type:Number,
            required:true
        },

        Cépage: {
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
    },

    {timestamps: true},
)

const wineModel = mongoose.model("wine", wineSchema)
module.exports = wineModel