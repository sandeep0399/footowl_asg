const db = require("../db") 

//get all book request
const getBorrowReq = async (req,res) =>{
    try {
        const data = await db.query("SELECT * FROM borrow_requests")
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


//update a book-request  approved
const approveReq = async (req,res)=>{ 
    try {
        const Id = req.params.id
        if(!Id){
            return res.status(404).send({message:"invalid or provide the user ID"})
        }
        const data = db.query(`UPDATE borrow_requests SET borrow_requests.status = "approved"WHERE id =?`,[Id])
        const  data1=  db.query(`SELECT * FROM borrow_requests WHERE id=?`,[Id])
        res.status(201).send({message:"book request is approved",
            data:data1[0]
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"error in book-request-approve  api",
            error
        })
    }
}
    //update a book-request denied
    const deniedReq = async (req,res)=>{ 
        try {
            const Id = req.params.id
            if(!Id){
                return res.status(404).send({message:"invalid or provide the user ID"})
            }
            const data = db.query(`UPDATE borrow_requests SET borrow_requests.status = "denied"WHERE id =?`,[Id])
            const  data1= db.query(`SELECT * FROM borrow_requests WHERE id=?`,[Id])
            res.status(201).send({message:"book request is denied",
                data:data1[0]
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).send({message:"error in book-request-denie  api",
                error
            })
        }
    }
    
    //submit borrow request 

    const borrowRes = async(req,res) => {
        try {
            const {user_id, bookId, startDate, endDate } = req.body;
            if(!user_id||!bookId || !startDate || !endDate){
                return res.status(404).send({message:"invalid or provide the user details"})
            }
            const data= db.query(`INSERT INTO borrow_requests (user_id, book_id, start_date, end_date, status) VALUES (?, ?, ?,?, "pending")`,[user_id,bookId,startDate,endDate])
                if(!data){
                    return res.status(404).send({message:" error in insert query"})
                }
                res.status(201).send({message:"borrow Request is created",
                    data:data[0]
                })
            
        } catch (error) {
            console.log(error)
            res.status(500).send({message:"error in borrow request api",
                error
            })
        }

    }


module.exports ={getBorrowReq,approveReq,deniedReq,borrowRes}