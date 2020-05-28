<template>
  <li class="order-item saved-order-item">
    <svg class="order-item-border" />
    <div class="drink-thumbnail-container">
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
import rough from "roughjs/bundled/rough.cjs";

const drinkOptions = {
  size: ["Regular", "Large"],
  tea: ["Black milk tea", "Green milk tea", "Black tea", "Green tea"],
  topping: ["Pearls", "Coconut jelly", "No topping"],
  ice: ["Full ice", "Half ice", "No ice"],
  sugar: ["Full sugar", "Half sugar", "No sugar"]
};

function drawBorderBox(orderItem) {
  let borderBox = orderItem.querySelector(".order-item-border");
  borderBox.innerHTML = "";
  let boxWidth = orderItem.offsetWidth;
  let boxHeight = orderItem.offsetHeight;
  let roughDraw = rough.svg(borderBox);
  borderBox.appendChild(roughDraw.rectangle(0, 0, boxWidth, boxHeight));
}

function drawTeaImage(orderItem, size, teaType, topping, ice) {
  let drinkThumbnail = orderItem.querySelector(".drink-thumbnail");
  drinkThumbnail.innerHTML = "";
  let roughDraw = rough.svg(drinkThumbnail);

  let cup = roughDraw.path("M 10 65 H 90 L 75 190 H 25 Z");
  if (size == drinkOptions.size[1]) {
    cup = roughDraw.path("M 10 50 H 90 L 75 190 H 25 Z");
  }
  cup.classList.add("cup");
  drinkThumbnail.appendChild(cup);

  let straw = roughDraw.path("M 5 20 L 60 190", {
    strokeWidth: "2"
  });
  straw.classList.add("straw");
  drinkThumbnail.appendChild(straw);

  let teaColor = "rgba(20,40,80,0.3)";
  if (teaType == "Green milk tea") {
    teaColor = "rgba(20,70,80,0.3)";
  }

  let tea = roughDraw.path("M 15 95 H 85 L 75 190 H 25 Z", {
    fill: teaColor,
    fillStyle: "solid"
  });
  if (size == drinkOptions.size[1]) {
    tea = roughDraw.path("M 15 80 H 85 L 75 190 H 25 Z", {
      fill: teaColor,
      fillStyle: "solid"
    });
  }
  tea.classList.add("tea");
  drinkThumbnail.appendChild(tea);

  if (topping == "Pearls") {
    console.log("pearls");
  }

  if (ice != "No ice") {
    let ice1 = roughDraw.path("M 48 78 L 73 76 L 70 98 L 49 100 Z", {
      fill: "rgba(255,255,255,0.9)",
      fillStyle: "solid"
    });
    drinkThumbnail.appendChild(ice1);
    drinkThumbnail.lastElementChild.classList.add("ice1");

    let ice2 = roughDraw.path("M 18 78 L 43 80 L 40 100 L 19 99 Z", {
      fill: "rgba(255,255,255,0.9)",
      fillStyle: "solid"
    });
    drinkThumbnail.appendChild(ice2);
    drinkThumbnail.lastElementChild.classList.add("ice2");

    if (ice == "Full ice") {
      let ice3 = roughDraw.path("M 33 108 L 45 95 L 65 105 L 50 120 Z", {
        fill: "rgba(255,255,255,0.9)",
        fillStyle: "solid"
      });
      drinkThumbnail.appendChild(ice3);
      drinkThumbnail.lastElementChild.classList.add("ice3");

      let ice4 = roughDraw.path("M 65 109 L 75 95 L 84 105 L 81 124 Z", {
        fill: "rgba(255,255,255,0.9)",
        fillStyle: "solid"
      });
      drinkThumbnail.appendChild(ice4);
      drinkThumbnail.lastElementChild.classList.add("ice4");
    }
  }
}

export default {
  name: "OrderListItem",
  props: ["index", "size", "tea", "topping", "ice", "sugar"],
  watch: {
    size: function() {
      console.log(this.size);
      drawTeaImage(this.$el, this.size, this.tea, this.topping, this.ice);
    },
    tea: function() {
      console.log(this.tea);
      drawTeaImage(this.$el, this.size, this.tea, this.topping, this.ice);
    },
    topping: function() {
      console.log(this.topping);
      drawTeaImage(this.$el, this.size, this.tea, this.topping, this.ice);
    },
    ice: function() {
      console.log(this.ice);
      drawTeaImage(this.$el, this.size, this.tea, this.topping, this.ice);
    }
  },
  methods: {
    changeOption(event, propertyToChange) {
      let indexToChange = event.target.closest(".order-item").dataset.index;
      let currentIndex = drinkOptions[propertyToChange].indexOf(
        event.target.textContent
      );
      this.$emit("change", indexToChange, propertyToChange, currentIndex);
    }
  },
  mounted() {
    drawBorderBox(this.$el);
    drawTeaImage(this.$el, this.size, this.tea, this.topping, this.ice);
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