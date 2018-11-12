<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/styles/_variables.scss';
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  background: $black-color;
}

.ui-view {
  width: 100%;
  height: 100%;
}
</style>
