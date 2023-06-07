import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {AxiosResponse} from "axios";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/oauth/github/access-token")
  async getHello(@Body('client_id') clientId: string,
           @Body('client_secret') clientSecret: string,
           @Body('code') code: string, @Res() res) {

    let accessToken = await this.appService.getHello(clientId, clientSecret, code);

    return res.status(200).send({"accessToken": accessToken});
  }
}
