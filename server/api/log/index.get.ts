export default defineEventHandler(async (event) => {
  const dataStorage = useStorage('db')
  const query = getQuery(event)
  const filename = 'leaderboard.json'

  // Function to read existing data from the log
  async function readFromLog() {
    const existingData = await dataStorage.getItem(filename)
    // If the existing data is not an array, initialize it as an empty array
    return Array.isArray(existingData) ? existingData : []
  }

  // Read the current leaderboard data
  const currentData = await readFromLog()

  if(!query.name || !query.score) {
    return currentData
  }

  // Check if the player already exists in the leaderboard
  const playerIndex = currentData.findIndex(player => player.name === query.name)

  if (playerIndex !== -1) {
    // If the player exists, sum the scores
    currentData[playerIndex].score = parseInt(currentData[playerIndex].score) + parseInt(query.score)
  } else {
    // If the player doesn't exist, add them to the leaderboard
    currentData.push({
      name: query.name,
      score: parseInt(query.score),
    })
  }

  // Save the updated data back to the storage
  await dataStorage.setItem(filename, currentData)

  // Return the updated leaderboard
  return currentData
})
