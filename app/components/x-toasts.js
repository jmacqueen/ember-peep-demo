import Ember from 'ember';

const { inject, computed } = Ember

export default Ember.Component.extend({
  classNames: ['toasts'],
  flashMessages: inject.service(),

  //reverse expected order of flash messages for bottom-up display
  reversedFlashQueue: computed('flashMessages.arrangedQueue.[]', function() {
    return this.get('flashMessages.arrangedQueue').reverse()
  })
});
