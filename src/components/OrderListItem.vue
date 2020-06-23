<template>
  <li class="order-item saved-order-item">
    <SketchedBox :fillColour="fillColour" />
    <div class="drink-thumbnail-container">
      <svg class="drink-thumbnail" />
    </div>
    <header>
      <h3 class="drink-title">Drink</h3>
      <small>(Click to change)</small>
      <span class="price">£{{ price }}</span>
    </header>
    <div class="drink-details-container">
      <ul class="drink-details">
        <li @click="changeOption($event, 'size')">{{ size }}</li>
        <li @click="changeOption($event, 'tea')">{{ tea }}</li>
        <li @click="changeOption($event, 'milk')">{{ milk }}</li>
        <li @click="changeOption($event, 'topping')">{{ topping }}</li>
        <li @click="changeOption($event, 'ice')">{{ ice }}</li>
        <li @click="changeOption($event, 'sugar')">{{ sugar }}</li>
      </ul>
      <div class="drink-buttons">
        <button class="drink-button-remove" @click="$emit('remove')">Remove</button>
        <button class="drink-button-duplicate" @click="$emit('duplicate')">Duplicate</button>
      </div>
    </div>
  </li>
</template>

<script>
import SketchedBox from "./SketchedBox.vue";
import rough from "roughjs/bundled/rough.cjs";

import { drinkOptions } from "../data/drinkOptions";
import { drinkImageConstants } from "../data/drinkImageConstants";
import { fillColors } from "../data/fillColors";

export default {
  name: "OrderListItem",
  data() {
    return {
      drinkImage: ""
    };
  },
  props: ["index", "size", "tea", "milk", "topping", "ice", "sugar", "price"],
  watch: {
    index: function() {
      setTimeout(this.updateColours, 500);
    },
    size: function() {
      this.drawDrinkImage();
    },
    tea: function() {
      this.drawDrinkImage();
    },
    milk: function() {
      this.drawDrinkImage();
    },
    topping: function() {
      this.drawDrinkImage();
    },
    ice: function() {
      this.drawDrinkImage();
    }
  },
  computed: {
    fillColour() {
      return fillColors[0][this.index % 3];
    },
    highlightColour() {
      return fillColors[1][this.index % 3];
    }
  },
  methods: {
    changeOption(event, propertyToChange) {
      let indexToChange = event.target.closest(".order-item").dataset.index;
      let currentIndex = drinkOptions[propertyToChange][0].indexOf(
        event.target.textContent
      );
      this.$emit("change", indexToChange, propertyToChange, currentIndex);
    },
    updateColours() {
      // console.log(this);
      let itemTitle = this.$el.querySelector(".drink-title");
      itemTitle.style.color = this.highlightColour;
      let drinkOptionButtons = this.$el.querySelectorAll(".drink-details li");
      for (let optionButton of drinkOptionButtons) {
        optionButton.classList.add("hover-class-" + (this.index % 3));
      }
    },
    drawDrinkImage() {
      this.drinkImage.innerHTML = "";
      this.drawStraw();
      this.drawTea();
      this.drawMilk();
      this.drawIce();
      this.drawTopping();
      this.drawCup();
    },
    drawStraw() {
      let roughDraw = rough.svg(this.drinkImage);
      let straw = roughDraw.path(
        drinkImageConstants.straw[this.index % 2][
          drinkOptions.size[0].indexOf(this.size)
        ],
        {
          strokeWidth: "1",
          stroke: "rgb(60,60,60)"
        }
      );
      straw.classList.add("straw");
      this.drinkImage.appendChild(straw);
    },
    drawTea() {
      let roughDraw = rough.svg(this.drinkImage);
      let tea = roughDraw.path(
        drinkImageConstants.tea[drinkOptions.size[0].indexOf(this.size)],
        {
          fill:
            drinkImageConstants.teaColor[drinkOptions.tea[0].indexOf(this.tea)],
          fillStyle: "solid",
          strokeWidth: 0,
          roughness: 0
        }
      );
      tea.classList.add("tea");
      this.drinkImage.appendChild(tea);
    },
    drawMilk() {
      let roughDraw = rough.svg(this.drinkImage);
      if (this.milk == "Fresh milk") {
        let milkCap = roughDraw.path(
          drinkImageConstants.milk[drinkOptions.size[0].indexOf(this.size)],
          {
            fill: "rgba(255,250,250,0.9)",
            fillStyle: "solid",
            strokeWidth: 0,
            roughness: 0
          }
        );
        milkCap.classList.add("milk");
        this.drinkImage.appendChild(milkCap);
      }
    },
    drawIce() {
      let roughDraw = rough.svg(this.drinkImage);
      let ice = [];

      if (this.ice != "No ice") {
        for (let i = 0; i < 3; i++) {
          ice[i] = roughDraw.path(
            drinkImageConstants.ice[drinkOptions.size[0].indexOf(this.size)][i],
            {
              fill: "rgba(245,245,255,0.95)",
              fillStyle: "solid",
              stroke: "rgba(60,60,60,0.3)",
              strokeWidth: 0.5,
              roughness: 0.5
            }
          );
          this.drinkImage.appendChild(ice[i]);
          this.drinkImage.lastElementChild.classList.add("ice" + i);
        }
      }

      if (this.ice == "Full ice") {
        for (let i = 3; i < 5; i++) {
          ice[i] = roughDraw.path(
            drinkImageConstants.ice[drinkOptions.size[0].indexOf(this.size)][i],
            {
              fill: "rgba(245,245,255,0.95)",
              fillStyle: "solid",
              stroke: "rgba(60,60,60,0.3)",
              strokeWidth: 0.5,
              roughness: 0.5
            }
          );
          this.drinkImage.appendChild(ice[i]);
          this.drinkImage.lastElementChild.classList.add("ice" + i);
        }
      }
    },
    drawTopping() {
      let roughDraw = rough.svg(this.drinkImage);
      if (this.topping == "Pearls") {
        let adjuster = this.size == "Regular" ? 6 : 0;
        for (
          let i = 0;
          i < drinkImageConstants.topping.pearls.length - adjuster;
          i++
        ) {
          let pearl = roughDraw.circle(
            ...drinkImageConstants.topping.pearls[i],
            7,
            {
              fill: "rgba(37,23,26,0.9)",
              strokeWidth: 0,
              roughness: 0.3,
              fillStyle: "solid"
            }
          );
          this.drinkImage.appendChild(pearl);
          this.drinkImage.lastElementChild.classList.add("pearl" + i);
        }
      } else if (this.topping == "Coconut jelly") {
        let adjuster = this.size == "Regular" ? 3 : 0;
        for (
          let i = 0;
          i < drinkImageConstants.topping.coconutJelly.length - adjuster;
          i++
        ) {
          let jelly = roughDraw.rectangle(
            ...drinkImageConstants.topping.coconutJelly[i],
            12,
            6,
            {
              fill: "rgba(245,255,245,0.95)",
              strokeWidth: 0.5,
              stroke: "rgba(60,60,60,0.3)",
              roughness: 0.4,
              fillStyle: "solid"
            }
          );
          this.drinkImage.appendChild(jelly);
          this.drinkImage.lastElementChild.classList.add("jelly" + i);
        }
        adjuster = this.size == "Regular" ? 1 : 0;
        for (
          let i = 0;
          i < drinkImageConstants.topping.coconutJellySlanted.length - adjuster;
          i++
        ) {
          let jelly = roughDraw.path(
            drinkImageConstants.topping.coconutJellySlanted[i],
            {
              fill: "rgba(245,255,245,0.95)",
              strokeWidth: 0.5,
              stroke: "rgba(60,60,60,0.3)",
              roughness: 0.4,
              fillStyle: "solid"
            }
          );
          this.drinkImage.appendChild(jelly);
          this.drinkImage.lastElementChild.classList.add("jelly-slanted" + i);
        }
      }
    },
    drawCup() {
      let roughDraw = rough.svg(this.drinkImage);
      let cup = roughDraw.path(
        drinkImageConstants.cup[drinkOptions.size[0].indexOf(this.size)],
        {
          stroke: "rgb(60,60,60)"
        }
      );
      cup.classList.add("cup");
      this.drinkImage.appendChild(cup);
    }
  },
  mounted() {
    this.drinkImage = this.$el.querySelector(".drink-thumbnail");
    this.updateColours();
    this.drawDrinkImage();
  },
  components: {
    SketchedBox
  }
};
</script>

<style scoped>
.order-item {
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "image header"
    "image details";
}

.drink-thumbnail-container {
  grid-area: image;
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
  padding: 0.5em 0.5em 0 0;
}

header {
  grid-area: header;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

header > * {
  display: block;
  flex-shrink: 0;
}

header > .price {
  margin-left: auto;
}

header h3 {
  margin-right: 0.5em;
}

.drink-details {
  grid-area: details;
  margin-bottom: auto;
  display: flex;
  flex-wrap: wrap;
}

.drink-details li {
  margin-top: 0.3em;
  flex: 1 0 26%;
  /* margin-right: auto; */
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
  font-size: 90%;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(60, 60, 60, 0.4);
}

.drink-buttons button:hover {
  color: rgb(30, 30, 30);
}

.drink-buttons button:first-of-type {
  margin-left: auto;
  margin-right: 1em;
}

.hover-class-0:hover {
  color: #cb5252;
}

.hover-class-1:hover {
  color: #44c5bf;
}

.hover-class-2:hover {
  color: #e0c53e;
}

@media (max-width: 765px) {
  .drink-details li {
    flex: 1 0 34%;
  }
}

@media (max-width: 625px) {
  .drink-thumbnail-container {
    margin: 0 2rem 0 1rem;
  }
}

@media (max-width: 565px) {
  header small {
    order: 1;
    width: 100%;
  }
}

@media (max-width: 530px) {
  .drink-thumbnail-container {
    margin: 0 1rem 0 0;
  }
}

@media (max-width: 496px) {
  .order-item {
    grid-template-rows: auto auto auto;
    grid-template-columns: auto;
    grid-template-areas:
      "header"
      "image"
      "details";
  }
  header small {
    order: 0;
    width: auto;
  }
  .drink-thumbnail-container {
    margin: 0;
    flex-direction: row;
  }
  .drink-details-container {
    padding: 0.5rem 0;
  }
}

@media (max-width: 405px) {
  header small {
    order: 1;
    width: 100%;
  }
  .drink-details li {
    flex: 1 0 34%;
  }
}

@media (max-width: 365px) {
  .order-item {
    padding: 15px 15px 20px;
  }
  .drink-details li {
    /* flex: 0 0 8.7rem; */
    font-size: 90%;
  }
}

@media (max-width: 340px) {
  .drink-details li {
    flex: 0 0 8rem;
  }
}
</style>
