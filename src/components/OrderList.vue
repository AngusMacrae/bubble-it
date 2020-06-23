<template>
  <transition-group class="order-items-list" tag="ul" name="fade-grey" mode="out-in">
    <OrderListItem
      v-for="(drink, index) in order"
      :key="drink.id"
      :index="index"
      :data-index="index"
      :size="drink.size"
      :tea="drink.tea"
      :milk="drink.milk"
      :topping="drink.topping"
      :ice="drink.ice"
      :sugar="drink.sugar"
      :price="drink.price"
      @remove="removeDrink(index)"
      @duplicate="duplicateDrink(index)"
      @change="changeDrinkOption"
    />
    <OrderListAddItem @add-drink="addDrink" :key="'newItem'" />
    <OrderListSubtotal :subtotal="subtotal()" :key="'subtotal'" />
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
    this.price = Number(3).toFixed(2);
    this.size = size;
    this.tea = tea;
    this.milk = milk;
    this.topping = topping;
    this.ice = ice;
    this.sugar = sugar;
    // TODO: gather options into options object
    // this.options = {
    //   size,
    //   tea,
    //   milk,
    //   topping,
    //   ice,
    //   sugar
    // };
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
  methods: {
    subtotal() {
      let prices = this.order.map(drink => +drink.price);
      let subtotal = prices.reduce((subtotal, price) => subtotal + price);
      return Number(subtotal).toFixed(2);
    },
    addDrink(size, tea, milk, topping, ice, sugar) {
      this.order.push(new Drink(size, tea, milk, topping, ice, sugar));
    },
    removeDrink(indexToRemove) {
      this.order = this.order.filter((drink, index) => index != indexToRemove);
    },
    duplicateDrink(indexToDuplicate) {
      let drinkToDuplicate = this.order[indexToDuplicate];
      let duplicate = new Drink();
      Object.assign(duplicate, drinkToDuplicate);
      duplicate.id = uuid();
      this.order.push(duplicate);
    },
    changeDrinkOption(drinkIndex, optionToChange, currentOptionIndex) {
      const drink = this.order[drinkIndex];
      const optionsArray = drinkOptions[optionToChange];
      drink[optionToChange] = nextArrayIndex(currentOptionIndex, optionsArray);

      let newPrice = 0;
      // TODO: refactor newPrice calculation
      // newPrice = drink.reduce();
      newPrice += drinkOptions.size[drink.size].price;
      newPrice += drinkOptions.milk[drink.milk].price;
      newPrice += drinkOptions.topping[drink.topping].price;
      drink.price = Number(newPrice).toFixed(2);
      // console.log(drink);
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
