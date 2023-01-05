<template>
  <div class="home">
    <h3>Login</h3>
    <input type="text" placeholder="email" v-model="email"><br>
    <input type="password" placeholder="password" v-model="password"><br>
    <b-button variant="success" @click="login">로그인</b-button>
    <b-button variant="primary" @click="goStudentSignup">학생으로 회원가입</b-button>
    <b-button variant="primary" @click="goTeacherSignup">선생님으로 회원가입</b-button>
    <b-button variant="primary" @click="logOut">로그아웃</b-button>
  </div>
</template>

<script>
// @ is an alias to /src


import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'Login',
  data(){
    return{
      email: "",
      password: "",
    }
  },
  methods: {
    loginCheck(){
      if(this.$store.state.user != null){
        if( this.$store.state.user.photoURL === '0'){
          this.$router.push('/team')
        }else if(this.$store.state.user.photoURL === '1'){
          this.$router.push('/team/set')
        }
      }
    },
    login(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then( () =>{
            alert('로그인 완료!');
            this.loginCheck()
          }).catch(err => {
        console.error(err);
        alert('에러 : ' + err.message)
      })
    },
    goStudentSignup(){
      this.$router.push('/signup/student')
    },
    goTeacherSignup(){
      this.$router.push('/signup/teacher')
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
