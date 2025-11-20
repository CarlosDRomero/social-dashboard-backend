import axios from "axios"

export class FacebookAPI implements SocialAPI<any> {
  url = `https://api.apify.com/v2/acts/apify~facebook-search-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_KEY}`

  async fetchData(search: string) {
    const { data } = await axios.post(this.url, {
      categories: [
        search
      ],
      resultsLimit: 8,
      locations: []
    }, {timeout: 9999999})

    return data
  }
  processData(data: any) {
    const processedData = {...data}
    
    return processedData
  }
}