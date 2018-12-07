var mainPage = {
  name: 'main',
  template: `
    <v-ons-page>
      <v-ons-toolbar style="color:white;background-color: #ffffff;box-shadow: 0 2px 4px rgba(0,0,0,0.3);" >
        <div class="left" style="background-image:url('./images/toolbar-image-clear.png');padding:0px;margin:0px;width:100px;"></div>
        <div class="right">
          <v-ons-toolbar-button style="color: white;background-color: #228b22; padding: 1px; border-radius: 25px;margin: 0 auto;" @click="goDetailPage($event)">農カツを掲載</v-ons-toolbar-button>
        </div>
      </v-ons-toolbar>
      <v-ons-list>
        <v-ons-list-item  v-for="user in users" :key="user.id" @click="goDisplayPage(user)">
          <div class>
            <img :src="user.photoUrl" width="100%" height="auto" style="border-radius:8px;">
            <span style="color:1a961e; line-height:150%;">農業体験 / {{user.content}}</span>
         <br>
         <span style="font-weight:bold; line-height:150%;">{{user.name}}</span>
         <br>
         <span style="line-height:150%;">📍{{user.address}}</span>
         <br>
         <span style="line-height:150%;">🗓{{user.term}}</span>
         <span style="line-height:150%;">　　　⌚️{{user.time}}</span></div>
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