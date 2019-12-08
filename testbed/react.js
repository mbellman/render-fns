import ReactDOM from 'react-dom';
import React from 'react';
import { createComponent } from '../lib/adapters/react';
import { Button, Form } from './render-fns';

const ReactButton = createComponent(Button);
const ReactForm = createComponent(Form);

const App = () => (
  <ReactForm />
);

ReactDOM.render(<App />, document.getElementById('app'));
