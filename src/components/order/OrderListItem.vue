<template>
  <li class="order-item" :style="cssVars">
    <SketchedBox :fillColour="fillColour" />
    <div class="drink-thumbnail-container">
      <DrinkThumbnail :options="options" :strawDirection="this.index % 2 == 0 ? 'left' : 'right'" />
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
        <button v-if="alone == false" class="drink-button-remove" @click="$emit('remove')">Remove</button>
        <button class="drink-button-duplicate" @click="$emit('duplicate')">Duplicate</button>
      </div>
    </div>
  </li>
</template>

<script>
import SketchedBox from '../SketchedBox.vue';
import DrinkThumbnail from '../DrinkThumbnail.vue';

import themeColours from '../../data/themeColours.json';
import drinkOptions from '../../data/drinkOptions.json';

export default {
  name: 'OrderListItem',
  data() {
    return {
      colourIndex: this.index % 3,
    };
  },
  props: ['index', 'price', 'options', 'alone'],
  watch: {
    index: function() {
      setTimeout(() => {
        this.colourIndex = this.index % 3;
      }, 500);
    },
  },
  computed: {
    fillColour() {
      return themeColours[this.colourIndex].fill;
    },
    highlightColour() {
      return themeColours[this.colourIndex].highlight;
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
  },
  components: {
    SketchedBox,
    DrinkThumbnail,
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
