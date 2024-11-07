import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from './entities/role.entity';

export interface Root {
  role: string;
  attributes: string[];
  permissions: Permission[];
}

export interface Permission {
  name: string;
  action: string;
  resource: string;
}

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const ObjectIdPermission = createRoleDto.permissions.map(
      (id) => new Types.ObjectId(id),
    );

    const createdRole = new this.roleModel({
      ...createRoleDto,
      permissions: ObjectIdPermission,
    });
    return createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    const aggregate = [
      { $unwind: { path: '$permissions' } },
      {
        $lookup: {
          from: 'permissions',
          localField: 'permissions',
          foreignField: '_id',
          as: 'per',
        },
      },
      { $unwind: { path: '$per' } },
      {
        $group: {
          _id: '$_id',
          role: { $first: '$name' },
          attributes: { $first: '$attributes' },
          permissions: { $push: '$per' },
        },
      },
    ];

    return this.roleModel.aggregate(aggregate);
  }

  async findById(id: string) {
    const aggregate = [
      { $match: { _id: new Types.ObjectId(id) } },
      { $unwind: { path: '$permissions' } },
      {
        $lookup: {
          from: 'permissions',
          localField: 'permissions',
          foreignField: '_id',
          as: 'per',
        },
      },
      { $unwind: { path: '$per' } },
      {
        $group: {
          _id: '$_id',
          role: { $first: '$name' },
          attributes: { $first: '$attributes' },
          permissions: { $push: '$per' },
        },
      },
    ];

    return this.roleModel.aggregate(aggregate);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .populate('permissions')
      .exec();
  }

  async delete(id: string): Promise<Role> {
    return this.roleModel.findByIdAndDelete(id).exec();
  }
}
