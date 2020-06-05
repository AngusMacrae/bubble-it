<template>
  <ul id="order-items-list">
    <OrderListItem
      v-for="(drink, index) in order"
      :key="index"
      :index="index"
      :data-index="index"
      :size="drink.size"
      :tea="drink.tea"
      :milk="drink.milk"
      :topping="drink.topping"
      :ice="drink.ice"
      :sugar="drink.sugar"
      :fillColor="index % 3"
      :price="drink.price"
      @remove="removeDrink(index)"
      @duplicate="duplicateDrink(index)"
      @change="changeDrink"
    />
    <NewOrderListItem @add-drink="addDrink" />
    <Subtotal :subtotal="subtotal()" />
  </ul>
</template>

<script>
import OrderListItem from "./OrderListItem.vue";
import NewOrderListItem from "./NewOrderListItem.vue";
import Subtotal from "./Subtotal.vue";

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
      this.order.push({ size, tea, milk, topping, ice, sugar, price });
      console.log(this.order);
    },
    removeDrink(indexToRemove) {
      console.log(indexToRemove);
      this.order = this.order.filter((item, index) => index != indexToRemove);
    },
    duplicateDrink(indexToDuplicate) {
      let drinkToDuplicate = this.order[indexToDuplicate];
      let duplicate = {};
      this.order.push(Object.assign(duplicate, drinkToDuplicate));
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
    }
  },
  components: {
    OrderListItem,
    NewOrderListItem,
    Subtotal
  }
};
</script>

<style>
li.order-item {
  padding: 15px 20px 20px;
  margin-bottom: 1rem;
  position: relative;
  display: grid;
}

.order-item-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* .order-item:nth-of-type(2) > .order-item-border {
  background-color: "#f4dada";
} */
</style>