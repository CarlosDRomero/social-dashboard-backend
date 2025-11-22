import axios from "axios"
import replaceSearch from "./utils/replaceSearch"
import { generateNRandomPostStats } from "./utils/generateRandomPostStats";
interface RedditData {
  mentions: number;
  comments: number;
  reactions: number;
  publishedAt: Date;
}
export class RedditAPI implements SocialAPI {
  url = "https://rickandmortyapi.com/api/character"

  async fetchData(search: string) {
    let { data } = await axios.get<RedditData[]>(replaceSearch(this.url, search))
    data = generateNRandomPostStats(Math.floor(1000 + Math.random() * 2000))
    return data
  }
}