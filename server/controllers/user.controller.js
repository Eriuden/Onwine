const wineModel = require("../models/wine.model")
const userModel = require("../models/user.model")
const { isModuleNamespaceObject } = require("util/types")
const ObjectId = require("mongoose").Types.ObjectId

module.exports.getAllUsers = async (res) => {
    const users = await userModel.find().select("-password")
    res.status.json(users)
}

module.exports.getUser = async(req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown:" + req.params.id)
    userModel.findById(req.params.id, (err,docs) => {
        if (!err) res.send(docs)
        else console.log("id unknown" + err)
    }).select("-password")
}

module.exports.updateUser = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown:" + req.params.id)
    try {
        await userModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    address: req.body.address, 
                }
            },
            { new:true, upsert:true, setDefaultsOnInsert:true},

            (err,docs) => {
                if (!err) return res.send(docs)
                if (err) res.status(500).send({message: err})
            }
        )
    } catch (err) {
        return res.status(500).json({message: err})
    }
}

module.exports.deleteUser = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown:" + req.params.id)
    try {
        await userModel.removeAllListeners({ _id: req.params.id}).exec()
        res.status(200).json({ message: "Au revoir"})
    } catch(err) {
        return res.status(500).json({message: err})
    }
}

module.exports.like = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown:" + req.params.id)
    try {
        await userModel.findByIdAndUpdate(
            req.params.id,

            {$addToSet: { like: req.body.idToFollow}},
            {new:true, upsert:true},
            (err,docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err)
            }
        )

        await wineModel.findByIdAndUpdate(
            req.params.id,

            {$addToSet: { likedBy: req.body.idToFollow}},
            { new:true, upsert: true},
            (err) => {
                if (err)
                return res.status(400).json(err)
            }
        )
    } catch(err) {
        return res.status(500).json({ message: err})
    }
}

module.exports.unlike = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown:" + req.params.id)
    try {
        await userModel.findByIdAndUpdate(
            req.params.id,

            {$pull: { like: req.body.idToFollow}},
            {new:true, upsert:true},
            (err,docs) => {
                if (!err) res.status(201).json(docs)
                else return res.status(400).json(err)
            }
        )

        await wineModel.findByIdAndUpdate(
            req.params.id,

            {$pull: { likedBy: req.body.idToFollow}},
            { new:true, upsert: true},
            (err) => {
                if (err)
                return res.status(400).json(err)
            }
        )
    } catch(err) {
        return res.status(500).json({ message: err})
    }
}