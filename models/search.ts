import { Request } from "express"

const apiNamesArray = ["facebook", "instagram", "reddit"] as const
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
    data?: string
  }
}

export {SearchRequest, APINamesType, apiNamesArray}