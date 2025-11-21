interface SocialAPI {
  readonly url: string
  fetchData (search: string): Promise<any[]>
}