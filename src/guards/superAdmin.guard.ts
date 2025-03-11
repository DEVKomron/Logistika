import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SuperAdminGuard implements CanActivate {

    canActivate(

        context: ExecutionContext,

    ): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest();

        if(req.role !== "superAdmin") throw new ForbiddenException()
        
        return true
    }
}
