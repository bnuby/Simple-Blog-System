import { CanActivate, ExecutionContext, Inject, forwardRef, Logger } from "@nestjs/common";
import { AuthService } from "~src/components/auth/auth.service";
import { Reflector } from "@nestjs/core";

export class AuthGuard implements CanActivate {

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    // Check if got ignore guard
    const isIgnore = this.reflector.get<boolean>('ignore', context.getHandler());
    if (isIgnore) {
      return true;
    }

    const { authScope } = context.getArgByIndex(2)
    
    try {

      const [_, token] = authScope.split(" ");
  
      return await this.authService.validateToken(token) != null;
    } catch (e) {
      Logger.log(e.message);
    }
    return false;
  }

}