var detailPage = {
  name: 'detail',
  props: {
    user: {}
  },
  template: `
    <v-ons-page>
      <v-ons-toolbar>
        <div class="left">
          <v-ons-back-button></v-ons-back-button>
        </div>
        <div class="center">
          <span v-if="user.id">{{user.name}}</span>
          <span v-else>追加</span>
        </div>
        <div class="right">
          <v-ons-toolbar-button @click="save($event)">保存</v-ons-toolbar-button>
        </div>
      </v-ons-toolbar>

      <v-ons-list>
        <v-ons-list-header>画像</v-ons-list-header>
          <v-ons-list-item style="width:100%;height:30%">
           <!-- <label for="file_photo" style="color: white;background-color: #228b22;padding: 12px; border-radius: 25px;margin:0 auto" >
              画像をアップロード
               <input type="file" style="display:none;" name="photo" id="photo" @change="fileChange($event)" accept="image/*" />
            </label> -->

            <button for="file_photo" style="color: white;background-color: #228b22;padding: 12px; border-radius: 25px;margin:0 auto" @click="pressInputBtn()" >
              画像をアップロード
               <input type="file" style="display:none;" name="photo" id="photo" @change="fileChange($event)" accept="image/*" /> 
            </button>

         
            <img v-show="uploadedImage" :src="uploadedImage" width="30%" height="auto">
          </v-ons-list-item>
      </v-ons-list>
       <!--<input type="file" id="file_photo" style="display:none;">
       <input type="file" name="photo" @change="fileChange($event)" accept="image/*" /> -->

        

      <v-ons-list>
        <v-ons-list-header>農園・農家のお名前</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-input placeholder="例：OWC農園" v-model="name"></v-ons-input>
          </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>作業内容</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-input placeholder="例：田植え" v-model="content"></v-ons-input>
          </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>住所</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-input placeholder="例：〇〇県△△市〇〇△-△-△" v-model="address"></v-ons-input>
          </v-ons-list-item>
      </v-ons-list>
      
      <v-ons-list>
        <v-ons-list-header>受付期間</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-input placeholder="例：11/20~11/28" v-model="term"></v-ons-input>
          </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>体験期間</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-input placeholder="例：1日〜相談可" v-model="time"></v-ons-input>
          </v-ons-list-item>
     </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>紹介文</v-ons-list-header>
          <v-ons-list-item >
            <v-ons-input placeholder="ここに記入してください" v-model="invite"></v-ons-input>
          </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>持ち物</v-ons-list-header>
          <v-ons-list-item>
            <v-ons-input placeholder="例：着替え、長靴、飲み物" v-model="bring"></v-ons-input>
          </v-ons-list-item>
      </v-ons-list>

      <v-ons-list>
        <v-ons-list-header>連絡手段（複数選択可）</v-ons-list-header>
          <v-ons-list-item>
            <div class>Facebook<br><v-ons-input placeholder="リンク" v-model="facecom"></v-ons-input>
            <br></div>
            <div class>Twitter<br><v-ons-input placeholder="リンク" v-model="twicom"></v-ons-input>
            <br></div>
            <div class>Mail<br><v-ons-input placeholder="リンク" v-model="mailcom"></v-ons-input></div>
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
      uploadedImage: '',
    };
  },
  methods: {
    pressInputBtn() {
      const photoInput = document.getElementById('photo');
      photoInput.click();
    },
    fileChange: function (e) {
      this.photo = e.target.files[0];
       let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    save: function () {
       {
        this.create();
      }
    },
    create: function() {
      var vm = this;
      var usersRef = firebase.database().ref('users');
      if (vm.photo) {
        var filename = vm.guid();
        var storageRef = firebase.storage().ref();
        var imagesRef = storageRef.child(`images/${filename}`);
        var uploadTask = imagesRef.put(vm.photo).then(function(snapshot) {
          imagesRef.getDownloadURL().then(function(url) {
            var u = {
              name: vm.name,
              content: vm.content,
              address: vm.address,
              term: vm.term,
              time: vm.time,
              invite: vm.invite,
              bring: vm.bring,
              facecom: vm.facecom,
              twicom: vm.twicom,
              mailcom: vm.mail,
              photoFileName: filename,
              photoUrl: url
            }
            usersRef.push(u).then(function() {
              vm.$emit('pop-page');
            });
          });
        });
      } else {
        var u = {
          name: vm.name,
          content: vm.content,
          address: vm.address,
          term: vm.term,
          time: vm.time,
          invite: vm.invite,
          bring: vm.bring,
          facecom: vm.facecom,
          twicom: vm.twicom,
          mailcom: vm.mail,
          photoFileName: filename,
          photoUrl: url
        }
        usersRef.push(u).then(function() {
          vm.$emit('pop-page');
        });
      }
    },
    update: function() {
      var vm = this;
      var usersRef = firebase.database().ref(`users/${vm.user.id}`);
      if (vm.photo) {
        var filename = vm.guid();
        var storageRef = firebase.storage().ref();
        var imagesRef = storageRef.child(`images/${filename}`);
        var uploadTask = imagesRef.put(vm.photo).then(function(snapshot) {
          imagesRef.getDownloadURL().then(function(url) {
            var u = {
              name: vm.name,
              content: vm.content,
              address: vm.address,
              term: vm.term,
              time: vm.time,
              invite: vm.invite,
              bring: vm.bring,
              facecom: vm.facecom,
              twicom: vm.twicom,
              mailcom: vm.mail,
              photoFileName: filename,
              photoUrl: url
            }
            usersRef.set(u).then(function() {
              vm.$emit('pop-page');
            });
          });
        });
        if (vm.user.photoFineName) {
          storageRef.child(`images/${vm.user.photoFineName}`).delete().then(function() {
            console.log('file deleted');
          });
        }
      } else {
        var u = {
          name: vm.name,
          content: vm.content,
          address: vm.address,
          term: vm.term,
          time: vm.time,
          invite: vm.invite,
          bring: vm.bring,
          facecom: vm.facecom,
          twicom: vm.twicom,
          mailcom: vm.mail,
          photoFileName: vm.user.photoFileName,
          photoUrl: vm.user.photoUrl,
        }
        usersRef.set(u).then(function() {
          vm.$emit('pop-page');
        });
      }
    },
    guid: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
  }
};