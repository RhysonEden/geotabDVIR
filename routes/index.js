const apiRouter = require("express").Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const geoTab = require("./geotab");
apiRouter.use("/geotab", geoTab);

module.exports = apiRouter;
