const db = require("../db") 

const borrowHistory= async(req,res)=>{


    try {
        const userId = req.params.id
        if(!userId){
            return res.status(404).send({message:"invalid or provide the user ID"})
        }
        const data = await db.query(`SELECT * FROM borrow_history left join  books on  borrow_history.book_id =books.id
 where user_id=?`,[userId])
        if(!data){
            return res.status(404).send({message:" no user found with this ID"})
        }
        res.status(200).send({message:`borrow history of the user_id with the ${userId}`,
            data:data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"error in get borrow history by ID API",
            error
        })
    }

}


module.exports ={ borrowHistory}