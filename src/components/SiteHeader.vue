<template>
  <h1>
    <a @click="goToHome()">
      <span>B</span>
      <span>u</span>
      <span>b</span>
      <span>b</span>
      <span>l</span>
      <span>e</span>
      <span>-</span>
      <span>i</span>
      <span>t</span>
      <span>!</span>
    </a>
  </h1>
</template>

<script>
export default {
  name: 'SiteHeader',
  methods: {
    goToHome() {
      this.$router.push({path: '/'});
    }
  }
};
</script>

<style scoped>
h1 {
  text-shadow: 3px 3px 1px black;
}

h1 span:nth-of-type(4n + 1) {
  color: var(--light-blue);
}

h1 span:nth-of-type(4n + 2) {
  color: var(--light-pink);
}

h1 span:nth-of-type(4n + 3) {
  color: var(--dark-pink);
}

h1 span:nth-of-type(4n + 4) {
  color: var(--light-yellow);
}
</style>
