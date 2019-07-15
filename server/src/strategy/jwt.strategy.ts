// Vendors
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'secretKey',
      });
    }

    // async validate(payload: JwtPayload) {
    //   const user = await this.authService.validateUser(payload);
    //   if (!user) {
    //     throw new UnauthorizedException();
    //   }
    //   return user;
    // }
}
