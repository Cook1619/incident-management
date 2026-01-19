import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  healthCheck() {
    return {
      status: 'OK',
      message: 'NestJS Server is running',
      timestamp: new Date().toISOString(),
    };
  }
}
