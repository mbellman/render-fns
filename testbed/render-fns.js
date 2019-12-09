import { render } from '../lib';

export const Input = render(
  ({ input }, { type, placeholder, onChange }) => input({
    class: 'ui-input',
    type,
    placeholder,
    on: {
      change: e => onChange(e.target.value)
    }
  })
);

export const Button = render(
  ({ button }, { children, onClick = () => {} }) => (
    button({
      class: 'ui-button',
      on: {
        click: onClick
      }
    }, children)
  )
);

export const Form = render(
  { Input, Button },
  ({ form, div, span, Button, Input }, { name }, { state, set }) => (
    form({ class: 'ui-form', name, action: '#' },
      div(
        Input({ type: 'text', placeholder: 'Name', onChange: set('name') }),
        span(state.name)
      ),
      div(
        Input({ type: 'text', placeholder: 'Age', onChange: set('age') }),
        span(state.age)
      ),
      Button('Submit')
    )
  )
);
