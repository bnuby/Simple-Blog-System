import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "~src/components/user/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { LoginDTO } from "~src/components/auth/dto/login.dto";
import { SafeService } from "~src/services/safe.service";
import { compareSync } from "bcrypt";

@Injectable({})
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly safeService: SafeService
  ) { }


  /**
   * Generate Login Token
   * @param login 
   */
  generateToken(user: User): string {
    const token = {
      id: user.id,
      time: user.last_login_date.getTime(),
    }

    return this.safeService.encryptToken(token);
  }

  /**
   * Check Login
   * @param 
   */
  async login(login: LoginDTO): Promise<string> {

    const user = await this.userModel.findOne({
      email: login.email,
    }).select(['password', 'email']).exec();

    if (!user) {
      return null;
    }

    if (!compareSync(login.password, user.password)) {
      return null;
    }

    user.last_login_date = new Date();

    const token = this.generateToken(user);

    user.token = token;
    
    await user.save();


    return token;
  }

  /**
   * Validate Token
   */
  async validateToken(token: string): Promise<User> {
    return await this.userModel.findOne({token: token}).exec();
  }

}