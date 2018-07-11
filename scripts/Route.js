import { h } from 'hyperapp'

// declear var routes;

export default function () {
  return function (state) {
    return h(routes[state.data.component], state.data.props);
  };
}
