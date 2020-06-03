<template>
  <main>
    <div class="container">
      <Header />
      <OrderListHeader />
      <OrderList />
    </div>
  </main>
</template>

<script>
import Header from "./components/Header.vue";
import OrderList from "./components/OrderList.vue";
import OrderListHeader from "./components/OrderListHeader.vue";

export default {
  name: "App",
  components: {
    Header,
    OrderList,
    OrderListHeader
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap");

/* CUSTOM PROPERTIES */

:root {
  --primary-colour: #fff;
  /* --background-colour: #DBF8B2; */
}

/* RESET */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

/* BASE STYLES */

body {
  /* background-image: url("./assets/135.jpg"); */
  background-image: url("./assets/paper-texture.png");
}

main {
  font-family: "Cabin Sketch", cursive;
  line-height: 1.5;
  min-height: 100vh;
  counter-reset: drinkNumber;
}

.container {
  max-width: 760px;
  margin: 0 auto;
  padding: 1rem;
}

/* TYPOGRAPHY */

h1 {
  font-size: 3.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 2rem;
}

h3::after {
  counter-increment: drinkNumber;
  content: " " counter(drinkNumber);
}

p,
li {
  font-size: 1.5rem;
}
</style>
