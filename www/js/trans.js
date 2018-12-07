var transPage = {
  name: 'trans',
  props: {
    user: {}
  },
  template: `
    <v-ons-page>
      <div>
        <img :src="image_src" width="100%" height="auto" @click="goMainPage(user)">
      </div>
    </v-ons-page>
  `,
  data() {
    return {
      image_src: './images/background.png',
    };
  },

methods: {
    goMainPage: function(user) {
      //setTimeout(function(user) {
      this.$emit('push-page', {
        extends: mainPage,
        onsNavigatorProps: {
          'user': user
        }
      });
     // }, 1000);
    }
 }
};