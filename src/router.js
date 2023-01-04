import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import StudentList from '@/views/StudentList.vue';
import AddStudent from '@/views/AddStudent.vue';
import ManageStusent from '@/views/ManageStusent.vue';
import Team from '@/views/Team.vue';
import TeamA from '@/views/TeamA.vue';
import TeamB from '@/views/TeamB.vue';
import TeamC from '@/views/TeamC.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'StudentList',
      component: StudentList
    },
    {
      path: '/add',
      name: 'AddStudent',
      component: AddStudent
    },
    {
      path: '/manage',
      name: 'ManageStudent',
      component: ManageStusent
    },
    {
      path: '/team',
      name: 'Team',
      component: Team
    },
    {
      path: '/team/a',
      name: 'TeamA',
      component: TeamA
    },
    {
      path: '/team/b',
      name: 'TeamB',
      component: TeamB
    },
    {
      path: '/team/c',
      name: 'TeamC',
      component: TeamC
    }
  ]
})
