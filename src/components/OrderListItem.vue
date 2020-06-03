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
        <li @click="changeOption($event, 'milk')">{{milk}}</li>
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
  tea: ["Black tea", "Green tea"],
  milk: ["Fresh milk", "No milk"],
  topping: ["Pearls", "Coconut jelly", "No topping"],
  ice: ["Full ice", "Half ice", "No ice"],
  sugar: ["Full sugar", "Half sugar", "No sugar"]
};

const teaImageVals = {
  cup: ["M 10 65 H 90 L 75 190 H 25 Z", "M 10 45 H 90 L 75 190 H 25 Z"],
  straw: [
    "M 2 25 L 60 190 L 65 187 L 7 22 Z",
    "M 6 25 L 60 190 L 65 188 L 13 23 Z"
  ],
  milk: ["M 15 95 H 85 L 83 115 H 17 Z", "M 13 75 H 87 L 84 100 H 16 Z"],
  tea: ["M 15 95 H 85 L 75 190 H 25 Z", "M 15 80 H 85 L 75 190 H 25 Z"],
  teaColor: ["rgba(196,180,154,0.9)", "rgba(154,146,88,0.9)"],
  ice: [
    [
      "M 48 78 L 73 76 L 70 98 L 49 100 Z",
      "M 18 78 L 43 80 L 40 100 L 19 99 Z",
      "M 33 108 L 45 95 L 65 105 L 50 120 Z",
      "M 65 109 L 75 95 L 84 105 L 81 124 Z"
    ],
    [
      "M 48 78 L 73 76 L 70 98 L 49 100 Z",
      "M 18 78 L 43 80 L 40 100 L 19 99 Z",
      "M 33 108 L 45 95 L 65 105 L 50 120 Z",
      "M 65 109 L 75 95 L 84 105 L 81 124 Z"
    ]
  ],
  topping: {
    pearls: [
      [30, 185],
      [37, 184],
      [33, 178],
      [44, 185],
      [40, 178],
      [40, 178],
      [40, 178],
      [40, 178],
      [30, 185]
    ],
    coconutJelly: []
  }
};

function drawBorderBox(orderItem) {
  let borderBox = orderItem.querySelector(".order-item-border");
  borderBox.innerHTML = "";
  let boxWidth = orderItem.offsetWidth;
  let boxHeight = orderItem.offsetHeight;
  let roughDraw = rough.svg(borderBox);
  borderBox.appendChild(roughDraw.rectangle(0, 0, boxWidth, boxHeight));
}

function drawTeaImage(orderItem, size, teaType, milk, topping, iceLevel) {
  let drinkThumbnail = orderItem.querySelector(".drink-thumbnail");
  drinkThumbnail.innerHTML = "";
  let roughDraw = rough.svg(drinkThumbnail);

  let straw = roughDraw.path(
    teaImageVals.straw[drinkOptions.size.indexOf(size)],
    {
      strokeWidth: "1",
      stroke: "rgb(60,60,60)"
    }
  );
  straw.classList.add("straw");
  drinkThumbnail.appendChild(straw);

  let tea = roughDraw.path(teaImageVals.tea[drinkOptions.size.indexOf(size)], {
    fill: teaImageVals.teaColor[drinkOptions.tea.indexOf(teaType)],
    fillStyle: "solid",
    strokeWidth: 0,
    roughness: 0
  });
  tea.classList.add("tea");
  drinkThumbnail.appendChild(tea);

  if (milk == "Fresh milk") {
    let milkCap = roughDraw.path(
      teaImageVals.milk[drinkOptions.size.indexOf(size)],
      {
        fill: "rgba(255,250,250,0.9)",
        fillStyle: "solid",
        strokeWidth: 0,
        roughness: 0
      }
    );
    milkCap.classList.add("milk");
    drinkThumbnail.appendChild(milkCap);
  }

  let ice = [];

  if (iceLevel != "No ice") {
    for (let i = 0; i < 2; i++) {
      ice[i] = roughDraw.path(
        teaImageVals.ice[drinkOptions.size.indexOf(size)][i],
        {
          fill: "rgba(245,245,255,0.95)",
          fillStyle: "solid",
          strokeWidth: 0.5,
          roughness: 0.5
        }
      );
      drinkThumbnail.appendChild(ice[i]);
      drinkThumbnail.lastElementChild.classList.add("ice" + i);
    }
  }

  if (ice == "Full ice") {
    for (let i = 2; i < 4; i++) {
      ice[i] = roughDraw.path(
        teaImageVals.ice[drinkOptions.size.indexOf(size)][i],
        {
          fill: "rgba(245,245,255,0.95)",
          fillStyle: "solid",
          stroke: "rgb(60,60,60)",
          strokeWidth: 0.5
        }
      );
      drinkThumbnail.appendChild(ice[i]);
      drinkThumbnail.lastElementChild.classList.add("ice" + i);
    }
  }

  if (topping == "Pearls") {
    for (let i = 0; i < teaImageVals.topping.pearls.length; i++) {
      let pearl = roughDraw.circle(...teaImageVals.topping.pearls[i], 7, {
        fill: "rgba(37,23,26,0.9)",
        strokeWidth: 0,
        roughness: 0.3,
        fillStyle: "solid"
      });
      drinkThumbnail.appendChild(pearl);
      drinkThumbnail.lastElementChild.classList.add("pearl" + i);
    }
  } else if (topping == "Coconut jelly") {
    // console.log("coconut jelly");
  }

  let cup = roughDraw.path(teaImageVals.cup[drinkOptions.size.indexOf(size)], {
    stroke: "rgb(60,60,60)"
  });
  cup.classList.add("cup");
  drinkThumbnail.appendChild(cup);
}

export default {
  name: "OrderListItem",
  props: ["index", "size", "tea", "milk", "topping", "ice", "sugar"],
  watch: {
    size: function() {
      console.log(this.size);
      // drawTeaImage(this.$el, drinkOptions.size.indexOf(this.size), drinkOptions.size.indexOf(this.tea), drinkOptions.size.indexOf(this.topping), drinkOptions.size.indexOf(this.ice));
      drawTeaImage(
        this.$el,
        this.size,
        this.tea,
        this.milk,
        this.topping,
        this.ice
      );
    },
    tea: function() {
      console.log(this.tea);
      drawTeaImage(
        this.$el,
        this.size,
        this.tea,
        this.milk,
        this.topping,
        this.ice
      );
    },
    milk: function() {
      console.log(this.milk);
      drawTeaImage(
        this.$el,
        this.size,
        this.tea,
        this.milk,
        this.topping,
        this.ice
      );
    },
    topping: function() {
      console.log(this.topping);
      drawTeaImage(
        this.$el,
        this.size,
        this.tea,
        this.milk,
        this.topping,
        this.ice
      );
    },
    ice: function() {
      console.log(this.ice);
      drawTeaImage(
        this.$el,
        this.size,
        this.tea,
        this.milk,
        this.topping,
        this.ice
      );
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
    drawTeaImage(
      this.$el,
      this.size,
      this.tea,
      this.milk,
      this.topping,
      this.ice
    );
  }
};
</script>

<style scoped>
.drink-thumbnail-container {
  margin: 0 3rem 0 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-top: 1em;
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