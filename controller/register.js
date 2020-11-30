const User = require("./models/users");
export const register = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body.password = req.body.password2 = await bcrypt.hash(
      req.body.password,
      10
    );
    const register = new User({
      username: req.body.username.toLowerCase(),
      password: req.body.password,
      email: req.body.email,
    });
    await register.save((err) => {
      if (err != null) {
        if (err.errors.hasOwnProperty("username")) {
          return res.status(400).send({
            message: `'${err.errors.username.value}' is already taken`,
          });
        } else if (err.errors.hasOwnProperty("email")) {
          return res.status(400).send({
            message: `'${err.errors.email.value}' is already taken`,
          });
        }
      } else {
        res.send(register);
      }
    });
    const inter = new Interaction({ user: register._id });
    await inter.save();
}