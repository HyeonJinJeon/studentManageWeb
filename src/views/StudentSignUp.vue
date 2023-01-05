<template>
  <div class="signUp">
    <p>회원가입</p>
    <input type="text" placeholder="email" v-model="email"><br>
    <input type="password" placeholder="password" v-model="password"><br>
    <h4>이름</h4>
    <input v-model="name"><br><br>
    <h4>학년</h4>
    <input v-model="grade"><br><br>
    <h4>성별</h4>
    <input v-model="gender"><br><br>
    <h4>전화번호</h4>
    <input v-model="phoneNum"><br><br>
    <h4>등급</h4>
    <input v-model="team" type="radio" name="team" value="A"> A
    <input v-model="team" type="radio" name="team" value="B"> B
    <input v-model="team" type="radio" name="team" value="C"> C<br><br>
    <b-button variant="primary" @click="studentSignup">가입 완료</b-button>
    <b-button variant="primary" @click="goBack">가입 취소</b-button>
  </div>
</template>

<script>
// @ is an alias to /src


import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'StudentSignUp',
  data(){
    return{
      fbCollection: "students",
      email: "",
      password: "",
      name: '',
      grade: 0,
      gender: true,
      team: '',
      phoneNum: '',
      level: '1',
    }
  },
  methods: {
    studentSignup(){
      const self = this;
      const db = firebase.firestore();
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then( (result) =>{
            let user = result.user;

            db.collection(self.fbCollection)
                .doc(result.user.uid)
                .set({
                  name: self.name,
                  grade: self.grade,
                  gender: self.gender,
                  team: self.team,
                  phoneNum: self.phoneNum,
                  level: '1',
                })
            alert('학생 회원가입 완료!');
            user.updateProfile({displayName: self.name, photoURL: self.level})
            firebase.auth().signOut()
            this.$router.push('/login');
          }).catch(err => {
            console.error(err);
            alert('에러 : ' + err.message)
          })
    },
    goBack(){
      this.$router.push('/login')
    },

  },
  components: {

  }
}
</script>
