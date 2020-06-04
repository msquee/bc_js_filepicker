<template>
  <div>
    <button
      @click="openFilePicker"
      class="bg-blue-600 hover:bg-blue-700 text-md py-4 px-3 text-white rounded-md focus:outline-none focus:shadow-outline leading-none font-sans"
    >Choose File</button>
    <div
      v-show="filePickerOpen"
      class="pointer-events-auto fixed w-full h-full top-0 left-0 flex items-center justify-center"
    >
      <div class="absolute w-full h-full bg-gray-900 opacity-25"></div>
      <div class="bg-white w-7/12 mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div class="py-4 text-left px-6">
          <div class="flex justify-end pt-2">
            <button
              class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
            >Close</button>
          </div>

          <div class="flex-1 flex">
            <div class="w-64 p-6 bg-gray-100 flex-shrink-0 overflow-y-auto">
              <nav>
                <h2
                  class="-mx-3 text-xs font-semibold text-gray-600 uppercase tracking-wide"
                >Quick Access</h2>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "input",
    "fs_favorites",
    "show_hidden",
    "target_file_type",
    "target_file_pattern"
  ],

  data: () => {
    return {
      filePickerOpen: false
    };
  },

  mounted() {
    console.log("Hello from Vue");
  },

  methods: {
    toggleFilePicker() {
      this.filePickerOpen = !this.filePickerOpen;
    },

    openFilePicker(event) {
      event.preventDefault();

      this.toggleFilePicker();
    }
  }
};
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
