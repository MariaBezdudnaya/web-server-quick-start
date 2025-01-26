async function fetchRandomJoke() {
  try {
    const {default: fetch}  = await import('node-fetch');
    const response = await fetch(
      'https://official-joke-api.appspot.com/random_joke'
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return {
      setup: data.setup,
      punchline: data.punchline
    };
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw error;
  }
}

async function fetchIp() {
try {
    const {default: fetch}  = await import('node-fetch');
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
      const data = await response.json();
      return data.ip;
  } catch (error) {
      console.error('Error fetching IP:', error);
    throw error;
  }
}

async function fetchCombinedData() {
  try {
    const [joke, ip] = await Promise.all([fetchRandomJoke(), fetchIp()]);
    return { joke, ip };
  } catch (error) {
    console.error('Error fetching combined data:', error);
    throw error
  }
}

module.exports = { fetchCombinedData };