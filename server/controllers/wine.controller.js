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
        wineName: req.file !=null ? "./uploads/wine" + fileName : "",
        year: req.body.year,
        cépage: req.body.cépage,
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

module.exports.updateWine = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id)

    const updatedRecord = {
        wineName: req.body.wineName,
        year: req.body.year,
        cépage: req.body.cépage,
    }

    wineModel.findByIdAndUpdate(
        req.params.id,
        {$set: updatedRecord},
        { new:true},
        (err,docs) => {
            if (!err) res.send(docs)
            else console.log("update error:" + err)
        }
    )
}

module.exports.deleteWine = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id)

    wineModel.findOneAndRemove(req.params.id, (err,docs) => {
        if (!err) res.send(docs)
        else console.log("delete error:" + err)
    })
}

module.exports.likeWine = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id)

    try {
        await wineModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: {likedBy: req.body.id}
            },
            { new:true},
            (err,docs) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: {like: req.params.id}
            },
            { news:true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.unlikeWine = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id)

    try {
        await wineModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {likedBy: req.body.id}
            },
            { new:true},
            (err,docs) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: {like: req.params.id}
            },
            { news:true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.comment = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id)

    try {
        return wineModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterName: req.body.commenterName,
                        text: req.body.text,
                        timeStamp: new Date().getTime(),
                    },
                },
            },
            { new:true},
            (err,docs) => {
                if (!err) res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.editComment = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id)

    try {
        return wineModel.findById(req.params.id, (err,docs) => {
            const theComment = docs.comments.find((comment) => 
            comment._id.equals(req.body.commentId)
            )

            if(!theComment) return res.status(400).send("commentaire introuvable")

            theComment.text = req.body.text 

            return docs.save((err)=> {
                if (!err) return res.status(200).send(docs)
                return res.status(500).send(err)
            })
        })
    } catch {
        return res.send(400).send(err)
    }
}

module.exports.deleteComment = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id )

    try {
        return wineModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },

            { new:true},
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}


