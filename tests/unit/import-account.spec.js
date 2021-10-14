import Vue from 'vue';
import { mount } from '@vue/test-utils';
import InputAmount from '../../src/popup/router/pages/ImportAccount.vue';

Object.assign(Vue.prototype, {
  $t: () => 'locale-specific-text',
});

describe('ImportAccount', () => {
  [{
    name: 'input empty',
    value: '',
  },
  {
    name: 'input one letter',
    value: 's',
  },
  {
    name: 'input 12 words',
    value: 'mystery mystery mystery mystery mystery mystery mystery mystery mystery mystery mystery mystery',
  },
  {
    name: 'input correct phrase',
    value: 'media view gym mystery all fault truck target envelope kit drop fade',
    correct: true,
  },
  {
    name: 'input correct phrase with spaces',
    value: 'media view gym mystery                 all fault truck target envelope kit drop fade',
    correct: true,
  }].forEach((test) => it(test.name, async () => {
    const wrapper = mount(InputAmount, {
      mocks: {
        $store: {
          commit: jest.fn(),
          state: {
            loginTargetLocation: null,
          },
        },
        $router: {
          push: jest.fn(),
        },
      },
    });
    await wrapper.find('textarea').setValue(test.value);
    expect(wrapper.contains('[data-cy=import].disabled')).toBe(!test.value);
    if (test.value) {
      await wrapper.find('[data-cy=import]').trigger('click');
      expect(wrapper.contains('[data-cy=import].disabled')).toBe(!test.correct);
      expect(wrapper.contains('.error-msg')).toBe(!test.correct);
    }
  }));
});