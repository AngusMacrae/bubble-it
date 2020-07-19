<template>
  <form>
    <fieldset>
      <label>Enter your name</label>
      <input type="text" />
    </fieldset>
    <fieldset>
      <label>Enter your email</label>
      <input type="email" />
    </fieldset>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
form {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  padding: 1rem 0 3rem;
  font-size: 1.5rem;
}

fieldset {
  padding: 0;
  border: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-block-start: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-block-end: 0;
}

fieldset > * {
  width: 100%;
}

input {
  border: 0;
  font-size: 1.2rem;
  font-family: inherit;
  padding: 0.5rem 0.2rem;
  margin-top: 0.4rem;
  /* background-color: transparent; */
}
</style>
