var express = require('express')
var mongodb = require('mongodb')
var cors = require('cors')
var bodyParser = require('body-parser')
var expressFileupload = require('express-fileupload');
var session = require('express-session')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var database = require('./database')

app.use(cors())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


app.post('/login', (req, res) => {
    let logindata = {
        email: req.body.username,
        password: req.body.userPassword
    }
    database.then((db) => {
        return db.collection('loginData').findOne({ email: logindata.email }).then((result) => {
            console.log(result);
            let user = result
            if (user) {
                if (user.password == logindata.password) {
                    req.session.user = user

                    if (user.userStatus == 0) {
                        res.json(user)
                    }
                    else if (user.userStatus == 1) {
                        res.json(user)
                    }
                    else if (user.userStatus == 2) {
                        res.json(user)
                    }
                    else {
                        res.json('invalid')
                    }
                }
                else {
                    res.json('invalid')
                }
            }
            else {
                res.json('invalid')
            }
        })
    })
})
app.post('/register', async (req, res) => {
    let regData = {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phno,

    }

    let logData = {
        email: req.body.email,
        password: req.body.password,
        userStatus: req.body.status
    }
    try {
        const db = await database
        const regResult = await db.collection('registerData').insertOne(regData)
        logData.regId = regResult.insertedId
        await db.collection('loginData').insertOne(logData)
        res.json("success")

    } catch (err) {
        console.error(err)
    }
})

app.post('/addTeacher', async (req, res) => {
    let regData = {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        qualification: req.body.qualification,
        address: req.body.address,
        phone: req.body.phno,

    }

    let logData = {
        email: req.body.email,
        password: req.body.password,
        userStatus: req.body.status
    }
    try {
        const db = await database
        const regResult = await db.collection('registerData').insertOne(regData)
        logData.regId = regResult.insertedId
        await db.collection('loginData').insertOne(logData)
        res.json("success")

    } catch (err) {
        console.error(err)
    }
})

app.get('/viewTeacher', async (req, res) => {
    try {
        const db = await database;
        const regData = await db.collection('registerData').find().toArray();
        const teacherId = regData.map(teacher => teacher._id);
        const logData = await db.collection('loginData').aggregate([
            {
                $match: {
                    $and: [{ userStatus: 1 }, { regId: { $in: teacherId } }]
                }
            },
            {
                $addFields: { "datas": { "$toObjectId": "$regId" } }
            },
            {
                $lookup: {
                    from: "registerData",
                    localField: "datas",
                    foreignField: "_id",
                    as: "teacherDetails"
                }
            },
            { $unwind: "$teacherDetails" }
        ]).toArray();
        // console.log(logData);
        res.json({ logData, regData });
    } catch (error) {
        console.error(error);
    }
});

app.post('/deleteTeacher', (req, res) => {
    let delId = req.body.id
    database.then((db) => {
        db.collection('registerData').deleteOne({ _id: new mongodb.ObjectId(delId) })
            .then((result) => {
                db.collection('loginData').deleteOne({ regId: new mongodb.ObjectId(delId) })
                    .then((result) => {
                        res.json(result)
                    }
                    )
            })
    })
})


app.post('/findTeacher', (req, res) => {
    let findId = req.body.id
    database.then(async(db) => {
   const regData=await db.collection('registerData').findOne({ _id: new mongodb.ObjectId(findId) })
 const logData= await db.collection('loginData').findOne({ regId: new mongodb.ObjectId(findId) })
    console.log(regData);
        console.log(logData);
            res.json({regData,logData})
            })
    })


app.post('/updateTeachers',async(req,res)=>{
    let teacherId=req.body.id
    let regData = {
        name: req.body.names,
        dob: req.body.dobs,
        gender: req.body.genders,
        qualification: req.body.qualifications,
        address: req.body.addresss,
        phone: req.body.phnos,

    }

    let logData = {
        email: req.body.emails,
       
    }
    try {
        const db = await database
        const regResult = await db.collection('registerData')
        .updateOne({_id:new mongodb.ObjectId(teacherId)},{$set:regData})

        await db.collection('loginData')
        .updateOne({regId:new mongodb.ObjectId(teacherId)},{$set:logData})
        res.json("success")

    } catch (err) {
        console.error(err)
    }
})

app.listen(5000)