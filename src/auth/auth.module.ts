import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './auth.guard';
import { PrismaModule } from '../prisma/prisma.module';
import { RBACGuard } from './guards/rbac.guard';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN');
        
        if (!secret) {
          throw new Error('JWT_SECRET is not defined');
        }
        
        return {
          secret,
          signOptions: {
            expiresIn: expiresIn || '1d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RBACGuard],
  exports: [AuthService, JwtStrategy, PassportModule, JwtAuthGuard, RBACGuard],
})
export class AuthModule {}
