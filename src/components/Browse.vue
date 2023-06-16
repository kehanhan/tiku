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
import huoyunLow from "@/db/huoyun/low";
import huoyunMedium from "@/db/huoyun/medium";
import huoyunHigh from "@/db/huoyun/high";
import huojianMedium from "@/db/huojian/medium";
import keyunMedium from "@/db/keyun/medium";
import zhuliMedium from "@/db/zhuli/medium";
import zhuliHigh from "@/db/zhuli/high";
import lianjieLow from "@/db/lianjie/low";
import lianjieMedium from "@/db/lianjie/medium";
import chezhanMedium from "@/db/chezhan/medium";
import chezhanHigh from "@/db/chezhan/high";

const { params } = useRoute();
const hashDb = {
  huoyunLow,
  huoyunMedium,
  huoyunHigh,
  huojianMedium,
  keyunMedium,
  zhuliMedium,
  zhuliHigh,
  lianjieLow,
  lianjieMedium,
  chezhanMedium,
  chezhanHigh
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
