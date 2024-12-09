const db = require("../db")

//get all users 
const getAllUsers = async (req,res) =>{
    try {
        const data = await db.query("SELECT * FROM users")
        if(!data){
            return res.status(400).send({message:"no records"})


        }
        res.status(200).send({message:"all user data",
            data:data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"error in get all user api",
            error
        })
        
    }

} 

// get by id
const getById = async (req,res)=>{ 

    try {
        const userId = req.params.id
        if(!userId){
            return res.status(404).send({message:"invalid or provide the user ID"})
        }
        const data = await db.query(`SELECT * FROM users WHERE id =?`,[userId])
        if(!data){
            return res.status(404).send({message:" no user found with this ID"})
        }
        res.status(200).send({message:"user with id is",
            data:data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"error in get by ID api",
            error
        })
    }

}
//create a user 
const createUser= async (req,res)=>{ 
    try {
        const {email,password,typerole}=req.body
        if(!email || !password || !typerole){
            return res.status(404).send({message:"invalid or provide the user details"})
        }
        const data= db.query(`INSERT INTO users (email,password,typerole) VALUES (?,?,?)`,[email,password,typerole])
            if(!data){
                return res.status(404).send({message:" error in insert query"})
            }
            res.status(201).send({message:"user is created",
                data:data[0]
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"error in create a user api",
            error
        })
    }
 
}


module.exports ={getAllUsers , getById,createUser}