import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Unuthorized admin");
    }

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    console.log(token);

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException("Unuthorized admin");
    }

    async function verify(token: string, jwtService: JwtService) {
      let payload: any;
      try {
        payload = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error);
      }
      console.log(payload);
      
      if (!payload) {
        throw new UnauthorizedException("Unuthorized admin11111");
      }
      if(payload.role !== "admin" || payload.role !== "superAdmin") {
        throw new UnauthorizedException("Unuthorized admi22222"); 
      }

      req.admin = payload;
      return true;
    }
    return verify(token, this.jwtService);
  }
}
