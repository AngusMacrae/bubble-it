<template>
  <form>
    <fieldset>
      <label>Your name</label>
      <input type="text" required />
    </fieldset>
    <fieldset>
      <label>Your email</label>
      <input type="email" required />
    </fieldset>
    <fieldset class="message-textarea">
      <label>Your message (optional)</label>
      <textarea rows="5"></textarea>
    </fieldset>
    <a @click="processOrder()">
      <SketchedBox :fillColour="fillColour" class="filled-box" />
      <SketchedBox class="empty-box" />
      Place Order!
    </a>
  </form>
</template>

<script>
import SketchedBox from '../SketchedBox.vue';
import themeColours from '../../data/themeColours.json';

export default {
  components: { SketchedBox },
  name: 'Home',
  data() {
    return {
      fillColour: themeColours[0].fill,
    };
  },
  methods: {
    processOrder() {},
  },
};
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

input,
textarea {
  border: 0;
  font-size: 1.2rem;
  font-family: inherit;
  padding: 0.5rem 0.2rem;
  margin-top: 0.4rem;
  /* background-color: transparent; */
}

a,
.message-textarea {
  grid-column: span 2;
}

textarea {
  resize: vertical;
}

a {
  display: block;
  position: relative;
  text-align: center;
  padding: 1em 3em;
  width: max-content;
  margin: 1rem auto 0;
}

@media (max-width: 570px) {
  form {
    grid-template-columns: 1fr;
  }
  a,
  .message-textarea {
    grid-column: span 1;
  }
}
</style>
