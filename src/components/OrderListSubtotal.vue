<template>
  <li>
    <div>
      Subtotal:
      <span>£{{ subtotal }}</span>
    </div>
    <a href="#">Complete order</a>
  </li>
</template>

<script>
export default {
  name: 'OrderListSubtotal',
  props: ['subtotal'],
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
}
@media (max-width: 405px) {
  a {
    margin-left: 3vw;
  }
}
</style>
