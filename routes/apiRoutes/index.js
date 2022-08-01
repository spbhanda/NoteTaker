const express = require("express");
const router = express.Router();
const notesRoutes = require("../apiRoutes/notesRoutes");

router.use(notesRoutes);

module.exports = router;
