import Vue from 'vue';
import { createComponent } from '../lib/adapters/vue';
import { Form } from './render-fns';

const VueForm = createComponent(Form);

new Vue({
  el: '#app',
  render: h => h(VueForm)
});
