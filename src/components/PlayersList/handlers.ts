import { mapActions } from 'vuex';

const adaptedActions = mapActions({
  select: 'toSelectPlayer',
});

const actions = {
  ...adaptedActions,
};

export default actions;
