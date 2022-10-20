<template>
  <ol>
    <li v-for="item in db">
      <span class="title">{{ item.title }} </span>
      <div class="options">
        <span v-for="(choice, index) in item.choseList">
          <span :class="hashOption[index] === item.answer && 'correct'"
            >{{ hashOption[index] }}:{{ choice.item }}</span
          >
          <br />
        </span>
      </div>
    </li>
  </ol>
  <NavBar :type="params.type"></NavBar>
</template>

<script setup>
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import huoyunDb from "@/db/huoyun";
import huoyunHighDb from "@/db/huoyunHigh";
import keyunDb from "@/db/keyun";
import zhuliDb from "@/db/zhuli";
import zhuliHighDb from "@/db/zhuliHigh";

const { params } = useRoute();
const hashDb = {
  huoyun: huoyunDb,
  huoyunHigh: huoyunHighDb,
  keyun: keyunDb,
  zhuli: zhuliDb,
  zhuliHigh: zhuliHighDb,
};
const hashOption = { 0: "A", 1: "B", 2: "C", 3: "D" };

window[params.type + "Db"] = hashDb[params.type];
const db = window[params.type + "Db"];
</script>

<style lang="scss" scoped>
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
