<template>
  <div class="test">
    <h2 class="question">{{ question }}</h2>
    <img
      :src="`./img/${questionIndex + 1}.png`"
      :alt="`./img/${questionIndex + 1}.png not found`"
      class="demo-img"
    />
    <RadioGroup :buttons="responseOptions"></RadioGroup>
  </div>
</template>
<script>
import RadioGroup from "../components/RadioGroup.vue";
export default {
  name: "Test",
  data() {
    return {
      responseOptions: [
        {
          index: 0,
          data: "Veniam sunt mollit aliquip aliquip enim enim nulla.",
          responseId: "a"
        },
        {
          index: 1,
          data:
            "Culpa sunt amet sint commodo fugiat ex nulla amet officia tempor reprehenderit ea do.",
          responseId: "b"
        },
        {
          index: 2,
          data: "Consequat aliquip irure nostrud dolor occaecat enim sunt.",
          responseId: "c"
        },
        {
          index: 3,
          data:
            "Pariatur cupidatat sit velit exercitation deserunt mollit non est minim et in aute.",
          responseId: "d"
        }
      ],
      question: "hello world",
      questionIndex: 0,
      correctAnswer: "b",
      correct: false,
      last: false
    };
  },
  components: {
    RadioGroup
  },
  methods: {
    fetchQuestion(prevAnswerCorrect) {
      fetch(`${this.$store.getters.url}/question`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          answerIsCorrect: prevAnswerCorrect
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.question = data.question.question;
          this.questionIndex = data.questionIndex;
          this.responseOptions[0].data = data.question.a;
          this.responseOptions[1].data = data.question.b;
          this.responseOptions[2].data = data.question.c;
          this.responseOptions[3].data = data.question.d;
          this.correctAnswer = data.question.correct;
          this.$store.commit("updateHeader", data.question.header);
          this.$store.commit("updateProgress", data.progress);
          this.last = data.last;
        });
    }
  },
  mounted() {
    fetch(`${this.$store.getters.url}/lang/test`, {
      method: "post"
    })
      .then(res => res.json())
      .then(data => {
        this.$store.commit("changeNextBtnLabel", data.nextButtonLabel);
      });
    this.fetchQuestion(null);
    let thisListener = e => {
      let data = e.data;
      console.log(data);
      switch (data.type) {
        case "radioGroupSelectionBroadcast": {
          this.correct = data.buttonSelected === this.correctAnswer;
          console.log(data.buttonSelected, this.correctAnswer);
          break;
        }
        case "nextButtonPressedBroadcast": {
          if (this.correct) {
            this.$store.commit("incStatusCorrect");
          } else {
            this.$store.commit("incStatusWrong");
          }
          if (this.last) {
            console.log("last");
            window.removeEventListener("message", thisListener);
            fetch(`${this.$store.getters.url}/get-results`, {
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                answerIsCorrect: this.correct
              })
            })
              .then(res => res.json())
              .then(data => {
                if (data) {
                  this.$router.push("/pass");
                } else {
                  this.$router.push("/fail");
                }
              });
          } else {
            this.fetchQuestion(this.correct);
            this.correct = false;
          }
          break;
        }
      }
    };
    window.addEventListener("message", thisListener);
  }
};
</script>
<style lang="scss">
.test {
  padding: 5vh;
  .demo-img {
    height: 50vh;
    width: 62.5vh;
    float: left;
    margin-right: 3vh;
    border-radius: 1vh;
    background-color: #cc3333;
  }
}
</style>
