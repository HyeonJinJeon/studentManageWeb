<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
      <b-button variant="danger" @click="logOut"> 로그아웃 </b-button>

    </nav>
    <h4>이름</h4>
    <input v-model="row.name"><br><br>
    <h4>학년</h4>
    <input v-model="row.grade"><br><br>
    <h4>성별</h4>
    <input v-model="row.gender"><br><br>
    <h4>전화번호</h4>
    <input v-model="row.phoneNum"><br><br>
    <h4>등급</h4>
    <input v-model="row.team" type="radio" name="team" value="A"> A
    <input v-model="row.team" type="radio" name="team" value="B"> B
    <input v-model="row.team" type="radio" name="team" value="C"> C
    <input v-model="row.team" type="radio" name="team" value=""> 미지정<br><br>
    <b-button variant="success" @click="modifyStudent">수정완료</b-button>
    <b-button variant="danger" @click="deleteStudent">삭제하기</b-button>
    <b-button variant="primary" @click="goBack">뒤로가기</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'ManageStudent',
  data(){
    return {
      fbCollection: 'students',
      docId: this.$route.params.id,
      row: {},
    }
  },
  methods: {
    init(){
      this.getData()
    },
    getData(){
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(this.docId)
          .get()
          .then((snapshot)  => {
            const _data = snapshot.data();
            this.row = _data
          })
    },
    deleteStudent(){
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(this.docId)
          .delete()
          .then(() => {
            alert("삭제 완료")
            self.$router.push('/home')
          })
    },
    modifyStudent(){
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(this.docId)
          .update({
            name: self.row.name,
            grade: self.row.grade,
            gender: self.row.gender,
            team: self.row.team,
            phoneNum: self.row.phoneNum,
          })
          .then(() => {
            alert("수정 완료")
            self.$router.push('/home')
          })
    },
    goBack(){
      this.$router.push('/home')
    },
    logOut(){
      firebase.auth().signOut()
      this.$router.push('/login')
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  components: {

  }
}
</script>
