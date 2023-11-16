// Define the URL of the JSON file you want to fetch
const jsonURL = "https://api.opendata.metlink.org.nz/v1/gtfs-rt/vehiclepositions";

// Set cache expiration time (10 seconds)
const cacheDuration = 10;

export async function onRequestGet(context) {
  // Fetch the JSON content
  const response = await fetch(jsonURL, { headers: { "x-api-key": context.env.METLINK_API_KEY } });

  // Create a new response with necessary headers
  const newResponse = new Response(response.body, response);

  // Set cache headers for the response to cache at Cloudflare's edge locations
  newResponse.headers.set("Cache-Control", `public, max-age=${cacheDuration}`);
  newResponse.headers.set("Edge-Control", `public, max-age=${cacheDuration}`);

  return newResponse;
}
