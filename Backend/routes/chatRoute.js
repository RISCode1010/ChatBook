const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const chatCtrl = require("../controllers/chatController");

// router.post("/", auth, chatCtrl.accessChat);
// router.get("/", auth, chatCtrl.fetchChats);
// router.post("/group", auth, chatCtrl.createGroupChat);
// router.put("/rename", auth, chatCtrl.renameGroup);
// router.put("/groupremove", auth, chatCtrl.removeFromGroup);
// router.put("/groupadd", auth, chatCtrl.addToGroup);


router.route("/").post(protect,chatCtrl.accessChat);
router.route("/").get(protect,chatCtrl.fetchChats);
router.route("/group").post(protect,chatCtrl.createGroupChat);
router.route("/rename").put(protect,chatCtrl.renameGroup);
router.route("/groupremove").put(protect,chatCtrl.removeFromGroup);
router.route("/groupadd").put(protect,chatCtrl.addToGroup);

module.exports = router;