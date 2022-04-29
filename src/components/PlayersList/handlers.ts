import { mapActions } from 'vuex';

const adaptedActions = mapActions({
  select: 'toSelectPlayer',
  // select: 'click',
});

const actions = {
  ...adaptedActions,
};

export default actions;
