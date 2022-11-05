import { getJson } from './fetch';
import { FlickrSearchItem, FlickrSearchResult } from './types';

const api_key = '74b11dfcd1dd2e5e9beaa22503f10d47';
const api_endpoint = 'https://api.flickr.com/services/rest/';

export async function photosSearch(text: string) {
  const extras = [
    'date_upload',
    'owner_name',
    'description',
    'tags',
    'views',
    'machine_tags',
    'o_dims',
    'path_alias',
  ];

  const params = {
    api_key,
    text,
    method: 'flickr.photos.search',
    extras: extras.join(','),
    format: 'json',
    nojsoncallback: '1',
  };

  const queryParams = new URLSearchParams(Object.entries(params));
  const url = new URL(api_endpoint);
  url.search = queryParams.toString();

  const data: FlickrSearchResult = await getJson(url, 'GET');
  return data;
}

export function generateImageUrl(item: FlickrSearchItem, size: string) {
  return `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_${size}.jpg`;
}

export function generatePostDate(item: FlickrSearchItem) {
  return new Date(+item.dateupload * 1000).toDateString();
}

export async function getRandomSearchPhoto(text: string) {
  const search = await photosSearch(text);
  return getRandomResult(search.photos.photo);
}

export function getRandomResult(items: Array<FlickrSearchItem>) {
  return items[getRandomIndex(items.length)];
}

export const getRandomIndex = (max: number, notEqual = <Array<number>>[]) => {
  let random = Math.floor(Math.random() * max);
  while (notEqual.includes(random)) {
    random = Math.floor(Math.random() * max);
  }
  return random;
};
