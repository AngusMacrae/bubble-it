<template>
  <div>
    <OrderListHeader />
    <OrderList />
  </div>
</template>

<script>
import OrderList from '@/components/OrderList.vue';
import OrderListHeader from '@/components/OrderListHeader.vue';

export default {
  name: 'Order',
  components: {
    OrderList,
    OrderListHeader,
  },
};
</script>
