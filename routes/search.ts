import { NextFunction, Request, Response, Router } from "express"
import { SearchRequest, apiNamesArray } from "../models/search"
import { cacheData, checkCache } from "../cache/middlewares"
import { getAPI } from "../API"

const searchRouter = Router()

searchRouter.get("/available-apis", (req, res)=>{
  return res.json(apiNamesArray)
})

const validateSearchRequest = (req: SearchRequest, res: Response, next: NextFunction)=>{
  if (!apiNamesArray.includes(req.params.apiName)) return res.status(400).json({message: `No podemos consultar de ${req.params.apiName}`})
  if (!req.query.q) return res.status(400).json({message: `No se buscó ningún término`})
  
  next()
}

const alreadyCachedSkipped = (middleware: (req: SearchRequest, res: Response) => any) => 
  async (req: SearchRequest, res: Response, next: NextFunction) => {
    if (!req.locals!.alreadyCached)
      await middleware(req, res)
    next()
  }

const fetchAPIData = async (req: SearchRequest, res: Response) => {
  const api = getAPI(req.params.apiName)
  req.locals!.data = await api.fetchData(req.query.q)
}
const processAPIData = (req: SearchRequest, res: Response) => {
  const api = getAPI(req.params.apiName)
  req.locals!.data = api.processData(req.locals!.data)
  return res.json(req.locals!.data)
}

const locals = async (req: SearchRequest, res: Response, next: NextFunction) => {
  req.locals = {}
  next()
}
searchRouter.get("/:apiName",
  locals,
  validateSearchRequest, 
  checkCache,
  alreadyCachedSkipped(fetchAPIData),
  alreadyCachedSkipped(cacheData),
  processAPIData
)


export default searchRouter