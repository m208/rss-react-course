import { generateImageUrl, generatePostDate } from 'api/flickr';
import { FlickrSearchItem } from 'api/types';
import Card from 'components/Card/Card';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { SearchContext } from 'context/SearchContext';

import React, { useContext, useEffect, useReducer, useState } from 'react';
import './MainPage.css';

interface MainPageState {
  spinnerActive: boolean;
  modalActive: boolean;
  searchResults: Array<FlickrSearchItem>;
  modalContent: FlickrSearchItem | null;
}

const initialState: MainPageState = {
  spinnerActive: false,
  modalActive: false,
  searchResults: [],
  modalContent: null,
};

interface ReducerAction {
  type: string;
  payload: boolean;
}

const reducer = (state: MainPageState, action: ReducerAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'spinnerActive':
      return { ...state, spinnerActive: payload };
    case 'modalActive':
      return { ...state, modalActive: payload };
    default:
      return state;
  }
};

export function MainPage() {
  const { results, addResults } = useContext(SearchContext);

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [spinnerActive, setSpinnerActive] = useState(false);
  // const [modalActive, setModalActive] = useState(false);

  const [searchResults, setSearchResults] = useState<Array<FlickrSearchItem>>([]);
  const [modalContent, setModalContent] = useState<FlickrSearchItem | null>(null);

  const searchBarCallback = (searchResult: Array<FlickrSearchItem>) => {
    addResults([...results, ...searchResult]);
    setSearchResults([...searchResults, ...searchResult]);
  };

  const ajaxAnimationCallback = (status: boolean) => {
    //setSpinnerActive(status);
    dispatch({ type: 'spinnerActive', payload: status });
  };

  const modalShowCallback = (status: boolean) => {
    // setModalActive(status);
    dispatch({ type: 'modalActive', payload: status });
  };

  const openModal = (index: number) => {
    if (searchResults[index]) {
      modalShowCallback(true);
      setModalContent(searchResults[index]);
    }
  };

  useEffect(() => {
    setSearchResults(results);
  }, []);

  return (
    <>
      <div className="App">
        {state.spinnerActive && <Loader />}

        {state.modalActive && <Modal content={modalContent} onCloseCallback={modalShowCallback} />}

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
