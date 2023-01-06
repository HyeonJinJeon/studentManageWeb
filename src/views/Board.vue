<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 커뮤니케이션</a>
      <b-button variant="danger" @click="logOut"> 로그아웃 </b-button>
    </nav>
    <td><b-button variant="info" @click="goWrite">글 작성</b-button></td>

    <table class="table " border="1" style="margin-left: auto; margin-right: auto;">
      <thead>
      <tr>
        <th>작성자</th>
        <th>학년</th>
        <th>제목</th>
        <th>상세 정보</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(rows,i) in rows" :key="i">
        <td>{{rows.student.name}}</td>
        <td>{{rows.student.grade}}</td>
        <td>{{rows.title}}</td>
        <td><b-button variant="info" @click="goPost(i)">상세 정보</b-button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: "Board",
  data(){
    return{
      fbCollection: 'board',
      rows: [],
    }
  },
  methods: {
    logOut(){
      firebase.auth().signOut()
      this.$router.push('/')
    },
    getDataList(){
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              return
            }
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data.id = doc.id //각 유저 필드에 따로 id값이 없지만 유저 고유 id를 불로올 수 있음
              console.log(_data)
              self.rows.push(_data);

            });
          })
    },
    init(){
      this.getDataList()
    },
    goPost(i){
      this.$router.push({name: 'PostInfo', params: {id: this.rows[i].id}}).catch(()=>{});
    },
    goWrite(){
      this.$router.push('/write')
    },
  },
  mounted() {
    const self = this;
    self.init();
  },
}
</script>

<style>

</style>
