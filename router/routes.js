let router = require('express').Router();
const Cryptr = require('cryptr');
var cryptr = new Cryptr("Employee")

router.get('/api',function(req,res){
    res.json({
        status : 'API Works',
        message : 'Welcome to User Signin/Signup API'
    });
});



router.post('/signin',(req,res) => {
    user_Signup.findOne({ email : req.body.email }, function(err,user){
        
        if (user === null) {
            return res.status(400).send({
                message : "The given User cannot be found."
            })
        }
        else {
            var dec = cryptr.decrypt(user.password);
//             console.log(req.body.password);
//             console.log(req.body.password);
            var enc = cryptr.encrypt(req.body.Password);
            //  var dec = cryptr.decrypt(enc);
            user.save(function (err){
            if (req.body.Password === dec) {
                return res.status(201).send({
                    message : "Signin Successfully",
                    data: {
                        
                        Empname  : req.body.Empname,
                        Empemail     : req.body.Empemail,
                        mobile    : req.body.mobile,
                        Password  : enc
                    }
                })
            }
            else {
                return res.status(400).send({
                    message : "Password incorrect"
                });
            }
        })
        }
        
    })    
    
});
const emailCount = require('../model/models.js');

    
    const user_Signup = require('../model/models.js');
    router.post('/register', async (req, res) => {
        var cryptr = new Cryptr('Employee');
        var enc = cryptr.encrypt(req.body.Password);
        var dec = cryptr.decrypt(enc);
    
        var user = new user_Signup();
        user.Empname = req.body.Empname;
        user.Empid = req.body.Empid;
    user.Empemail = req.body.Empemail;
    user.EmpContactNo = req.body.EmpContactNo;
    user.AddressLine1 = req.body.AddressLine1;
    user.AddressLine2 = req.body.AddressLine2;
    user.Pincode = req.body.Pincode;
    user.City = req.body.City;
    user.State = req.body.State;
    user.BankName = req.body.BankName;
    user.Ifsc = req.body.Ifsc;
    user.AccountNo = req.body.AccountNo;
    user.BankBranch = req.body.BankBranch;
    user.Salary = req.body.Salary;
    user.Password = req.body.Password;
    
        try {
            await user.save();
            res.status(200).json({
                message: 'New user signed up',
                data: {
                    Empname    : req.body.Empname,
                    Empid        : req.body.Empid,
                    EmpContactNo : req.body.EmpContactNo,
                    Empemail     : req.body.Empemail,
                    AddressLine1 : req.body.AddressLine1,
                    AddressLine2 : req.body.AddressLine2,
                    Pincode      : req.body.Pincode,
                    City         : req.body.City,
                    State        : req.body.State,
                    BankName     : req.body.BankName,
                    Ifsc         : req.body.Ifsc,
                    AccountNo    : req.body.AccountNo,
                    BankBranch   : req.body.BankBranch,
                    Salary       : req.body.Salary,   
                   Password : req.body.Password,
                },
            });
        } catch (err) {
            res.status(400).json({
                message: 'User already signed up with this Email',
                error: err.message, // Optionally include the error message for debugging
            });
        }
    });
var Controller = require('../controller/controller.js');
router.route('/users')
.get(Controller.index)

router.route('/users/:email')
.get(Controller.view)
.patch(Controller.update)
.put(Controller.update)
.delete(Controller.Delete);

module.exports = router;
