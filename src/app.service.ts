import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkStatus(): string {
    return 'Up and running sers!';
  }
}
