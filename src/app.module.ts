import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccessTokenService } from './app.access.token.service';
import { HttpModule } from '@nestjs/axios';
import { UserRepositoryService } from './app.user.repository.service';
import { FilesService } from './app.files.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AccessTokenService, UserRepositoryService, FilesService],
})
export class AppModule {}
