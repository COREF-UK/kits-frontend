import qs from "qs";

/**
 * Get full Strapi URL from path
 * @param path Path of the URL
 * @returns Full Strapi URL
 */
export function getStrapiURL(path = ""): string {
  return `${
    process.env.NODE_ENV == 'production' ? process.env.NEXT_PUBLIC_STRAPI_API_URL : "http://kits-strapi.thalescoref.co.uk"
  }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param path Path of the API route
 * @param urlParamsObject URL params object, will be stringified
 * @param options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI<T>(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: RequestInit = {}
): Promise<T> {

  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  // Merge default and user options
  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`Error with Strapi request // ${response.status}:${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
