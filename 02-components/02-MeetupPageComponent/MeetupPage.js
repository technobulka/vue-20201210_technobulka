import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div>
    <MeetupView :meetup="meetup" v-if="!loading" />
  </div>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      loading: true,
    };
  },

  mounted() {
    this.getMeetup();
  },

  computed: {
    meetup() {
      return this.rawMeetup;
    },
  },

  methods: {
    getMeetup() {
      fetchMeetup(MEETUP_ID)
        .then((data) => {
          this.rawMeetup = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
