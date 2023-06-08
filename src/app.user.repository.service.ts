import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly httpService: HttpService) {}

  async getUserRepository(headers: object) {
    const response = await this.callApi(headers);

    const status = response.status;
    const data = response.data;

    if (status != 200 || 'error' in data) {
      let errorMessage = 'repositories api fail';

      if ('error' in data) {
        errorMessage = errorMessage + '. ' + data['error'];
      }

      throw new Error(errorMessage);
    }

    return data.find((r) => r.name === 'webgori.github.io');
  }

  async callApi(headers: object) {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: headers['authorization'],
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };

    return await axios.get('https://api.github.com/user/repos', headersRequest);
  }
}
