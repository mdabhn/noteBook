<template>
  <div class="h-screen w-screen bg-gray-200">
    <div class="flex flex-row">
      <div class="flex flex-col left-side h-screen bg-gray-300">
        <div class="flex flex-col my-auto w-64">
          <a
            href="#/home/"
            class="p-4 text-lg m-3 border-l-4 border-gray-700 hover:bg-gray-500 transition delay-100 duration-100 ease-in-out"
            @click="showContentForm"
          >
            Write
          </a>

          <a
            href="#/home/"
            class="p-4 text-lg m-3 border-l-4  border-gray-700 hover:bg-gray-500 transition delay-100 duration-100 ease-in-out"
            @click="showDocument"
          >
            Documnets
          </a>
        </div>
      </div>

      <transition name="fade">
        <p v-if="message" class="capitalize mx-auto my-auto text-3xl">
          Welcome {{ userName }}, Let's Make a new note
        </p>
      </transition>

      <transition name="fade">
        <div v-if="createContent" class="flex main-side mx-auto mt-4">
          <Editor @addNote="addNote" />
        </div>
      </transition>

      <transition name="fade">
        <div class="flex mx-auto" v-if="showDocuments">
          <Documnets :notes="notes" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'

  import Editor from './Editor'
  import Documnets from './Documnets'
  import databese from '../firebase'
  import database from 'firebase'

  export default {
    name: 'Home',
    components: {
      Editor,
      Documnets,
    },
    data() {
      return {
        userName: null,
        message: false,
        collectionName: null,
        createContent: false,
        showDocuments: false,
        notes: [],
      }
    },
    methods: {
      showDocument() {
        this.showDocuments = true
        this.createContent = false
        this.message = false
      },
      showContentForm() {
        this.createContent = true
        this.showDocuments = false
        this.message = false
      },
      addNote(data) {
        databese
          .collection(this.collectionName)
          .add({
            note: data,
          })
          .catch(err => {
            console.error(err)
          })
        this.showDocuments = true
        this.createContent = false
        this.message = false
      },
      collectData() {
        const ref = databese.collection(this.collectionName)
        ref.onSnapshot(snapShot => {
          snapShot.docChanges().forEach(data => {
            console.log(data.doc.data())
            this.notes.push(data.doc.data().note)
          })
        })
      },
    },
    created() {
      this.message = true

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.userName = user.displayName
          this.collectionName = user.uid

          this.collectData()
        } else {
          console.log('Not a registered user')
        }
      })

      // const ref = databese.collection(this.collectionName)
      // ref.onSnapshot(snapShot => {
      //   snapShot.docChanges().forEach(data => {
      //     console.log(data.doc.data())
      //     this.notes.push(data.doc.data().note)
      //   })
      // })
    },
  }
</script>

<style>
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: all 0.3s ease-in-out;
  }

  .fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1) ease-in-out;
    opacity: 0;
  }

  .slide-fade-leave-to {
    transform: translateX(10px);
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1) ease-in-out;
    opacity: 0;
  }
</style>
