import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return (async () => {
      const request = context.switchToHttp().getRequest();
      console.log(request.uuid);
      const user = await this.userService.findOneByUuid(request.uuid);

      if (user?.roleId != 1)
        throw new HttpException('not permission', HttpStatus.FORBIDDEN);

      return true;
    })();
  }
}
