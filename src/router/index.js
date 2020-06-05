import Vue from 'vue';
import VueRouter from 'vue-router';
import Order from '../views/Order.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Order',
    component: Order,
  },
  {
    path: '/pay',
    name: 'Pay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "pay" */ '../views/Pay.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
