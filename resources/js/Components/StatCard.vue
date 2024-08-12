<template>
    <InertiaLink :href="url" class="InertiaLink">
       <v-card variant="flat"  class="  glass cursor-hand rounded-lg mb-5">
            <div class="d-flex align-center">
                <div style="width: 80%" class="pa-3 mt-n5">
                    <h1 class="ml-3 mt-2">{{ num }}</h1>
                     {{ title }}
                </div>

                <v-card :color="color" class="mt-n1 mr-n5 pa-3 "  elevation="12">
                     <v-icon class="mr-2">{{ icon }}</v-icon>
                </v-card>
            </div>

           <div>
               <v-btn block variant="text" :color="color"  >
                   View
               </v-btn>
           </div>
       </v-card>
    </InertiaLink>
</template>

<script>
export default {
    name: "StatCard",
    props:{
        color:{  type:String, default:'green' },
        icon:{   type:String, default:'mdi-scale-balance' },
        title:{  type:String, default:'' },
        num:{    type:Number, default:0  },
        url:{    type:String,default:'#' },
    }
}
</script>
<style scoped>
</style>

