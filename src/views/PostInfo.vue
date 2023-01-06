<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
      <b-button variant="danger" @click="logOut"> 로그아웃 </b-button>

    </nav>
    <h4>제목: {{row.title}}</h4>
    <h4>내용: {{row.contents}}</h4>
    <h4>작성자: {{row.student.name}}</h4>

    <h4>작성자: {{row.uid}}</h4>
    <b-button variant="success" v-if="match" @click="goModify">수정하기</b-button>
    <b-button variant="danger" v-if="match" @click="deleteStudent">삭제하기</b-button>
    <b-button variant="primary" @click="goBack">뒤로가기</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'PostInfo',
  data(){
    return {
      fbCollection: 'board',
      docId: this.$route.params.id,
      row: {},
      match: false,
    }
  },
  methods: {
    init(){
      this.getData(),
      // this.matchStudent()
      // console.log(this.$store.state.user.uid)
      console.log(this.row.uid)
    },
    getData(){
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(this.docId)
          .get()
          .then((snapshot)  => {
            // console.log(this.docId)
            const _data = snapshot.data();
            _data.id = snapshot.id //각 유저 필드에 따로 id값이 없지만 유저 고유 id를 불로올 수 있음
            this.row = _data
            // console.log(this._data)
            // console.log(this.$store.state.user.uid)
            // console.log(_data.uid)
            if(this.$store.state.user.uid === _data.uid){
              this.match = true
              console.log(this.$store.state.user.uid)
              console.log(_data.uid)
            }
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
    goModify(){
      this.$router.push({name: 'PostModify', params: {id: this.row.id}}).catch(()=>{});
    },
    // modifyStudent(){
    //   const self = this;
    //   const db = firebase.firestore();
    //   db.collection(self.fbCollection)
    //       .doc(this.docId)
    //       .update({
    //         name: self.row.name,
    //         grade: self.row.grade,
    //         gender: self.row.gender,
    //         team: self.row.team,
    //         phoneNum: self.row.phoneNum,
    //       })
    //       .then(() => {
    //         alert("수정 완료")
    //         self.$router.push('/home')
    //       })
    // },
    goBack(){
      this.$router.push('/board')
    },
    logOut(){
      firebase.auth().signOut()
      this.$router.push('/')
    },
    // matchStudent(){
    //   if(this.$store.state.user.uid === this.row.uid){
    //     this.match = true
    //     console.log("성공")
    //   }else{
    //     this.match = false
    //     console.log("실패")
    //   }
    // }
  },
  mounted() {
    const self = this;
    self.init();
  },
  components: {

  }
}
</script>
