import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      const token = authorization && authorization.replace('Bearer ', '');

      const payload = await this.jwtService.verifyAsync(token).catch(() => {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      });

      request.uuid = payload.uuid;
      return true;
    })();
  }
}
