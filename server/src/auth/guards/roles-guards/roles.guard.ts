import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Roles[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.includes(user.role);
    }
}