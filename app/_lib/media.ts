import { getStrapiURL } from "./api";

interface Media {
  data: {
    attributes: {
      url: string;
    };
  };
}

export function getStrapiMedia(media: Media): string | undefined {
  if (media?.data?.attributes === undefined) return undefined
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}
