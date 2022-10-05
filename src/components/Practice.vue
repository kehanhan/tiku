<template>
  <var-popup position="bottom" v-model:show="bottomRef">
    <div class="questions">
      <var-button
        text
        outline
        round
        class="question"
        v-for="(question, index) in db"
        :class="{
          correct:
            answerListRef[index] && answerListRef[index] === db[index].answer,
          wrong:
            answerListRef[index] && answerListRef[index] !== db[index].answer,
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
    <h3>{{ db[idRef].title }}</h3>
    <var-table>
      <tbody>
        <tr v-for="(option, index) in db[idRef].choseList">
          <div
            class="option"
            :class="{
              correct:
                answerListRef[idRef] && hashOption[index] === db[idRef].answer,
              wrong:
                hashOption[index] === answerListRef[idRef] &&
                hashOption[index] !== db[idRef].answer,
            }"
            @click="check(hashOption[index])"
          >
            <span class="number">{{ hashOption[index] }} .</span>
            <span class="text">{{ option.item }}</span>
          </div>
        </tr>
      </tbody>
    </var-table>
    <var-button type="success" id="add" @click="add()">添加到错题库</var-button>
  </main>

  <footer>
    <var-button round type="success" class="fab left" @click="back()"
      ><var-icon name="chevron-left" :size="24"
    /></var-button>
    <span class="index" @click="bottomRef = true">
      <span
        :class="{
          correct:
            answerListRef[idRef] && answerListRef[idRef] === db[idRef].answer,
          wrong:
            answerListRef[idRef] && answerListRef[idRef] !== db[idRef].answer,
        }"
        >{{ parseInt(idRef) + 1 }}</span
      >/{{ db.length }}
    </span>
    <var-button round type="success" class="fab right" @click="next()"
      ><var-icon name="chevron-right" :size="24"
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
window[params.type + "WrongList"] = [];

const db = window[params.type + "Db"];
const idRef = ref(window[params.type + "Id"]);
const answerListRef = ref(window[params.type + "AnswerList"]);
const wrongListRef = ref(window[params.type + "WrongList"]);
const bottomRef = ref(false);

if (localStorage.getItem(params.type + "Id")) {
  idRef.value = localStorage.getItem(params.type + "Id");
}

if (localStorage.getItem(params.type + "AnswerList")) {
  answerListRef.value = JSON.parse(
    localStorage.getItem(params.type + "AnswerList")
  );
}
if (localStorage.getItem(params.type + "WrongList")) {
  wrongListRef.value = JSON.parse(
    localStorage.getItem(params.type + "WrongList")
  );
}

const saveState = () => {
  localStorage.setItem(params.type + "Id", idRef.value);
};
const back = () => {
  if (idRef.value > 0) {
    idRef.value--;
  }
  saveState();
};
const next = () => {
  if (idRef.value < db.length - 1) {
    idRef.value++;
  }
  saveState();
};
const check = (answer) => {
  if (answerListRef.value[idRef.value]) {
    return;
  } else {
    if (answer === db[idRef.value].answer) {
      Snackbar.success({
        content: "正确",
        duration: 500,
      });
      idRef.value < db.length - 1 &&
        setTimeout(() => {
          idRef.value++;
          saveState();
        }, 500);
    } else {
      Snackbar.error({
        content: "错误",
        duration: 1000,
      });
      !wrongListRef.value.includes(parseInt(idRef.value)) &&
        wrongListRef.value.push(parseInt(idRef.value));
      localStorage.setItem(
        params.type + "WrongList",
        JSON.stringify(wrongListRef.value)
      );
    }
    answerListRef.value[idRef.value] = answer;
    localStorage.setItem(
      params.type + "AnswerList",
      JSON.stringify(answerListRef.value)
    );
  }
};
const add = () => {
  if (!wrongListRef.value.includes(parseInt(idRef.value))) {
    wrongListRef.value.push(parseInt(idRef.value));
    localStorage.setItem(
      params.type + "WrongList",
      JSON.stringify(wrongListRef.value)
    );
    Snackbar.success({
      content: "添加成功",
      duration: 500,
    });
  } else {
    Snackbar.error({
      content: "已经添加过了",
      duration: 500,
    });
  }
};
const jump = (index) => {
  idRef.value = index;
  bottomRef.value = false;
  saveState();
};
const empty = async () => actions[await Dialog("确定要删除答题记录吗？")]();
const actions = {
  confirm: () => {
    localStorage.removeItem(params.type + "AnswerList");
    answerListRef.value = [];
    localStorage.removeItem(params.type + "Id");
    idRef.value = 0;
    bottomRef.value = false;
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

  #add {
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
