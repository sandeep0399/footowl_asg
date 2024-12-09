const db = require("../db");


const librarianOnly = async (req, res, next) => {

 try {
    const email =req.user.email
    const data= await db.query(`SELECT typerole FROM users WHERE email=?`,[email])
    const [{ typerole: a }] = data[0]
    if (a !== "librarian") {
      return res.status(403).json({ message: "Access denied. Librarian only." ,
      });
      
    }
    
    next(); // Proceed to the next middleware or route handler
    
 } catch (error) {
    

    console.log(error)
    res.status(500).send({message:"error in librarian middleware",
        error
    })
 }

   
  };
  
  module.exports = librarianOnly;
  