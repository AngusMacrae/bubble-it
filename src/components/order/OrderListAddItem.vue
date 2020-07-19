<template>
  <li class="order-item" id="new-order-item" @click="$emit('add-drink')">
    <p><span class="plus">+</span>Add a cup!</p>
  </li>
</template>

<script>
export default {};
</script>

<style scoped>
li#new-order-item {
  text-align: center;
  justify-content: center;
  cursor: pointer;
}

li#new-order-item:hover {
  color: rgb(30, 30, 30);
}
</style>
