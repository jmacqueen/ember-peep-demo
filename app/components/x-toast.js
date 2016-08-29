import Ember from 'ember';

const {
  computed: { readOnly },
  run: { next, cancel },
  getWithDefault, computed
} = Ember

export default Ember.Component.extend({
  classNames: ['material-toast', 'toast'],
  classNameBindings: ['active', 'exiting', 'color'],
  active: false,
  color: computed('content.type', function() {
    switch(this.get('content.type')) {
      case 'danger':
        return 'red sdarken-2 white-text'
      case 'warning':
        return 'yellow lighten-1 black-text'
      default:
        return ''
    }
  }),
  exiting: readOnly('content.exiting'),

  _destroyFlashMessage() {
    const flash = getWithDefault(this, 'content', false)
    if (flash) {
      flash.destroyMessage()
    }
  },

  didInsertElement() {
    this._super(...arguments)
    //add 'active' class right after creation to trigger CSS entry animation
    this._applyActiveClass = next(() => {
      this.set('active', true)
    })
  },
  willDestroyElement() {
    this._super()
    this._destroyFlashMessage()
    //cancel queued task to add 'active' class
    if (this._applyActiveClass) {
      cancel(this._applyActiveClass)
    }
  }
});
