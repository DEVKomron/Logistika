import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (+req.admin.id !== +req.params.id) {
      throw new ForbiddenException({
        messsage:
          "Siz adminsiz lekin sizda  boshqa adminlarni ma'lumotlari uchun dostup yo'q",
      });
    }
    return true;
  }
}
