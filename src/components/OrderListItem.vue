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
  teaColor: ["rgba(196,180,154,0.9)", "rgba(154,146,88,0.9)"]
  // ice: [],
  // topping: []
};

function drawBorderBox(orderItem) {
  let borderBox = orderItem.querySelector(".order-item-border");
  borderBox.innerHTML = "";
  let boxWidth = orderItem.offsetWidth;
  let boxHeight = orderItem.offsetHeight;
  let roughDraw = rough.svg(borderBox);
  borderBox.appendChild(roughDraw.rectangle(0, 0, boxWidth, boxHeight));
}

function drawTeaImage(orderItem, size, teaType, milk, topping, ice) {
  let drinkThumbnail = orderItem.querySelector(".drink-thumbnail");
  drinkThumbnail.innerHTML = "";
  let roughDraw = rough.svg(drinkThumbnail);

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
        fill: "rgba(255,250,250,0.95)",
        fillStyle: "solid",
        strokeWidth: 0,
        roughness: 0
      }
    );
    milkCap.classList.add("milk");
    drinkThumbnail.appendChild(milkCap);
  }

  let cup = roughDraw.path(teaImageVals.cup[drinkOptions.size.indexOf(size)]);
  cup.classList.add("cup");
  drinkThumbnail.appendChild(cup);

  let straw = roughDraw.path(
    teaImageVals.straw[drinkOptions.size.indexOf(size)],
    {
      strokeWidth: "2"
    }
  );
  straw.classList.add("straw");
  drinkThumbnail.appendChild(straw);

  if (topping == "Pearls") {
    // console.log("pearls");
  } else if (topping == "Coconut jelly") {
    // console.log("coconut jelly");
  }

  if (ice != "No ice") {
    let ice1 = roughDraw.path("M 48 78 L 73 76 L 70 98 L 49 100 Z", {
      fill: "rgba(245,245,255,0.95)",
      fillStyle: "solid",
      strokeWidth: 0.5
    });
    drinkThumbnail.appendChild(ice1);
    drinkThumbnail.lastElementChild.classList.add("ice1");

    let ice2 = roughDraw.path("M 18 78 L 43 80 L 40 100 L 19 99 Z", {
      fill: "rgba(245,245,255,0.95)",
      fillStyle: "solid",
      strokeWidth: 0.5
    });
    drinkThumbnail.appendChild(ice2);
    drinkThumbnail.lastElementChild.classList.add("ice2");

    if (ice == "Full ice") {
      let ice3 = roughDraw.path("M 33 108 L 45 95 L 65 105 L 50 120 Z", {
        fill: "rgba(245,245,255,0.95)",
        fillStyle: "solid",
        strokeWidth: 0.5
      });
      drinkThumbnail.appendChild(ice3);
      drinkThumbnail.lastElementChild.classList.add("ice3");

      let ice4 = roughDraw.path("M 65 109 L 75 95 L 84 105 L 81 124 Z", {
        fill: "rgba(245,245,255,0.95)",
        fillStyle: "solid",
        strokeWidth: 0.5
      });
      drinkThumbnail.appendChild(ice4);
      drinkThumbnail.lastElementChild.classList.add("ice4");
    }
  }
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