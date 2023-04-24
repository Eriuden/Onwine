const userModel = require("../models/user.model")
const wineModel = require("../models/wine.model")
const ObjectId= require("mongoose").Types.ObjectId
const fs = require("fs")
const { promisify } = require("util")
const { uploadErrors } = require("../utils/errors.utils")
const pipeline = promisify(require("stream").pipeline)

module.exports.getWine = async(req,res) => {
    wineModel.find((err,docs) => {
        if(!err)res.send(docs)
        else console.log("Error to get data" + err)
    }).sort({createdAt: -1})
}

module.exports.createWine = async (req,res) => {
    if(req.file !=null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg"
            )
                throw Error("invalid file")

            if (req.file.size > 500000) throw Error("taille maximale dépassée")
        } catch (err) {
            const errors = uploadErrors(err)
            return res.status(201).json({errors})
        }
        fileName = req.body.posterId + Date.now() + ".jpg"

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/client/public/uploads/wineImages/${fileName}`
            )
        )
    }

    const newWine = new wineModel({
        name,
        year,
        Cépage,
        comments:[],
        likedBy: [],
    })

    try {
        const wine = await newWine.save()
        return res.status(201).json(wine)
    } catch(err) {
        return res.status(400).send(err)
    }
}



