<template>
  <AppInput :value="textValue" :type="type" v-bind="$attrs" v-on="listeners">
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'time', 'datetime-local'].includes(type),
    },
    valueAsNumber: {
      type: Number,
    },
    valueAsDate: {
      type: Date,
    },
    value: {
      type: String,
    },
  },

  computed: {
    textValue() {
      if (this.valueAsNumber) {
        return this.valueByType(this.valueAsNumber);
      }

      if (this.valueAsDate) {
        return this.valueByType(this.valueAsDate);
      }

      return this.value;
    },
    listeners() {
      return {
        ...this.$listeners,
        input: (value) => {
          let date = this.dateFromValue(value);

          this.$emit('update:valueAsNumber', date);
          this.$emit('update:valueAsDate', new Date(date));
        },
        change: ($event) => {
          let date = this.dateFromValue($event.target.value);

          this.$emit('update:valueAsNumber', date);
          this.$emit('update:valueAsDate', new Date(date));
        },
      };
    },
  },

  methods: {
    valueByType(value) {
      value = new Date(value).toISOString();

      let last = 16;
      if (this.$attrs['step'] && this.$attrs['step'] < 60) {
        last = 19;
      }

      switch (this.type) {
        case 'date':
          return value.slice(0, 10);
        case 'time':
          return value.slice(11, last);
        case 'datetime-local':
          return value.slice(0, last);
      }
    },
    dateFromValue(value) {
      let dateString = '1970-01-01T00:00:00.000Z'.split('');
      let from = 0;

      if (this.type === 'time') {
        from = 11;
      }

      dateString.splice(from, value.length, ...value.split(''));

      return Date.parse(dateString.join(''));
    },
  },
};
</script>

<style scoped></style>
