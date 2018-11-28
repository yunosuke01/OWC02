(function () {
  // Firebase
  var config = {
     apiKey: "AIzaSyB0hxIpN9RbjppcBQxQEYhS5zmtL1xKC8o",
    authDomain: "owc01-4e156.firebaseapp.com",
    databaseURL: "https://owc01-4e156.firebaseio.com",
    projectId: "owc01-4e156",
    storageBucket: "owc01-4e156.appspot.com",
    messagingSenderId: "326717643967"
  };
  firebase.initializeApp(config);

  // vue-onsenui
  Vue.use(VueOnsen);
//test
  // Vue
  new Vue({
    el: '#app',
    template: `
      <v-ons-navigator
        swipeable
        :page-stack="pageStack"
        @push-page="pageStack.push($event)"
        @pop-page="pageStack.pop()">
      </v-ons-navigator>
    `,
    data() {
      return {
        pageStack: [mainPage]
      }
    },
  });
})();