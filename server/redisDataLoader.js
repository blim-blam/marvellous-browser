import {config} from './config'
import redisMock from 'redis-mock'
import redis from 'redis'
import RedisDataLoader from 'redis-dataloader'

export const getRedisClient = () => {
  if (!config.get('REDIS_URL')) {
    return redisMock.createClient()
  }

  return redis.createClient(config.get('REDIS_URL'))
}

export const RedisDataLoaderConstructor = RedisDataLoader({
  redis: getRedisClient()
})
