<script setup></script>

<template>
  <header>
    <img src="../assets/logo.svg" alt="logo" />
    <h2>铁路职业考试题库</h2>
  </header>
  <main>
    <router-link to="/browse/keyun">
      <button>客运员中级</button>
    </router-link>
    <router-link to="/browse/huoyun">
      <button>货运员中级</button>
    </router-link>
    <router-link to="/browse/huoyunHigh">
      <button>货运员高级</button></router-link
    >
    <router-link to="/browse/zhuli">
      <button>助理值班员中级</button></router-link
    >
    <router-link to="/browse/zhuliHigh">
      <button>助理值班员高级</button></router-link
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
    width: 180px;
    margin: 1rem;
    border-radius: 50px;
  }

  @keyframes sun {
    100% {
      background-position: -400% 0;
    }
  }
}
</style>
