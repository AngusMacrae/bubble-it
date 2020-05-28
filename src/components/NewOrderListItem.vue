<template>
  <li class="order-item" id="new-order-item" @click="$emit('add-drink')">
    <svg class="order-item-border" />
    <p>
      <span class="plus">+</span>Add a cup!
    </p>
  </li>
</template>

<script>
import rough from "roughjs/bundled/rough.cjs";

function drawBorderBox(orderItem) {
  let borderBox = orderItem.querySelector(".order-item-border");
  borderBox.innerHTML = "";
  let boxWidth = orderItem.offsetWidth;
  let boxHeight = orderItem.offsetHeight;
  let roughDraw = rough.svg(borderBox);
  borderBox.appendChild(roughDraw.rectangle(0, 0, boxWidth, boxHeight));
}

export default {
  mounted() {
    drawBorderBox(this.$el);
  }
};
</script>

<style scoped>
li#new-order-item {
  text-align: center;
  justify-content: center;
  cursor: pointer;
  transform: scale(0.96);
  transition: all 0.2s ease-out;
}

li#new-order-item:hover {
  transform: scale(1);
}

li#new-order-item .order-item-border {
  opacity: 0;
  transform: rotateY(45deg);
}

li#new-order-item:hover .order-item-border {
  opacity: 1;
  transform: rotateY(0deg);
  transition: all 0.2s ease-out;
}
</style>
