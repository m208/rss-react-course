import React, { FormEvent, RefObject } from 'react';
import './FormsPage.css';

export class FormsPage extends React.Component {
  name: RefObject<HTMLInputElement>;
  email: RefObject<HTMLInputElement>;
  country: RefObject<HTMLSelectElement>;
  cb1: RefObject<HTMLInputElement>;
  cb2: RefObject<HTMLInputElement>;
  switcher: RefObject<HTMLInputElement>;
  file: RefObject<HTMLInputElement>;
  date: RefObject<HTMLInputElement>;

  constructor(props: Record<string, string>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = React.createRef();
    this.email = React.createRef();
    this.country = React.createRef();
    this.cb1 = React.createRef();
    this.cb2 = React.createRef();
    this.switcher = React.createRef();
    this.file = React.createRef();
    this.date = React.createRef();
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log('A name was submitted: ' + this.name.current!.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="form-wrapper">
        <form className="form-example" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-item">
            <label className="form-item-label">
              Enter your name:
              <input type="text" name="name" id="name" required ref={this.name} />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              Enter your email:
              <input type="email" name="email" id="email" ref={this.email} />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              Select country
              <select ref={this.country}>
                <option selected value="norway">
                  Norway
                </option>
                <option value="finland">Finland</option>
                <option value="sweden">Sweden</option>
                <option value="denmark">Denmark</option>
              </select>
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              Select date
              <input
                type="date"
                value="2022.01.11"
                min="2018-01-01"
                max="2023-12-31"
                ref={this.date}
              />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              Upload file
              <input type="file" ref={this.file} />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              I consent to my personal data:
              <input type="checkbox" ref={this.cb1} />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              I want to receive notifications
              <input type="checkbox" ref={this.cb2} />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              Switcher
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  className="toggle-switch-checkbox"
                  name="toggleSwitch"
                  id="toggleSwitch"
                  ref={this.switcher}
                />
                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                  <span className="toggle-switch-inner" />
                  <span className="toggle-switch-switch" />
                </label>
              </div>
            </label>
          </div>

          <div className="form-item">
            <input type="submit" value="Subscribe!" />
          </div>
        </form>
      </div>
    );
  }
}
