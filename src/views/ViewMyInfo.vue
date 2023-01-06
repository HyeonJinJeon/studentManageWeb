<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
      <b-button variant="danger" @click="logOut"> 로그아웃 </b-button>
    </nav>
    <p>학급 등록 및 수정</p>
    <h4>이름: {{row.name}}</h4>
    <h4>성별: {{row.gender}}</h4>
    <h4>학년</h4>
    <input v-model="row.phoneNum"><br><br>
    <h4>학년: {{row.grade}}</h4>
    <h4>등급</h4>
    <input v-model="row.team" type="radio" name="team" value="A"> A
    <input v-model="row.team" type="radio" name="team" value="B"> B
    <input v-model="row.team" type="radio" name="team" value="C"> C<br><br>
    <b-button variant="success" @click="modifyStudent">수정완료</b-button>
    <b-button variant="primary" @click="goBack">뒤로가기</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

// import {firebase} from '@/firebase/firebaseConfig';

import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'ViewMyInfo',
  data(){
    return {
      fbCollection: 'students',
      docId: this.$store.state.user.uid,
      row: {},
    }
  },
  methods: {
    logOut(){
      firebase.auth().signOut()
      this.$router.push('/')
    },
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
    modifyStudent(){
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(this.docId)
          .update({
            grade: self.row.grade,
            team: self.row.team,
          })
          .then(() => {
            this.$router.push({name: 'Team', params: {id: this.docId}}).catch(()=>{});
          })
    },
    goBack(){
      this.$router.push({name: 'Team', params: {id: this.docId}}).catch(()=>{});
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
