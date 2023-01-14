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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          // port: 5432,
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [UserEntity, CompanyEntity, RoleEntity],
          // synchronize: true,
        };
      },
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
