var mainPage = {
  name: 'main',
  template: `
    <v-ons-page>
      <v-ons-toolbar>
        <div class="center">一覧</div>
        <div class="right">
          <v-ons-toolbar-button @click="goDetailPage($event)">掲載する</v-ons-toolbar-button>
        </div>
      </v-ons-toolbar>
      <v-ons-list>
        <v-ons-list-item tappable v-for="user in users" :key="user.id" @click="goDisplayPage(user)">
          <div class="left">
            <img :src="user.photoUrl" width="64px" style="width: 64px;">
          </div>
          <div class="center">{{user.name}}<br>{{user.content}}<br>{{user.address}}<br>{{user.term}}<br>{{user.time}}<br>{{user.invite}}<br>{{user.bring}}</div>
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
    goDisplayPage: function(user) {
      this.$emit('push-page', {
        extends: displayPage,
        onsNavigatorProps: {
          'user': user
        }
      });
    },
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