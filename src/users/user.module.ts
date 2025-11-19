import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    // 👇 Tohle je klíčová část – tím vznikne "UserModel" pro InjectModel
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // aby ho mohl používat AuthModule
})
export class UsersModule {}
