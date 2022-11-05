import { generateImageUrl, generatePostDate } from 'api/flickr';
import { FlickrSearchItem, FlickrSearchResult } from 'api/types';
import Card from 'components/Card/Card';
import { Loader } from 'components/Loader/Loader';
import { SearchBar } from 'components/SearchBar/SearchBar';

import React from 'react';
import './MainPage.css';

interface MainPageProps {
  a?: string;
}

interface MainPageState {
  searchResults: Array<FlickrSearchItem>;
  spinnerActive: boolean;
}

export class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);

    this.state = { searchResults: [], spinnerActive: false };
  }

  searchBarCallback = (searchResult: FlickrSearchItem) => {
    console.log(searchResult);
    this.setState({
      searchResults: this.state.searchResults.concat(searchResult),
    });
  };

  ajaxAnimationCallback = (status: boolean) => {
    console.log(status);
    this.setState({
      spinnerActive: status,
    });
  };

  render() {
    return (
      <>
        <div className="App">
          {this.state.spinnerActive && <Loader />}

          <SearchBar
            searchCallBack={this.searchBarCallback}
            ajaxAnimationCallback={this.ajaxAnimationCallback}
          />

          <div className="cards-wrapper">
            {this.state.searchResults.map((el) => (
              <Card
                cardType="mini"
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
