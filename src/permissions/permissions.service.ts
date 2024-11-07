import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const createdPermission = new this.permissionModel(createPermissionDto);
    return createdPermission.save();
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }

  async findById(id: string) {
    return this.permissionModel.findById(id).exec();
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionModel
      .findByIdAndUpdate(id, updatePermissionDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.permissionModel.findByIdAndDelete(id).exec();
  }
}
