<template>
  <main>
    <h3>{{ zhuli_db[n].title }}</h3>
    <var-table>
      <tbody>
        <tr v-for="(option, index) in zhuli_db[n].choseList">
          <div
            class="option"
            :class="{
              correct: zhuliAnswerList[n] && hash[index] === zhuli_db[n].answer,
              wrong:
                hash[index] === zhuliAnswerList[n] &&
                hash[index] !== zhuli_db[n].answer,
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
    <var-button round type="success" class="fab left" @click="back()"
      ><var-icon name="chevron-left" :size="32"
    /></var-button>
    <span class="index" @click="bottom = true">
      <span
        :class="{
          correct:
            zhuliAnswerList[n] && zhuliAnswerList[n] === zhuli_db[n].answer,
          wrong:
            zhuliAnswerList[n] && zhuliAnswerList[n] !== zhuli_db[n].answer,
        }"
        >{{ n + 1 }}</span
      >/{{ zhuli_db.length }}
    </span>
    <var-button round type="success" class="fab right" @click="next()"
      ><var-icon name="chevron-right" :size="32"
    /></var-button>
    <var-popup position="bottom" v-model:show="bottom">
      <div class="questions">
        <var-button
          text
          outline
          round
          class="question"
          v-for="(question, index) in zhuli_db"
          :class="{
            correct:
              zhuliAnswerList[index] &&
              zhuliAnswerList[index] === zhuli_db[index].answer,
            wrong:
              zhuliAnswerList[index] &&
              zhuliAnswerList[index] !== zhuli_db[index].answer,
          }"
          @click="jump(index)"
        >
          {{ index + 1 }}
        </var-button>
      </div>
      <var-button round type="danger" class="fab medium" @click="empty"
        ><var-icon name="delete" :size="32"
      /></var-button>
    </var-popup>
  </footer>
</template>

<script setup>
import { Dialog, Snackbar } from "@varlet/ui";
import zhuli_db from "../../db/zhuli.js";
import { ref } from "vue";
const hash = { 0: "A", 1: "B", 2: "C", 3: "D" };
const bottom = ref(false);
let n;
if (localStorage.getItem("zhuliIndex")) {
  n = ref(localStorage.getItem("zhuliIndex"));
} else {
  n = ref(0);
}

const saveState = () => {
  localStorage.setItem("zhuliIndex", n.value);
};
const zhuliAnswerList = ref([]);
if (localStorage.getItem("zhuliAnswerList")) {
  zhuliAnswerList.value = JSON.parse(localStorage.getItem("zhuliAnswerList"));
}

const check = (a) => {
  if (zhuliAnswerList.value[n.value]) {
    return;
  } else {
    if (a === zhuli_db[n.value].answer) {
      Snackbar.success({
        content: "正确",
        duration: 500,
      });
      setTimeout(() => {
        n.value++;
        saveState();
      }, 500);
    } else {
      Snackbar.error({
        content: "错误",
        duration: 1000,
      });
    }
    zhuliAnswerList.value[n.value] = a;
    localStorage.setItem(
      "zhuliAnswerList",
      JSON.stringify(zhuliAnswerList.value)
    );
  }
};
const back = () => {
  if (n.value > 0) {
    n.value--;
  }
  saveState();
};
const next = () => {
  if (n.value < zhuli_db.length - 1) {
    n.value++;
  }
  saveState();
};
const jump = (index) => {
  n.value = index;
  bottom.value = false;
  saveState();
};
const empty = async () => actions[await Dialog("确定要删除答题记录吗？")]();
const actions = {
  confirm: () => {
    localStorage.removeItem("zhuliAnswerList");
    zhuliAnswerList.value = [];
    localStorage.removeItem("zhuliIndex");
    n.value = 0;
    bottom.value = false;
    saveState();
    Snackbar.success("已删除");
  },
  cancel: () => {
    Snackbar.error("删除失败");
  },
  close: () => Snackbar.info("什么都没发生"),
};
</script>

<style lang="scss" scoped>
.questions {
  color: black;
  max-height: 75vh;
  text-align: center;
  .question {
    margin: 0.5rem;
    max-width: 36px;
    max-height: 36px;
    min-width: 36px;
    min-height: 36px;
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
  .medium {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
