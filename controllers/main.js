
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login  = async (req,res)=>{
    const{Username,Password} = req.body
    

    //check in controller
    if(!Username || !Password){
        throw new CustomAPIError('Please provide username and passsword',400);
    }

    const id = new Date().getDate();

    //generating new token if both username and password is provided
     const token =  jwt.sign({ id, Username }, "process.env.JWT_SECRET", {
        expiresIn: '30d'});
        console.log(token)
     res.status(200).json({message:"User created",token});
    
}

const dashBoard = async(req,res)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new CustomAPIError('No token provided',401);
    }

    const token = authHeader.split(" ")[1];
    

    try{
        const decoded = jwt.verify(token,"process.env.JWT_SECRET");
        const luckyNumber = Math.floor(Math.random()*100);
            res.status(200).json({
                message:`Hello ${decoded.Username}` , 
                secret:`Here is your authorized data, your lucky number is ${luckyNumber}`
            })
       
        
    }catch(error){
        throw new CustomAPIError("Not authorized to access this route",401)
    }

}

module.exports = {
    login,dashBoard
}