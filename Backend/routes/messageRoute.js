const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const msgCtrl = require("../controllers/messageController");

// router.get('/:chatId', auth, msgCtrl.allMessages);
// router.post('/', auth, msgCtrl.sendMessage);

router.route("/:chatId").get(protect,msgCtrl.allMessages);
router.route("/").post(protect,msgCtrl.sendMessage);

module.exports = router;