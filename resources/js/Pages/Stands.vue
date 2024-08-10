<template>
    <AppLayout title="All Payments">
        <div class="glass pa-3">
            <v-toolbar class="rounded-lg px-2 mb-5" density="comfortable">
                <v-toolbar-title>
                    All Stands ({{ $page.props.stands.length }})
                </v-toolbar-title>
                <v-spacer />

                <v-text-field
                    v-model="search"
                    hide-details
                    variant="solo"
                    density="compact"
                    class="mr-3"
                    placeholder="Search..."
                    prepend-inner-icon="mdi-magnify"
                />
                <v-btn @click="dialog = true" variant="flat">
                    Add Stand
                </v-btn>
            </v-toolbar>

            <v-dialog max-width="600"  v-model="dialog" persistent>
                <v-card variant="flat">
                    <v-card-title class="mb-5">Stand Information Form</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field
                                    v-model="form.stand_number"
                                    label="Enter Stand No"
                                    prepend-inner-icon="mdi-account"
                                    :item="$page.props.stand_number"
                                    :rules="clientRules"
                                    :error-messages="$page.props.errors.stand_number"
                                />

                                <v-select
                                    v-model="form.project_id"
                                    label="Please Select Project"
                                    prepend-inner-icon="mdi-book"
                                    :items="$page.props.projects"
                                    item-title="name"
                                    item-value="id"
                                    :error-messages="$page.props.errors.project_id"
                                />
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    type="number"
                                    v-model="form.price"
                                    label="Stand Price"
                                    prepend-inner-icon="mdi-book"
                                    :error-messages="$page.props.errors.price"
                                />
                               </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    type="number"
                                    v-model="form.electrification_costs"
                                    label="Electrification Costs"
                                    prepend-inner-icon="mdi-book"
                                    :error-messages="$page.props.errors.electrification_costs"
                                />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    type="number"
                                    v-model="form.square_metres"
                                    label="Square Metress"
                                    prepend-inner-icon="mdi-book"
                                    :error-messages="$page.props.errors.square_metres"
                                />
                            </v-col>
                        </v-row>

                    </v-card-text>
                    <v-card-actions class="mt-n5">
                        <v-btn class="mx-1" variant="flat" color="warning" @click="closeDialog">Cancel</v-btn>
                        <v-btn
                            variant="flat"
                            class="mx-1"
                            color="primary"
                            @click="submitForm"
                            :loading="form.processing"
                        >
                            Save Stand Details
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-data-table
                :items="$page.props.stands"
                :headers="headers"
                :search="search"
            >
                <template v-slot:item.project_id="{ item }">
                    <span v-if="item.project">{{ item.project.name }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                    <div class="d-flex">
                        <v-btn class="mx-1" color="success">View</v-btn>
                        <v-btn class="mx-1" @click="editSubject(item)">Edit</v-btn>
                        <v-btn color="error" class="mx-1" @click="deleteSubject(item)">
                            <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                    </div>
                </template>
            </v-data-table>
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue";
import {DatePicker} from "v-calendar";

export default {
    components: {DatePicker, AppLayout},
    data() {
        return {
            form: this.$inertia.form({
                id: null,
                project_id:null,
                stand_number:null,
                price:null,
                square_metres:null,
                electrification_costs:null,
                is_taken:0,
                custom_price:0,

            }),
            headers: [
                { title: 'ID', key: 'id' },
                { title: 'Stand No', key: 'stand_number' },
                { title: 'Project', key: 'project_id' },
                { title: 'Price', key: 'price' },
                { title: 'Electrification', key: 'electrification_costs' },
                { title: 'SQmtrs', key: 'square_metres' },
                { title: 'Actions', key: 'actions', sortable: false },
            ],
            dialog: false,
            search: '',
        };
    },
    methods: {
        submitForm() {
            this.form.post(route('admin.stands.store'), {
                onSuccess: () => {
                    this.closeDialog();
                },
            });
        },
        closeDialog() {
            this.dialog = false;
            this.form.reset();
        },

        editSubject(stand) {
            this.form.id                      = stand.id;
            this.form.project_id              = stand.project_id
            this.form.stand_number            = stand.stand_number
            this.form.price                   = stand.price
            this.form.square_metres           = stand.square_metres
            this.form.electrification_costs   = stand.electrification_costs
            this.form.is_taken        = stand.is_taken
            this.form.custom_price      = stand.custom_price
            this.dialog = true;
        },
        deleteSubject(stand) {
            this.$swal.fire({
                title: "Are you sure?",
                icon:'question',
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$inertia.visit(route('admin.stands.destroy', stand), {
                        method: 'delete',
                    });
                }
            });
        },
    },

}
</script>
