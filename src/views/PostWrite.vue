<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
    </nav>
    <h4>제목</h4>
    <input v-model="title"><br><br>
    <h4>내용</h4>
    <input type="textarea" v-model="contents"><br><br>
    <h4>작성자: {{row.name}}</h4>
    <b-button variant="success" @click="addPost">작성완료</b-button>
    <b-button variant="danger" @click="cancleAdd">취소하기</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'PostWrite',
  data(){
    return {
      row: {},
      fbCollection: 'board',
      title: '',
      contents: '',
      }
  },
  methods: {
    cancleAdd(){
      this.$router.push('/board')
    },
    getData(){
      const self = this;
      const db = firebase.firestore();
      db.collection('students')
          .doc(self.$store.state.user.uid)
          .get()
          .then((snapshot)  => {
            const _data = snapshot.data();
            this.row = _data
          })
    },
    addPost(){
      const self = this;         // self를 쓰는 이유는 바깥의 this들과 햇갈리지 않기 위해서
      const db = firebase.firestore();
      const now = new Date();
      const _data = {            // data()에 있는 데이터가 바로 들어갈 수 없다.
        title: self.title,
        contents: self.contents,
        time: now,
        uid: self.$store.state.user.uid,
        student: {
          name: this.row.name,
          grade: this.row.grade,
        },
      }
      db.collection(self.fbCollection) //<- collection('컬랙션명') 바로 쓸수있다.
          .add(_data)
          .then(() => {            // 아무 문제없이 윗쪽 코드가 다 성공하면 then이 실행
            alert("저장되었습니다")
            this.$router.push('/board')
          })  // 성공하면 무엇을 할건지 정하면 된다/ 이 코드에선 alert가 실행된다

          .catch((e) => {          // 실패하면 catch가 실행된다. e는 errer의 약자
            console.log(e)
            alert("저장에 실패했습니다.")
          })
    },
    init(){
      this.getData()

    },
  },
  mounted() {
    const self = this;
    self.init();
  },
  components: {

  }
}
</script>
