import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class FilesService {
  constructor(private readonly httpService: HttpService) {}

  async getFiles(headers: object, query) {
    const response = await this.callApi(headers, query);

    const status = response.status;
    const data = response.data;

    if (status != 200 || 'error' in data) {
      let errorMessage = 'repositories api fail';

      if ('error' in data) {
        errorMessage = errorMessage + '. ' + data['error'];
      }

      throw new Error(errorMessage);
    }

    return data;
  }

  async callApi(headers: object, query) {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: headers['authorization'],
        'X-GitHub-Api-Version': '2022-11-28',
      },
    };

    const owner = query['owner'];
    const repo = query['repo'];
    const path = query['path'];

    return await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      headersRequest,
    );
  }
}
