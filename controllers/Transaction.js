const prisma = require('@prisma/client');

const createTransaction = async (req, res) => {
  try {
    const { amount, source_account_id, destination_account_id } = req.body;

    if (error) return res.status(400).json({ success: false, message: error.message, data: null });

    const sourceAccount = await prisma.bank_Accounts.findUnique({
      where: {
        id: source_account_id,
      },
    });

    if (!sourceAccount) return res.status(404).json({ success: false, message: 'Source account is not found', data: null });

    const destinationAccount = await prisma.bank_Accounts.findUnique({
      where: {
        id: destination_account_id,
      },
    });

    if (!destinationAccount) return res.status(404).json({ success: false, message: 'Destination account is not found', data: null });

    // validasi apakah saldo cukup
    if (sourceAccount.balance < value.amount) return res.status(400).json({ success: false, message: 'Balance less than amount', data: null });

    // kurangi saldo pengirim
    await prisma.bank_Accounts.update({
      where: {
        id: sourceAccount.id,
      },
      data: {
        balance: Number(sourceAccount.balance) - value.amount,
      },
    });

    // tambahkan saldo penerima
    await prisma.bank_Accounts.update({
      where: {
        id: destinationAccount.id,
      },
      data: {
        balance: Number(destinationAccount.balance) + value.amount,
      },
    });

    // jika berhasil tambahkan data pada tabel transaction
    const transaction = await prisma.transactions.create({
      data: {
        amount,
        source_account_id,
        destination_account_id,
      },
    });

    res.status(201).json({ success: true, message: 'Created', data: transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await prisma.transactions.findMany();

    res.status(200).json({ success: true, message: 'OK ', data: transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await prisma.transactions.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        destinationAccountId: {
          select: {
            user_id: true,
            userId: {
              select: {
                name: true,
              },
            },
            bank_name: true,
          },
        },
        sourceAccountId: {
          select: {
            user_id: true,
            userId: {
              select: {
                name: true,
              },
            },
            bank_name: true,
          },
        },
      },
    });

    if (!transaction) return res.status(404).json({ success: false, message: 'Not Found', data: null });
    transaction.source_account_detail = {
      user_id: transaction.sourceAccountId.user_id,
      ...transaction.sourceAccountId.userId,
      bank_name: transaction.sourceAccountId.bank_name,
    };

    transaction.destination_account_detail = {
      user_id: transaction.destinationAccountId.user_id,
      ...transaction.destinationAccountId.userId,
      bank_name: transaction.destinationAccountId.bank_name,
    };

    delete transaction.sourceAccountId;
    delete transaction.destinationAccountId;

    res.status(200).json({ success: true, message: 'OK ', data: transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
};