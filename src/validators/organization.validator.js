const { body } = require("express-validator")

exports.createOrgValidator = [
    body("name").notEmpty(),
    body("type").isIn(["business", "school", "hospital", "ngo"])
]