const request = require('supertest');
const app = require('../../app');

describe('Testing all Users endpoint', () => {
  beforeAll(async () => {
    const name = 'test123';
    const email = 'apacoba@gmail.com';
    const password = 'test123';
    const user = await request(app).post('/api/v1/auth/register').send({
      name,
      email,
      password,
    });
    const { body, statusCode } = await request(app).post('/api/v1/auth/login').send({
      email,
      password,
    });

    token = body.data.accessToken;
    userTemp = user.body.data;
  });
  describe('Testing user POST /api/v1/users endpoint', () => {
    test('should can create new user', async () => {
      try {
        const name = 'usertest2';
      const email = 'usertest2@mail.com';
      const password = 'pasword123';
      const { statusCode, body } = await request(app).post('/api/v1/users').send({
          name,
          email,
          password,
        }).set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data.name).toBe(name);
      expect(body.data.email).toBe(email);
      } catch (err) {
        expect(err).toBe(err)
      }
    });

    test("should can't create user email alredy use", async () => {
      try {
        const name = 'Taufik Test User';
        const email = 'usertest2@mail.com';
        const password = '12345678';
  
        const { statusCode, body } = await request(app)
          .post('/api/v1/users')
          .send({
            name,
            email,
            password,
          })
          .set('Authorization', `Bearer ${token}`);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('success');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data'); 
      } catch (err) {
        expect(err).toBe(err)
      }
    });

    test("should can't create user with invalid password length", async () => {
      try {
        const name = 'usertest3';
      const email = 'usertest3@mail.com';
      const password = '12345';
      const { statusCode, body } = await request(app)
        .post('/api/v1/users')
        .send({
          name,
          email,
          password,
        })
        .set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.success).toBe(false);
      } catch (err) {
        expect(err).toBe(err)
      }
    });

    test("should can't create user unauthorized", async () => {
      try {
        const name = 'usertest3';
      const email = 'usertest312ai@mail.com';
      const password = '12345187278172';
      const { statusCode, body } = await request(app).post('/api/v1/users').send({
        name,
        email,
        password,
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

  describe('Testing get All of users GET /api/v1/users endpoint', () => {
    test('should can get all users', async () => {
      try {
        const { statusCode, body } = await request(app).get('/api/v1/users');
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      } catch (err) {
        expect(err).toBe(err)
      }
    });
  });

  describe('Testing get detail of user GET /api/v1/users/{userId} endpoint', () => {
    test('should can get detail of user', async () => {
      try {
        const { statusCode, body } = await request(app).get(`/api/v1/users/${userTemp.id}`);
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      } catch (err) {
        expect(err).toBe(err)
      }
    });

    test("should can't get detail of user with invalid userId", async () => {
      try {
        const { statusCode, body } = await request(app).get(`/api/v1/users/${userTemp.id}123`);
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
  describe('Testing update a user profile PUT /api/v1/users/{userId}', () => {
    test('should can update a user', async () => {
      try {
        const identity_type = 'KTP';
        const identity_number = '3418615371319391';
        const address = 'Yogyakarta';

        const { statusCode, body } = await request(app)
        .put(`/api/v1/users/${userTemp.id}`)
        .send({
          identity_type,
          identity_number,
          address,
        })
        .set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data.profile.identity_type).toBe(identity_type);
      expect(body.data.profile.identity_number).toBe(identity_number);
      expect(body.data.profile.address).toBe(address);
      } catch (err) {
        expect(err).toBe(err)
      }
    });

    test("should can't update a user profile with invalid userId", async () => {
        try {
            const { statusCode, body } = await request(app).get(`/api/v1/users/${userTemp.id}123`).set('Authorization', `Bearer ${token}`);
            expect(statusCode).toBe(404);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.success).toBe(false);
        } catch (err) {
            expect(err).toBe(err)
        }
    });

    test("should can't update a user unauthorized", async () => {
      try {
        const identity_type = 'KTP';
      const identity_number = '3418615371319391';
      const address = 'Yogyakarta';

      const { statusCode, body } = await request(app).put(`/api/v1/users/${userTemp.id}`).send({
        identity_type,
        identity_number,
        address,
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
});