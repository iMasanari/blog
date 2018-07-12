import $0_src_containers_PostList from "../src/containers/PostList";
import $1_src_containers_Post from "../src/containers/Post";
import $2_src_containers_SearchedPostList from "../src/containers/SearchedPostList";

var routes = [
  $0_src_containers_PostList,
  $1_src_containers_Post,
  $2_src_containers_SearchedPostList
];

import { h } from 'hyperapp'

// declear var routes;

export default function () {
  return function (state) {
    return h(routes[state.data.component], state.data.props);
  };
}
