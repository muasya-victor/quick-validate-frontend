<script setup>

import ExternalAuth from "@/views/auth/forms/ExternalAuth.vue"
import { onMounted,ref, watch } from "vue"

const loginImages = ref([
  'invoice.png',
  'receipt_and_money.png',
  'too_much.png',
  ])

const imageIndex = ref(0)
let timeout
const switchImages = (index = 0, isClickEvent=false)=>{
  clearTimeout(timeout)
  if(isClickEvent){
    imageIndex.value = index
  }else{
    timeout = setTimeout(()=>{
      imageIndex.value = index
    }, 2000)
  }
}

const manualImageSwitch = (imageIndex)>{

}

watch(imageIndex,()=>{
    if(imageIndex.value+1===loginImages.value.length ){
      switchImages(0)
    }else{
      switchImages(imageIndex.value+1)
    }
})

const currentImage = ()=>{
  return loginImages.value[imageIndex.value];
}

onMounted(()=>{
  switchImages(1)
})
</script>

<template>
  <div class="grid md:grid-cols-12 h-screen ">
    <div class="w-full col-span-5 flex flex-col gap-4 h-full hidden md:flex items-center justify-center bg-blue-100">
      <div class="h-2/3 flex items-center justify-center w-full">
        <img alt="agile ui login illustration " :src="'/' + currentImage()" class="w-2/3" >
      </div>

      <div class="flex flex-row gap-2 ">
        <div @click="switchImages(index, true)" :key="i" v-for="(i, index) in loginImages"
             :class="[index===imageIndex? 'bg-blue-500':'bg-gray-200']" class="w-12 rounded-md h-2 cursor-pointer">
        </div>
      </div>

    </div>

    <div class="w-full h-full col-span-7 flex items-center justify-center">
      <div class="w-8/12 flex flex-col gap-4 ">
        <slot></slot>

        <span class="text-gray-300 text-xs mt-5">
          System By
          <a href="mailto:vicmwe184@gmail.com?subject=Interested%20in%20System%20Development&body=Hello%20Victor,%0D%0A%0D%0AI%20am%20interested%20in%20discussing%20the%20possibility%20of%20you%20developing%20a%20system%20for%20my%20business.%20Please%20let%20me%20know%20how%20we%20can%20move%20forward.%0D%0A%0D%0ABest%20regards,"
             target="_blank">Muasya</a>
        </span>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>


