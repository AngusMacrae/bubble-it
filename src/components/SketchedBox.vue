<template>
  <svg class="sketched-box" />
</template>

<script>
import rough from "roughjs/bundled/rough.cjs";

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export default {
  name: 'SketchedBox',
  props: {
    fillColour: {
      default: 'none',
    },
  },
  methods: {
    drawBox() {
      let boxElement = this.$el;
      boxElement.innerHTML = "";
      let boxDimensions = boxElement.getBoundingClientRect();
      let roughDraw = rough.svg(boxElement);
      boxElement.appendChild(
        roughDraw.rectangle(0, 0, boxDimensions.width, boxDimensions.height, {
          fill: this.fillColour,
          fillStyle: "cross-hatch",
          fillWeight: "1",
          stroke: "rgb(60,60,60)",
          roughness: 4
        })
      );
    }
  },
  watch: {
    fillColour: function() {
      this.drawBox();
    }
  },
  mounted() {
    this.drawBox();
    window.addEventListener("resize", debounce(this.drawBox, 100));
  }
};
</script>

<style scoped>
.sketched-box {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>