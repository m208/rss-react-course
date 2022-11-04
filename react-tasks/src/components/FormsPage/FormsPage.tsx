import Card from 'components/Card/Card';
import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import './FormsPage.css';
import { NotificationPopUp } from './NotificationPopUp/NotificationPopUp';

interface FormData {
  name: string;
  email: string;
  country: string;
  date: string;
  file: string;
  fileData: string | null;
  cb1: boolean;
  cb2: boolean;
  switcher: boolean;
}

interface FormState {
  cards: Array<FormData>;
  submitActive: boolean;
  popupActive: boolean;
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
  fileReader: FileReader;
  fileData: string | null;

  constructor(props: Record<string, string>) {
    super(props);
    this.state = { cards: [], submitActive: false, popupActive: false };
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

    this.fileReader = new FileReader();
    this.fileData = null;
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data: FormData = {
      name: this.name.current!.value,
      email: this.email.current!.value,
      country: this.country.current!.value,
      date: this.date.current!.value,
      file: this.file.current!.value,
      fileData: this.fileData,
      cb1: this.cb1.current!.checked,
      cb2: this.cb2.current!.checked,
      switcher: this.switcher.current!.checked,
    };

    const cardsCopy = [...this.state.cards];
    cardsCopy.push(data);
    this.setState({ cards: cardsCopy });

    this.setState({ popupActive: true });
    setTimeout(() => this.setState({ popupActive: false }), 1500);

    this.formReset();
  }

  onValidationInputChange() {
    this.setState({ submitActive: true });
  }

  onValidationFailed() {
    this.setState({ submitActive: false });
  }

  formReset() {
    this.form.current!.reset();
    this.setState({ submitActive: false });
    this.fileData = null;
  }

  onFileUpload(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ submitActive: true });

    if (event.target) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length) {
        this.fileReader.onload = () => {
          this.fileData = this.fileReader.result as string;
          console.log(this.fileData);
        };
        this.fileReader.readAsDataURL(files[0]);
      }
    }
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
                Upload image
                <input
                  type="file"
                  ref={this.file}
                  onChange={(e) => this.onFileUpload(e)}
                  accept="image/*"
                />
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

        {this.state.popupActive && (
          <NotificationPopUp message="Success! Information has been saved!" />
        )}

        <div className="cards-wrapper">
          {this.state.cards.map((el, i) => (
            <Card
              imgSrc={el.fileData}
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
