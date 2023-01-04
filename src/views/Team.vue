<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
    </nav>
    <b-button variant="danger" @click="goATeam">A클래스</b-button>
    <b-button variant="primary" @click="goBTeam">B클래스</b-button>
    <b-button variant="warning" @click="goCTeam">C클래스</b-button><br><br>
    <b-button variant="primary" @click="goBack">뒤로가기</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
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
    goBack(){
      this.$router.push('/')
    }
  },
  components: {

  }
}
</script>
