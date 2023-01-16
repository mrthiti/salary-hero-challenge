import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

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

      const user = await this.userService.findOneByUuid(payload.uuid);

      request.user = user;
      return true;
    })();
  }
}
