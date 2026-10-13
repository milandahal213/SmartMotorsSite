export async function fetchURL(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("There was a problem with your fetch request:", error);
    throw error; // Re-throw so caller can handle the error
  }
}

