import Vue from 'vue'
import Router from 'vue-router'
import {firebase} from "../firebase/firebaseConfig";
import "firebase/auth";
import store from "../store";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'First',
      component: () => import('../views/First'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home'),

    },
    {
      path: '/list',
      name: 'StudentList',
      component: () => import('../views/StudentList'),

    },
    {
      path: '/add',
      name: 'AddStudent',
      component: () => import('../views/AddStudent'),

    },
    {
      path: '/manage',
      name: 'ManageStudent',
      component: () => import('../views/ManageStudent'),

    },
    {
      path: '/team',
      name: 'Team',
      component: () => import('../views/Team'),
    },
    {
      path: '/my/info',
      name: 'ViewMyInfo',
      component: () => import('../views/ViewMyInfo.vue'),

    },
    {
      path: '/team/a',
      name: 'TeamA',
      component: () => import('../views/TeamA'),

    },
    {
      path: '/team/b',
      name: 'TeamB',
      component: () => import('../views/TeamB'),

    },
    {
      path: '/team/c',
      name: 'TeamC',
      component: () => import('../views/TeamC'),

    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login'),

    },
    {
      path: '/signup/student',
      name: 'StudentSignUp',
      component: () => import('../views/StudentSignUp'),

    },
    {
      path: '/signup/teacher',
      name: 'TeacherSignUp',
      component: () => import('../views/TeacherSignUp'),
    },
    {
      path: '/team/no',
      name: 'NoTeam',
      component: () => import('../views/NoTeam'),
    },
    {
      path: '/board',
      name: 'Board',
      component: () => import('../views/Board'),
    },
    {
      path: '/post',
      name: 'PostInfo',
      component: () => import('../views/PostInfo'),
    },
    {
      path: '/write',
      name: 'PostWrite',
      component: () => import('../views/PostWrite'),
    },
    {
      path: '/post/modify',
      name: 'PostModify',
      component: () => import('../views/PostModify'),
    },

  ]
})

const makeTitle = (title) =>
    title ? `${title} | KoROM Database` : "KoROM Database";

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = makeTitle(to.meta.title);
  });
});

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(async (user) => {

    // let _isAdmin = '';
    // let _isMaster = '';

    await store.dispatch('getUser', user)
        .then(() => {
          if (user) {
            console.log(user)
            console.log('user', store.state.user)
            // _isAdmin = store.state.claims.isAdmin
            // console.log('isAdmin : ', _isAdmin)
            // _isMaster = store.state.claims.isMaster
            // console.log('isMaster : ', _isMaster)
          } else {
            console.log('없다.')
          }
        })


    const firebaseCurrentUser = firebase.auth().currentUser
    console.log(firebaseCurrentUser)

    if (store.state.firebaseLoaded)
      next()
  })

});


export default router
