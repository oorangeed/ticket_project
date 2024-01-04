import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// 가드 생성 공식문서 번역 : https://velog.io/@from_numpy/Role-Guard-%EC%83%9D%EC%84%B1-Nest-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C-%EB%B2%88%EC%97%AD

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    if (user && user.role.includes('admin')) {
      return false; // 관리자만 사용 가능
    }
    return true;
  }
}
