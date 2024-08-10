<template>
    <AppLayout title="All Payments">
        <div class="glass pa-3">
            <v-toolbar class="rounded-lg px-2 mb-5" density="comfortable">
                <v-toolbar-title>
                    All Payments ({{ $page.props.payments.length }})
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
                    Add Payment
                </v-btn>
            </v-toolbar>

            <v-dialog max-width="700"  v-model="dialog" persistent>
                <v-card variant="flat">
                    <v-card-title class="my-3">Payment Information Form</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-autocomplete
                                    clearable
                                    v-model="form.client_id"
                                    label="Select Client Name"
                                    prepend-inner-icon="mdi-account-group"
                                    :items="$page.props.clients"
                                    item-title="fullname"
                                    item-value="id"
                                    :rules="clientRules"
                                    :error-messages="$page.props.errors.client_id"
                                    @update:modelValue="getClientContracts()"
                                />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    :disabled="gettingContracts"
                                    v-model="form.agreement_of_sale_id"
                                    label="Please Select Client Contract"
                                    prepend-inner-icon="mdi-book"
                                    :items="clientContracts"
                                    :error-messages="$page.props.errors.agreement_of_sale_id"
                                />
                            </v-col>
                            <v-col cols="12" md="6">
                                <label for="start_date">Select Date Paid</label> <br>
                                <DatePickerEs
                                    v-model="form.receipt_date"
                                    valueType="format"
                                    v-model:value="form.receipt_date"
                                />
                                <span class="_12px" style="color: red" v-if="$page.props.errors.receipt_date">{{ $page.props.errors.receipt_date }}</span>
                            </v-col>

                            <v-col cols="12" md="6"><br>
                                <v-text-field
                                    v-model="form.receipt_number"
                                    label="Receipt No"
                                    prepend-inner-icon="mdi-book"
                                    :error-messages="$page.props.errors.receipt_number"
                                />
                            </v-col>

                            <v-col cols="12" md="6"><br>
                                <v-text-field
                                    type="number"
                                    v-model="form.amount_paid"
                                    label="Amount Paid"
                                    prepend-inner-icon="mdi-book"
                                    :rules="amountRules"
                                    :error-messages="$page.props.errors.amount_paid"
                                />
                            </v-col>

                            <v-col cols="12" md="6"><br>
                                <v-textarea
                                    rows="3"
                                    v-model="form.description"
                                    label="Additional Details"
                                    prepend-inner-icon="mdi-book"
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
                :items="$page.props.payments"
                :headers="headers"
                :search="search"
            >

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

        <v-overlay v-model="gettingContracts" class="d-flex align-center justify-center">
          <div class="text-center" >
              <v-progress-circular
                  color="white"
                  size="80"
                  indeterminate
              />
              <br>
             <span class="text-white">
                  Please wait... while we fetch client contracts
             </span>
          </div>
        </v-overlay>
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
                client_id:null,
                receipt_date:null,
                agreement_of_sale_id:null,
                receipt_number:null,
                amount_paid:null,
                description:null,
            }),
            headers: [
                { title: 'ID', key: 'id' },
                { title: 'Client', key: 'client.fullname' },
                { title: 'Date paid', key: 'receipt_date' },
                { title: 'Contract', key: 'agreement_of_sale_id' },
                { title: 'Receipt No', key: 'receipt_number' },
                { title: 'Actions', key: 'actions', sortable: false },
            ],
            search: '',
            dialog: false,
            clientRules: [ (value) => !!value || 'Please Select a Client'],
            contractRules: [(value) => !!value || 'Client Contract is required'],
            dateRules: [(value) => !!value || 'Date paid is required'],
            amountRules: [(value) => !!value || 'Amount paid is required'],

            clientContracts:[],
            gettingContracts:false,
        };
    },
    methods: {
        submitForm() {
            this.form.post(route('admin.payments.store'), {
                onSuccess: () => {
                    this.closeDialog();
                },
            });
        },
        closeDialog() {
            this.dialog = false;
            this.form.reset();
        },

        editSubject(payment) {
            this.form.id                     = payment.id;
            this.form.project_id             = payment.project_id
            this.form.client_id              = payment.client_id
            this.form.receipt_date           = payment.receipt_date
            this.form.agreement_of_sale_id   = payment.agreement_of_sale_id
            this.form.stand_number           = payment.stand_number
            this.form.receipt_number         = payment.receipt_number
            this.form.amount_paid            = payment.amount_paid
            this.form.description            = payment.description
            this.form.payment_method         = payment.payment_method
            this.form.currency               = payment.currency
            this.form.amount_in_words        = payment.amount_in_words
            this.dialog = true;
        },
        deleteSubject(payment) {
            this.$swal.fire({
                title: "Are you sure?",
                icon:'question',
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$inertia.visit(route('admin.payments.destroy', payment), {
                        method: 'delete',
                    });
                }
            });
        },

        getClientContracts(){
            if(this.form.client_id){
                this.gettingContracts = true
                axios.get(route('admin.clientContracts',this.form.client_id)).then(res=>{
                    this.clientContracts  = res.data
                    this.gettingContracts = false
                })
            }
        }
    },

}
</script>
