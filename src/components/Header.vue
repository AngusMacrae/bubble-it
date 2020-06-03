<template>
  <h1>
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
  </h1>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
h1 {
  text-shadow: 3px 3px 1px black;
}

h1 span:nth-of-type(1),
h1 span:nth-of-type(5),
h1 span:nth-of-type(9) {
  color: var(--light-blue);
}

h1 span:nth-of-type(2),
h1 span:nth-of-type(6),
h1 span:nth-of-type(10) {
  color: var(--light-pink);
}

h1 span:nth-of-type(3),
h1 span:nth-of-type(7),
h1 span:nth-of-type(11) {
  color: var(--dark-pink);
}

h1 span:nth-of-type(4),
h1 span:nth-of-type(8),
h1 span:nth-of-type(12) {
  color: var(--light-yellow);
}
</style>