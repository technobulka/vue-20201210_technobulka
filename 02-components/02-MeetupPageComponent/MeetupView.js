import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <MeetupCover :title="meetup.title" :link="coverLink" />
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description" />

            <h3>Программа</h3>
            <MeetupAgenda :agenda="meetup.agenda" />
          </div>
          <div class="meetup__aside">
            <MeetupInfo
              :organizer="meetup.organizer"
              :place="meetup.place"
              :date="new Date(meetup.date)"
            />
          </div>
        </div>
      </div>
    </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    coverLink() {
      return this.meetup.imageId > 0 ? getMeetupCoverLink(this.meetup) : null;
    },
  },
};
