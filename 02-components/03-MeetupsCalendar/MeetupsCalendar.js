/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="setMonth(-1)"></button>
          <div>{{ nowDate }}</div>
          <button class="rangepicker__selector-control-right" @click="setMonth(1)"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          v-for="cell in cells"
          :key="cell.key"
          class="rangepicker__cell"
          :class="{ 'rangepicker__cell_inactive' : !cell.isActive }"
        >
          {{ cell.date }}
          <a
            v-for="event in cell.events"
            :key="event.id"
            :href="event.id"
            class="rangepicker__event"
            data-datetime="event.datetime"
          >{{ event.title }}</a>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
      dates: [],
    };
  },

  computed: {
    nowDate() {
      return [
        this.date.toLocaleDateString(navigator.language, { month: 'long' }),
        this.date.getFullYear(),
      ].join(' ');
    },
    cells() {
      let today = this.date,
        year = today.getFullYear(),
        month = today.getMonth();

      this.dates = [];

      // prev month
      let prevDays = (6 + new Date(year, month).getDay()) % 7,
        prevMonth = this.getDaysCount(year, month - 1);

      for (let day = prevMonth - prevDays + 1; day <= prevMonth; day++) {
        this.dates.push({
          key: this.getKey(year, month - 1, day),
          date: day,
          isActive: false,
        });
      }

      // current month
      for (let day = 1; day <= this.getDaysCount(year, month); day++) {
        this.dates.push({
          key: this.getKey(year, month, day),
          date: day,
          isActive: true,
        });
      }

      // next month
      let nextDays = (8 - new Date(year, month + 1).getDay()) % 7;

      for (let day = 1; day <= nextDays; day++) {
        this.dates.push({
          key: this.getKey(year, month + 1, day),
          date: day,
          isActive: false,
        });
      }

      this.dates.map((d) => {
        d.events = this.meetups.filter((m) => {
          return d.key === new Date(m.date).toJSON().slice(0, 10);
        });
      });

      return this.dates;
    },
  },

  methods: {
    getDaysCount(y, m) {
      return new Date(y, m + 1, 0).getDate();
    },
    getKey(year, month, day) {
      return new Date(Date.UTC(year, month, day)).toJSON().slice(0, 10);
    },
    setMonth(diff) {
      let currMonth = new Date(this.date.setDate(1)).getMonth();
      this.date = new Date(this.date.setMonth(currMonth + diff));
    },
  },
};
