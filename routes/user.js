const router = require("express").Router(),
  getUser = require("../controller/user/getUser"),
  userEdit = require("../controller/user/userEdit");

router.put("/userEdit", userEdit, async (req, res) => {});
router.post("/getUser", async (req, res) => {
  const user = await findUser(req.body.user);
  res.json(user[0]);
});
router.post("/users/:id/", getUser, async (req, res) => {});
module.exports = router;
