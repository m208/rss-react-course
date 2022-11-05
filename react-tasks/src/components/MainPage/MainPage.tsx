import { generateImageUrl, generatePostDate } from 'api/flickr';
import { FlickrSearchItem, FlickrSearchResult } from 'api/types';
import Card from 'components/Card/Card';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/SearchBar/SearchBar';

import React from 'react';
import './MainPage.css';

interface MainPageProps {
  a?: string;
}

interface MainPageState {
  searchResults: Array<FlickrSearchItem>;
  spinnerActive: boolean;
  modalActive: boolean;
  modalContent: FlickrSearchItem | null;
}

export class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);

    this.state = {
      searchResults: [],
      spinnerActive: false,
      modalActive: false,
      modalContent: null,
    };
  }

  searchBarCallback = (searchResult: FlickrSearchItem) => {
    this.setState({
      searchResults: this.state.searchResults.concat(searchResult),
    });
  };

  ajaxAnimationCallback = (status: boolean) => {
    this.setState({
      spinnerActive: status,
    });
  };

  modalShowCallback = (status: boolean) => {
    this.setState({
      modalActive: status,
    });
  };

  openModal(index: number) {
    if (this.state.searchResults[index]) {
      this.modalShowCallback(true);
      this.setState({
        modalContent: this.state.searchResults[index],
      });
    }
  }

  render() {
    return (
      <>
        <div className="App">
          {this.state.spinnerActive && <Loader />}

          {this.state.modalActive && (
            <Modal content={this.state.modalContent} onCloseCallback={this.modalShowCallback} />
          )}

          <SearchBar
            searchCallBack={this.searchBarCallback}
            ajaxAnimationCallback={this.ajaxAnimationCallback}
          />

          <div className="cards-wrapper">
            {this.state.searchResults.map((el, index) => (
              <Card
                cardType="mini"
                imgSrc={generateImageUrl(el, 'n')}
                date={generatePostDate(el)}
                header={el.title}
                description={el.description._content}
                key={el.id}
                onButtonClick={() => this.openModal(index)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
