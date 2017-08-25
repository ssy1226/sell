import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import goods from '@/components/goods/goods.vue';
import ratings from '@/components/ratings/ratings.vue';
import seller from '@/components/seller/seller.vue';
// 设置别名
Vue.use(Router);
const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: seller
    }
  ]
});
router.push('/goods');
export default router;
