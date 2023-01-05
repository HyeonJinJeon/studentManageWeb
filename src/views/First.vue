<template>
  <div class="first">
    <b-button variant="success" @click="goLogin">로그인</b-button>
    <b-button variant="primary" @click="goSignUp">회원가입</b-button>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'First',
  methods: {
    goLogin(){
      this.$router.push('/login')
    },
    goSignUp(){
      this.$router.push('/signup')
    }
  },
  components: {

  }
}
</script>
