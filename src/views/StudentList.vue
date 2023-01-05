<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
    </nav>
    <table class="table " border="1" style="margin-left: auto; margin-right: auto;">
      <thead>
      <tr>
        <th>이름</th>
        <th>학년</th>
        <th>성별</th>
        <th>등급</th>
        <th>전화번호</th>
        <th>id</th>
        <th>상세 정보</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(rows,i) in rows" :key="i">
        <td>{{rows.name}}</td>
        <td>{{rows.grade}}</td>
        <td>{{rows.gender}}</td>
        <td>{{rows.team}}</td>
        <td>{{rows.phoneNum}}</td>
        <td>{{rows.id}}</td>
        <td><b-button variant="info" @click="goManage(i)">상세 정보</b-button></td>
      </tr>
      </tbody>
    </table>
    <b-button variant="primary" @click="goAdd">학생 등록</b-button>
    <b-button variant="danger" @click="goBack">뒤로가기</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'StudentList',
  data(){
    return {
      fbCollection: 'students',
      rows: [],
    }
  },
  methods: {
    goAdd(){
      this.$router.push('/add')
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
    goManage(i){
      this.$router.push({name: 'ManageStudent', params: {id: this.rows[i].id}}).catch(()=>{});
    },
    init(){
      this.getDataList()
    },
    goBack(){
      this.$router.push('/')
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
