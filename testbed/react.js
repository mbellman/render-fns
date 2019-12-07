import ReactDOM from 'react-dom';
import React from 'react';
import { render } from '../lib';
import { createComponent } from '../lib/adapters/react';

const Button = render(
  ({ button }, { children, onClick }) => (
    button({
      class: 'button',
      on: {
        click: onClick
      }
    }, children)
  )
);

const ReactButton = createComponent(Button);

const App = () => (
  <ReactButton onClick={() => console.log('Hello!')}>
    Click!
  </ReactButton>
);

ReactDOM.render(<App />, document.getElementById('app'));
