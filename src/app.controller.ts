import { Body, Controller, Get, Headers, Param, Post, Query, Res } from "@nestjs/common";
import { AccessTokenService } from './app.access.token.service';
import { UserRepositoryService } from './app.user.repository.service';
import { FilesService } from "./app.files.service";

@Controller()
export class AppController {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly userRepositoryService: UserRepositoryService,
    private readonly filesService: FilesService,
  ) {}

  @Post('/oauth/access-token')
  async getAccessToken(
    @Body('client_id') clientId: string,
    @Body('client_secret') clientSecret: string,
    @Body('code') code: string,
    @Res() res,
  ) {
    const accessToken = await this.accessTokenService.getAccessToken(
      clientId,
      clientSecret,
      code,
    );

    return res.status(200).send({ accessToken: accessToken });
  }

  @Get('/user/repo')
  async getUserRepository(@Headers() headers, @Res() res) {
    const repository = await this.userRepositoryService.getUserRepository(
      headers,
    );

    return res.status(200).send(repository);
  }

  @Get('/files')
  async getFiles(
    @Headers() headers,
    @Query() query,
    @Res() res,
  ) {
    const files = await this.filesService.getFiles(headers, query);

    return res.status(200).send(files);
  }
}
