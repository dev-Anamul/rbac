import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from 'src/permissions/permissions.service';
import { RolesService, Root } from 'src/roles/roles.service';

@Injectable()
export class DynamicRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resource = this.reflector.get<string>('resource', context.getClass());
    const action = this.reflector.get<string>('action', context.getHandler());
    const requiredAttributes = this.reflector.get<string[]>(
      'attributes',
      context.getHandler(),
    );

    // if (!user) {
    //   throw new ForbiddenException('User not authenticated');
    // }

    // Fetch user role from database
    const role = (
      await this.rolesService.findById(
        // user.role,
        '672c8be25c11036e3235496e',
      )
    )?.[0] as unknown as Root;

    console.log(role, action, resource, requiredAttributes);

    // Check for permission in role's permissions
    const hasPermission = role.permissions.some(
      (permission) =>
        permission['resource'] === resource && permission['action'] === action,
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    // // Check attribute requirements
    // const hasAttributes = requiredAttributes.every((attr) =>
    //   role.attributes.includes(attr),
    // );

    // if (!hasAttributes) {
    //   throw new ForbiddenException('Insufficient attributes for this action');
    // }

    return true;
  }
}
