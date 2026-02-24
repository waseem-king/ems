// this is the controller which will perform crud operation on users

const AppError = require("../middleware/appError");
const { userServices } = require("../services");


const asyncHandler = require("../utils/asyncHandler");

class UserController {
    createUser = asyncHandler(async (req, res) => {
        const data = req.body;
        const {user, token} = await userServices.createUser(data);
        if (!user) {
            throw new AppError("User could not be created", 400)
        }
        res.json({ status: "success", data: user , token:token})
    })
    findExistingUser = asyncHandler(async (req, res) => {
        const user = await userServices.findExistingUser(req.params.id)
        if (!user) {
            throw new AppError("User not found", 404)
        }
        res.json({ status: "success", data: user })
    })
    findAll = asyncHandler(async (req, res) => {

        const user = await userServices.findAll()
        if (!user) {
            throw new AppError("User not found", 404)
        }
        res.json({ status: "success", data: user })
    })
    findByEmail = asyncHandler(async (req, res) => {
        const email = req.query
        if (email) {
            const user = await userServices.findByEmail(email)
            if (!user) {
                throw new AppError("User not found", 404)
            }
            return res.json({ status: "success", data: user })
        }else{
             throw new AppError("Email not provided", 400)
        }
    })
    updateById = asyncHandler(async (req, res) => {
        const user = await userServices.findExistingUser(req.params.id)
        if (!user) {
            throw new AppError("User not found", 404)
        }
        const newUser = await userServices.updateById(req.params.id, req.body)
        if (!newUser) {
            throw new AppError("User not found", 404)
        }
        res.json({ status: "success", data: newUser })
    })
    deleteById = asyncHandler(async (req, res) => {
        const user = await userServices.findExistingUser(req.params.id)
        if (!user) {
            throw new AppError("User not found", 404)
        }
        const message = await userServices.deleteById(req.params.id)
        if (!message) {
            throw new AppError("User not found", 404)
        }
        res.json({ status: "success", data: message })
    })
}
module.exports = new UserController;