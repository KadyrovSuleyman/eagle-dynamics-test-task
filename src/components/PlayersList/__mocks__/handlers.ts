import { mapActions } from 'vuex';

const adaptedActions = mapActions({
  select: 'select',
});

const actions = {
  ...adaptedActions,
};

export default actions;
