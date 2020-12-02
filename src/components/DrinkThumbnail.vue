<template>
  <svg class="drink-thumbnail" />
</template>

<script>
import drinkImageConstants from '../data/drinkImageConstants.json';
import rough from 'roughjs/bundled/rough.cjs';

export default {
  name: 'DrinkThumbnail',
  data() {
    return {
      roughDraw: '',
    };
  },
  props: ['options', 'strawDirection'],
  watch: {
    options: {
      deep: true,
      handler() {
        this.drawDrinkImage();
      },
    },
    strawDirection: function() {
      setTimeout(() => {
        this.drawDrinkImage();
      }, 500);
    },
  },
  methods: {
    drawDrinkImage() {
      this.$el.innerHTML = '';
      this.drawStraw();
      this.drawTea();
      this.drawMilk();
      this.drawIce();
      this.drawTopping();
      this.drawCup();
    },
    drawStraw() {
      const svgPath = drinkImageConstants.straw[this.strawDirection][this.options.size];
      const svgOptions = {
        strokeWidth: '1',
        stroke: 'rgb(60,60,60)',
      };
      const straw = this.roughDraw.path(svgPath, svgOptions);
      straw.classList.add('straw');
      this.$el.appendChild(straw);
    },
    drawTea() {
      const svgPath = drinkImageConstants.tea[this.options.size];
      const svgOptions = {
        fill: drinkImageConstants.teaColor[this.options.tea],
        fillStyle: 'solid',
        strokeWidth: 0,
        roughness: 0,
      };
      const tea = this.roughDraw.path(svgPath, svgOptions);
      tea.classList.add('tea');
      this.$el.appendChild(tea);
    },
    drawMilk() {
      if (this.options.milk == 0) {
        const svgPath = drinkImageConstants.milk[this.options.size];
        const svgOptions = {
          fill: 'rgba(255,250,250,0.9)',
          fillStyle: 'solid',
          strokeWidth: 0,
          roughness: 0,
        };
        const milk = this.roughDraw.path(svgPath, svgOptions);
        milk.classList.add('milk');
        this.$el.appendChild(milk);
      }
    },
    drawIce() {
      const svgOptions = {
        fill: 'rgba(245,245,255,0.95)',
        fillStyle: 'solid',
        stroke: 'rgba(60,60,60,0.3)',
        strokeWidth: 0.5,
        roughness: 0.5,
      };
      drinkImageConstants.ice[this.options.size][this.options.ice].forEach(svgPath => {
        const iceCube = this.roughDraw.path(svgPath, svgOptions);
        iceCube.classList.add('iceCube');
        this.$el.appendChild(iceCube);
      });
    },
    drawTopping() {
      switch (this.options.topping) {
        case 0:
          this.drawPearls();
          break;
        case 1:
          this.drawJelly();
          break;
      }
    },
    drawPearls() {
      const svgOptions = {
        fill: 'rgba(37,23,26,0.9)',
        strokeWidth: 0,
        roughness: 0.3,
        fillStyle: 'solid',
      };
      drinkImageConstants.topping.pearls[this.options.size].forEach(circleParameters => {
        const svgCircle = [...circleParameters, 7];
        const pearl = this.roughDraw.circle(...svgCircle, svgOptions);
        pearl.classList.add('topping');
        pearl.classList.add('pearl');
        this.$el.appendChild(pearl);
      });
    },
    drawJelly() {
      const svgOptions = {
        fill: 'rgba(245,255,245,0.95)',
        strokeWidth: 0.5,
        stroke: 'rgba(60,60,60,0.3)',
        roughness: 0.4,
        fillStyle: 'solid',
      };
      drinkImageConstants.topping.jelly[this.options.size].forEach(rectangleParameters => {
        const svgRectangle = [...rectangleParameters, 12, 6];
        const jelly = this.roughDraw.rectangle(...svgRectangle, svgOptions);
        jelly.classList.add('topping');
        jelly.classList.add('jelly');
        this.$el.appendChild(jelly);
      });
      // TODO: draw slanted jelly in the same loop as normal jelly?
      // adjuster = this.options.size == 0 ? 1 : 0;
      // for (
      //   let i = 0;
      //   i < drinkImageConstants.topping.jellySlanted.length - adjuster;
      //   i++
      // ) {
      //   const svgPath = drinkImageConstants.topping.jellySlanted[i];
      //   const svgOptions = {
      //     fill: "rgba(245,255,245,0.95)",
      //     strokeWidth: 0.5,
      //     stroke: "rgba(60,60,60,0.3)",
      //     roughness: 0.4,
      //     fillStyle: "solid"
      //   };
      //   const jelly = this.roughDraw.path(svgPath, svgOptions);
      //   this.$el.appendChild(jelly);
      //   this.$el.lastElementChild.classList.add("jelly-slanted" + i);
      // }
    },
    drawCup() {
      const cup = this.roughDraw.path(drinkImageConstants.cup[this.options.size], {
        stroke: 'rgb(60,60,60)',
      });
      cup.classList.add('cup');
      this.$el.appendChild(cup);
    },
  },
  mounted() {
    this.roughDraw = rough.svg(this.$el);
    this.drawDrinkImage();
  },
};
</script>

<style scoped>
.drink-thumbnail {
  width: 100px;
  height: 200px;
}
</style>

<style>
.ice-cube {
  transform-box: fill-box;
  transform-origin: center;
  animation: bob 2s ease-in-out infinite normal backwards;
}

.ice-cube-0 {
  animation-delay: 0s;
}

.ice-cube-1 {
  animation-delay: -0.3s;
}

.ice-cube-2 {
  animation-delay: -0.1s;
}

.ice-cube-3 {
  animation-delay: -0.5s;
}

.ice-cube-4 {
  animation-delay: -0.7s;
}

@keyframes bob {
  0% {
    transform: translateY(1.5px) rotate(-2deg);
  }
  25% {
    transform: translateY(0px) rotate(4deg);
  }
  50% {
    transform: translateY(-1.5px) rotate(-4deg);
  }
  75% {
    transform: translateY(0px) rotate(4deg);
  }
  100% {
    transform: translateY(1.5px) rotate(-2deg);
  }
}
</style>
