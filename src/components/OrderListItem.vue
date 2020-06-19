<template>
  <li class="order-item saved-order-item">
    <svg class="order-item-border" />
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
import rough from 'roughjs/bundled/rough.cjs';

import { drinkOptions } from '../drinkOptions';
import { teaImageVals } from '../teaImageVals';
import { fillColors } from '../fillColors';

function drawBorderBox(orderItem, fillColorIndex) {
  let borderBox = orderItem.querySelector('.order-item-border');
  let fillColor = fillColors[0][fillColorIndex];
  borderBox.innerHTML = '';
  let boxWidth = orderItem.offsetWidth;
  let boxHeight = orderItem.offsetHeight;
  let roughDraw = rough.svg(borderBox);
  borderBox.appendChild(
    roughDraw.rectangle(0, 0, boxWidth, boxHeight, {
      fill: fillColor,
      fillStyle: 'cross-hatch',
      fillWeight: '1',
      stroke: 'rgb(60,60,60)',
      roughness: 4,
    })
  );
  let title = orderItem.querySelector('header h3');
  title.style.color = fillColors[1][fillColorIndex];
  let drinkOptionButtons = orderItem.querySelectorAll('.drink-details li');
  for (let optionButton of drinkOptionButtons) {
    optionButton.classList.add('hover-class-' + fillColorIndex);
  }
}

function drawTeaImage(orderItem, size, teaType, milk, topping, iceLevel, index) {
  let drinkThumbnail = orderItem.querySelector('.drink-thumbnail');
  drinkThumbnail.innerHTML = '';
  let roughDraw = rough.svg(drinkThumbnail);

  let straw = roughDraw.path(teaImageVals.straw[index % 2][drinkOptions.size[0].indexOf(size)], {
    strokeWidth: '1',
    stroke: 'rgb(60,60,60)',
  });
  straw.classList.add('straw');
  drinkThumbnail.appendChild(straw);

  let tea = roughDraw.path(teaImageVals.tea[drinkOptions.size[0].indexOf(size)], {
    fill: teaImageVals.teaColor[drinkOptions.tea[0].indexOf(teaType)],
    fillStyle: 'solid',
    strokeWidth: 0,
    roughness: 0,
  });
  tea.classList.add('tea');
  drinkThumbnail.appendChild(tea);

  if (milk == 'Fresh milk') {
    let milkCap = roughDraw.path(teaImageVals.milk[drinkOptions.size[0].indexOf(size)], {
      fill: 'rgba(255,250,250,0.9)',
      fillStyle: 'solid',
      strokeWidth: 0,
      roughness: 0,
    });
    milkCap.classList.add('milk');
    drinkThumbnail.appendChild(milkCap);
  }

  let ice = [];

  if (iceLevel != 'No ice') {
    for (let i = 0; i < 3; i++) {
      ice[i] = roughDraw.path(teaImageVals.ice[drinkOptions.size[0].indexOf(size)][i], {
        fill: 'rgba(245,245,255,0.95)',
        fillStyle: 'solid',
        stroke: 'rgba(60,60,60,0.3)',
        strokeWidth: 0.5,
        roughness: 0.5,
      });
      drinkThumbnail.appendChild(ice[i]);
      drinkThumbnail.lastElementChild.classList.add('ice' + i);
    }
  }

  if (iceLevel == 'Full ice') {
    for (let i = 3; i < 5; i++) {
      ice[i] = roughDraw.path(teaImageVals.ice[drinkOptions.size[0].indexOf(size)][i], {
        fill: 'rgba(245,245,255,0.95)',
        fillStyle: 'solid',
        stroke: 'rgba(60,60,60,0.3)',
        strokeWidth: 0.5,
        roughness: 0.5,
      });
      drinkThumbnail.appendChild(ice[i]);
      drinkThumbnail.lastElementChild.classList.add('ice' + i);
    }
  }

  if (topping == 'Pearls') {
    let adjuster = size == 'Regular' ? 6 : 0;
    for (let i = 0; i < teaImageVals.topping.pearls.length - adjuster; i++) {
      let pearl = roughDraw.circle(...teaImageVals.topping.pearls[i], 7, {
        fill: 'rgba(37,23,26,0.9)',
        strokeWidth: 0,
        roughness: 0.3,
        fillStyle: 'solid',
      });
      drinkThumbnail.appendChild(pearl);
      drinkThumbnail.lastElementChild.classList.add('pearl' + i);
    }
  } else if (topping == 'Coconut jelly') {
    let adjuster = size == 'Regular' ? 3 : 0;
    for (let i = 0; i < teaImageVals.topping.coconutJelly.length - adjuster; i++) {
      let jelly = roughDraw.rectangle(...teaImageVals.topping.coconutJelly[i], 12, 6, {
        fill: 'rgba(245,255,245,0.95)',
        strokeWidth: 0.5,
        stroke: 'rgba(60,60,60,0.3)',
        roughness: 0.4,
        fillStyle: 'solid',
      });
      drinkThumbnail.appendChild(jelly);
      drinkThumbnail.lastElementChild.classList.add('jelly' + i);
    }
    adjuster = size == 'Regular' ? 1 : 0;
    for (let i = 0; i < teaImageVals.topping.coconutJellySlanted.length - adjuster; i++) {
      let jelly = roughDraw.path(teaImageVals.topping.coconutJellySlanted[i], {
        fill: 'rgba(245,255,245,0.95)',
        strokeWidth: 0.5,
        stroke: 'rgba(60,60,60,0.3)',
        roughness: 0.4,
        fillStyle: 'solid',
      });
      drinkThumbnail.appendChild(jelly);
      drinkThumbnail.lastElementChild.classList.add('jelly-slanted' + i);
    }
  }

  let cup = roughDraw.path(teaImageVals.cup[drinkOptions.size[0].indexOf(size)], {
    stroke: 'rgb(60,60,60)',
  });
  cup.classList.add('cup');
  drinkThumbnail.appendChild(cup);
}

export default {
  name: 'OrderListItem',
  props: ['index', 'size', 'tea', 'milk', 'topping', 'ice', 'sugar', 'fillColor', 'price'],
  watch: {
    index: function() {
      setTimeout(() => {
        drawBorderBox(this.$el, this.fillColor);
      }, 500);
    },
    size: function() {
      // console.log(this.size);
      drawTeaImage(this.$el, this.size, this.tea, this.milk, this.topping, this.ice, this.index);
    },
    tea: function() {
      // console.log(this.tea);
      drawTeaImage(this.$el, this.size, this.tea, this.milk, this.topping, this.ice, this.index);
    },
    milk: function() {
      // console.log(this.milk);
      drawTeaImage(this.$el, this.size, this.tea, this.milk, this.topping, this.ice, this.index);
    },
    topping: function() {
      // console.log(this.topping);
      drawTeaImage(this.$el, this.size, this.tea, this.milk, this.topping, this.ice, this.index);
    },
    ice: function() {
      // console.log(this.ice);
      drawTeaImage(this.$el, this.size, this.tea, this.milk, this.topping, this.ice, this.index);
    },
  },
  methods: {
    changeOption(event, propertyToChange) {
      let indexToChange = event.target.closest('.order-item').dataset.index;
      let currentIndex = drinkOptions[propertyToChange][0].indexOf(event.target.textContent);
      this.$emit('change', indexToChange, propertyToChange, currentIndex);
    },
  },
  mounted() {
    drawBorderBox(this.$el, this.fillColor);
    drawTeaImage(this.$el, this.size, this.tea, this.milk, this.topping, this.ice, this.index);
  },
};
</script>

<style scoped>
.order-item {
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'image header'
    'image details';
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
      'header'
      'image'
      'details';
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
