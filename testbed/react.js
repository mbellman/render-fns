import ReactDOM from 'react-dom';
import React from 'react';
import { createComponent } from '../lib/adapters/react';
import { Form } from './render-fns';

const ReactForm = createComponent(Form);

const App = () => (
  <ReactForm />
);

ReactDOM.render(<App />, document.getElementById('app'));
