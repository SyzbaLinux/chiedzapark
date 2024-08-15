<template>
    <AppLayout title="Generate Report">
        <div class="glass pa-3">
            <v-toolbar  class="rounded-lg px-2 mb-5" density="comfortable">
                <v-toolbar-title>
                    Generate Report
                </v-toolbar-title>
            </v-toolbar>

            <v-form @submit.prevent="generateReport()">
                <v-card variant="flat">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="3" md="3" lg="3">
                            <label for="start_date">Select Start Date</label> <br>
                            <DatePickerEs
                                v-model="form.start_date"
                                valueType="format"
                                v-model:value="form.start_date"
                            />
                            <span class="_12px" style="color: red" v-if="$page.props.errors.start_date">{{ $page.props.errors.start_date }}</span>

                        </v-col>

                        <v-col cols="12" sm="3" md="3" lg="3">
                            <label for="start_date">Select End Date</label> <br>
                            <DatePickerEs
                                v-model="form.end_date"
                                valueType="format"
                                v-model:value="form.end_date"
                            />
                            <span class="_12px" style="color: red" v-if="$page.props.errors.end_date">{{ $page.props.errors.end_date }}</span>

                        </v-col>

                        <v-col cols="12" sm="3" md="3" lg="3">
                            <label for="">Report type</label>
                            <v-select
                                v-model="form.report_type"
                                :items="['payments','arrears']"
                            />
                        </v-col>

                        <v-col cols="12" sm="3" md="3" lg="3">
                            <label for="">Select Project</label>
                            <v-select
                                v-model="form.project_id"
                                :items="$page.props.projects"
                                item-value="id"
                                item-title="name"
                                :error-messages="$page.props.errors.project_id"
                            />
                        </v-col>

                        <v-col cols="12" sm="3" md="3" lg="3">
                            <label for="">Additional Information</label>
                            <v-select
                                v-model="form.extra_info"
                                :items="['none','client']"
                                clearable
                            />
                        </v-col>

                        <v-col v-if="form.extra_info ==='client'" cols="12" sm="3" md="3" lg="3">
                            <label for="">Select Client</label>
                            <v-combobox
                                :items="$page.props.clients"
                                v-model="form.client_id"
                                item-value="id"
                                item-title="first_name"
                                variant="outlined"
                                density="comfortable"
                                clearable
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
              <v-card-actions>
                    <v-btn :loading="form.processing" variant="flat" size="x-large" type="submit">
                        Submit & Generate Report
                    </v-btn>
              </v-card-actions>
            </v-card>
            </v-form>
        </div>
    </AppLayout>
</template>

<script>
    import AppLayout from "@/Layouts/AppLayout.vue";
    export default {
        components: {AppLayout},

        data(){
            return{
                form:this.$inertia.form({
                    start_date:this.$page.props.start_date,
                    end_date:this.$page.props.end_date,
                    report_type:'payments',
                    project_id:1,
                    extra_info:'none',
                    client_id:null,
                })
            }
        },

        methods:{

            generateReport(){
                this.form.get(route('admin.generateReport'))
            }
        }

    }
</script>
