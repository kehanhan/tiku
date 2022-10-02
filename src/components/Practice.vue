<template>
  <var-popup position="bottom" v-model:show="bottom">
    <div class="questions">
      <var-button
        text
        outline
        round
        class="question"
        v-for="(question, index) in db"
        :class="{
          correct: answerList[index] && answerList[index] === db[index].answer,
          wrong: answerList[index] && answerList[index] !== db[index].answer,
        }"
        @click="jump(index)"
      >
        {{ index + 1 }}
      </var-button>
    </div>
    <var-button round type="danger" class="delete" @click="empty"
      ><var-icon name="delete" :size="32"
    /></var-button>
  </var-popup>

  <main>
    <h3>{{ db[id].title }}</h3>
    <var-table>
      <tbody>
        <tr v-for="(option, index) in db[id].choseList">
          <div
            class="option"
            :class="{
              correct: answerList[id] && hashOption[index] === db[id].answer,
              wrong:
                hashOption[index] === answerList[id] &&
                hashOption[index] !== db[id].answer,
            }"
            @click="check(hashOption[index])"
          >
            <span class="number">{{ hashOption[index] }} .</span>
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
          correct: answerList[id] && answerList[id] === db[id].answer,
          wrong: answerList[id] && answerList[id] !== db[id].answer,
        }"
        >{{ parseInt(id) + 1 }}</span
      >/{{ db.length }}
    </span>
    <var-button round type="success" class="fab right" @click="next()"
      ><var-icon name="chevron-right" :size="32"
    /></var-button>
  </footer>
  <NavBar :type="params.type"></NavBar>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Dialog, Snackbar } from "@varlet/ui";
import NavBar from "@/components/NavBar.vue";
import huoyunDb from "@/db/huoyun";
import keyunDb from "@/db/keyun";
import zhuliDb from "@/db/zhuli";

const { params } = useRoute();
const hashDb = {
  huoyun: huoyunDb,
  keyun: keyunDb,
  zhuli: zhuliDb,
};
const hashOption = { 0: "A", 1: "B", 2: "C", 3: "D" };

window[params.type + "Db"] = hashDb[params.type];
window[params.type + "Id"] = 0;
window[params.type + "AnswerList"] = [];

const db = window[params.type + "Db"];
const id = ref(window[params.type + "Id"]);
const answerList = ref(window[params.type + "AnswerList"]);
const bottom = ref(false);

if (localStorage.getItem(params.type + "Id")) {
  id.value = localStorage.getItem(params.type + "Id");
}

if (localStorage.getItem(params.type + "AnswerList")) {
  answerList.value = JSON.parse(
    localStorage.getItem(params.type + "AnswerList")
  );
}

const saveState = () => {
  localStorage.setItem(params.type + "Id", id.value);
};
const back = () => {
  if (id.value > 0) {
    id.value--;
  }
  saveState();
};
const next = () => {
  if (id.value < db.length - 1) {
    id.value++;
  }
  saveState();
};
const check = (answer) => {
  if (answerList.value[id.value]) {
    return;
  } else {
    if (answer === db[id.value].answer) {
      Snackbar.success({
        content: "正确",
        duration: 500,
      });
      id.value < db.length - 1 &&
        setTimeout(() => {
          id.value++;
          saveState();
        }, 500);
    } else {
      Snackbar.error({
        content: "错误",
        duration: 1000,
      });
    }
    answerList.value[id.value] = answer;
    localStorage.setItem(
      params.type + "AnswerList",
      JSON.stringify(answerList.value)
    );
  }
};
const jump = (index) => {
  id.value = index;
  bottom.value = false;
  saveState();
};
const empty = async () => actions[await Dialog("确定要删除答题记录吗？")]();
const actions = {
  confirm: () => {
    localStorage.removeItem(params.type + "AnswerList");
    answerList.value = [];
    localStorage.removeItem(params.type + "Id");
    id.value = 0;
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
.delete {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
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
