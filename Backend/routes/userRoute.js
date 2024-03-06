const router = require('express').Router();
const userCtrl = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');


router.route("/").get(protect,userCtrl.allUsers);
router.route("/").post(userCtrl.register);
router.route("/login").post(userCtrl.Login);
// router.get('/',protect,userCtrl.allUsers);
// router.post("/",userCtrl.register);
// router.post("/login", userCtrl.Login);


module.exports = router;