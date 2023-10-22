const jwt = require('jsonwebtoken')

const tokenVerify = (req,res)=>{
    try {
        const header = req.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        console.log(token);
        if(!token){
            return res.status(401).json({ message: 'Token is required', data:null});
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        res.status(200).json({success : true, message : 'User Authenticated', data:decode});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports ={tokenVerify}