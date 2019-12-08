import { render } from '../lib';

export const Input = render(
  ({ input }, { type, placeholder }) => (
    input({ class: 'ui-input', type, placeholder })
  )
);

export const Button = render(
  ({ button }, { children, onClick }) => (
    button({
      class: 'ui-button',
      on: {
        click: onClick
      }
    }, children)
  )
);

export const Form = render(
  { Input },
  ({ form, div, button, Input }, { name }) => (
    form({ class: 'ui-form', name, action: '#' },
      div(
        Input({ type: 'text', placeholder: 'Name' })
      ),
      div(
        Input({ type: 'text', placeholder: 'Age' })
      ),
      button('Submit')
    )
  )
);
