<template>
  <div v-if="!wrongListRef.length" style="margin-top: 20vh">
    <var-icon name="information" :size="64" />
    <p>暂无错题</p>
  </div>

  <div v-else>
    <var-popup position="bottom" v-model:show="bottomRef">
      <div class="questions">
        <var-button
          text
          outline
          round
          class="question"
          v-for="(question, index) in wrongListRef"
          :class="{
            correct:
              reAnswerListRef[index] &&
              reAnswerListRef[index] === db[wrongListRef[index]].answer,
            wrong:
              reAnswerListRef[index] &&
              reAnswerListRef[index] !== db[wrongListRef[index]].answer,
          }"
          @click="jump(index)"
        >
          {{ index + 1 }}
        </var-button>
      </div>
    </var-popup>

    <main>
      <h3>{{ db[wrongListRef[wrongIdRef]].title }}</h3>
      <var-table>
        <tbody>
          <tr v-for="(option, index) in db[wrongListRef[wrongIdRef]].choseList">
            <div
              class="option"
              :class="{
                correct:
                  reAnswerListRef[wrongIdRef] &&
                  hashOption[index] === db[wrongListRef[wrongIdRef]].answer,
                wrong:
                  hashOption[index] === reAnswerListRef[wrongIdRef] &&
                  hashOption[index] !== db[wrongListRef[wrongIdRef]].answer,
              }"
              @click="check(hashOption[index])"
            >
              <span class="number">{{ hashOption[index] }} .</span>
              <span class="text">{{ option.item }}</span>
            </div>
          </tr>
        </tbody>
      </var-table>
      <var-button type="success" id="got" @click="got()">已掌握</var-button>
    </main>

    <footer>
      <var-button round type="success" class="fab left" @click="back()"
        ><var-icon name="chevron-left" :size="24"
      /></var-button>
      <span class="index" @click="bottomRef = true">
        <span
          :class="{
            correct:
              reAnswerListRef[wrongIdRef] &&
              reAnswerListRef[wrongIdRef] ===
                db[wrongListRef[wrongIdRef]].answer,
            wrong:
              reAnswerListRef[wrongIdRef] &&
              reAnswerListRef[wrongIdRef] !==
                db[wrongListRef[wrongIdRef]].answer,
          }"
          >{{ parseInt(wrongIdRef) + 1 }}</span
        >/{{ wrongListRef.length }}
      </span>
      <var-button round type="success" class="fab right" @click="next()"
        ><var-icon name="chevron-right" :size="24"
      /></var-button>
    </footer>
  </div>

  <NavBar :type="params.type"></NavBar>
</template>

<script setup>
import { ref } from "vue";
import { Snackbar } from "@varlet/ui";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import huoyunLow from "@/db/huoyun/low";
import huoyunMedium from "@/db/huoyun/medium";
import huoyunHigh from "@/db/huoyun/high";
import keyunMedium from "@/db/keyun/medium";
import zhuliMedium from "@/db/zhuli/medium";
import zhuliHigh from "@/db/zhuli/high";

const { params } = useRoute();
const hashDb = {
  huoyunLow,
  huoyunMedium,
  huoyunHigh,
  keyunMedium,
  zhuliMedium,
  zhuliHigh,
};
const hashOption = { 0: "A", 1: "B", 2: "C", 3: "D" };

window[params.type + "Db"] = hashDb[params.type];
window[params.type + "WrongId"] = 0;
window[params.type + "ReAnswerList"] = [];
window[params.type + "WrongList"] = [];

const db = window[params.type + "Db"];
const wrongIdRef = ref(window[params.type + "WrongId"]);
const reAnswerListRef = ref(window[params.type + "ReAnswerList"]);
const wrongListRef = ref(window[params.type + "WrongList"]);
const bottomRef = ref(false);

if (localStorage.getItem(params.type + "WrongId")) {
  wrongIdRef.value = localStorage.getItem(params.type + "WrongId");
}
if (localStorage.getItem(params.type + "ReAnswerList")) {
  reAnswerListRef.value = JSON.parse(
    localStorage.getItem(params.type + "ReAnswerList")
  );
}
if (localStorage.getItem(params.type + "WrongList")) {
  wrongListRef.value = JSON.parse(
    localStorage.getItem(params.type + "WrongList")
  );
}

const saveState = () => {
  localStorage.setItem(params.type + "WrongId", wrongIdRef.value);
};
const back = () => {
  if (wrongIdRef.value > 0) {
    wrongIdRef.value--;
  }
  saveState();
};
const next = () => {
  if (wrongIdRef.value < wrongListRef.value.length - 1) {
    wrongIdRef.value++;
  }
  saveState();
};
const check = (answer) => {
  if (answer === db[wrongListRef.value[wrongIdRef.value]].answer) {
    Snackbar.success({
      content: "正确",
      duration: 500,
    });
    wrongIdRef.value < wrongListRef.value.length - 1 &&
      setTimeout(() => {
        wrongIdRef.value++;
        saveState();
      }, 500);
  } else {
    Snackbar.error({
      content: "错误",
      duration: 1000,
    });
  }
  reAnswerListRef.value[wrongIdRef.value] = answer;
  localStorage.setItem(
    params.type + "ReAnswerList",
    JSON.stringify(reAnswerListRef.value)
  );
};
const got = () => {
  wrongListRef.value.splice(wrongIdRef.value, 1);
  reAnswerListRef.value.splice(wrongIdRef.value, 1);
  localStorage.setItem(
    params.type + "WrongList",
    JSON.stringify(wrongListRef.value)
  );
  localStorage.setItem(
    params.type + "ReAnswerList",
    JSON.stringify(reAnswerListRef.value)
  );
  if (wrongIdRef.value > 0) {
    wrongIdRef.value--;
    saveState();
  }
};
const jump = (index) => {
  wrongIdRef.value = index;
  bottomRef.value = false;
  saveState();
};
</script>

<style lang="scss" scoped>
.questions {
  color: black;
  max-height: 75vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .question {
    margin: 0.5rem;
    max-width: 40px;
    max-height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
}

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
  #got {
    position: fixed;
    bottom: 25%;
    left: 50%;
    transform: translateX(-50%);
    display: table;
  }
}

footer {
  .fab {
    position: fixed;
    bottom: 12%;
  }
  .index {
    position: fixed;
    font-size: 20px;
    bottom: 13%;
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
