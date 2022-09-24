<script setup></script>

<template>
  <header>
    <img src="./assets/logo.png" alt="logo" />
    <h2>铁路职业考试题库</h2>
  </header>
  <main>
    <button>客运员</button>
    <button id="vip">货运员</button>
    <button>助理值班员</button>
  </main>
</template>

<style lang="scss" scoped>
header {
  text-align: center;
  img {
    margin: 2rem;
  }
}
main {
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    margin: 1rem;
  }
  #vip {
    font-size: 2em;
    border-radius: 8px;
    -webkit-mask-image: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      cyan,
      blue,
      purple
    );
    background-image: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      yellow,
      orange,
      red,
      orange,
      yellow,
      green,
      yellow,
      orange,
      red
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-size: 200% 100%;
    animation: bgp 5s infinite linear;
  }
  @-webkit-keyframes bgp {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
}
</style>
