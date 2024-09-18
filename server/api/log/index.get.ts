export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const binId = '66eb2e57ad19ca34f8a87e1d'
  const apiKey = '$2a$10$9ljgipL9u6PuxVCv.u5Xbef5MHlSC72uEHUDsbkW2Pnc82O139mSe'

  // Function to read existing data from the log
  async function readFromLog() {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': apiKey,
      },
    });

    console.log(response.ok)

    if (response.ok) {
      const data = await response.json();

      return data.record
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  }

  async function writeToLog(data: any) {
    const url = `https://api.jsonbin.io/v3/b/${binId}`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const data = await response.json();
        
        return data.record
      } else {
        console.error('Failed to update data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  // Read the current leaderboard data
  const currentData = await readFromLog()

  if(!query.name || !query.score) {
    return currentData
  }

  // // Check if the player already exists in the leaderboard
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
  const newData = await writeToLog(currentData)

  // Return the updated leaderboard
  return newData
})
