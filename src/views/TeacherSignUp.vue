<template>
  <div class="signUp">
    <p>회원가입</p>
    <input type="text" placeholder="email" v-model="email"><br>
    <input type="password" placeholder="password" v-model="password"><br>
    <h4>이름</h4>
    <input v-model="name"><br><br>
    <h4>성별</h4>
    <input v-model="gender"><br><br>
    <h4>전화번호</h4>
    <input v-model="phoneNum"><br><br>
    <h4>등급</h4>
    <input v-model="team" type="radio" name="team" value="A"> A
    <input v-model="team" type="radio" name="team" value="B"> B
    <input v-model="team" type="radio" name="team" value="C"> C<br><br>
    <b-button variant="primary" @click="teacherSignup">가입 완료</b-button>
    <b-button variant="primary" @click="goBack">가입 취소</b-button>
  </div>
</template>

<script>
// @ is an alias to /src


import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'TeacherSignUp',
  data(){
    return{
      fbCollection: "teachers",
      email: "",
      password: "",
      name: '',
      gender: true,
      team: '',
      phoneNum: '',
      level: '0',
    }
  },
  methods: {
    teacherSignup(){
      const self = this;
      const db = firebase.firestore();
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then( (result) =>{
            let user = result.user;

            db.collection(self.fbCollection)
                .doc(result.user.uid)
                .set({
                  name: self.name,
                  gender: self.gender,
                  team: self.team,
                  phoneNum: self.phoneNum,
                  level: '0',
                })
            alert('선생님 회원가입 완료!');
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
