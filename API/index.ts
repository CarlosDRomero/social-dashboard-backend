import { APINamesType } from "../models/search";
import { FacebookAPI } from "./facebook";
import { InstagramAPI } from "./instagram";
import { RedditAPI } from "./reddit";

export const getAPI = (apiName: APINamesType) => {
  switch (apiName) {
    case "facebook": return new FacebookAPI()
    case "instagram": return new InstagramAPI()
    case "reddit": return new RedditAPI()
  }
}