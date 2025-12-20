import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import type { StrategyOptions } from 'passport-jwt';

const opts: StrategyOptions = {
  secretOrKey: '123',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    // TODO: fetch user from db using jwtPayload.id
    // then check if exists
    done(null, false);
  })
);

export default passport;
