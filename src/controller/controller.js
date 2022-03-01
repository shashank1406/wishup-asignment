const userModel = require('../model/userModel')
const subscriptionModel=require('../model/subscriptionModel')



function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }



const createUser = async function (req, res) {
    try {

        let userName = req.params.userName

        const isUserNameExist = await userModel.findOne({ user_name: userName })

        if (isUserNameExist) {
            res.status(400).send({ status: false, message: `${userName} user is already exist` })
            return
        }

        let userData = { user_name: userName }
        const createUser = userModel.create(userData)

        res.status(200).send({ status: 'sucess' });

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}


const getUserDetail = async function (req, res) {
    try {

        let userName = req.params.userName

        const userDetail = await userModel.findOne({ user_name: userName })

        if (!userDetail) {
            res.status(400).send({ status: false, message: `${userName} is not exist` })
            return
        }

        res.status(200).send(userDetail)


    } catch (error) {

        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}



const registerSubscription = async function (req, res) {
    try {

        let requestBody = req.body

        const { user_name,plan_id,start_date } = requestBody

        const findUserDetail = await userModel.findOne({ user_name: user_name })

        if (!findUserDetail) {
            res.status(400).send({ status: false, message: `${user_name} is not registered please provide valid user name ` })
            return
        }

        if(plan_id=="free"){

            
              
            let subscriptionDetail={user_name:user_name,plan_id:plan_id,start_date:start_date,valid_till:"life time"}

           const ragisterSubscription= subscriptionModel.create(subscriptionDetail)

           res.status(200).send({status:'sucess', "amount":0})


        }

        if(plan_id=="trail"){

            let valid= addDays(start_date,7)

            let subscriptionDetail={user_name:user_name,plan_id:plan_id,start_date:start_date,valid_till:valid}

           const ragisterSubscription= subscriptionModel.create(subscriptionDetail)

           res.status(200).send({status:'sucess', "amount":0})
            
        }

        if(plan_id=="lite_1m"){
            
            let valid= addDays(start_date,30)

            let subscriptionDetail={user_name:user_name,plan_id:plan_id,start_date:start_date,valid_till:valid}

           const ragisterSubscription= subscriptionModel.create(subscriptionDetail)

           res.status(200).send({status:'sucess', amount:"-100"})
        }

        if(plan_id=="pro_1m"){
            
            let valid= addDays(start_date,30)

            let subscriptionDetail={user_name:user_name,plan_id:plan_id,start_date:start_date,valid_till:valid}

           const ragisterSubscription= subscriptionModel.create(subscriptionDetail)

           res.status(200).send({status:'sucess', amount:"-200"})
        }

        if(plan_id=="lite_6m"){
            
            let valid= addDays(start_date,180)

            let subscriptionDetail={user_name:user_name,plan_id:plan_id,start_date:start_date,valid_till:valid}

           const ragisterSubscription= subscriptionModel.create(subscriptionDetail)

           res.status(200).send({status:'sucess', amount:"-500"})
        }

        if(plan_id=="pro_6m"){
            
            let valid= addDays(start_date,180)

            let subscriptionDetail={user_name:user_name,plan_id:plan_id,start_date:start_date,valid_till:valid}

           const ragisterSubscription= subscriptionModel.create(subscriptionDetail)

           res.status(200).send({status:'sucess', amount:"-900"})
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}


const getSubscriptionDetail = async function (req, res) {
    try {

        let userName =req.params.userName
        let date = req.params.date

        if(!date){

            const findSubscription =  subscriptionModel.find({user_name:userName}).select({plan_id:1,start_date:1,valid_till:1})
            res.status(200).send(findSubscription)


        }else{

           

        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports.createUser = createUser
module.exports.getUserDetail = getUserDetail
module.exports.registerSubscription = registerSubscription
module.exports.getSubscriptionDetail = getSubscriptionDetail