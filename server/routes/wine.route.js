const router = require("express").Router()

const wineController = require("../controllers/wine.controller")
const multer = require("multer")
const upload = multer

router.get("/", wineController.getWine)
router.post("/", upload.single("file"), wineController.createWine)
router.put("/:id", wineController.updateWine)
router.delete("/:id", wineController.deleteWine)
router.patch("/like-wine", wineController.likeWine)
router.patch("unlike-wine",wineController.unlikeWine)

router.patch("/comment-wine/:id", wineController.comment)
router.patch("/edit-comment-wine", wineController.editComment)
router.patch("/delete-comment-wine", wineController.deleteComment)

module.exports = router