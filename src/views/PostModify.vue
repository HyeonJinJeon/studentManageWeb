<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
    </nav>
    <h4>제목</h4>
    <input v-model="row.title"><br><br>
    <h4>내용</h4>
    <textarea v-model="row.contents"></textarea>
    <h4>작성자: {{student.name}}</h4>
    <b-button variant="success" @click="modifyPost">작성완료</b-button>
    <b-button variant="danger" @click="cancleAdd">취소하기</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'PostModify',
  data(){
    return {
      row: {},
      student: {},
      docId: this.$route.params.id,
      fbCollection: 'board',
      title: '',
      contents: 0,
    }
  },
  methods: {
    cancleAdd(){
      this.$router.push('/board')
    },
    getStudent(){
      const self = this;
      const db = firebase.firestore();
      db.collection('students')
          .doc(self.$store.state.user.uid)
          .get()
          .then((snapshot)  => {
            const _data = snapshot.data();
            this.student = _data
          })
    },
    getData(){
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(self.docId)
          .get()
          .then((snapshot)  => {
            const _data = snapshot.data();
            this.row = _data
          })
    },
    modifyPost(){
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(self.docId)
          .update({
            title: self.row.title,
            contents: self.row.contents,
          })
          .then(() => {
            alert("수정 완료")
            self.$router.push('/board')
          })
    },
    init(){
      this.getData()
      this.getStudent()
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
