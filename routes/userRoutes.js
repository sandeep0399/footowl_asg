const express= require("express") 
const { getAllUsers, getById, createUser } = require("../controllers/userController")
const { borrowHistory } = require("../controllers/borrowHistoryController")
const basicAuth = require("../middleware/auth")


const { authenticateJWT } = require("../middleware/jwt");
const { borrowRes } = require("../controllers/borrowRequests.Controllers");


const router = express.Router()  

//routes 
//get all users
router.get('/list',authenticateJWT, getAllUsers)

// get the user by ID
router.get('/userid/:id',authenticateJWT, getById)

// create a user || post
router.post("/",createUser)

//user's borrow history.
router.get("/:id/history",authenticateJWT,borrowHistory)

//Submit a request to borrow a book
router.post("/request",borrowRes)


module.exports = router
