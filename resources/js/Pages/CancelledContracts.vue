<template>
    <AppLayout title="Clients & Contracts">
        <div class="glass pa-3">
            <v-toolbar color="error" class="rounded-lg px-2 mb-5" density="comfortable">
                <v-toolbar-title>
                   Cancelled Contracts ({{ $page.props.contracts.length }})
                </v-toolbar-title>
                <v-spacer />
                <v-text-field
                    v-model="search"
                    hide-details
                    variant="solo"
                    density="compact"
                    placeholder="Search..."
                    prepend-inner-icon="mdi-magnify"
                    clearable
                />
            </v-toolbar>

            <v-data-table
                :items="$page.props.contracts"
                :headers="headers"
                :search="search"
            >


                <template v-slot:item.actions="{ item }">
                    <div class="d-flex">
                        <v-btn class="mx-1" color="success">View</v-btn>
                        <v-btn color="error" class="mx-1" @click="deleteSubject(item)">
                            <v-icon>mdi-refresh</v-icon>Restore
                        </v-btn>
                    </div>
                </template>
            </v-data-table>
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue";

export default {
    name: "Contracts",
    components: {AppLayout},
    data(){
        return{
            headers:[
                { title: 'ID', key: 'id' },
                { title: 'Client', key: 'client.full_name' },
                { title: 'Project', key: 'project.name' },
                { title: 'Batch No', key: 'batch' },
                { title: 'More', key: 'actions',sortable:false },
            ],
            search:'',
        }
    }

}
</script>
