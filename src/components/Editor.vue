<template>
  <div>
    <h1 class="text-center p-3 text-4xl">Write Your Content</h1>
    <vue-editor id="responsibilityEdit" v-model="content" />
    <button
      class="border-2 p-2 w-32 m-4 bg-gray-800 text-white float-right hover:bg-gray-900"
      @click="subContent"
    >
      Create
    </button>
  </div>
</template>

<script>
  import { VueEditor, Quill } from 'vue2-editor'

  export default {
    name: 'Editor',
    components: {
      VueEditor,
    },
    data() {
      return {
        content: '',
      }
    },
    methods: {
      subContent() {
        console.log(this.content)
      },
    },
  }
</script>

<style>
  #responsibilityEdit .ql-editor {
    min-height: 320px;
    font-size: 21px;
    border: 0.001rem solid rgb(185, 179, 179);
  }
</style>
