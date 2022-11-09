import Card from 'components/Card/Card';
import React, { ChangeEvent, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import './FormsPage.css';
import { NotificationPopUp } from './NotificationPopUp/NotificationPopUp';
import { formsSlice } from 'store/reducers/FormsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

export interface IFormData {
  name: string;
  email: string;
  country: string;
  date: string;
  file?: string;
  fileData: string | null;
  cb1: boolean;
  cb2: boolean;
  switcher: boolean;
}

export function FormsPage() {
  const { forms } = useAppSelector((state) => state.formsReducer);
  const { addForms } = formsSlice.actions;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitActive, setsubmitActive] = useState(false);
  const [popupActive, setpopupActive] = useState(false);

  const imageData = useRef<string>('');

  const onSubmit = async (data: FieldValues) => {
    const { name, email, country, date, cb1, cb2, switcher } = data;
    const card: IFormData = {
      name,
      email,
      country,
      date,
      cb1,
      cb2,
      switcher,
      fileData: imageData.current,
    };

    dispatch(addForms([card]));

    drawPopUp();
    reset();
    imageData.current = '';
  };

  const drawPopUp = () => {
    setpopupActive(true);
    setTimeout(() => setpopupActive(false), 1500);
  };

  const fileReader = new FileReader();

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setsubmitActive(true);

    if (event.target) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length) {
        fileReader.onload = () => {
          imageData.current = fileReader.result as string;
        };
        fileReader.readAsDataURL(files[0]);
      }
    }
  };

  const onValidationInputChange = () => {
    setsubmitActive(true);
  };

  return (
    <>
      <div className="form-wrapper">
        <form className="form-example" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <label className="form-item-label">
              Enter your name:
              <div className="form-input">
                <input
                  {...register('name', { required: true })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  type="text"
                  onChange={() => onValidationInputChange()}
                />
                <div className="form-error-field">
                  {errors.name?.type === 'required' && (
                    <span role="alert">First name is required</span>
                  )}
                </div>
              </div>
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              Enter your email:
              <div className="form-input">
                <input
                  {...register('email', {
                    required: 'Email Address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  })}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  onChange={() => onValidationInputChange()}
                />
                <div className="form-error-field">
                  {errors.email && <span role="alert">{errors.email?.message?.toString()}</span>}
                </div>
              </div>
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              Select country
              <select {...register('country')}>
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
                {...register('date')}
                type="date"
                defaultValue="2022-01-11"
                min="2018-01-01"
                max="2023-12-31"
              />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              Upload image
              <input
                {...register('file')}
                type="file"
                onChange={(e) => onFileUpload(e)}
                accept="image/*"
              />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              I consent to my personal data:
              <input type="checkbox" {...register('cb1')} />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              I want to receive notifications
              <input type="checkbox" {...register('cb2')} />
            </label>
          </div>

          <div className="form-item">
            <label className="form-item-label">
              Switcher
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  className="toggle-switch-checkbox"
                  id="toggleSwitch"
                  {...register('switcher')}
                />
                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                  <span className="toggle-switch-inner" />
                  <span className="toggle-switch-switch" />
                </label>
              </div>
            </label>
          </div>

          <div className="form-item">
            <input type="submit" value="Subscribe!" disabled={!submitActive} />
          </div>
        </form>
      </div>

      {popupActive && <NotificationPopUp message="Success! Information has been saved!" />}

      <div className="cards-wrapper">
        {forms.map((el, i) => (
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

function generateText(item: IFormData) {
  return `
    email: ${item.email}\n
    country: ${item.country}\n
    file name: ${item.file}\n
    checkbox 1: ${item.cb1 ? 'yes' : 'no'}\n
    checkbox 2: ${item.cb2 ? 'yes' : 'no'}\n
    switcher: ${item.switcher ? 'yes' : 'no'}\n
    `;
}
