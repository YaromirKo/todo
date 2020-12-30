<template>
  <div v-if="show">
    <div v-for="index in count" :key="index" class="snow"></div>
  </div>
</template>

<script>
export default {
  name: "Snowfall",
  data: () => ({
    count: 25,
    show: [0, 11].includes((new Date()).getMonth())
  })
}
</script>

<style scoped lang="scss">
@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}

.snow {
  $total: 25;
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;

  @for $i from 1 through $total {
    $random-x: 30vw;
    $random-offset: random_range(-40, 40) * 1vw;
    $random-x-end: $random-x + $random-offset;
    $random-x-end-yoyo: $random-x + ($random-offset / 2);
    $random-yoyo-time: random_range(30000, 80000) / 100000;
    $random-yoyo-y: $random-yoyo-time * 10vh;
    $random-scale: random(10000) * 0.0001;
    $fall-duration: random_range(10, 30) * 3s;
    $fall-delay: random(30) * -1s;

    &:nth-child(#{$i}) {
      opacity: random(10000) * 0.0001;
      transform: translate($random-x, -10px) scale($random-scale);
      animation: fall-#{$i} $fall-duration $fall-delay linear infinite;
    }

    @keyframes fall-#{$i} {
      #{percentage($random-yoyo-time)} {
        transform: translate($random-x-end, $random-yoyo-y) scale($random-scale);
      }

      to {
        transform: translate($random-x-end-yoyo, 10vh) scale($random-scale);
      }
    }
  }
}
</style>
