import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ResTypeString, ResType } from '~src/types/res.type';
import { LoginDTO } from '~src/components/auth/dto/login.dto';
import { User } from '~src/components/user/user.schema';
import { AuthService } from '~src/components/auth/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Mutation(() => ResTypeString)
  async loginUser(@Args('login') login: LoginDTO): Promise<ResType<string>> {
    const token = await this.service.login(login);

    const ok = token != null;
    return {
      status: ok,
      code: ok ? 'S_004' : 'F_004',
      data: token,
    };
  }

  @Mutation(() => User, { nullable: true })
  async validateToken(@Args('token') token: string): Promise<User> {
    const user = await this.service.validateToken(token);

    return user;
  }
}
