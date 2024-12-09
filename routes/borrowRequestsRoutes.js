const express= require("express") 
const { getBorrowReq, approveReq, deniedReq } = require("../controllers/borrowRequests.Controllers")
const { authenticateJWT } = require("../middleware/jwt")
const librarianOnly = require("../middleware/librarianonly")


const router = express.Router()  


//routes


//get all book borrow requests GET /api/borrow-requests
router.get("/",authenticateJWT,librarianOnly,getBorrowReq)

//apporve a borrow requests
router.put("/:id/approved",authenticateJWT,librarianOnly,approveReq)

//denie a borrow requests
router.put('/:id/denied',authenticateJWT,librarianOnly,deniedReq)




module.exports = router