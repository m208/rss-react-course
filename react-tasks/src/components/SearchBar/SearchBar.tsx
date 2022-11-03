import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component<Record<string, unknown>, { lastValue: string }> {
  lv: string;

  constructor(props: { name: string }) {
    super(props);

    this.state = { lastValue: localStorage.getItem('searchBarSavedValue') || '' };
    this.lv = this.state.lastValue;
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
        />
      </div>
    );
  }
}
