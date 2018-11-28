var mainPage = {
  name: 'main',
  template: `
    <v-ons-page>
      <v-ons-toolbar>
        <div class="center">一覧</div>
        <div class="right">
          <v-ons-toolbar-button @click="goDetailPage($event)">追加</v-ons-toolbar-button>
        </div>
      </v-ons-toolbar>
      <v-ons-list>
        <v-ons-list-item tappable v-for="user in users" :key="user.id" @click="goDetailPage(user)">
          <div class="left">
            <img :src="user.photoUrl" width="64px" style="width: 64px;">
          </div>
          <div class="center">{{user.name}}<br>{{user.address}}</div>
        </ons-list-item>
      </v-ons-list>
    </v-ons-page>
  `,
  data() {
    return {
      users: []
    }
  },
  created: function() {
    var vm = this;
    var usersRef = firebase.database().ref('users');
    usersRef.on('value', function(snapshot) {
      if (snapshot) {
        const values = snapshot.val();
        let list = [];
        Object.keys(values).forEach((val, key) => {
          values[val].id = val;
          list.push(values[val]);
        });
        vm.users = list;
      }
    });
  },
  methods: {
    goDetailPage: function(user) {
      this.$emit('push-page', {
        extends: detailPage,
        onsNavigatorProps: {
          'user': user
        }
      });
    }
  }
};