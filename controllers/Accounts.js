const { PrismaClient } = require('@prisma/client');
const  prisma = new PrismaClient();

const createAccount = async (req, res) => {
  try {
    const { user_id, bank_name, bank_account_number, balance } = req.body;

    // if (error) return res.status(400).json({ success: false, message: error.message, data: null });

    const account = await prisma.bank_Accounts.create({
      data: {
        bank_name,
        bank_account_number,
        balance,
        userId: {
          connect: {
            id: user_id,
          },
        },
      },
    });

    res.status(201).json({ success: true, message: 'Created', data: account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccounts = async (req, res) => {
  try {
    const accounts = await prisma.bank_Accounts.findMany({
      select: {
        id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({ success: true, message: 'OK', data: accounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const account = await prisma.bank_Accounts.findUnique({
      where: {
        id: id,
      },
      include: {
        userId: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!account) return res.status(404).json({ success: false, message: 'Not Found', data: null });

    const sendTransactions = await prisma.transactions.findMany({
      where: {
        source_account_id: account.id,
      },
    });
    const reciveTransactions = await prisma.transactions.findMany({
      where: {
        destination_account_id: account.id,
      },
      select: {
        amount: true,
        source_account_id: true,
        destination_account_id: true,
      },
    });
    account.history = {
      sender: [...sendTransactions],
      recive: [...reciveTransactions],
    };
    account.user = account.userId;

    delete account.userId;

    if (!account) return res.status(404).json({ success: false, message: 'Not Found', data: null });

    res.status(200).json({ success: true, message: 'OK', data: account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
};