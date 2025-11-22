import { Request } from "express"

const apiNamesArray = ["facebook", "tiktok", "reddit", "instagram"] as const
type APINamesType = typeof apiNamesArray[number]

interface SearchParams {
  apiName: APINamesType
}
interface SearchQueryParams {
  q: string
}

interface SearchRequest extends Request<SearchParams, any, any, SearchQueryParams> {
  locals?: {
    redisKey?: string
    data?: any
    alreadyCached?: boolean
  }
}

export {SearchRequest, APINamesType, apiNamesArray}