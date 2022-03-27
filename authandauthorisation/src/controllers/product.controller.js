const express = require("express")
const Product = require("../models/user.product")
const authanticate = require("../middlewares/authenticate")
const authorise = require("../middlewares/authorise")

const router = express.Router()

router.post("", authanticate, async(req, res) => {
    try {
        req.body.user_id = (req.user._id)
        const product = await Product.create(req.body)

        return res.send(product)

    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("", authanticate, async(req, res) => {
    try {
        req.body.user_id = (req.user._id)
        const product = await Product.find().lean().exec()

        return res.send(product)

    } catch (err) {
        return res.status(500).send(err.message)
    }
})
router.patch("/:id", authanticate, authorise(["seller", "admin"]), async(req, res) => {
    try {
        req.body.user_id = (req.user._id)
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.send(product)

    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router