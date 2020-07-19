<template>
  <li class="order-item" :style="cssVars">
    <SketchedBox :fillColour="fillColour" />
    <div class="drink-thumbnail-container">
      <svg class="drink-thumbnail" />
    </div>
    <header>
      <h3 class="drink-title">Drink</h3>
      <span class="price">£{{ price }}</span>
    </header>
    <div class="drink-details-container">
      <small class="prompt">(Click any option to change)</small>
      <ul class="drink-details">
        <li @click="$emit('change', 'size')">{{ getOptionText('size') }}</li>
        <li @click="$emit('change', 'tea')">{{ getOptionText('tea') }}</li>
        <li @click="$emit('change', 'milk')">{{ getOptionText('milk') }}</li>
        <li @click="$emit('change', 'topping')">{{ getOptionText('topping') }}</li>
        <li @click="$emit('change', 'ice')">{{ getOptionText('ice') }}</li>
        <li @click="$emit('change', 'sugar')">{{ getOptionText('sugar') }}</li>
      </ul>
      <div class="drink-buttons-container">
        <button class="drink-button-remove" @click="$emit('remove')">Remove</button>
        <button class="drink-button-duplicate" @click="$emit('duplicate')">Duplicate</button>
      </div>
    </div>
  </li>
</template>

<script>
import SketchedBox from './SketchedBox.vue';
import rough from 'roughjs/bundled/rough.cjs';

import themeColours from '../data/themeColours.json';
import drinkOptions from '../data/drinkOptions.json';
import { drinkImageConstants } from '../data/drinkImageConstants';

export default {
  name: 'OrderListItem',
  data() {
    return {
      drinkImage: '',
      roughDraw: '',
      colourIndex: this.index % 3,
    };
  },
  props: ['index', 'price', 'options'],
  watch: {
    index: function() {
      setTimeout(() => {
        this.colourIndex = this.index % 3;
        this.drawDrinkImage();
      }, 500);
    },
    options: {
      deep: true,
      handler() {
        this.drawDrinkImage();
      },
    },
  },
  computed: {
    fillColour() {
      return themeColours.fill[this.colourIndex];
    },
    highlightColour() {
      return themeColours.highlight[this.colourIndex];
    },
    cssVars() {
      return {
        '--highlight-colour': this.highlightColour,
      };
    },
  },
  methods: {
    getOptionText(optionName) {
      return drinkOptions[optionName][this.options[optionName]].text;
    },
    drawDrinkImage() {
      this.drinkImage.innerHTML = '';
      this.drawStraw();
      this.drawTea();
      this.drawMilk();
      this.drawIce();
      this.drawTopping();
      this.drawCup();
    },
    drawStraw() {
      let svgPath = drinkImageConstants.straw[this.index % 2][this.options.size];
      let svgOptions = {
        strokeWidth: '1',
        stroke: 'rgb(60,60,60)',
      };
      let straw = this.roughDraw.path(svgPath, svgOptions);
      straw.classList.add('straw');
      this.drinkImage.appendChild(straw);
    },
    drawTea() {
      let svgPath = drinkImageConstants.tea[this.options.size];
      let svgOptions = {
        fill: drinkImageConstants.teaColor[this.options.tea],
        fillStyle: 'solid',
        strokeWidth: 0,
        roughness: 0,
      };
      let tea = this.roughDraw.path(svgPath, svgOptions);
      tea.classList.add('tea');
      this.drinkImage.appendChild(tea);
    },
    drawMilk() {
      if (this.options.milk == 0) {
        let svgPath = drinkImageConstants.milk[this.options.size];
        let svgOptions = {
          fill: 'rgba(255,250,250,0.9)',
          fillStyle: 'solid',
          strokeWidth: 0,
          roughness: 0,
        };
        let milkCap = this.roughDraw.path(svgPath, svgOptions);
        milkCap.classList.add('milk');
        this.drinkImage.appendChild(milkCap);
      }
    },
    drawIce() {
      switch (this.options.ice) {
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
        let svgPath = drinkImageConstants.ice[this.options.size][i];
        let svgOptions = {
          fill: 'rgba(245,245,255,0.95)',
          fillStyle: 'solid',
          stroke: 'rgba(60,60,60,0.3)',
          strokeWidth: 0.5,
          roughness: 0.5,
        };
        let iceCube = this.roughDraw.path(svgPath, svgOptions);
        iceCube.classList.add('iceCube');
        this.drinkImage.appendChild(iceCube);
      }
    },
    drawTopping() {
      switch (this.options.topping) {
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
      let lastPearlToDraw = lastPearlIndex - (this.options.size == 0 ? 6 : 0);
      for (let i = 0; i < lastPearlToDraw; i++) {
        let svgCircle = [...drinkImageConstants.topping.pearls[i], 7];
        let svgOptions = {
          fill: 'rgba(37,23,26,0.9)',
          strokeWidth: 0,
          roughness: 0.3,
          fillStyle: 'solid',
        };
        let pearl = this.roughDraw.circle(...svgCircle, svgOptions);
        pearl.classList.add('topping');
        pearl.classList.add('pearl');
        this.drinkImage.appendChild(pearl);
      }
    },
    drawJelly() {
      let lastJellyIndex = drinkImageConstants.topping.coconutJelly.length;
      let lastJellyToDraw = lastJellyIndex - (this.options.size == 0 ? 3 : 0);
      for (let i = 0; i < lastJellyToDraw; i++) {
        let svgRectangle = [...drinkImageConstants.topping.coconutJelly[i], 12, 6];
        let svgOptions = {
          fill: 'rgba(245,255,245,0.95)',
          strokeWidth: 0.5,
          stroke: 'rgba(60,60,60,0.3)',
          roughness: 0.4,
          fillStyle: 'solid',
        };
        let jelly = this.roughDraw.rectangle(...svgRectangle, svgOptions);
        jelly.classList.add('topping');
        jelly.classList.add('jelly');
        this.drinkImage.appendChild(jelly);
      }
      // TODO: draw slanted jelly in the same loop as normal jelly?
      // adjuster = this.options.size == 0 ? 1 : 0;
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
      let cup = this.roughDraw.path(drinkImageConstants.cup[this.options.size], {
        stroke: 'rgb(60,60,60)',
      });
      cup.classList.add('cup');
      this.drinkImage.appendChild(cup);
    },
  },
  mounted() {
    this.drinkImage = this.$el.querySelector('.drink-thumbnail');
    this.roughDraw = rough.svg(this.drinkImage);
    this.drawDrinkImage();
  },
  components: {
    SketchedBox,
  },
};
</script>

<style scoped>
.order-item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'image header'
    'image details';
}

.drink-thumbnail-container {
  grid-area: image;
  margin: 0 2em;
  display: flex;
  align-items: center;
  /* transform: scale(0.5); */
}

.drink-thumbnail {
  width: 100px;
  height: 200px;
}

header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drink-title {
  color: var(--highlight-colour);
}

.prompt {
  color: rgba(60, 60, 60, 0.4);
}

.drink-details {
  grid-area: details;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5em;
  margin-top: 0.7em;
}

.drink-details li {
  cursor: pointer;
  user-select: none;
  margin-right: auto;
}

.drink-details li:hover {
  color: var(--highlight-colour);
}

.drink-buttons-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
}

.drink-buttons-container button {
  display: block;
  font-family: inherit;
  font-size: 90%;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(60, 60, 60, 0.4);
}

.drink-buttons-container button:hover {
  color: rgb(30, 30, 30);
}

.drink-buttons-container button:not(:last-of-type) {
  margin-right: 1.5em;
}

@media (max-width: 765px) {
  .drink-details {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .drink-thumbnail-container {
    margin: 0 1em;
  }
}

@media (max-width: 520px) {
  .order-item {
    grid-template-columns: auto;
    grid-template-areas:
      'header'
      'image'
      'details';
  }
  .drink-thumbnail-container {
    margin: 0 auto 0.5em;
  }
  .drink-details li,
  .drink-buttons-container button {
    padding: 0.1em 0;
  }
}

@media (max-width: 390px) {
  .drink-title {
    font-size: 110%;
  }
  .prompt {
    font-size: 70%;
  }
  .drink-details {
    grid-template-columns: auto auto;
  }
  .drink-details li {
    font-size: 90%;
  }
}

@media (max-width: 350px) {
  .drink-details {
    grid-template-columns: 1fr;
  }
}
</style>

<style>
.ice-cube {
  transform-box: fill-box;
  transform-origin: center;
  animation: bob 2s ease-in-out infinite normal backwards;
}

.ice-cube-0 {
  animation-delay: 0s;
}

.ice-cube-1 {
  animation-delay: -0.3s;
}

.ice-cube-2 {
  animation-delay: -0.1s;
}

.ice-cube-3 {
  animation-delay: -0.5s;
}

.ice-cube-4 {
  animation-delay: -0.7s;
}

@keyframes bob {
  0% {
    transform: translateY(1.5px) rotate(-2deg);
  }
  25% {
    transform: translateY(0px) rotate(4deg);
  }
  50% {
    transform: translateY(-1.5px) rotate(-4deg);
  }
  75% {
    transform: translateY(0px) rotate(4deg);
  }
  100% {
    transform: translateY(1.5px) rotate(-2deg);
  }
}
</style>
