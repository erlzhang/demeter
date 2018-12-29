import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import BookShelf from '@/components/BookShelf'
import PostsCase from '@/components/PostsCase'
import EditPost from '@/components/EditPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/books',
      name: 'BookShelf',
      component: BookShelf
    },
    {
      path: '/posts',
      name: 'PostsCase',
      component: PostsCase
    },
    {
      path: '/posts/:uid',
      name: 'EditPost',
      component: EditPost,
      props: true
    }
  ]
})
