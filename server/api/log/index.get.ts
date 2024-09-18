export default defineEventHandler(async (event) => {
  const day = new Date().getDate()
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const dataStorage = useStorage('db')
  const query = getQuery(event)
  const filename = `leaderboard-` + query.name + '.json'

  async function readFromLog() {
    return dataStorage.getItem(filename)
  }

  await dataStorage.setItem(filename, {
    name: query.name,
    score: query.score,
  })


  const data = readFromLog()

  return data
})
