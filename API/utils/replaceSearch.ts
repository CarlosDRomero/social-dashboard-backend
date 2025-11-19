export default (formatUrl: string, search: string) => {
  return formatUrl.replace("{search}", search)
}