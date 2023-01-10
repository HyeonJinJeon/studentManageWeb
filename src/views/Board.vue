<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top ">
      <a class="navbar-brand" href="#">학생 커뮤니케이션</a>
      <div class="justify-content-end">
        <b-button class="btn float-right" variant="danger" @click="logOut"> 로그아웃 </b-button>
      </div >
    </nav>

    <input
        size="sm"
        class="mr-sm-2"
        type="text"
        placeholder="검색어를 입력해주세요"
        v-model="keyword"
        v-on:keypress.enter.prevent="getSearchList(keyword)"
    />
    <b-button
        size="sm"
        class="my-2 my-sm-0"
        type="submit"
        @click="getSearchList(keyword)"
    >검색

      <!--        <b-icon icon="search"></b-icon>-->
    </b-button><br>
    <div class="btn float-right">
    <b-button  variant="primary" @click="getDataList">모든 게시글 불러오기</b-button>
    </div>


    <div class="btn float-right">
    <b-button  variant="primary" @click="goWrite">글 작성</b-button>
    </div>
  <Pagination :list-array="rows" />
  </div>
</template>

<script>
import {firebase} from '@/firebase/firebaseConfig';
import Pagination from '@/views/Pagination.vue';

export default {
  name: "Board",
  components: {Pagination},
  data(){
    return{
      fbCollection: 'board',
      rows: [],
      keyword: '',
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods: {
    logOut(){
      firebase.auth().signOut()
      this.$router.push('/')
    },
    getDataList(){
      const self = this;
      self.rows.splice(0);
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
              self.rows.push(_data);

            });
          })
    },
    init(){
      this.getDataList()
    },

    goWrite(){
      this.$router.push('/write')
    },

    getSearchList(){
      const self = this;
      const db = firebase.firestore();
      self.rows.splice(0);
      console.log(1111111,self.rows)
      console.log(222222, self.keyword)
      db.collection(self.fbCollection)
          .where('title', '>=', self.keyword)
          .where('title', '<=', self.keyword + "\uf8ff")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data.id = doc.id //각 유저 필드에 따로 id값이 없지만 유저 고유 id를 불로올 수 있음
              self.rows.push(_data);
            });
          })
    },

  },

}
</script>

<style>

</style>
