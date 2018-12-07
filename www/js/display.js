var displayPage = {
  name: 'display',
  props: {
    user: {}
  },
  template: `
  <v-ons-page>
        <div class="left">
          <v-ons-back-button></v-ons-back-button>
        </div>
       <v-ons-list>
        <v-ons-list-item v-if="user.id">
          <img :src="user.photoUrl" width="100%">
        </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-item tappable :key="user.id">
          <div class style="margin-left:30%; weight:auto; margin-right:30%; text-align:center; vertical-align: middle;">
          <span style="color:1a961e; line-height:150%; font-size:14px;">農業体験 / {{user.content}}</span>
          <br>
          <span style="font-weight:bold; line-height:150%;font-size17px;">{{user.name}}</span>
          <br>
          <span style="line-height:180%;font-size12px;">📍{{user.address}}</span>
          <br>
          <nobr><span style="line-height:200%;font-size12px;">🗓{{user.term}}</span>
          <span style="line-height:200%;font-size12px;">⌚️{{user.time}}</span></nobr>
          <br>
          <span style="line-height:200%;font-size12px;">{{user.invite}}</span>
          <br>
          <span style="line-height:200%;font-size12px;">{{user.bring}}</span>
          <br>
          <span style="line-height:200%;font-size12px;">⬇︎facebook<br>{{user.facecom}}</span>
          <br>
          <span style="line-height:200%;font-size12px;">⬇︎Twitter<br>{{user.twicom}}</span>
          <br>
          <span style="line-height:200%;font-size12px;">⬇︎Mail<br>{{user.mailcom}}</span>
          </div>
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
      facecom: this.user.facecom,
      twicom: this.user.twicom,
      mailcom: this.user.mailcom,
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