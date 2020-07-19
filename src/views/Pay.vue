<template>
  <div>
    <PageHeader headerText="Complete Order" />
    <PayForm />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PayForm from '@/components/pay/PayForm.vue';

export default {
  name: 'Pay',
  components: {
    PageHeader,
    PayForm,
  },
};
</script>
