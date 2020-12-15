import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    rawMeetup: null,
    loading: true,
  },

  mounted() {
    this.getMeetup(MEETUP_ID);
  },

  computed: {
    meetup() {
      return {
        ...this.rawMeetup,
        cover:
          this.rawMeetup.imageId > 0
            ? { '--bg-url': `url('${getMeetupCoverLink(this.rawMeetup)}')` }
            : null,
        datetime: new Date(this.rawMeetup.date).toJSON().slice(0, 10),
        localDate: new Date(this.rawMeetup.date).toLocaleDateString(
          navigator.language,
          {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
        ),
        agenda: this.rawMeetup.agenda.map((event) => ({
          ...event,
          icon: agendaItemIcons[event.type],
          title: event.title || agendaItemTitles[event.type],
        })),
      };
    },
  },

  methods: {
    getMeetup(id) {
      fetch(`${API_URL}/meetups/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          this.rawMeetup = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
