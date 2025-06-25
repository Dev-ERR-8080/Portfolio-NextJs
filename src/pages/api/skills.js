import pool from "../../lib/db";

export default async function handler(req,res) {
    if(req.method=="GET"){
        try{
            const result=await pool.query("select * from technical_skills");
            res.status(200).json(result.rows);
        }catch(error){
            console.log("databse query error: ",error);
            res.status(500).json({error:"Database query failed","details":error.message});

        }
    }else{
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}