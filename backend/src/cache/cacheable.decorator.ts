import { CacheService } from './cache.service';

export function Cacheable(ttl: number = 3600) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheService: CacheService = this.cacheService;
      
      if (!cacheService) {
        return originalMethod.apply(this, args);
      }

      // Create cache key from method name and args
      const cacheKey = `cache:${target.constructor.name}:${propertyName}:${JSON.stringify(args)}`;

      // Try to get from cache
      const cached = await cacheService.get(cacheKey);
      if (cached) {
        console.log(`✓ Cache HIT: ${cacheKey}`);
        return cached;
      }

      console.log(`✗ Cache MISS: ${cacheKey}`);

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Cache the result
      await cacheService.set(cacheKey, result, ttl);

      return result;
    };

    return descriptor;
  };
}
