const jwt = require("jsonwebtoken");
function authenticateAdmin(req,res,next){
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({error:"No token provided"})
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if (err||decoded.role!=="admin"){
            return res.status(403).json({error:"Forbidden"});
        }
        req.user = decoded;
        next();
    });
}
module.exports = authenticateAdmin