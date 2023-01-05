<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
    </nav>
    <b-button variant="danger" @click="goATeam">A클래스</b-button>
    <b-button variant="primary" @click="goBTeam">B클래스</b-button>
    <b-button variant="warning" @click="goCTeam">C클래스</b-button>
    <b-button variant="primary" @click="setTeam">학급 등록</b-button><br><br>
    <b-button variant="primary" @click="goBack">뒤로가기</b-button>
    <b-button variant="danger" @click="findUid">uid확인</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Team',
  data() {
    return {
      docId: this.$route.params.id,
    }
  },
  methods: {
    findUid(){
      console.log(this.docId)
    },
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
    },
    setTeam(){
      this.$router.push({name: 'SetTeam', params: {id: this.docId}}).catch(()=>{});
    }
  },
  components: {

  }
}
</script>
