import axios from "axios"
import replaceSearch from "./utils/replaceSearch"

interface InstagramData {
  mentions: number;
  comments: number;
  reactions: number;
}

export class InstagramAPI implements SocialAPI<any> {
  url = "https://rickandmortyapi.com/api/character"

  async fetchData(search: string) {
    let { data } = await axios.get(replaceSearch(this.url, search))
    data = {
        mentions: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 400),
        reactions: Math.floor(Math.random() * 900),
    } as InstagramData;
    return data
  }
  processData(data: any) {
    const processedData = {processedBy: "instagram api", ...data}
    
    return processedData
  }
}