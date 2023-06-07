import {ForbiddenException, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getHello(clientId: string, clientSecret: string, code: string) {
    let response = await this.callGetAccessTokenApi(clientId, clientSecret, code);

    let status = response.status;
    let data = response.data;

    if (status != 200 || "error" in data) {
      let errorMessage = "access token api fail";

      if ("error" in data) {
        errorMessage = errorMessage + ". " + data["error"];
      }

      throw new Error(errorMessage)
    }

    return data["access_token"];
  }

  async callGetAccessTokenApi(clientId: string, clientSecret: string, code: string) {
    let data = {
      client_id: clientId,
      client_secret: clientSecret,
      code: code
    }

    let headersRequest: AxiosRequestConfig = {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    return await axios.post(`https://github.com/login/oauth/access_token`, data, headersRequest);
  }
}
