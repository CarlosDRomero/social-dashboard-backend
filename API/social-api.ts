interface SocialAPI<RawData, DashBoard> {
  readonly url: string
  fetchData (search: string): Promise<RawData[]>
  processData(data: RawData[]): DashBoard
}