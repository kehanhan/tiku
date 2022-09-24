<template>
  <router-link to="huoyun_test"
    ><var-button type="success" round large class="fab">
      <var-icon name="check" :size="32" /> </var-button
  ></router-link>

  <ol>
    <li v-for="item in huoyun_db">
      <span class="title">{{ item.title }} </span>
      <div class="options">
        <span v-for="(choice, index) in item.choseList">
          <span :class="hash[index] === item.answer && 'correct'"
            >{{ hash[index] }}:{{ choice.item }}</span
          >
          <br />
        </span>
      </div>
    </li>
  </ol>
</template>

<script setup>
import huoyun_db from "../db/huoyun.js";
const hash = { 0: "A", 1: "B", 2: "C", 3: "D" };
</script>

<style lang="scss" scoped>
.fab {
  position: fixed;
  bottom: 5%;
  right: 5%;
}
ol {
  margin-left: 3rem;
  margin-right: 2rem;
}
.title {
  font-weight: bolder;
}
.options {
  padding: 0.5rem;
}
.correct {
  color: red;
  font-weight: bold;
}
</style>
