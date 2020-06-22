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
      :fillColorIndex="index % 3"
      :price="drink.price"
      @remove="removeDrink(index)"
      @duplicate="duplicateDrink(index)"
      @change="changeDrink"
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

import { drinkOptions } from "../drinkOptions";

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
      order: [
        {
          id: uuid(),
          size: "Regular",
          tea: "Black tea",
          milk: "Fresh milk",
          topping: "Pearls",
          ice: "Half ice",
          sugar: "Half sugar",
          price: Number(3).toFixed(2)
        }
      ]
    };
  },
  methods: {
    subtotal() {
      let subtotal = 0;
      this.order.forEach(drink => {
        subtotal += +drink.price;
      });
      return Number(subtotal).toFixed(2);
    },
    addDrink(
      size = drinkOptions.size[0][0],
      tea = drinkOptions.tea[0][0],
      milk = drinkOptions.milk[0][0],
      topping = drinkOptions.topping[0][0],
      ice = drinkOptions.ice[0][0],
      sugar = drinkOptions.sugar[0][0],
      price = Number(3).toFixed(2)
    ) {
      this.order.push({
        id: uuid(),
        size,
        tea,
        milk,
        topping,
        ice,
        sugar,
        price
      });
      console.log(this.order);
    },
    removeDrink(indexToRemove) {
      // console.log(indexToRemove);
      this.order = this.order.filter((item, index) => index != indexToRemove);
      console.log(this.order);
    },
    duplicateDrink(indexToDuplicate) {
      let drinkToDuplicate = this.order[indexToDuplicate];
      let duplicate = {};
      Object.assign(duplicate, drinkToDuplicate);
      duplicate.id = uuid();
      this.order.push(duplicate);
      console.log(this.order);
    },
    changeDrink(indexToChange, propertyToChange, currentIndex) {
      this.order[indexToChange][propertyToChange] =
        drinkOptions[propertyToChange][0][
          nextArrayIndex(currentIndex, drinkOptions[propertyToChange][0])
        ];
      let newPrice = 0;
      newPrice +=
        drinkOptions.size[1][
          drinkOptions.size[0].indexOf(this.order[indexToChange].size)
        ];
      newPrice +=
        drinkOptions.milk[1][
          drinkOptions.milk[0].indexOf(this.order[indexToChange].milk)
        ];
      newPrice +=
        drinkOptions.topping[1][
          drinkOptions.topping[0].indexOf(this.order[indexToChange].topping)
        ];
      this.order[indexToChange].price = Number(newPrice).toFixed(2);
      console.log(this.order[indexToChange]);
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
