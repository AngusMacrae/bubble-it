<template>
  <main>
    <div class="page-wrapper">
      <SiteHeader />
      <router-view />
    </div>
  </main>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue';

export default {
  name: 'App',
  components: {
    SiteHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap');

/* CUSTOM PROPERTIES */

:root {
  --primary-colour: #fff;
  --light-blue: #beebe9;
  --light-pink: #f4dada;
  --dark-pink: #ffb6b9;
  --light-yellow: #f6eec7;
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
  background-image: url('./assets/paper-texture.png');
  color: #777;
  font-size: 1.5rem;
}

main {
  font-family: 'Cabin Sketch', cursive;
  line-height: 1.5;
  min-height: 100vh;
  counter-reset: drinkNumber;
}

.page-wrapper {
  max-width: 760px;
  margin: 0 auto;
  padding: 1rem;
}

h1,
h2,
h3 {
  color: #222;
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
  content: ' ' counter(drinkNumber);
}

a {
  text-decoration: none;
  color: rgb(203, 82, 82);
  font-weight: bold;
  cursor: pointer;
}
a:hover {
  color: rgb(243, 122, 122);
}
</style>
