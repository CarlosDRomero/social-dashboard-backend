import { APINamesType } from "../models/search";
import { FacebookAPI } from "./facebook";
import { TikTokAPI } from "./tiktok";
import { RedditAPI } from "./reddit";
import { InstagramAPI } from "./instagram";

export const getAPI = (apiName: APINamesType) => {
  switch (apiName) {
    case "facebook": return new FacebookAPI()
    case "tiktok": return new TikTokAPI()
    case "reddit": return new RedditAPI()
    case "instagram": return new InstagramAPI()
  }
}