import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Permission, RolePermissions } from '../rbac/permissions';

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<Permission[]>('permissions', context.getHandler());
    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userRole = user.role as Role;
    const userPermissions = RolePermissions[userRole];

    return requiredPermissions.every(permission => userPermissions.includes(permission));
  }
} 