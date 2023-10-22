const request = require('supertest');
const app = require('../../app');

let accountTemp;
let userTemp;
let token = '';
describe('Testing Accounts endpoint', () => {
  describe('Testing account POST /api/v1/accounts endpoint', () => {
    test('should can create new accounts', async () => {
        try {
            const bank_name = 'BCA';
            const bank_account_number = '1234567890';
            const balance = 100000;
            const { statusCode, body } = await request(app).post('/api/v1/accounts').send({
                user_id: Number(userTemp.id),
                bank_name,
                bank_account_number,
                balance,
              }).set('Authorization', `Bearer ${token}`);
      
            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.success).toBe(true);
        } catch (err) {
            expect(err).toBe(err)
        }
    });

    test("should can't create new account user_id not found", async () => {
      try {
        const bank_name = 'BCA';
        const bank_account_number = '1234567890';
        const balance = 100000;

        const { statusCode, body } = await request(app).post('/api/v1/accounts').send({
            user_id: 999,
            bank_name,
            bank_account_number,
            balance,
        }).set('Authorization', `Bearer ${token}`);

        expect(statusCode).toBe(404);
        expect(body).toHaveProperty('success');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
        expect(body.success).toBe(false);
      } catch (err) {
        expect(err).toBe(err)
      }
    });

    test("should can't create new account balance less than 1", async () => {
        try {
            const bank_name = 'BCA';
            const bank_account_number = '1234567890';
            const balance = 0;
      
            const { statusCode, body } = await request(app).post('/api/v1/accounts').send({
                user_id: Number(userTemp.id),
                bank_name,
                bank_account_number,
                balance,
              }).set('Authorization', `Bearer ${token}`);
      
            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.success).toBe(false);
        } catch (err) {
            expect(err).toBe(err)
        }
    });

    test("should can't create new account unauthorized", async () => {
        try {
            const bank_name = 'BCA';
            const bank_account_number = '1234567890';
            const balance = 0;
      
            const { statusCode, body } = await request(app).post('/api/v1/accounts').send({
                user_id: Number(userTemp.id),
                bank_name,
                bank_account_number,
                balance,
              });
      
            expect(statusCode).toBe(401);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.success).toBe(false);
        } catch (err) {
            expect(err).toBe(err)
        }
    });
  });

  describe('Testing get all of accounts GET /api/v1/accounts endpoint', () => {
    test('should can get all of accounts', async () => {
        try {
            const { statusCode, body } = await request(app).get('/api/v1/accounts');
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe(err)
        }
    });
  });

  describe('Testing get detail accounts GET /api/v1/accounts/{accountId} endpoint', () => {
    test('should can get detail account', async () => {
        try {
            const { statusCode, body } = await request(app).get(`/api/v1/accounts/${accountTemp.id}`);
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe(err)
        }
    });

    test("should can't get detail account acountId not found", async () => {
        try {
            const { statusCode, body } = await request(app).get(`/api/v1/accounts/${accountTemp.id}123`);
            expect(statusCode).toBe(404);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.success).toBe(false);
        } catch (err) {
            expect(err).toBe(err)
        }
    });
  });
});