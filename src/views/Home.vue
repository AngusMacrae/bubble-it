<template>
  <div>
    <p>some text</p>
    <a @click="goToOrderPage()">Order now!</a>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToOrderPage() {
      this.$router.push({ path: '/order' });
    },
  },
};
</script>
