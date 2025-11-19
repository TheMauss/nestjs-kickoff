import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = new this.userModel({
      email: createUserDto.email,
      passwordHash: createUserDto.password, // POZOR: zatím bez hash je v authService
      name: createUserDto.name,
    });
    return created.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-passwordHash').exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-passwordHash').exec();
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-passwordHash')
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
