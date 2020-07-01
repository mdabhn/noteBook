<template>
  <div>
    <h1 class="text-center p-3 text-4xl">Documents...</h1>
    <div v-if="notes.length === 0" class="mx-auto text-lg">
      You Haven't Created any Notes Yet
    </div>
    <div class="flex flex-auto grid grid-cols-3 gap-3" style="max-height:90vh">
      <div v-for="(note, index) in notes" :key="index">
        <div
          class="border-2 m-2 shadow-md p-4 hover:bg-gray-300 ease-in-out duration-100 delay-75 cursor-pointer"
          style="min-width:20rem"
        >
          <div v-html="note.note"></div>
          <button
            class="border-2 p-1 w-20 bg-red-700 text-white rounded-full hover:bg-red-800 float-right focus:outline-none"
            @click="DeleteNote(note.id, index)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import db from '../firebase'
  export default {
    name: 'Documnets',
    props: ['notes'],
    methods: {
      DeleteNote(id, index) {
        this.$emit('DeleteNote', id, index)
      },
    },
  }
</script>

<style></style>
