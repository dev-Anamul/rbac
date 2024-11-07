// permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';
// import { Resource } from '../enums/resources.enum';

// export const Permissions = (action: string, resource: Resource) =>
//   SetMetadata('permissions', `${action}:${resource}`);

export const Resource = (resource: string) => SetMetadata('resource', resource);
export const Action = (action: string) => SetMetadata('action', action);
export const Attributes = (...attributes: string[]) =>
  SetMetadata('attributes', attributes);
