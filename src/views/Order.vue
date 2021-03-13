<template>
  <div>
    <PageHeader headerText="Your Order" />
    <OrderList />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import OrderList from '@/components/order/OrderList.vue';

export default {
  name: 'Order',
  components: {
    OrderList,
    PageHeader,
  },
};
</script>
