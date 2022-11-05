import { generateImageUrl, generatePostDate } from 'api/flickr';
import { FlickrSearchItem, FlickrSearchResult } from 'api/types';
import Card from 'components/Card/Card';
import { SearchBar } from 'components/SearchBar/SearchBar';

import React from 'react';
import './MainPage.css';

interface MainPageProps {
  a?: string;
}

interface MainPageState {
  searchResults: Array<FlickrSearchItem>;
}

export class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);

    this.state = { searchResults: [] };
  }

  searchBarCallback = (searchResult: FlickrSearchItem) => {
    console.log(searchResult);
    this.setState({
      searchResults: this.state.searchResults.concat(searchResult),
    });
  };

  render() {
    return (
      <>
        <div className="App">
          <SearchBar searchCallBack={this.searchBarCallback} />

          <div className="cards-wrapper">
            {this.state.searchResults.map((el) => (
              <Card
                imgSrc={generateImageUrl(el, 'n')}
                date={generatePostDate(el)}
                header={el.title}
                description={el.description._content}
                key={el.id}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
