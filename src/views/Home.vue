<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <prize></prize>
  </div>
</template>

<script>
// @ is an alias to /src
import Prize from '@/views/Prize.vue'

export default {
  name: 'home',
  components: {
    Prize
  }
}
</script>
