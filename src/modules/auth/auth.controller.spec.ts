import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { AuthController } from './auth.ctrl';
import { JwtAuthGuard } from './jwt.guard';
describe('AuthController', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  // UseGuards test
  it('should ensure the JwtAuthGuard is applied to the test method', async () => {
    const guards = Reflect.getMetadata(
      '__guards__',
      AuthController.prototype.test,
    );
    const guard = new guards[0]();
    expect(guard).toBeInstanceOf(JwtAuthGuard);
  });
  //login
});
