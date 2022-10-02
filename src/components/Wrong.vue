<template>
  <span>该功能暂未开放</span>
  <NavBar :type="params.type"></NavBar>
</template>

<script setup>
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import huoyunDb from "@/db/huoyun";
import keyunDb from "@/db/keyun";
import zhuliDb from "@/db/zhuli";

const { params } = useRoute();
</script>

<style lang="scss" scoped></style>
