<script setup>
  import config from '@/utility/configs.json'
  import { ref } from "vue"
  import BaseLoader from "@/components/base/BaseLoader.vue"

  const isLogged = ref(false);
  const loginLoadingGoogle = ref(false);
  const loginLoadingFacebook = ref(false);

  function handleGoogleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    loginLoadingGoogle.value = false

  }

  const googleSignIn = ()=>{
    loginLoadingGoogle.value = true
    google.accounts.id.initialize({
      client_id: config.googleClientId,
      callback: handleGoogleCredentialResponse
    });
    // google.accounts.id.renderButton(
    //   document.getElementById("buttonDiv"),
    //   { theme: "outline", size: "large" }
    // );
    google.accounts.id.prompt();
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId: '8122791687735303',
      cookie: true,
      xfbml: true,
    });
  }

  const facebookSignIn = ()=> {
    loginLoadingFacebook.value = true
    FB.login(function(response) {
      if (response.authResponse) {
        isLogged.value = true;
        loginLoadingFacebook.value = false
        console.log('Logged in.', response);
        console.log('Logged in.', response.authResponse);
      } else {
        console.log('User cancelled login or did not fully authorize.');
        loginLoadingFacebook.value = false

      }
    });
  }
</script>

<template>
  <div class="w-full">
    <div class="flex w-full gap-2 items-center ">
<!--      <GoogleLogin :callback="googleSignIn" prompt />-->

      <el-button
        class="w-fit "
        size="large"
        style="border-radius: 4px"
        type=""
        :loading="loginLoadingGoogle"
        plain
        @click="googleSignIn"
      >
        Google
      </el-button>

      <el-button
        class="w-fit "
        size="large"
        style="border-radius: 4px"
        type=""
        plain
        :loading="loginLoadingFacebook"
        @click="facebookSignIn"
      >
        Facebook
      </el-button>


    </div>
  </div>

</template>

<style scoped>

</style>