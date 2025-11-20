import axios from "axios"
import replaceSearch from "./utils/replaceSearch"
interface RedditDashBoardData {
  mentions: number;
  comments: number;
  reactions: number;
}
export class RedditAPI implements SocialAPI<any, RedditDashBoardData> {
  url = "https://rickandmortyapi.com/api/character"

  async fetchData(search: string) {
    const { data } = await axios.get(replaceSearch(this.url, search))
    
    return data
  }
  processData(data: any) {
    // const processedData = [...data]
    const processedData = data = {
        mentions: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 400),
        reactions: Math.floor(Math.random() * 900)
    }
    return processedData
  }
}