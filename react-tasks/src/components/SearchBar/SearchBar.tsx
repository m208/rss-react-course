import { getRandomSearchPhoto, photosSearch } from 'api/flickr';
import { FlickrSearchItem, FlickrSearchResult } from 'api/types';
import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchCallBack: (searchResult: FlickrSearchItem) => void;
}

interface SearchBarState {
  lastValue: string;
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  lv: string;
  searchCallBack: (searchResult: FlickrSearchItem) => void;

  constructor(props: SearchBarProps) {
    super(props);

    this.state = { lastValue: localStorage.getItem('searchBarSavedValue') || '' };
    this.lv = this.state.lastValue;
    this.searchCallBack = props.searchCallBack;
  }

  bindedSaveLastValue = this.saveLastValue.bind(this);

  saveLastValue() {
    localStorage.setItem('searchBarSavedValue', this.lv);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.bindedSaveLastValue);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.bindedSaveLastValue);
  }

  async handleKeyUp(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      const search = await getRandomSearchPhoto(this.lv);
      this.searchCallBack(search);
    }
  }

  render() {
    return (
      <div className="search-bar-wrapper">
        <input
          type="search"
          className="search-bar-input"
          placeholder="Search..."
          defaultValue={this.state.lastValue}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            this.lv = e.currentTarget.value;
          }}
          onKeyUp={(e: React.KeyboardEvent) => this.handleKeyUp(e)}
        />
      </div>
    );
  }
}
