import { NextFunction, Response } from "express"
import { SearchRequest } from "../models/search"
import client from "./redis-client"
const getRedisKey = (req: SearchRequest) => {
  if (!req.locals) return ""
  if (!req.locals.redisKey){
    const { apiName } = req.params
    const searchQuery = req.query.q.split(" ")[0]
    req.locals.redisKey = `${apiName}/${searchQuery.toLowerCase()}`
  }
  return req.locals.redisKey
}
const checkCache = async (req: SearchRequest, res: Response, next: NextFunction) => {
  const cached = await client.get(getRedisKey(req))
  if (cached) return res.json(JSON.parse(cached))
  next()
}
const cacheData = async (req: SearchRequest, res: Response) => {
  console.log(`Caching: ${req.query.q}`)
  await client.set(getRedisKey(req), JSON.stringify(req.locals!.data))
  return res.json(req.locals!.data)
}

export {
  checkCache, cacheData
}