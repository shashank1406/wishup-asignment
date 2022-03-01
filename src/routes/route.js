const express = require('express')
const controller= require('../controller/controller')

const router = express.Router()

router.put("/user/:userName", controller.createUser);
router.get("/user/:userName", controller.getUserDetail);


router.post("/subscription", controller.registerSubscription);
router.get("/subscription/:userName/:date", controller.getSubscriptionDetail);


module.exports = router;