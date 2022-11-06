import { generateImageUrl, generatePostDate } from 'api/flickr';
import { FlickrSearchItem } from 'api/types';
import Card from 'components/Card/Card';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/SearchBar/SearchBar';

import React, { useState } from 'react';
import './MainPage.css';

export function MainPage() {
  const [searchResults, setSearchResults] = useState<Array<FlickrSearchItem>>([]);
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState<FlickrSearchItem | null>(null);

  const searchBarCallback = (searchResult: FlickrSearchItem) => {
    setSearchResults((searchResults) => [...searchResults, searchResult]);
  };

  const ajaxAnimationCallback = (status: boolean) => {
    setSpinnerActive(status);
  };

  const modalShowCallback = (status: boolean) => {
    setModalActive(status);
  };

  const openModal = (index: number) => {
    if (searchResults[index]) {
      modalShowCallback(true);
      setModalContent(searchResults[index]);
    }
  };

  return (
    <>
      <div className="App">
        {spinnerActive && <Loader />}

        {modalActive && <Modal content={modalContent} onCloseCallback={modalShowCallback} />}

        <SearchBar
          searchCallBack={searchBarCallback}
          ajaxAnimationCallback={ajaxAnimationCallback}
        />

        <div className="cards-wrapper">
          {searchResults.map((el, index) => (
            <Card
              cardType="mini"
              imgSrc={generateImageUrl(el, 'n')}
              date={generatePostDate(el)}
              header={el.title}
              description={el.description._content}
              key={el.id}
              onButtonClick={() => openModal(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
