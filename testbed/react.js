const { render } = require('../lib');
const { createComponent } = require('../lib/adapters/react');

const Button = render(({ button }) => ({ children }) => button({ class: 'button' }, children));
const ReactButton = createComponent(Button);

console.log(ReactButton({
  children: []
}));
