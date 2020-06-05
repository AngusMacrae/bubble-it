<template>
  <li>
    <div>
      Subtotal:
      <span>£{{subtotal}}</span>
    </div>
    <a href="#">Complete order</a>
  </li>
</template>

<script>
export default {
  name: "Subtotal",
  props: ["subtotal"]
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: center;
  text-align: center;
}
a {
  display: block;
  margin-left: 10vw;
  text-decoration: none;
  color: rgb(203, 82, 82);
  font-weight: bold;
}
a:hover {
  color: rgb(243, 122, 122);
}
@media (max-width: 405px) {
  a {
    margin-left: 3vw;
  }
}
</style>