import Card from 'components/Card/Card';
import React, { FormEvent, RefObject } from 'react';
import './FormsPage.css';

interface FormData {
  name: string;
  email: string;
  country: string;
  date: string;
  file: string;
  cb1: boolean;
  cb2: boolean;
  switcher: boolean;
}

interface FormState {
  cards: Array<FormData>;
  submitActive: boolean;
}

export class FormsPage extends React.Component<Record<string, unknown>, FormState> {
  name: RefObject<HTMLInputElement>;
  email: RefObject<HTMLInputElement>;
  country: RefObject<HTMLSelectElement>;
  cb1: RefObject<HTMLInputElement>;
  cb2: RefObject<HTMLInputElement>;
  switcher: RefObject<HTMLInputElement>;
  file: RefObject<HTMLInputElement>;
  date: RefObject<HTMLInputElement>;
  form: RefObject<HTMLFormElement>;

  constructor(props: Record<string, string>) {
    super(props);
    this.state = { cards: [], submitActive: false };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.name = React.createRef();
    this.email = React.createRef();
    this.country = React.createRef();
    this.date = React.createRef();
    this.file = React.createRef();
    this.cb1 = React.createRef();
    this.cb2 = React.createRef();
    this.switcher = React.createRef();

    this.form = React.createRef();
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data: FormData = {
      name: this.name.current!.value,
      email: this.email.current!.value,
      country: this.country.current!.value,
      date: this.date.current!.value,
      file: this.file.current!.value,
      cb1: this.cb1.current!.checked,
      cb2: this.cb2.current!.checked,
      switcher: this.switcher.current!.checked,
    };

    const cardsCopy = [...this.state.cards];
    cardsCopy.push(data);
    this.setState({ cards: cardsCopy });

    this.form.current!.reset();
  }

  onValidationInputChange() {
    this.setState({ submitActive: true });
  }

  onValidationFailed() {
    this.setState({ submitActive: false });
  }

  render() {
    return (
      <>
        <div className="form-wrapper">
          <form
            className="form-example"
            onSubmit={(e) => this.handleSubmit(e)}
            onInvalid={() => this.onValidationFailed()}
            ref={this.form}
          >
            <div className="form-item">
              <label className="form-item-label">
                Enter your name:
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  ref={this.name}
                  onChange={() => this.onValidationInputChange()}
                />
              </label>
            </div>

            <div className="form-item">
              <label className="form-item-label">
                Enter your email:
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  ref={this.email}
                  onChange={() => this.onValidationInputChange()}
                />
              </label>
            </div>

            <div className="form-item">
              <label className="form-item-label">
                Select country
                <select ref={this.country}>
                  <option defaultValue="Norway">Norway</option>
                  <option value="Finland">Finland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Denmark">Denmark</option>
                </select>
              </label>
            </div>

            <div className="form-item">
              <label className="form-item-label">
                Select date
                <input
                  type="date"
                  defaultValue="2022-01-11"
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
              <input type="submit" value="Subscribe!" disabled={!this.state.submitActive} />
            </div>
          </form>
        </div>

        <div className="cards-wrapper">
          {this.state.cards.map((el, i) => (
            <Card
              imgSrc="https://placeimg.com/320/320/tech"
              date={el.date}
              header={el.name}
              description={generateText(el)}
              key={i}
            />
          ))}
        </div>
      </>
    );
  }
}

function generateText(item: FormData) {
  return `
    email: ${item.email}\n
    country: ${item.country}\n
    file name: ${item.file}\n
    checkbox 1: ${item.cb1 ? 'yes' : 'no'}\n
    checkbox 2: ${item.cb2 ? 'yes' : 'no'}\n
    switcher: ${item.switcher ? 'yes' : 'no'}\n
    `;
}
