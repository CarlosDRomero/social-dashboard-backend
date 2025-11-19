import axios from "axios"
import replaceSearch from "./utils/replaceSearch"

export class FacebookAPI implements SocialAPI<any> {
  url = "https://rickandmortyapi.com/api/character"

  async fetchData(search: string) {
    const { data } = await axios.get(replaceSearch(this.url, search))

    return this.processData(data)
  }
  processData(data: any) {
    const processedData = {processedBy: "facebook api", ...data}
    
    return processedData
  }
}