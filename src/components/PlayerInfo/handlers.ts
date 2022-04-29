import { mapActions } from 'vuex';

const adaptedActions = mapActions({
  ban: 'toBanPlayer',
});

const actions = {
  ...adaptedActions,
};

export default actions;
