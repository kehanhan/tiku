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
    <var-button round type="success" class="fab left" @click="back()"
      ><var-icon name="chevron-left" :size="32"
    /></var-button>
    <span class="index" @click="bottom = true">
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
          v-for="(question, index) in huoyun_db"
          :class="{
            correct:
              huoyunAnswerList[index] &&
              huoyunAnswerList[index] === huoyun_db[index].answer,
            wrong:
              huoyunAnswerList[index] &&
              huoyunAnswerList[index] !== huoyun_db[index].answer,
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
import huoyun_db from "../../db/huoyun";
import { ref } from "vue";
const hash = { 0: "A", 1: "B", 2: "C", 3: "D" };
const bottom = ref(false);
let n;
if (localStorage.getItem("last")) {
  n = ref(localStorage.getItem("last"));
} else {
  n = ref(0);
}

const saveState = () => {
  localStorage.setItem("last", n.value);
};
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
        saveState();
      }, 500);
    } else {
      Snackbar.error({
        content: "错误",
        duration: 1000,
      });
    }
    huoyunAnswerList.value[n.value] = a;
    localStorage.setItem(
      "huoyunAnswerList",
      JSON.stringify(huoyunAnswerList.value)
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
  if (n.value < huoyun_db.length - 1) {
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
    localStorage.removeItem("huoyunAnswerList");
    huoyunAnswerList.value = [];
    localStorage.removeItem("last");
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
  max-height: 60vh;
  .question {
    margin: 0.5rem;
    max-width: 12vw;
    max-height: 12vw;
    min-width: 12vw;
    min-height: 12vw;
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
