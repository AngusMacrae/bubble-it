<template>
  <li class="order-item add-item" @click="$emit('add-drink')">
    <p><span class="plus">+</span>Add a drink!</p>
  </li>
</template>

<script>
export default {};
</script>

<style scoped>
.add-item {
  text-align: center;
  justify-content: center;
  cursor: pointer;
}

.add-item:hover {
  color: rgb(30, 30, 30);
}
</style>
