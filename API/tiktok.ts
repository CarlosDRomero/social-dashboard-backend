import axios from "axios"
import replaceSearch from "./utils/replaceSearch";
import { wait } from "./utils/wait";
import client from "../cache/redis-client";

class TikTokSnapshotAPI implements SocialAPI {
  url = "https://api.brightdata.com/datasets/v3/snapshot/{search}?format=json&part=1"

  async fetchData(snapshotId: string) {
    console.log(`Looking for: ${replaceSearch(this.url, snapshotId)}`)
    const { data } = await axios.get(replaceSearch(this.url, snapshotId), {
      headers: {
        "Authorization": `Bearer ${process.env.BRIGHTDATA_KEY}`,
        "Content-Type": "application/json"
      }
    })
    
    return data
  }
}
const redisSnapshotCache = "brightdata/tiktok"
export class TikTokAPI implements SocialAPI {
  url = "https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lu702nij2f790tmv9h&notify=false&include_errors=true&type=discover_new&discover_by=keyword&limit_per_input=10"
  snapshotAPI: TikTokSnapshotAPI
  constructor() {
    this.snapshotAPI = new TikTokSnapshotAPI()
  }
  async fetchData(search: string) {
    const no_snapshot = "no_snapshot"
    const toCache = `${redisSnapshotCache}/${search}`
    const cachedSnapshot = await client.get(toCache)
    let snapshotId
    if (!(cachedSnapshot)){ 
      await client.set(toCache, no_snapshot)
    
      const search_data = JSON.stringify({
          input: [{"search_keyword":search}],
      });
      let { data: {snapshot_id} } = await axios.post(this.url, search_data, {
        headers: {
          "Authorization": `Bearer ${process.env.BRIGHTDATA_KEY}`,
          "Content-Type": "application/json"
        }
      })
      await client.set(toCache, snapshot_id)
      snapshotId = snapshot_id
    } else if (cachedSnapshot === no_snapshot){
      while (!snapshotId) {
        const snapshot_id = await client.get(toCache)
        if (snapshotId !== no_snapshot) {
          snapshotId = snapshot_id
          break;
        }
        await wait(1000)
      }
    }else {
      snapshotId = cachedSnapshot
    }
    while (true) {
      const data = await this.snapshotAPI.fetchData(snapshotId);
      if (data.status !== "closing" && data.status !== "running") {
        // Ya terminó → retornamos la data completa
        return data;
      }

      console.log(`tiktok/${search}... esperando 15s`);
      await wait(15000);
    }
  }
}