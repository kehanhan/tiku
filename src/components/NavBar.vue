<template>
  <nav>
    <router-link to="/" class="item" active-class="selected">
      <var-icon class="icon" name="home" />首页</router-link
    >
    <router-link :to="'/browse/' + type" class="item" active-class="selected">
      <var-icon class="icon" name="magnify" />看题</router-link
    >
    <router-link :to="'/practice/' + type" class="item" active-class="selected"
      ><var-icon class="icon" name="checkbox-marked-circle" />刷题</router-link
    >
  </nav>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
    default: "huoyun",
  },
});
</script>

<style lang="scss" scoped>
@media (prefers-color-scheme: dark) {
  nav {
    background-color: #1e1e1e;
  }
  a {
    color: #fff;
  }
}
@media (prefers-color-scheme: light) {
  nav {
    background-color: #fff;
  }
  a {
    font-weight: normal;
    color: #000;
  }
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  height: 60px;
  position: fixed;
  width: 100%;
  bottom: 0;
  > .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px 0;
  }
  > .item.selected {
    color: #11bc87;
  }
  .icon {
    width: 25px;
    height: 25px;
  }
}
</style>
