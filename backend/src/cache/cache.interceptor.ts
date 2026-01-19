import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    // Only cache GET requests
    if (method !== 'GET') {
      return next.handle();
    }

    const cacheKey = `cache:${request.url}`;

    // Try to get from cache
    const cachedData = await this.cacheService.get(cacheKey);
    if (cachedData) {
      console.log(`✓ Cache HIT: ${cacheKey}`);
      return of(cachedData);
    }

    console.log(`✗ Cache MISS: ${cacheKey}`);

    // If not in cache, continue and cache the result
    return next.handle().pipe(
      tap(async (data) => {
        await this.cacheService.set(cacheKey, data, 3600); // 60 minutes
      }),
    );
  }
}
