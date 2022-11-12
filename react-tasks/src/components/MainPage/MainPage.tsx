import { generateImageUrl, generatePostDate } from 'api/flickr';
import Card from 'components/Card/Card';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/SearchBar/SearchBar';

import { useAppDispatch, useAppSelector } from 'hooks/redux';

import React from 'react';
import { fetchPhotos } from 'store/reducers/FetchDataThunk';
import { searchSlice } from 'store/reducers/SearchSlice';
import './MainPage.css';

export function MainPage() {
  const { spinnerActive, modalActive, modalContent, searchResults } = useAppSelector(
    (state) => state.searchReducer
  );
  const { toggleModal, setModalContent } = searchSlice.actions;

  const dispatch = useAppDispatch();

  const searchBarCallback = (text: string) => {
    dispatch(fetchPhotos(text));
  };

  const modalShowCallback = (status: boolean) => {
    dispatch(toggleModal(status));
  };

  const openModal = (index: number) => {
    if (searchResults[index]) {
      modalShowCallback(true);
      dispatch(setModalContent(searchResults[index]));
    }
  };

  return (
    <>
      <div className="App">
        {spinnerActive && <Loader />}

        {modalActive && <Modal content={modalContent} onCloseCallback={modalShowCallback} />}

        <SearchBar searchCallBack={searchBarCallback} />

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
