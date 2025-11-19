import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/signup (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'e2e@example.com',
        password: 'secret123',
        name: 'E2E User',
      })
      .expect(201);

    expect(res.body.accessToken).toBeDefined();
  });

  it('/auth/signin (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'e2e@example.com',
        password: 'secret123',
      })
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
  });
});
