import type { StrategyOptions } from 'passport-jwt';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { prisma } from './prisma';
import passport from 'passport';

const opts: StrategyOptions = {
  secretOrKey: process.env.JWT_SECRET || 'to_shut_up_typescript',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.id },
      });

      if (user) {
        return done(false, user);
      }

      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
