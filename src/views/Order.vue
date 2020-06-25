<template>
  <div>
    <PageHeader headerText="Your Order" />
    <OrderList />
  </div>
</template>

<script>
import OrderList from '@/components/OrderList.vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: 'Order',
  components: {
    OrderList,
    PageHeader,
  },
};
</script>
