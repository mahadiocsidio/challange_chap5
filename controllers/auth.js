const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

const register = async (req,res) =>{
    const {name, email, password, identity_type, identity_number, address} = req.body
    try {
        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password,10),
                profile: {
                    create: {
                      identity_type,
                      identity_number,
                      address,
                    },
                  },
            },
        });
        res.status(201).json({success : true, message : 'User Created', data:user});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await prisma.users.findUnique({
            where: {
                email:email,
            },select:{
                id:true,
                name:true,
                email:true,
                password:true,
                profile:true
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const checkPassword = bcrypt.compareSync(password,user.password)
        if(!checkPassword){
            return res.status(401).json({ message: 'Password is wrong' });
        }
        const token = jwt.sign({id:user.id,name:user.name,email:user.email},process.env.JWT_SECRET)
        res.status(200).json({success : true, message : 'User Login', data:{token:token}});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const authenticate = async (req,res)=>{
    const {token} = req.headers
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const user = await prisma.users.findUnique({
            where: {
                id:decode.id,
            },select:{
                id:true,
                name:true,
                email:true,
                profile:true
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({success : true, message : 'User Login', data:user});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}