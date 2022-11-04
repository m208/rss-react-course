import { getJson } from './fetch';
import { FlickrSearchResult } from './types';

const api_key = '74b11dfcd1dd2e5e9beaa22503f10d47';
const api_endpoint = 'https://api.flickr.com/services/rest/';

export async function photosSearch(text: string) {
  const method = 'flickr.photos.search';
  const extras = ['date_upload', 'owner_name'].join(',');

  const params = {
    method,
    extras,
    api_key,
    text,
    format: 'json',
    nojsoncallback: '1',
  };
  const queryParams = new URLSearchParams(Object.entries(params));

  const url = new URL(api_endpoint);
  url.search = queryParams.toString();

  const data: FlickrSearchResult = await getJson(url, 'GET');
  return data;
}
