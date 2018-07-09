import { h } from 'hyperapp'
import { Route } from '@hyperapp/router'
import { __assign } from 'tslib'

// declear var routes;

export default (function () {
  return (h(Route, {
    render: function (props) {
      return function (state) {
        var Component = routes[state.data.component];

        if (typeof document === 'object' && state.data.props) {
          document.title = state.data.props.title;
        }

        return h(Component, __assign({}, (state.data.props), {
          key: props.location.pathname
        }))
      };
    }
  }));
});
