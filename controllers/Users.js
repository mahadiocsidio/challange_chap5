const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await prisma.users.create({
            data: {
                name,
                email,
                password
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = await prisma.users.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                email,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.users.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
