<script setup></script>

<template>
  <header>
    <img src="../assets/logo.svg" alt="logo" />
    <h2>铁路职业考试题库</h2>
  </header>
  <main>
    <router-link to="/browse/keyun">
      <button>客运员</button>
    </router-link>
    <router-link to="/browse/huoyun">
      <button id="vip">货运员</button>
    </router-link>
    <router-link to="/browse/zhuli"> <button>助理值班员</button></router-link>
    <router-link to="/browse/zhuliHigh">
      <button>助理值班员(高级)</button></router-link
    >
  </main>
</template>

<style lang="scss" scoped>
header {
  text-align: center;
  img {
    margin: 3rem;
    max-width: 8rem;
    max-height: 8rem;
  }
}
main {
  margin-top: 5vh;

  a {
    display: flex;
    justify-content: center;
  }

  button {
    width: 150px;
    margin: 1rem;
    border-radius: 50px;
  }
  #vip {
    font-size: 24px;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    color: white;
    background-size: 400%;
    z-index: 1;
    animation: sun 8s infinite;
  }

  @keyframes sun {
    100% {
      background-position: -400% 0;
    }
  }
}
</style>
