import { IFormData } from 'components/FormsPage/FormsPage';
import React, { createContext, useState } from 'react';

interface IFormsContext {
  forms: Array<IFormData>;
  addForms: (items: Array<IFormData>) => void;
}

export const FormsContext = createContext<IFormsContext>({
  forms: [],
  addForms: () => {},
});

export const FormsState = ({ children }: { children: React.ReactNode }) => {
  const [forms, setForms] = useState<Array<IFormData>>([]);

  const addForms = (items: Array<IFormData>) => setForms(items);

  return <FormsContext.Provider value={{ forms, addForms }}>{children}</FormsContext.Provider>;
};
