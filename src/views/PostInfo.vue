<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
      <b-button variant="danger" @click="logOut"> 로그아웃</b-button>
    </nav>
    {{row.length}}
    <div v-if="Object.keys(row).length> 0">
      <h4>제목: {{ row.title }}</h4>
      <h4>내용: {{ row.contents }}</h4>
      <h4>작성자: {{ row.student.name }}</h4>
      <h4>작성 시간: {{ row.time }}</h4>
    </div>


    <!--    <h4>작성자: {{row.uid}}</h4>-->
    <b-button variant="success" v-if="match" @click="goModify">수정하기</b-button>
    <b-button variant="danger" v-if="match" @click="deletePost">삭제하기</b-button>
    <b-button variant="primary" @click="goBack">뒤로가기</b-button>

    <table class="table " border="1" style="margin-left: auto; margin-right: auto;">
      <thead>
      <tr>
        <th>작성자</th>
        <th>댓글</th>
      </tr>
      </thead>
      <tbody>
            <tr v-for="(row2,i) in row2" :key="i">
              <td>{{row2.name}}</td>
              <td>{{row2.contents}}</td>
            </tr>
      </tbody>
    </table>
    댓글 작성: <input v-model="commentContents">
    <b-button variant="success" @click="writeComment">작성완료</b-button>


  </div>
</template>

<script>
// @ is an alias to /src

import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'PostInfo',
  data() {
    return {
      fbCollection: 'board',
      docId: this.$route.params.id,
      row: {},
      row2: [],
      match: false,
      commentContents: '',
      date: '',
      year: '',
      month:'',
      day: '',
      hour: '',
      minute: '',
      second: ''
    }
  },
  methods: {
    async init() {
      await this.getData()
      await this.getCommentData()
      await this.changeDate()
    },
    // changeDate(){
    //   this.year = this.row.time.getFullYear();
    //   this.month = this.row.time.getMonth() + 1;
    //   this.day = this.row.time.getDate()
    //   console.log(this.year)
    // },
    async getData() {
      const self = this;
      const db = firebase.firestore();
      await db.collection(self.fbCollection)
          .doc(this.docId)
          .get()
          .then(async (snapshot) => {
            // console.log(this.docId)
            const _data = snapshot.data();
            _data.id = snapshot.id //각 유저 필드에 따로 id값이 없지만 유저 고유 id를 불로올 수 있음
            this.row = _data
            // console.log(this._data)
            // console.log(this.$store.state.user.uid)
            // console.log(_data.uid)
            if (this.$store.state.user.uid === _data.uid) {
              this.match = true
              console.log(this.$store.state.user.uid)
              console.log(_data.uid)
            }
          })
    },
    getCommentData() {
      const self = this;
      const db = firebase.firestore();
      db.collection('comment')
          .where('uid', '==', self.row.id)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              return
            }
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data.id = doc.id //각 유저 필드에 따로 id값이 없지만 유저 고유 id를 불로올 수 있음
              console.log(_data)
              self.row2.push(_data);
            });
          })
    },
    deletePost() {
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(this.docId)
          .delete()
          .then(() => {
            alert("삭제 완료")
            self.$router.push('/board')
          })
    },
    goModify() {
      console.log(this.row.time)
      this.$router.push({name: 'PostModify', params: {id: this.row.id}}).catch(() => {
      });
    },
    writeComment() {
      const self = this;
      const db = firebase.firestore();
      db.collection('comment')
          .add({
            name: self.$store.state.user.displayName,
            contents: self.commentContents,
            uid: self.row.id
          })
          .then(() => {
            alert("작성 완료")
            self.$router.push('/board')
          })
    },
    goBack() {
      this.$router.push('/board')
    },
    logOut() {
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
  components: {}
}
</script>
