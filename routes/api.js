const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const usersSchemaModel = require('../models/users-schema');
const statesSchemaModel = require('../models/states-schema');
const citiesSchemaModel = require('../models/cities-schema');
const examSchemaModel = require('../models/exam-schema');
const examConfigModel = require('../models/exam-config-schema');
const examRegisterModel = require('../models/regrequests-schema');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var fs = require('fs');
require('../config/passport')(passport);
const LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
const DIR = './uploads/';

const date = new Date();
const storage = multer.diskStorage({
      destination: function (req, file, next) {
        next(null, DIR);
      },
      filename: function (req, file, cb) {
       // cb(null, new Date().toDateString + file.originalname);
       cb(null, Date.now()+'-'+file.originalname);
      }
    });

const upload = multer({storage:storage}).single('photo');
/*const upload = multer({
    storage: storage, fileFilter: (req, file, next) => {
      next(null, true);
    }, limits: { fileSize: 15 * 1000000 }
  }).single('xlsxUpload');*/

mongoose.Promise = global.Promise;
mongoose.connect(db.database, (err) => {
    if (err) {
        res.json(err);
    } else {
        console.log('Database Connected Successfully');
    }
});

router.post('/createToken', function (req, res) {
    const user = {
        id: 1,
        name: 'Sami',
        email: 'sami@gmail.com'
    }
    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({ token: token });
    });
});

router.post('/uploadPicture',upload,function (req, res, next) {
    usersSchemaModel.findOne({
        _id: req.body.userid
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {

            // Check if file is exist in file location and delete old file
            try { 
                if (fs.existsSync(user.profilePicture)) {
                    fs.unlinkSync(user.profilePicture);
                    console.log('File deleted!');
                }
              } catch(err) {
                console.error(err)
              }

           var usersSchema= new usersSchemaModel();
           usersSchema = user;
           usersSchema.profilePicture = 'uploads/' + req.file.filename;
           usersSchema.save(function (errs, data) {
                if (errs) {
                    console.log(errs);
                    res.json(errs);
                } else {
                   // var returnUser =  userData(userData);
                    upload(req, res, function (err) {
                        if (err) {
                          // An error occurred when uploading
                          console.log(err);
                          return res.status(422).send("an Error occured")
                        }  
                       // No error occured.
                       var userData = {
                            email : data.email,
                            name : data.name,
                            type : data.type,
                            profilePicture : data.profilePicture,
                            _id : data._id
                         }
                       res.json(userData);
                     });
                    
                }
            });
        }
        
    });
     
});

router.get('/getUser/:id',function (req, res, next) {
    
    usersSchemaModel.findOne({
        _id:  req.params.id
    }, function (err, user) {
         if (err) throw err;
         if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            res.json(userData(user));
        }
    });

});

// Get All Users
router.get('/getusers', verifyToken, function (req, res) {
    jwt.verify(req.token, db.secret, function (err, authData) {
        if (err) {
            return res.status(403).send({ success: false, msg: 'Unauthorized.' });
        } else {
            usersSchemaModel.find({}).exec(function (err, users) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    let usersList = [];
                    users.forEach(itm => {
                        usersList.push(userData(itm));
                    });
                    res.json(usersList);
                }
            });
        }
    });

});

//Delete users
router.delete('/user/delete/:id', verifyToken, function (req, res) {

    jwt.verify(req.token, db.secret, function (err, authData) {
        if (err) {
            return res.status(403).send({ success: false, msg: 'Unauthorized.' });
        } else {
            usersSchemaModel.findByIdAndRemove(req.params.id, function (remErr, userDeleted) {
                if (remErr) {
                    console.log(remErr);
                } else {
                    res.json(userDeleted);
                }
            });
        }
    });

});
//get States
router.get('/states', verifyToken, function (req, res) {
    jwt.verify(req.token, db.secret, function (err, authData) {
        if (err) {
            return res.status(403).send({ success: false, msg: 'Unauthorized.' });
        } else {
            statesSchemaModel.find({}).exec(function (err, users) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    res.json(users);
                }
            });
        }
    });

});
//get Cities
router.get('/cities/:id', verifyToken, function (req, res) {
    jwt.verify(req.token, db.secret, function (err, authData) {
        if (err) {
            return res.status(403).send({ success: false, msg: 'Unauthorized.' });
        } else {
            citiesSchemaModel.find({ "state_id": req.params.id }).exec(function (err, users) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    res.json(users);
                }
            });
        }
    });

});
//get exams
router.get('/exams', verifyToken, function (req, res) {
    jwt.verify(req.token, db.secret, function (err, authData) {
        if (err) {
            return res.status(403).send({ success: false, msg: 'Unauthorized.' });
        } else {
            examSchemaModel.find({}).exec(function (err, exams) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    res.json(exams);
                }
            });
        }
    });

});
//get examconfig
router.get('/get/examconfig', verifyToken, function (req, res) {
    jwt.verify(req.token, db.secret, function (err, authData) {
        if (err) {
            return res.status(403).send({ success: false, msg: 'Unauthorized.' });
        } else {
            examConfigModel.find({}).exec(function (err, config) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    res.json(config);
                }
            });
        }
    });

});

//Save exam config
router.post('/examconfig', (req, res) => {
    const examConfig = new examConfigModel();
    examConfig.stateid = req.body.stateid;
    examConfig.cityid = req.body.cityid;
    examConfig.examcode = req.body.examcode;
    examConfig.seatlimit = req.body.seatlimit;
    examConfig.remaining = req.body.remaining;
    examConfig.save(function (err, config) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            res.json(config);
        }
    });
});
//Delete examconfig
router.delete('/delete/examconfig/:id', function (req, res) {
    examConfigModel.findByIdAndRemove(req.params.id, function (err, deletedExamConfig) {
        if (err) {
            console.log(err);
        } else {
            res.json(deletedExamConfig);
        }
    });
});
//Register exam
router.post('/exam/register', (req, res) => {
    examConfigModel.findOne({
        examcode: req.body.exam
    }, function (err, result) {
        if (err) {
            return res.json(err);
        } else {
            if (result) {
                if (result.remaining > 0) {
                    const examModel = new examRegisterModel();
                    const today = new Date();
                    examModel.userid = req.body.userid;
                    examModel.stateid = req.body.stateid;
                    examModel.cityid = req.body.cityid;
                    examModel.exam_code = req.body.exam;
                    examModel.father_name = req.body.father_name;
                    examModel.last_name = req.body.last_name;
                    examModel.mobileno = req.body.mobileno;
                    examModel.city = req.body.city;
                    examModel.street = req.body.street;
                    examModel.address = req.body.address;
                    examModel.zipcode = req.body.zipcode;
                    examModel.regdate = today;
                    examModel.examdate = "---";
                    examModel.status = "Exam Registered";
                    examModel.totalscore = "---";
                    checkDuplicate(examRegisterModel, res, result, req, examModel);
                } else {
                    return res.json({ reg: "failed", message: "No seat available.", errorCode: 7012 });
                }
            } else {
                return res.json({ reg: "failed", message: "No seat available.", errorCode: 7012 });
            }
        }

    });
});

router.put('/update/request/:id', (req, res) => {
    examRegisterModel.findByIdAndUpdate(req.params.id, {
        $set: {
            examdate: req.body.examDate,
            totalscore: req.body.totalScore,
            status: req.body.examstatus
        }
    },
        {
            new: true
        },
        function (err, updatedReqModel) {
            if (err) {
                res.json(err);
            } else {
                res.json({ entry: 'Updated' });
            }
        });
});

function registerExam(examModel, result, res) {
    examModel.save(function (err, config) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            if (result != null) {
                const remCount = result.remaining - 1;
                updateConfigCollection(examConfigModel, remCount, result, res);
            } else {
                return res.json({ reg: 'success', errorCode: "" });
            }

        }
    });
}

function checkDuplicate(examRegisterModel, res, result, req, examModel) {
    var examRegister = examRegisterModel.find({ userid: req.body.userid }).exec();
    examRegister.then(function (user) {
        if (!user) {
            registerExam(examModel, result, res);
        } else {
            var duplicate = false;
            user.map(userData => {
                if (userData.exam_code == req.body.exam) {
                    duplicate = true;
                }
            });
            if (!duplicate) {
                registerExam(examModel, result, res);
            } else {
                res.json({ reg: 'failed', message: "Already Registered", errorCode: "6001" });
            }
        }

    });
    examRegister.then(null, function (err) {
        console.log('Service Failed');
    });
}
function updateConfigCollection(examConfigModel, remCount, result, res) {
    examConfigModel.findByIdAndUpdate(result._id, {
        $set: { remaining: remCount }
    },
        {
            new: true
        },
        function (err, updatedExamConfig) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json({ config: 'success' });
            }
        });
}
//Get Exam request to disable config
router.get('/examConfig/restrict', verifyToken, function (req, res) {
    jwt.verify(req.token, db.secret, function (err, authData) {
        if (err) {
            return res.status(403).send({ success: false, msg: 'Unauthorized.' });
        } else {
            examRegisterModel.find({}).exec(function (err, result) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    const getexamCode = []
                    result.map(reqItem => {
                        getexamCode.push(reqItem.exam_code);
                    });
                    let unique_array = getexamCode.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    });
                    res.json(unique_array);
                }
            });
        }
    });

});
//Get Exam request
router.get('/exam/requests', verifyToken, async function (req, res) {
    jwt.verify(req.token, db.secret, async function (err, authData) {
        if (err) {
            res.status(403).send({ success: false, msg: 'Unauthorized.' });
        } else {
            try {
                const examRegModel = await examRegisterModel.find({});
                res.json(examRegModel);
            } catch (err) {
                res.json(err);
            }
        }
    });

});
//Delete exam request
router.delete('/requests/delete/:id', async function (req, res) {
    try {
        const examRegModel = await examRegisterModel.findById({ _id: req.params.id });
        const examConfigMod = await examConfigModel.findOne({ examcode: examRegModel.exam_code });
        const remCount = examConfigMod.remaining + 1;
        const examRegModelRemove = await examRegisterModel.findByIdAndRemove(req.params.id);
        updateConfigCollection(examConfigModel, remCount, examRegModelRemove, res);
    } catch (err) {
        res.json(err);
    }
});
//get register exams request by users
router.get('/requests/get/exams/:id', async function (req, res) {
    try {
        const examRegModel = await examRegisterModel.find({ userid: req.params.id });
        await examRegModel.map(async function (examRegItem) {
            const examModel = await examSchemaModel.find({ id: examRegItem.exam_code });
            examRegItem.examType = examModel.type;
        });
        res.json(examRegModel);

    } catch (err) {
        res.json(err);
    }
});
//Post
router.post('/signup', (req, res) => {
    const newUser = new usersSchemaModel();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.type = req.body.type;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
                console.log('Failed to Convert');
            } else {
                console.log('Convert Succefully');
                newUser.password = hash;
                newUser.save(function (err, user) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json("User Added Sucessfully");
                    }
                });
            }
        });
    });
});

router.post('/signin', function (req, res) {
    usersSchemaModel.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), db.secret);
                   // var token = jwt.sign(user.toJSON(), db.secret,{expiresIn: '1h' }); with exipiry
                    // return the information including token as JSON
                    res.json({ success: true, token: token, user: userData(user) });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function userData(data){
    var userData = {
        email : data.email,
        name : data.name,
        type : data.type,
        profilePicture : data.profilePicture,
        _id : data._id
    }
    return userData;
}

function todaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

//export the router to main application file
module.exports = router;