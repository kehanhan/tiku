<template>
  <main>
    <h3>{{ huoyun_db[n].title }}</h3>
    <var-table>
      <tbody>
        <tr v-for="(option, index) in huoyun_db[n].choseList">
          <div
            class="option"
            :class="{
              correct:
                huoyunAnswerList[n] && hash[index] === huoyun_db[n].answer,
              wrong:
                hash[index] === huoyunAnswerList[n] &&
                hash[index] !== huoyun_db[n].answer,
            }"
            @click="check(hash[index])"
          >
            <span class="number">{{ hash[index] }} .</span>
            <span class="text">{{ option.item }}</span>
          </div>
        </tr>
      </tbody>
    </var-table>
  </main>
  <footer>
    <var-button round type="success" class="fab left" @click="n > 0 && n--"
      ><var-icon name="chevron-left" :size="32"
    /></var-button>
    <span class="index">
      <span
        :class="{
          correct:
            huoyunAnswerList[n] && huoyunAnswerList[n] === huoyun_db[n].answer,
          wrong:
            huoyunAnswerList[n] && huoyunAnswerList[n] !== huoyun_db[n].answer,
        }"
        >{{ n + 1 }}</span
      >/{{ huoyun_db.length }}
    </span>
    <var-button
      round
      type="success"
      class="fab right"
      @click="n < huoyun_db.length - 1 && n++"
      ><var-icon name="chevron-right" :size="32"
    /></var-button>
  </footer>
</template>

<script setup>
import { Snackbar } from "@varlet/ui";
import huoyun_db from "../../db/huoyun";
import { ref } from "vue";
const hash = { 0: "A", 1: "B", 2: "C", 3: "D" };

let n = ref(0);

const huoyunAnswerList = ref([]);
if (localStorage.getItem("huoyunAnswerList")) {
  huoyunAnswerList.value = JSON.parse(localStorage.getItem("huoyunAnswerList"));
}

const check = (a) => {
  if (huoyunAnswerList.value[n.value]) {
    return;
  } else {
    if (a === huoyun_db[n.value].answer) {
      Snackbar.success({
        content: "正确",
        duration: 500,
      });
      setTimeout(() => {
        n.value++;
      }, 500);
    } else {
      Snackbar.error({
        content: "错误",
        duration: 500,
      });
    }
    huoyunAnswerList.value[n.value] = a;
    localStorage.setItem(
      "huoyunAnswerList",
      JSON.stringify(huoyunAnswerList.value)
    );
  }
};
</script>

<style lang="scss" scoped>
.correct {
  color: #57c093 !important;
}
.wrong {
  color: red !important;
}
main {
  margin-top: 2rem;
  padding: 1rem;
  width: 100vw;
  h3 {
    margin-bottom: 2rem;
  }

  .option {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    .number {
      border-radius: 50%;
      padding: 0.5rem;
    }
    .text {
      padding: 0.5rem;
    }
  }
}

footer {
  .fab {
    position: fixed;
    bottom: 5%;
  }
  .index {
    position: fixed;
    bottom: 6%;
    left: 50%;
    transform: translateX(-50%);
  }
  .left {
    left: 15%;
  }
  .right {
    right: 15%;
  }
}
</style>
