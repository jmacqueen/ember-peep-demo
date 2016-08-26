import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['input-field'],
  type: 'text',
  _errorMessages: computed('errors.[]', function() {
    const errorArray = Ember.isArray(this.get('errors')) ? this.get('errors') : []
    return errorArray.join(', ');
  })
});
