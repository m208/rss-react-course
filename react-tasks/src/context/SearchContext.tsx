import { FlickrSearchItem } from 'api/types';
import React, { createContext, useState } from 'react';

interface ISearchContext {
  results: Array<FlickrSearchItem>;
  addResults: (items: Array<FlickrSearchItem>) => void;
}

export const SearchContext = createContext<ISearchContext>({
  results: [],
  addResults: () => {},
});

export const SearchState = ({ children }: { children: React.ReactNode }) => {
  const [results, setResults] = useState<Array<FlickrSearchItem>>([]);

  const addResults = (items: Array<FlickrSearchItem>) =>
    setResults((results) => [...results, ...items]);

  return (
    <SearchContext.Provider value={{ results, addResults }}>{children}</SearchContext.Provider>
  );
};
