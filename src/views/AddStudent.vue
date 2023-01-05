<template>
  <div class="home">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">학생 관리 시스템</a>
    </nav>
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
    <b-button variant="success" @click="addStudent">추가하기</b-button>
    <b-button variant="danger" @click="cancleAdd">취소하기</b-button>
  </div>
</template>

<script>
// @ is an alias to /src

import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: 'AddStudent',
  data(){
    return {
      fbCollection: 'students',
      name: '',
      grade: 0,
      gender: true,
      team: '',
      phoneNum: '',
    }
  },
  methods: {
    cancleAdd(){
      this.$router.push('/')
    },
    addStudent(){
      const self = this;         // self를 쓰는 이유는 바깥의 this들과 햇갈리지 않기 위해서
      const db = firebase.firestore();
      const _data = {            // data()에 있는 데이터가 바로 들어갈 수 없다.
        name: self.name,
        grade: self.grade,
        gender: self.gender,
        team: self.team,
        phoneNum: self.phoneNum,
      }
      db.collection(self.fbCollection) //<- collection('컬랙션명') 바로 쓸수있다.
          .add(_data)
          .then(() => {            // 아무 문제없이 윗쪽 코드가 다 성공하면 then이 실행
            alert("저장되었습니다")
            this.$router.push('/list')
          })  // 성공하면 무엇을 할건지 정하면 된다/ 이 코드에선 alert가 실행된다

          .catch((e) => {          // 실패하면 catch가 실행된다. e는 errer의 약자
            console.log(e)
            alert("저장에 실패했습니다.")
          })
    },
    init(){
      this.getDataList()
    },
  },
  mounted() {
    const self = this;
    self.init();
  },
  components: {

  }
}
</script>
