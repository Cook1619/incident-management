import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClientType;
  private isConnected = false;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.redisClient = createClient({
      url: this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379',
      socket: {
        reconnectStrategy: () => false, // Disable automatic reconnection
      },
    });

    this.redisClient.on('error', (err) => {
      if (!this.isConnected) {
        // Only log the first error
        console.log('⚠️  Redis not available - caching disabled');
      }
      this.isConnected = false;
    });

    this.redisClient.on('connect', () => {
      console.log('✓ Redis connected successfully');
      this.isConnected = true;
    });

    try {
      await this.redisClient.connect();
    } catch (error) {
      console.log('⚠️  Redis not available - caching disabled');
      this.isConnected = false;
    }
  }

  async onModuleDestroy() {
    if (this.redisClient && this.isConnected) {
      await this.redisClient.quit();
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.isConnected) return null;
      const data = await this.redisClient.get(key);
      return data ? JSON.parse(data as string) : null;
    } catch (error) {
      console.error('Redis GET error:', error.message);
      return null;
    }
  }

  async set(key: string, value: any, expirationInSeconds = 3600): Promise<boolean> {
    try {
      if (!this.isConnected) return false;
      await this.redisClient.setEx(key, expirationInSeconds, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Redis SET error:', error.message);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      if (!this.isConnected) return false;
      await this.redisClient.del(key);
      return true;
    } catch (error) {
      console.error('Redis DEL error:', error.message);
      return false;
    }
  }

  async delPattern(pattern: string): Promise<boolean> {
    try {
      if (!this.isConnected) return false;
      const keys = await this.redisClient.keys(pattern);
      if (keys.length > 0) {
        await this.redisClient.del(keys);
      }
      return true;
    } catch (error) {
      console.error('Redis DEL PATTERN error:', error.message);
      return false;
    }
  }

  async clearIncidentsCache(): Promise<void> {
    await this.delPattern('cache:incidents*');
    console.log('✓ Incidents cache cleared');
  }
}
