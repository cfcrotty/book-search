const router = require("express").Router();
const bookRoutes = require("./books");
const savedRoutes = require("./saved");

// Book routes
router.use("/books", bookRoutes);
router.use("/saved", savedRoutes);

module.exports = router;
