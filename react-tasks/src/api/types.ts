export interface FlickrSearchResult {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: Array<FlickrSearchItem>;
    total: number;
  };
}

export interface FlickrSearchItem {
  id: string;
  server: string;
  secret: string;
  dateupload: string;
  owner: string;
  ownername: string;
  title: string;
  description: {
    _content: string;
  };
  geo: string;
  views: string;
}
