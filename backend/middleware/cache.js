const { cache } = require('../config/redis');

/**
 * Cache middleware for GET requests
 * @param {number} duration - Cache duration in seconds (default: 3600 = 1 hour)
 */
const cacheMiddleware = (duration = 3600) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Create cache key from URL and query params
    const cacheKey = `cache:${req.originalUrl || req.url}`;

    try {
      // Try to get cached data
      const cachedData = await cache.get(cacheKey);

      if (cachedData) {
        console.log(`✓ Cache HIT: ${cacheKey}`);
        return res.json(cachedData);
      }

      console.log(`✗ Cache MISS: ${cacheKey}`);

      // Store original res.json function
      const originalJson = res.json.bind(res);

      // Override res.json to cache the response
      res.json = (data) => {
        // Cache the response data
        cache.set(cacheKey, data, duration).catch(err => {
          console.error('Failed to cache response:', err.message);
        });

        // Send the response
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error.message);
      next(); // Continue without caching on error
    }
  };
};

/**
 * Clear cache for a specific pattern
 */
const clearCache = async (pattern = '*') => {
  try {
    await cache.delPattern(pattern);
    console.log(`✓ Cache cleared for pattern: ${pattern}`);
  } catch (error) {
    console.error('Failed to clear cache:', error.message);
  }
};

/**
 * Clear all incidents cache
 */
const clearIncidentsCache = async () => {
  await clearCache('cache:/api/incidents*');
};

module.exports = {
  cacheMiddleware,
  clearCache,
  clearIncidentsCache
};
