<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
      <b-button variant="danger" @click="logOut"> 로그아웃 </b-button>
    </nav>
    <b-button variant="primary" @click="goATeam">A클래스</b-button>
    <b-button variant="primary" @click="goBTeam">B클래스</b-button>
    <b-button variant="primary" @click="goCTeam">C클래스</b-button>
    <b-button variant="warning" @click="goNoTeam">학급 등록</b-button><br><br>
    <b-button variant="info" @click="goStudentList">전체학생</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'Team',
  data() {
    return {
      docId: this.$route.params.id,
    }
  },
  methods: {
    goATeam(){
      this.$router.push('/team/a')
    },
    goBTeam(){
      this.$router.push('/team/b')
    },
    goCTeam(){
      this.$router.push('/team/c')
    },
    goStudentList(){
      this.$router.push('/list')
    },
    goNoTeam(){
      this.$router.push('/team/no');
    },
    logOut(){
      firebase.auth().signOut()
      this.$router.push('/')
    }
  },
  components: {

  }
}
</script>
