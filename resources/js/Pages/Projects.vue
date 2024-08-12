<template>
    <AppLayout title="All Subjects">
        <div class="glass pa-3">
            <v-toolbar class="rounded-lg px-2 mb-5" density="comfortable">
                <v-toolbar-title>
                    All Subjects ({{ $page.props.projects.length }})
                </v-toolbar-title>
                <v-spacer />
                <v-btn @click="dialog = true" variant="flat">
                    Add Subject
                </v-btn>
            </v-toolbar>

            <v-dialog max-width="600"  v-model="dialog">
                <v-card variant="flat">
                    <v-card-title class="mb-5">Project Information Form</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field
                                    v-model="form.name"
                                    label="Name"
                                    prepend-inner-icon="mdi-book"
                                    :rules="[rules.required]"
                                    :error-messages="$page.props.errors.name"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea
                                    rows="3"
                                    v-model="form.description"
                                    label="Description"
                                    prepend-inner-icon="mdi-text"
                                    :error-messages="$page.props.errors.description"
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
                :items="$page.props.projects"
                :headers="headers"
            >
                <template v-slot:item.actions="{ item }">
                    <div class="d-flex">
                        <InertiaLink :href="route('admin.projects.show',item)">
                            <v-btn class="mx-1" color="success">View</v-btn>
                        </InertiaLink>
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
export default {
    components: { AppLayout },
    data() {
        return {
            form: this.$inertia.form({
                id: null,
                name: null,
                code: null,
                description: null,
            }),
            headers: [
                { title: 'ID', key: 'id' },
                { title: 'Project Name', key: 'name' },
                { title: 'Description', key: 'description' },
                { title: 'Actions', key: 'actions', sortable: false },
            ],
            dialog: false,
            rules: {
                required: (value) => !!value || 'This field is required.',
            },
        };
    },
    methods: {
        submitForm() {
            this.form.post(route('admin.projects.store'), {
                onSuccess: () => {
                    this.closeDialog();
                },
            });
        },
        closeDialog() {
            this.dialog = false;
            this.form.reset();
        },
        editSubject(project) {
            this.form.id = project.id;
            this.form.name = project.name;
            this.form.description = project.description;
            this.dialog = true;
        },
        deleteSubject(project) {
            this.$swal.fire({
                title: "Are you sure you want to delete this project?",
                icon:'question',
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$inertia.visit(route('admin.projects.destroy', project), {
                        method: 'delete',
                    });
                }
            });
        },
    },
};
</script>
