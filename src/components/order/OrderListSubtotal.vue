<template>
  <li>
    <div>
      Subtotal:
      <span>£{{ subtotal }}</span>
    </div>
    <a @click="redirectPay()">Complete order</a>
  </li>
</template>

<script>
export default {
  name: 'OrderListSubtotal',
  props: ['subtotal'],
  methods: {
    redirectPay() {
      this.$router.push({ path: '/pay' });
    },
  },
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: center;
  text-align: center;
}
a {
  display: block;
  margin-left: 10vw;
  text-decoration: none;
  color: rgb(203, 82, 82);
  font-weight: bold;
  cursor: pointer;
}
a:hover {
  color: rgb(243, 122, 122);
}
@media (max-width: 405px) {
  a {
    margin-left: 3vw;
  }
}
</style>
