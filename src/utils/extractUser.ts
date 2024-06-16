const extractUser = (id: string, cache: any) => {
  // Retrieve and delete the random string from the cache using the unique ID
  let randomString = cache.take(id) as string;

  // If the random string is not found in the cache, send an error message
  if (!randomString) return null;

  // Decode the base64-encoded random string back to a JSON string
  const requestBody = Buffer.from(randomString, "base64").toString();

  // Parse the JSON string to an object
  const reqBody = JSON.parse(requestBody);

  return reqBody;
};

export default extractUser;