export const randomDateBetween = (start: Date, end: Date) => {
  const startTime = start.getTime()
  const endTime = end.getTime()

  return new Date(
    startTime + Math.random() * (endTime - startTime)
  )
}


export const generateRandomPostStats = (minDate: Date) => ({
  mentions: Math.floor(Math.random() * 200),
  comments: Math.floor(Math.random() * 400),
  reactions: Math.floor(Math.random() * 900),
  publishedAt: randomDateBetween(minDate, new Date())
})

export const generateNRandomPostStats = (n: number) => {
  const posts = []
  for (let i=0; i<n; i++) {
    posts.push(generateRandomPostStats(new Date("2005-01-01")))
  }
  return posts
}