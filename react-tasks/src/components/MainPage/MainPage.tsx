import Card from 'components/Card/Card';
import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';
import './MainPage.css';

export default function MainPage() {
  return (
    <>
      <div className="App">
        <SearchBar />

        <div className="cards-wrapper">
          <Card
            imgSrc="https://placeimg.com/320/320/animals"
            header="Header"
            description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            date="01.01.2022"
          />
          <Card
            imgSrc="https://placeimg.com/320/320/tech"
            header="Another Header"
            description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            date="02.02.2022"
          />
        </div>
      </div>
    </>
  );
}
