const router = require("express").Router(),
  register = require("../controller/userAuth/register"),
  login = require("../controller/userAuth/login"),
  verify = require("../controller/userAuth/verify");
  
router.post("/register", register, async (req, res) => {});
router.post("/login", login, async (req, res) => {});
router.post("/verify", verify, async (req, res) => {});
module.exports = router;