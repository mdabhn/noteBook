<template>
  <div class="flex h-screen bg-indigo-900">
    <div class="mx-auto my-auto" v-if="signup">
      <h1 class="text-center text-3xl mb-3 uppercase text-white">Sign Up</h1>
      <form @submit.prevent="createUser">
        <input
          type="text"
          name="name"
          v-model="name"
          class="block p-2 w-input rounded-lg m-1 border-gray-700 border-2 focus:outline-none"
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          v-model="email"
          class="block p-2 w-input rounded-lg m-1 border-gray-700 border-2 focus:outline-none"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          v-model="password"
          class="block p-2 w-input rounded-lg m-1 border-gray-700 border-2 focus:outline-none"
          placeholder="Password"
          required
        />
        <button
          class="border-2 bg-gray-800 p-2 rounded-lg text-white float-right border-green-500 hover:bg-gray-900"
        >
          Sign Up
        </button>
      </form>
      <div class="mx-auto my-auto mt-5 ml-2">
        <a
          href="#"
          class="text-white underline hover:text-black ease-in-out delay-150 duration-100"
          @click="signinForm"
          >If you Have account, Sign In</a
        >
      </div>
    </div>

    <div class="mx-auto my-auto" v-if="signin">
      <h1 class="text-center text-3xl mb-3 uppercase text-white">Sign In</h1>
      <form @submit.prevent="loginUser">
        <input
          type="email"
          name="email"
          v-model="email"
          class="block p-2 w-input rounded-lg m-1 border-gray-700 border-2 focus:outline-none"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          v-model="password"
          class="block p-2 w-input rounded-lg m-1 border-gray-700 border-2 focus:outline-none"
          placeholder="Password"
          required
        />
        <p v-if="error" class="text-red-400 text-sm ml-2 block">
          Wrong User Name or password
        </p>
        <div>
          <button
            class="border-2 bg-gray-800 p-2 rounded-lg text-white float-right border-green-500 hover:bg-gray-900"
          >
            Sign In
          </button>
          <div class="mx-auto my-auto mt-2 ml-2">
            <a
              href="#"
              class="text-white underline hover:text-black ease-in-out delay-150 duration-100 text-sm"
              @click="signupForm"
              >If you Haven't Created an account, <br />
              Sign In</a
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    name: 'Auth',
    data() {
      return {
        signup: true,
        signin: false,
        email: null,
        password: null,
        name: null,
        error: null,
      }
    },
    methods: {
      signinForm() {
        this.signup = false
        this.signin = true
      },
      signupForm() {
        this.signup = true
        this.signin = false
      },
      createUser() {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(data => {
            data.user.updateProfile({ displayName: this.name })
            this.$router.push({ name: 'Home' })
          })
          .catch(err => {
            this.error = 'error'
          })
      },
      loginUser() {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(data => {
            this.$router.push({ name: 'Home' })
          })
          .catch(err => {
            this.error = 'error'
            this.password = null
          })
      },
    },
  }
</script>

<style></style>
