interface SocialAPI<RawData> {
  readonly url: string
  fetchData (search: string): any
  processData(data: RawData): RawData
}