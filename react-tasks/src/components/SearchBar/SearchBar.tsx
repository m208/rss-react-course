import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component<Record<string, unknown>, { lastValue: string }> {
  lv: string;

  constructor(props: { name: string }) {
    super(props);

    this.state = { lastValue: localStorage.getItem('searchBarSavedValue') || '' };
    this.lv = this.state.lastValue;
  }

  componentDidMount() {}
  componentWillUnmount() {}

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
            localStorage.setItem('searchBarSavedValue', e.currentTarget.value);
          }}
        />
      </div>
    );
  }
}
