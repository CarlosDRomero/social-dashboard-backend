import axios from "axios"
import replaceSearch from "./utils/replaceSearch"
import { generateNRandomPostStats } from "./utils/generateRandomPostStats";


export class InstagramAPI implements SocialAPI {
  url = "https://rickandmortyapi.com/api/character"

  async fetchData(search: string) {
    let { data } = await axios.get(replaceSearch(this.url, search))
    data = generateNRandomPostStats(Math.floor(Math.random() * 100))
    return data
  }
}