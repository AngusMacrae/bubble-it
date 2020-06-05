<template>
  <div>
    <PayHeader />
    <PayBody />
  </div>
</template>

<script>
import PayHeader from '@/components/PayHeader.vue';
import PayBody from '@/components/PayBody.vue';

export default {
  name: 'Pay',
  components: {
    PayHeader,
    PayBody,
  },
};
</script>
