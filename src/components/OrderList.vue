<template>
  <ul id="order-items-list">
    <OrderListItem
      v-for="(drink, index) in order"
      :key="index"
      :data-index="index"
      :size="drink.size"
      :tea="drink.tea"
      :topping="drink.topping"
      :ice="drink.ice"
      :sugar="drink.sugar"
      @remove="removeDrink(index)"
      @change="changeDrink"
    />
    <NewOrderListItem @add-drink="addDrink" />
  </ul>
</template>

<script>
import OrderListItem from "./OrderListItem.vue";
import NewOrderListItem from "./NewOrderListItem.vue";

const drinkOptions = {
  size: ["Regular", "Large"],
  tea: ["Black milk tea", "Green milk tea", "Black tea", "Green tea"],
  topping: ["Pearls", "Coconut jelly", "No topping"],
  ice: ["Full ice", "Half ice", "No ice"],
  sugar: ["Full sugar", "Half sugar", "No sugar"]
};

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
          tea: "Black milk tea",
          topping: "Pearls",
          ice: "Half ice",
          sugar: "Half sugar"
        }
      ]
    };
  },
  methods: {
    addDrink(
      size = drinkOptions.size[0],
      tea = drinkOptions.tea[0],
      topping = drinkOptions.topping[0],
      ice = drinkOptions.ice[0],
      sugar = drinkOptions.sugar[0]
    ) {
      this.order.push({ size, tea, topping, ice, sugar });
      console.log(this.order);
    },
    removeDrink(indexToRemove) {
      console.log(indexToRemove);
      this.order = this.order.filter((item, index) => index != indexToRemove);
    },
    changeDrink(indexToChange, propertyToChange, currentIndex) {
      this.order[indexToChange][propertyToChange] =
        drinkOptions[propertyToChange][
          nextArrayIndex(currentIndex, drinkOptions[propertyToChange])
        ];
    }
  },
  components: {
    OrderListItem,
    NewOrderListItem
  }
};
</script>

<style>
li.order-item {
  padding: 15px 20px;
  margin-bottom: 1rem;
  position: relative;
  display: flex;
}

.order-item-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>