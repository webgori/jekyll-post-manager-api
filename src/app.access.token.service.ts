import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class AccessTokenService {
  constructor(private readonly httpService: HttpService) {}

  async getAccessToken(clientId: string, clientSecret: string, code: string) {
    const response = await this.callGetAccessTokenApi(
      clientId,
      clientSecret,
      code,
    );

    const status = response.status;
    const data = response.data;

    if (status != 200 || 'error' in data) {
      let errorMessage = 'access token api fail';

      if ('error' in data) {
        errorMessage = errorMessage + '. ' + data['error'];
      }

      throw new Error(errorMessage);
    }

    return data['access_token'];
  }

  async callGetAccessTokenApi(
    clientId: string,
    clientSecret: string,
    code: string,
  ) {
    const data = {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    };

    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return await axios.post(
      `https://github.com/login/oauth/access_token`,
      data,
      headersRequest,
    );
  }
}
