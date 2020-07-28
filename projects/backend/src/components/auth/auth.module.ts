import { Module, DynamicModule } from "@nestjs/common";
import { UserModule } from "~src/components/user/user.module";
import { AuthResolver } from "~src/components/auth/auth.resolver";
import { AuthService } from "~src/components/auth/auth.service";
import { SafeService } from "~src/services/safe.service";

@Module({
})
export class AuthModule {
  static forRoot(): DynamicModule {

    return {
      module: AuthModule,
      imports: [
        UserModule.forModel(),
      ],
      providers: [
        SafeService,
        AuthService,
        AuthResolver,
      ],
      exports: [
        AuthService,
      ]
    }
  }

  static forShare(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        UserModule.forModel(),
      ],
      providers: [
        SafeService,
        AuthService,
      ],
      exports: [
        AuthService,
      ]
    }
  }
}