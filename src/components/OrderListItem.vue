<template>
  <li class="order-item saved-order-item" :style="cssVars">
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
        <li @click="$emit('change', index, 'size', size)">{{ sizeText }}</li>
        <li @click="$emit('change', index, 'tea', tea)">{{ teaText }}</li>
        <li @click="$emit('change', index, 'milk', milk)">{{ milkText }}</li>
        <li @click="$emit('change', index, 'topping', topping)">{{ toppingText }}</li>
        <li @click="$emit('change', index, 'ice', ice)">{{ iceText }}</li>
        <li @click="$emit('change', index, 'sugar', sugar)">{{ sugarText }}</li>
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

import drinkOptions from "../data/drinkOptions.json";
import { drinkImageConstants } from "../data/drinkImageConstants";
import themeColours from "../data/themeColours.json";

export default {
  name: "OrderListItem",
  data() {
    return {
      drinkImage: "",
      roughDraw: "",
      colourIndex: this.index % 3
    };
  },
  props: ["index", "size", "tea", "milk", "topping", "ice", "sugar", "price"],
  watch: {
    index: function() {
      setTimeout(() => (this.colourIndex = this.index % 3), 500);
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
    sizeText() {
      return drinkOptions.size[this.size].text;
    },
    teaText() {
      return drinkOptions.tea[this.tea].text;
    },
    milkText() {
      return drinkOptions.milk[this.milk].text;
    },
    toppingText() {
      return drinkOptions.topping[this.topping].text;
    },
    iceText() {
      return drinkOptions.ice[this.ice].text;
    },
    sugarText() {
      return drinkOptions.sugar[this.sugar].text;
    },
    fillColour() {
      return themeColours.fill[this.colourIndex];
    },
    highlightColour() {
      return themeColours.highlight[this.colourIndex];
    },
    cssVars() {
      return {
        "--highlight-colour": this.highlightColour
      };
    }
  },
  methods: {
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
      let svgPath = drinkImageConstants.straw[this.index % 2][this.size];
      let svgOptions = {
        strokeWidth: "1",
        stroke: "rgb(60,60,60)"
      };
      let straw = this.roughDraw.path(svgPath, svgOptions);
      straw.classList.add("straw");
      this.drinkImage.appendChild(straw);
    },
    drawTea() {
      let svgPath = drinkImageConstants.tea[this.size];
      let svgOptions = {
        fill: drinkImageConstants.teaColor[this.tea],
        fillStyle: "solid",
        strokeWidth: 0,
        roughness: 0
      };
      let tea = this.roughDraw.path(svgPath, svgOptions);
      tea.classList.add("tea");
      this.drinkImage.appendChild(tea);
    },
    drawMilk() {
      if (this.milk == 0) {
        let svgPath = drinkImageConstants.milk[this.size];
        let svgOptions = {
          fill: "rgba(255,250,250,0.9)",
          fillStyle: "solid",
          strokeWidth: 0,
          roughness: 0
        };
        let milkCap = this.roughDraw.path(svgPath, svgOptions);
        milkCap.classList.add("milk");
        this.drinkImage.appendChild(milkCap);
      }
    },
    drawIce() {
      switch (this.ice) {
        case 2:
          break;
        case 1:
          this.drawIceCubes(0, 2);
          break;
        case 0:
          this.drawIceCubes(0, 4);
          break;
      }
    },
    drawIceCubes(firstCubeIndex, lastCubeIndex) {
      for (let i = firstCubeIndex; i <= lastCubeIndex; i++) {
        let svgPath = drinkImageConstants.ice[this.size][i];
        let svgOptions = {
          fill: "rgba(245,245,255,0.95)",
          fillStyle: "solid",
          stroke: "rgba(60,60,60,0.3)",
          strokeWidth: 0.5,
          roughness: 0.5
        };
        let iceCube = this.roughDraw.path(svgPath, svgOptions);
        this.drinkImage.appendChild(iceCube);
        this.drinkImage.lastElementChild.classList.add("iceCube" + i);
      }
    },
    drawTopping() {
      switch (this.topping) {
        case 0:
          this.drawPearls();
          break;
        case 1:
          this.drawJelly();
          break;
      }
    },
    drawPearls() {
      let lastPearlIndex = drinkImageConstants.topping.pearls.length;
      let lastPearlToDraw = lastPearlIndex - (this.size == 0 ? 6 : 0);
      for (let i = 0; i < lastPearlToDraw; i++) {
        let svgCircle = [...drinkImageConstants.topping.pearls[i], 7];
        let svgOptions = {
          fill: "rgba(37,23,26,0.9)",
          strokeWidth: 0,
          roughness: 0.3,
          fillStyle: "solid"
        };
        let pearl = this.roughDraw.circle(...svgCircle, svgOptions);
        this.drinkImage.appendChild(pearl);
        this.drinkImage.lastElementChild.classList.add("pearl" + i);
      }
    },
    drawJelly() {
      let lastJellyIndex = drinkImageConstants.topping.coconutJelly.length;
      let lastJellyToDraw = lastJellyIndex - (this.size == 0 ? 3 : 0);
      for (let i = 0; i < lastJellyToDraw; i++) {
        let svgRectangle = [
          ...drinkImageConstants.topping.coconutJelly[i],
          12,
          6
        ];
        let svgOptions = {
          fill: "rgba(245,255,245,0.95)",
          strokeWidth: 0.5,
          stroke: "rgba(60,60,60,0.3)",
          roughness: 0.4,
          fillStyle: "solid"
        };
        let jelly = this.roughDraw.rectangle(...svgRectangle, svgOptions);
        this.drinkImage.appendChild(jelly);
        this.drinkImage.lastElementChild.classList.add("jelly" + i);
      }
      // TODO: draw slanted jelly in the same loop as normal jelly?
      // adjuster = this.size == 0 ? 1 : 0;
      // for (
      //   let i = 0;
      //   i < drinkImageConstants.topping.coconutJellySlanted.length - adjuster;
      //   i++
      // ) {
      //   let svgPath = drinkImageConstants.topping.coconutJellySlanted[i];
      //   let svgOptions = {
      //     fill: "rgba(245,255,245,0.95)",
      //     strokeWidth: 0.5,
      //     stroke: "rgba(60,60,60,0.3)",
      //     roughness: 0.4,
      //     fillStyle: "solid"
      //   };
      //   let jelly = this.roughDraw.path(svgPath, svgOptions);
      //   this.drinkImage.appendChild(jelly);
      //   this.drinkImage.lastElementChild.classList.add("jelly-slanted" + i);
      // }
    },
    drawCup() {
      let cup = this.roughDraw.path(drinkImageConstants.cup[this.size], {
        stroke: "rgb(60,60,60)"
      });
      cup.classList.add("cup");
      this.drinkImage.appendChild(cup);
    }
  },
  mounted() {
    this.drinkImage = this.$el.querySelector(".drink-thumbnail");
    this.roughDraw = rough.svg(this.drinkImage);
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

.drink-title {
  margin-right: 0.5em;
  color: var(--highlight-colour);
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

.drink-details li:hover {
  color: var(--highlight-colour);
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
