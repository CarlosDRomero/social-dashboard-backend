import axios from "axios"
import replaceSearch from "./utils/replaceSearch"

export class InstagramAPI implements SocialAPI {
  url = `
https://api.apify.com/v2/acts/apify~instagram-hashtag-scraper/run-sync-get-dataset-items?token=${process.env.INSTA_APIFY}`

  async fetchData(search: string) {
    const { data } = await axios.post(this.url, {
    hashtags: [
      search
    ],
    keywordSearch: true,
    resultsLimit: 10,
    resultsType: "stories"
    }, {timeout: 9999999})

    return data
  }
}