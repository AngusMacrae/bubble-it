<template>
  <li class="order-item-add" @click="$emit('add-drink')">
    <p><span class="plus">+</span>Add a cup!</p>
  </li>
</template>

<script>
export default {};
</script>

<style scoped>
.order-item-add {
  text-align: center;
  justify-content: center;
  cursor: pointer;
}

.order-item-add:hover {
  color: rgb(30, 30, 30);
}
</style>
