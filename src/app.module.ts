import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { CompanyModule } from './company/company.module';
import { CompanyEntity } from './company/company.entity';
import { RoleModule } from './role/role.module';
import { RoleEntity } from './role/role.entity';
import { RequestMoneyModule } from './request-money/request-money.module';
import { RequestMoneyEntity } from './request-money/request-money.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST_NAME'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [UserEntity, CompanyEntity, RoleEntity, RequestMoneyEntity],
        };
      },
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    RoleModule,
    RequestMoneyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
