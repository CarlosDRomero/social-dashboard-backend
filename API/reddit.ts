import axios from "axios"
import replaceSearch from "./utils/replaceSearch"

export class RedditAPI implements SocialAPI<any> {
  url = "https://rickandmortyapi.com/api/character"

  async fetchData(search: string) {
    const { data } = await axios.get(replaceSearch(this.url, search))

    return this.processData(data)
  }
  processData(data: any) {
    const processedData = {processedBy: "reddit api", ...data}
    
    return processedData
  }
}