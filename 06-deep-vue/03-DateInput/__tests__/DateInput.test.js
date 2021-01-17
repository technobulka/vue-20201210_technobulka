const { mount, shallowMount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const DateInput = require(getSolutionPath('components/DateInput.vue')).default;

describe('deep-vue/DateInput', () => {
  describe('DateInput', () => {
    let dateStrings = {};
    let dates = {};

    beforeEach(() => {
      dateStrings = {
        'YYYY-MM-DD': '2020-02-01',
        'HH:MM': '23:32',
        'HH:MM:SS': '23:32:50',
        'YYYY-MM-DDTHH:MM': '2020-02-01T23:32',
        'YYYY-MM-DDTHH:MM:SS': '2020-02-01T23:32:50',
        'YYYY-MM-DDTHH:MM:SSZ': '2020-02-01T23:32:50Z',
      };
      dates = {
        'YYYY-MM-DD': new Date(`${dateStrings['YYYY-MM-DD']}T00:00:00Z`),
        'HH:MM': new Date(`1970-01-01T${dateStrings['HH:MM']}:00Z`),
        'HH:MM:SS': new Date(`1970-01-01T${dateStrings['HH:MM:SS']}Z`),
        'YYYY-MM-DDTHH:MM': new Date(`${dateStrings['YYYY-MM-DDTHH:MM']}:00Z`),
        'YYYY-MM-DDTHH:MM:SS': new Date(dateStrings['YYYY-MM-DDTHH:MM:SSZ']),
        'YYYY-MM-DDTHH:MM:SSZ': new Date(dateStrings['YYYY-MM-DDTHH:MM:SSZ']),
      };
    });

    it('DateInput должен иметь параметры type, valueAsDate и valueAsNumber', () => {
      const wrapper = shallowMount(DateInput);
      expect(wrapper.vm.$options.props.type.type).toBe(String);
      expect(wrapper.vm.$options.props.type.default).toBe('date');
      expect(wrapper.vm.$options.props.valueAsDate.type).toBe(Date);
      expect(wrapper.vm.$options.props.valueAsNumber.type).toBe(Number);
    });

    it.each(['date', 'time', 'datetime-local'])(
      'DateInput должен рендерить AppInput[type=%s]',
      (type) => {
        const wrapper = mount(DateInput, { propsData: { type } });
        const input = wrapper.find('input');
        expect(input.attributes('type')).toBe(type);
      },
    );

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии с valueAsDate в формате yyyy-mm-dd', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ valueAsDate: dates['YYYY-MM-DD'] });
      expect(wrapper.find('input').element.value).toBe(
        dateStrings['YYYY-MM-DD'],
      );
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с valueAsDate в формате hh:mm', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'time' } });
      await wrapper.setProps({ valueAsDate: dates['HH:MM'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['HH:MM']);
    });

    it('DateInput[type=datetime-local] должен выводить поле ввода со значением в соответствии с valueAsDate в формате yyyy-mm-ddThh:mm', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      await wrapper.setProps({ valueAsDate: dates['YYYY-MM-DDTHH:MM'] });
      expect(wrapper.find('input').element.value).toBe(
        dateStrings['YYYY-MM-DDTHH:MM'],
      );
    });

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии с valueAsNumber в формате yyyy-mm-dd', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ valueAsNumber: +dates['YYYY-MM-DD'] });
      expect(wrapper.find('input').element.value).toBe(
        dateStrings['YYYY-MM-DD'],
      );
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с valueAsNumber в формате hh:mm', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'time' } });
      await wrapper.setProps({ valueAsNumber: +dates['HH:MM'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['HH:MM']);
    });

    it('DateInput[type=datetime-local] должен выводить поле ввода со значением в соответствии с valueAsNumber в формате yyyy-mm-ddThh:mm', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      await wrapper.setProps({ valueAsNumber: +dates['YYYY-MM-DDTHH:MM'] });
      expect(wrapper.find('input').element.value).toBe(
        dateStrings['YYYY-MM-DDTHH:MM'],
      );
    });

    it('DateInput[type=time] должен выводить поле ввода со значением в соответствии с valueAsDate в формате hh:mm:ss, если атрибут step не кратен 60', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'time' },
        attrs: { step: 1 },
      });
      await wrapper.setProps({ valueAsDate: dates['HH:MM:SS'] });
      expect(wrapper.find('input').element.value).toBe(dateStrings['HH:MM:SS']);
    });

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии valueAsNumber, если переданы и valueAsDate, и valueAsNumber, и value', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({
        value: '1991-02-03',
        valueAsDate: '1991-02-03',
        valueAsNumber: +dates['YYYY-MM-DD'],
      });
      expect(wrapper.find('input').element.value).toBe(
        dateStrings['YYYY-MM-DD'],
      );
    });

    it('DateInput[type=date] должен выводить поле ввода со значением в соответствии value, если valueAsDate и valueAsNumber не переданы', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      await wrapper.setProps({ value: dateStrings['YYYY-MM-DD'] });
      expect(wrapper.find('input').element.value).toBe(
        dateStrings['YYYY-MM-DD'],
      );
    });

    it('DateInput[type=date] должен синхронизировать параметры valueAsDate и valueAsNumber при вводе значения', async () => {
      const wrapper = mount(DateInput, { propsData: { type: 'date' } });
      wrapper.find('input').element.value = dateStrings['YYYY-MM-DD'];
      wrapper.find('input').element.valueAsDate = dates['YYYY-MM-DD'];
      wrapper.find('input').element.valueAsNumber = +dates['YYYY-MM-DD'];
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted()['update:valueAsNumber'][0]).toEqual([
        +dates['YYYY-MM-DD'],
      ]);
      expect(wrapper.emitted()['update:valueAsDate'][0]).toEqual([
        dates['YYYY-MM-DD'],
      ]);
    });

    it('DateInput[type=datetime-local] должен синхронизировать параметры valueAsDate и valueAsNumber при вводе значения', async () => {
      const wrapper = mount(DateInput, {
        propsData: { type: 'datetime-local' },
      });
      wrapper.find('input').element.value = dateStrings['YYYY-MM-DDTHH:MM'];
      wrapper.find('input').element.valueAsNumber = +dates['YYYY-MM-DDTHH:MM'];
      await wrapper.find('input').trigger('input');
      await wrapper.find('input').trigger('change');
      expect(wrapper.emitted()['update:valueAsNumber'][0]).toEqual([
        +dates['YYYY-MM-DDTHH:MM'],
      ]);
      expect(wrapper.emitted()['update:valueAsDate'][0]).toEqual([
        dates['YYYY-MM-DDTHH:MM'],
      ]);
    });

    it('DateInput должен выводить левую иконку в AppInput через слот left-icon', async () => {
      const wrapper = mount(DateInput, {
        slots: { 'left-icon': '<img class="icon icon-search" />' },
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.input-group').classes()).toEqual([
        'input-group',
        'input-group_icon',
        'input-group_icon-left',
      ]);
      expect(wrapper.find('img.icon-search + input').exists()).toBe(true);
    });
  });
});
