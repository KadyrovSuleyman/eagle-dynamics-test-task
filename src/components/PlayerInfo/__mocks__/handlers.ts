import { mapActions } from 'vuex';

const adaptedActions = mapActions({
  ban: 'ban',
});

const actions = {
  ...adaptedActions,
};

export default actions;
