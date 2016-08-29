import Ember from 'ember';

const { inject } = Ember

export default Ember.Route.extend({
  session: inject.service(),
  flashMessages: inject.service(),

  actions: {
    doLogin() {
      const user = this.get('currentModel')
      this.get('session').authenticate(
        'authenticator:peepchat', user.email, user.password
      ).then(() => {
        this.get('flashMessages').success('Logged in!')
      }).catch((response) => {
        const { errors } = response
        if (errors.mapBy('code').indexOf(401) >= 0) {
          this.get('flashMessages')
            .danger('There was a problem with your password, please try again.')
        } else {
          this.get('flashMessages').danger('Server Error')
        }
      })
    }
  },
  model() {
    return {
      email: '',
      password: ''
    };
  }
});
