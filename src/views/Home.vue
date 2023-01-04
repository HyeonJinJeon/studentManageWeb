<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
    </nav>
    <b-button variant="primary" @click="goList">학생 리스트</b-button><br><br>
    <b-button variant="primary" @click="goAdd">학생 추가</b-button><br><br>
    <b-button variant="primary" @click="goTeam">클래스별 리스트</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  methods: {
    goAdd(){
      this.$router.push('/add')
    },
    goList(){
      this.$router.push('/list')
    },
    goTeam(){
      this.$router.push('/team')
    }
  },
  components: {

  }
}
</script>
