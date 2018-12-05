var displayPage = {
  name: 'display',
  props: {
    user: {}
  },
  template: `
  <v-ons-page>
      <v-ons-toolbar>
        <div class="left">
          <v-ons-back-button></v-ons-back-button>
        </div>
        </v-ons-toolbar>
       <v-ons-list>
        <v-ons-list-header>画像</v-ons-list-header>
        <v-ons-list-item v-if="user.id">
          <img :src="user.photoUrl" width="100%">
        </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>名前</v-ons-list-header>
        <v-ons-list-item tappable :key="user.id">
          <div class="center">{{user.name}}</div>
        </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
      <v-ons-list-header>作業内容</v-ons-list-header>
        <v-ons-list-item tappable :key="user.id">
          <div class="center">{{user.content}}</div>
        </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>住所</v-ons-list-header>
        <v-ons-list-item tappable :key="user.id">
          <div class="center">{{user.address}}</div>
        </v-ons-list-item>
      </v-ons-list>
      
      <v-ons-list>
        <v-ons-list-header>受付期間</v-ons-list-header>
        <v-ons-list-item tappable :key="user.id">
          <div class="center">{{user.term}}</div>
        </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>体験期間</v-ons-list-header>
        <v-ons-list-item tappable :key="user.id">
          <div class="center">{{user.time}}</div>
        </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>紹介文</v-ons-list-header>
       <v-ons-list-item tappable :key="user.id">
          <div class="center">{{user.invite}}</div>
        </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>持ち物</v-ons-list-header>
        <v-ons-list-item tappable :key="user.id">
          <div class="center">{{user.bring}}</div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
    `,
    data() {
    return {
      name: this.user.name,
      content: this.user.content,
      address: this.user.address,
      term: this.user.term,
      time: this.user.time,
      invite: this.user.invite,
      bring: this.user.bring,
    };
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
};