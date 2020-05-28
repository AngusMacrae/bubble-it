<template>
  <li class="order-item" id="new-order-item" @click="$emit('add-drink')">
    <svg class="order-item-border" />
    <p>
      <span class="plus">+</span>Add a cup!
    </p>
  </li>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
li#new-order-item {
  text-align: center;
  justify-content: center;
  cursor: pointer;
}
</style>
