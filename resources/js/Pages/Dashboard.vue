<script  >
import AppLayout from '@/Layouts/AppLayout.vue';
import StatCard from "@/StatCard.vue";
import moment from "moment";

export default {
    components: {AppLayout, StatCard},

    computed:{

        currentMonth(){
            return moment(new Date()).format("MMMM");
        }
    }

}
</script>

<template>
    <AppLayout title="Dashboard">
        <v-row class="mt-3">
           <v-col cols="6">
              <v-row>
                  <v-col cols="6">
                      <StatCard
                          color="black"
                          icon="mdi-map-marker"
                          title="All Stands"
                          :num="$page.props.stands"
                          :url="route('admin.stands.index')"
                      />
                  </v-col>
                  <v-col cols="6">
                      <StatCard
                          color="primary"
                          icon="mdi-account-group"
                          title="All Clients"
                          :num="$page.props.clients"
                          :url="route('admin.clients.index')"
                      />
                  </v-col>
                  <v-col cols="6">
                      <StatCard
                          color="success"
                          icon="mdi-account-group"
                          title="Active Contracts"
                          :num="$page.props.active"
                          :url="route('admin.contracts.index')"
                      />
                  </v-col>
                  <v-col cols="6">
                      <StatCard
                          color="error"
                          icon="mdi-account-group"
                          title="Cancelled Contracts"
                          :num="$page.props.cancelled"
                          :url="route('admin.cancelled.contracts')"
                      />
                  </v-col>
                  <v-col cols="6">
                      <StatCard
                          color="purple-darken-4"
                          icon="mdi-account-group"
                          :title="currentMonth +' Payments'"
                          :num="'$'+$page.props.totalpayments"
                          :url="route('admin.payments.index')"
                      />
                  </v-col>

                  <v-col cols="6">
                      <StatCard
                          color="orange-darken-4"
                          icon="mdi-bell"
                          title="Notifications'"
                          :num="0"
                           url="#"
                      />
                  </v-col>
              </v-row>
           </v-col>
           <v-col cols="6">
               Graph
           </v-col>
        </v-row>
    </AppLayout>
</template>
