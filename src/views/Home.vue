<template>
  <div>
    <LandingSplash />
    <p>Fresh bubble tea at your door in 15 mins or it's <strong>free!</strong></p>
    <a @click="goToOrderPage()">
      <SketchedBox :fillColour="fillColour" class="filled-box" />
      <SketchedBox class="empty-box" />
      Order now!
    </a>
  </div>
</template>

<script>
import LandingSplash from '../components/home/LandingSplash.vue';
import SketchedBox from '../components/SketchedBox.vue';
import themeColours from '../data/themeColours.json';

export default {
  components: { LandingSplash, SketchedBox },
  name: 'Home',
  data() {
    return {
      fillColour: themeColours[0].fill,
    };
  },
  methods: {
    goToOrderPage() {
      this.$router.push({ path: '/order' });
    },
  },
};
</script>

<style scoped>
p {
  text-align: center;
  margin: 2rem 0;
}

a {
  display: block;
  position: relative;
  text-align: center;
  padding: 1em 3em;
  width: max-content;
  margin: 0 auto;
}

.filled-box {
  opacity: 0;
}

a:hover .filled-box {
  opacity: 0.5;
}

a:hover .empty-box {
  opacity: 0;
}
</style>
