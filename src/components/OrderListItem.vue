<template>
  <li class="order-item saved-order-item">
    <svg class="order-item-border" />
    <div class="drink-thumbnail-contain er">
      <svg class="drink-thumbnail" />
    </div>
    <div class="drink-details-container">
      <header>
        <h3 class="drink-details-title">Drink</h3>
        <small>(Click to change)</small>
      </header>
      <ul class="drink-details">
        <li @click="changeOption($event, 'size')">{{size}}</li>
        <li @click="changeOption($event, 'tea')">{{tea}}</li>
        <li @click="changeOption($event, 'topping')">{{topping}}</li>
        <li @click="changeOption($event, 'ice')">{{ice}}</li>
        <li @click="changeOption($event, 'sugar')">{{sugar}}</li>
      </ul>
      <div class="drink-buttons">
        <button class="drink-button-remove" @click="$emit('remove')">Remove</button>
        <button class="drink-button-duplicate" @click="$emit('duplicate')">Duplicate</button>
      </div>
    </div>
  </li>
</template>

<script>
const drinkOptions = {
  size: ["Regular", "Large"],
  tea: ["Black milk tea", "Green milk tea", "Black tea", "Green tea"],
  topping: ["Pearls", "Coconut jelly", "No topping"],
  ice: ["Full ice", "Half ice", "No ice"],
  sugar: ["Full sugar", "Half sugar", "No sugar"]
};

export default {
  name: "OrderListItem",
  props: ["index", "size", "tea", "topping", "ice", "sugar"],
  methods: {
    changeOption(event, propertyToChange) {
      let indexToChange = event.target.closest(".order-item").dataset.index;
      let currentIndex = drinkOptions[propertyToChange].indexOf(
        event.target.textContent
      );
      this.$emit("change", indexToChange, propertyToChange, currentIndex);
    }
  }
};
</script>

<style scoped>
.drink-thumbnail-container {
  margin: 0 3rem 0 2em;
  /* transform: scale(0.5); */
}

.drink-thumbnail {
  width: 100px;
  height: 200px;
}

.drink-details-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5em;
}

.drink-details-container header {
  display: flex;
  align-items: center;
}

.drink-details-container header > * {
  display: block;
}

.drink-details-container header h3 {
  margin-right: 0.5em;
}

.drink-details {
  margin-bottom: auto;
  display: flex;
  flex-wrap: wrap;
}

.drink-details li {
  margin-top: 0.3em;
  width: 50%;
  cursor: pointer;
  user-select: none;
}

.drink-buttons {
  display: flex;
}

.drink-buttons button {
  display: block;
  font-family: inherit;
  font-size: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

.drink-buttons button:first-of-type {
  margin-left: auto;
  margin-right: 1em;
}

.drink-button-remove {
  color: red;
}

.drink-button-duplicate {
  color: yellow;
}
</style>