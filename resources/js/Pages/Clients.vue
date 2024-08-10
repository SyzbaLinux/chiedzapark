<template>
    <AppLayout title="All Payments">
        <div class="glass pa-3">
            <v-toolbar class="rounded-lg px-2 mb-5" density="comfortable">
                <v-toolbar-title>
                    All Clients ({{ $page.props.clients.length }})
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
                    Add Client
                </v-btn>
            </v-toolbar>

            <v-dialog max-width="600"  v-model="dialog" persistent>
                <v-card variant="flat">
                    <v-card-title class="mb-5">Client Information Form</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field
                                    v-model="form.fullname"
                                    label="Select Client Name"
                                    prepend-inner-icon="mdi-account"
                                    :item="$page.props.fullname"
                                    :rules="clientRules"
                                    :error-messages="$page.props.errors.fullname"
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

                        <v-row  class="mt-n8">
                            <v-col cols="12" md="6">
                                <label for="start_date">Select Date of Birth</label> <br>
                                <DatePickerEs
                                    valueType="format"
                                    v-model:value="form.dob"
                                />
                                <span class="_12px" style="color: red" v-if="$page.props.errors.dob">{{ $page.props.errors.dob }}</span>
                            </v-col>

                            <v-col cols="12" md="6"><br>
                                <v-text-field
                                    v-model="form.natID"
                                    label="Enter Client National ID"
                                    prepend-inner-icon="mdi-book"
                                    :rules="natIDRules"
                                    :error-messages="$page.props.errors.natID"
                                />
                            </v-col>
                        </v-row>

                        <v-row class="mt-n8">
                            <v-col cols="12" md="6"><br>
                                <v-text-field
                                    v-model="form.email"
                                    label="Enter Client Email"
                                    prepend-inner-icon="mdi-book"
                                    :error-messages="$page.props.errors.email"
                                />
                            </v-col>

                            <v-col cols="12" md="6"><br>
                                <v-text-field
                                    v-model="form.phone"
                                    label="Enter Client Phone"
                                    prepend-inner-icon="mdi-book"
                                    :error-messages="$page.props.errors.phone"
                                />
                            </v-col>
                        </v-row>

                        <v-row class="mt-n8">
                            <v-col cols="12" md="12"><br>
                                <v-textarea
                                    rows="3"
                                    v-model="form.address"
                                    label="Enter Client address"
                                    prepend-inner-icon="mdi-book"
                                    :error-messages="$page.props.errors.address"
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
                            Submit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-data-table
                :items="$page.props.clients"
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
                fullname:null,
                email:null,
                phone:null,
                address:null,
                natID:null,
                dob:null,

            }),
            headers: [
                { title: 'ID', key: 'id' },
                { title: 'Client Fullname', key: 'fullname' },
                { title: 'Project', key: 'project_id' },
                { title: 'NatID', key: 'natID' },
                { title: 'Actions', key: 'actions', sortable: false },
            ],
            dialog: false,
            search:'',
            clientRules: [ (value) => !!value || 'Please Enter Client Name'],
            natIDRules: [ (value) => !!value || 'National ID is Required'],
        };
    },
    methods: {
        submitForm() {
            this.form.post(route('admin.clients.store'), {
                onSuccess: () => {
                    this.closeDialog();
                },
            });
        },
        closeDialog() {
            this.dialog = false;
            this.form.reset();
        },

        editSubject(client) {
            this.form.id            = client.id;
            this.form.project_id    = client.project_id
            this.form.fullname      = client.fullname
            this.form.email         = client.email
            this.form.phone         = client.phone
            this.form.address       = client.address
            this.form.natID         = client.natID
            this.form.dob           = client.dob
            this.dialog = true;
        },
        deleteSubject(payment) {
            this.$swal.fire({
                title: "Are you sure?",
                showDenyButton: true,
                icon:'question',
                confirmButtonText: "Delete",
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$inertia.visit(route('admin.clients.destroy', payment), {
                        method: 'delete',
                    });
                }
            });
        },
    },

}
</script>
