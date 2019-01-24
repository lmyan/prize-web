<template>
  <div id="app">
    <img class='logo' src="@/assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background: #F2F6FC;
}
h1,h2,h3,h4 {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>
