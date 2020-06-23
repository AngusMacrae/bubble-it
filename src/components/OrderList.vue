<template>
  <transition-group class="order-items-list" tag="ul" name="fade-grey" mode="out-in">
    <OrderListItem
      v-for="(drink, index) in order"
      :key="drink.id"
      :options="drink.options"
      :price="drink.price()"
      :index="index"
      @remove="removeDrink(index)"
      @duplicate="duplicateDrink(index)"
      @change="changeDrinkOption"
    />
    <OrderListAddItem @add-drink="addDrink" :key="'newItem'" />
    <OrderListSubtotal :subtotal="subtotal" :key="'subtotal'" />
  </transition-group>
</template>

<script>
import OrderListItem from "./OrderListItem.vue";
import OrderListAddItem from "./OrderListAddItem.vue";
import OrderListSubtotal from "./OrderListSubtotal.vue";
import { v4 as uuid } from "uuid";
import drinkOptions from "../data/drinkOptions.json";

class Drink {
  constructor(size = 0, tea = 0, milk = 0, topping = 0, ice = 0, sugar = 0) {
    this.id = uuid();
    this.options = {
      size,
      tea,
      milk,
      topping,
      ice,
      sugar
    };
  }
  price() {
    let price = 0;
    for (let optionName in this.options) {
      price += drinkOptions[optionName][this.options[optionName]].price;
    }
    return Number(price).toFixed(2);
  }
}

function nextArrayIndex(currentIndex, array) {
  if (currentIndex == array.length - 1) {
    return 0;
  } else {
    return +currentIndex + 1;
  }
}

export default {
  name: "OrderList",
  data() {
    return {
      order: [new Drink()]
    };
  },
  computed: {
    subtotal() {
      let prices = this.order.map(drink => +drink.price());
      let subtotal = prices.reduce((subtotal, price) => subtotal + price);
      return Number(subtotal).toFixed(2);
    }
  },
  methods: {
    addDrink(size, tea, milk, topping, ice, sugar) {
      this.order.push(new Drink(size, tea, milk, topping, ice, sugar));
    },
    removeDrink(indexToRemove) {
      this.order = this.order.filter((drink, index) => index != indexToRemove);
    },
    duplicateDrink(indexToDuplicate) {
      let drinkToDuplicate = this.order[indexToDuplicate];
      let duplicate = new Drink();
      Object.assign(duplicate.options, drinkToDuplicate.options);
      this.order.push(duplicate);
    },
    changeDrinkOption(drinkIndex, optionToChange, currentOptionIndex) {
      const drink = this.order[drinkIndex].options;
      const optionsArray = drinkOptions[optionToChange];
      drink[optionToChange] = nextArrayIndex(currentOptionIndex, optionsArray);
    }
  },
  components: {
    OrderListItem,
    OrderListAddItem,
    OrderListSubtotal
  }
};
</script>

<style>
.order-items-list {
  padding: 1rem 0 3rem;
  filter: grayscale(0%);
}

li.order-item {
  padding: 15px 20px 20px;
  margin-bottom: 1rem;
  position: relative;
  display: grid;
}

.fade-grey-enter-active {
  transition: opacity 0.5s ease-out;
}

.fade-grey-leave-active {
  transition: all 0.5s ease-out;
  filter: grayscale(100%);
}

.fade-grey-enter,
.fade-grey-leave-to {
  opacity: 0;
}
</style>
