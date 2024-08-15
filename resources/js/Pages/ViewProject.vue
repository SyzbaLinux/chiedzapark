<template>
    <AppLayout>

        <div class="glass pa-3">
            <v-toolbar class="rounded-lg px-2 mb-5" density="comfortable">
                <v-toolbar-title>
                    {{ $page.props.project.name }}
                </v-toolbar-title>
                <v-spacer />
                <v-dialog persistent max-width="500" v-model="dialogBatch">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn
                            v-bind="activatorProps"
                            text="Add Batch"
                            variant="flat"
                        ></v-btn>
                    </template>
                 <v-form @submit.prevent="addBatch">
                     <v-card title="Add Batch">
                         <v-card-text>
                            <v-text-field
                                    label="Batch Name"
                                    v-model="batchForm.name"
                            />
                         </v-card-text>

                         <v-card-actions>
                             <v-spacer/>
                             <v-btn
                                 text="Cancel"
                                 color="warning"
                                 @click="dialogBatch = false"
                             ></v-btn>

                             <v-btn
                                 variant="flat"
                                 :loading="batchForm.processing"
                                 text="Submit Details"
                                 type="submit"
                             ></v-btn>
                         </v-card-actions>
                     </v-card>
                 </v-form>
                </v-dialog>
            </v-toolbar>

            <v-row class="mt-3">
                <v-col cols="4">
                    <v-card @click="makeActiveVisible" variant="flat"  class="cursor-pointer  glass cursor-hand rounded-lg mb-5">
                        <div class="d-flex align-center">
                            <div style="width: 80%" class="pa-3 mt-n5">
                                <h1 class="ml-3 mt-2">{{ $page.props.project.active.length }}</h1>
                                Active Contracts
                            </div>

                            <v-card  color="success" class="mt-n1  pa-3 "  elevation="12">
                                <v-icon  >mdi-file-document-edit</v-icon>
                            </v-card>
                        </div>
                        <v-progress-linear v-if="showActive" color="primary" height="10" :model-value="100" />
                    </v-card>
                </v-col>

                <v-col cols="4">

                    <v-card @click="makeCancelledVisible" variant="flat"  class="cursor-pointer   glass cursor-hand rounded-lg mb-5">
                        <div class="d-flex align-center">
                            <div style="width: 80%" class="pa-3 mt-n5">
                                <h1 class="ml-3 mt-2">{{ $page.props.project.cancelled.length }}</h1>
                                Cancelled Contracts
                            </div>

                            <v-card  color="error" class="mt-n1  pa-3 "  elevation="12">
                                <v-icon>mdi-account-cancel</v-icon>
                            </v-card>
                        </div>
                        <v-progress-linear v-if="showCancelled" color="primary" height="10" :model-value="100" />
                    </v-card>
                </v-col>
                <v-col cols="4">

                    <v-card @click="makeBatchVisible" variant="flat"  class="cursor-pointer  glass cursor-hand rounded-lg mb-5">
                        <div class="d-flex align-center">
                            <div style="width: 80%" class="pa-3 mt-n5">
                                <h1 class="ml-3 mt-2">{{ $page.props.project.batches.length }}</h1>
                                Batches
                            </div>

                            <v-card  color="error" class="mt-n1  pa-3 "  elevation="12">
                                <v-icon>mdi-account-cancel</v-icon>
                            </v-card>
                        </div>
                        <v-progress-linear v-if="showBatch" color="primary" height="10" :model-value="100" />
                    </v-card>
                </v-col>
            </v-row>

           <v-toolbar class="my-3 rounded-lg bg-white">
               <v-toolbar-title>
                   {{ title }}
               </v-toolbar-title>
               <v-spacer/>
              <v-responsive max-width="350px">
                  <v-text-field
                      v-model="search"
                      hide-details
                      variant="solo"
                      density="compact"
                      class="mr-3"
                      placeholder="Search..."
                      prepend-inner-icon="mdi-magnify"
                      clearable
                  />
              </v-responsive>
           </v-toolbar>

          <div v-if="showBatch">

              <div v-if="selectedBatch">
                  <v-toolbar class="rounded-lg px-2 mb-5" density="comfortable">
                      <v-toolbar-title>
                          {{ $page.props.project.name }} | {{ selectedBatch.name }}
                      </v-toolbar-title>
                      <v-spacer />
                      <v-btn @click="selectedBatch = null">
                          Back to Batch List
                      </v-btn>
                      <v-dialog persistent max-width="700" v-model="dialogSelectedBatch">
                          <template v-slot:activator="{ props: activatorProps }">
                              <v-btn
                                  v-bind="activatorProps"
                                  text="Add Batch Rules"
                                  variant="flat"
                              ></v-btn>
                          </template>
                          <v-form @submit.prevent="addBatchRule">
                              <v-card title="Add Batch">
                                  <v-card-text>
                                      <v-row class="mb-3">
                                          <v-col cols="12" md="6">
                                              <label for="start_date">Select Start Date</label> <br>
                                              <DatePickerEs
                                                  v-model="batchSelectedForm.start_date"
                                                  valueType="format"
                                                  v-model:value="batchSelectedForm.start_date"
                                              />
                                              <span class="_12px" style="color: red" v-if="$page.props.errors.start_date">{{ $page.props.errors.start_date }}</span>
                                          </v-col>

                                          <v-col cols="12" md="6">
                                              <label for="start_date">Select End Date</label> <br>
                                              <DatePickerEs
                                                  v-model="batchSelectedForm.end_date"
                                                  valueType="format"
                                                  v-model:value="batchSelectedForm.end_date"
                                              />
                                              <span class="_12px" style="color: red" v-if="$page.props.errors.end_date">{{ $page.props.errors.end_date }}</span>
                                          </v-col>
                                      </v-row>

                                      <v-text-field
                                           label="Installment Amount"
                                           v-model="batchSelectedForm.installment_amount"
                                           :error-messages="$page.props.errors.installment_amount"
                                      />

                                      <v-row>
                                          <v-col>
                                              <v-text-field
                                                  class="mt-5"
                                                  label="Penalty %"
                                                  v-model="batchSelectedForm.penalty_percentage"
                                                  :error-messages="$page.props.errors.penalty_percentage"
                                                  hint="Default is 10%"
                                                  persistent-hint
                                              />
                                          </v-col>
                                          <v-col>
                                              <v-text-field
                                                  class="mt-5"
                                                  label="Calculate Penalty After"
                                                  v-model="batchSelectedForm.calculate_penalty_after"
                                                  :error-messages="$page.props.errors.calculate_penalty_after"
                                                  hint="Enter day of month. eg every 10th"
                                                  persistent-hint
                                              />
                                          </v-col>
                                          <v-col>
                                              <v-switch
                                                  :true-value="1"
                                                  :false-value="0"
                                                  color="primary"
                                                  class="mt-5"
                                                  label="Calculate Penalty for this Period?"
                                                  inset
                                                  v-model="batchSelectedForm.calculate_penalty"
                                              />
                                          </v-col>
                                      </v-row>
                                  </v-card-text>

                                  <v-card-actions>
                                      <v-spacer/>
                                      <v-btn
                                          text="Cancel"
                                          color="warning"
                                          variant="flat"
                                          @click="dialogSelectedBatch = false"
                                      ></v-btn>

                                      <v-btn
                                          variant="flat"
                                          :loading="batchSelectedForm.processing"
                                          text="Submit Rule Details"
                                          type="submit"
                                      ></v-btn>
                                  </v-card-actions>
                              </v-card>
                          </v-form>
                      </v-dialog>
                  </v-toolbar>

                  <v-table>
                      <thead>
                      <tr>
                          <th class="text-left">Start Date </th>
                          <th class="text-left">End Date  </th>
                          <th class="text-left">Installment </th>
                          <th class="text-left">Penalty Day </th>
                          <th>More</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr
                          v-for="item in selectedBatch.rules"
                          :key="item.id"
                      >
                          <td>{{ item.start_date }}</td>
                          <td>{{ item.end_date }}</td>
                          <td>{{ item.installment_amount }}</td>
                          <td>{{ item.calculate_penalty_after }}</td>
                          <td>
                              <v-btn @click="editRule(item)"  class="mx-1" color="success">View</v-btn>
                              <v-btn @click="deleteRule(item)" color="error" class="mx-1"  >
                                  Delete
                              </v-btn>
                          </td>
                      </tr>
                      </tbody>
                  </v-table>
              </div>


              <v-data-table
                  v-else
                  :items="$page.props.project.batches"
                  :headers="batchesHeaders"
              >
                  <template v-slot:item.actions="{ item }">
                      <div class="d-flex">
                          <v-btn @click="selectBatch(item)" class="mx-1" color="success">View</v-btn>
                          <v-btn  @click="editBatch(item)" class="mx-1" color="primary">Edit</v-btn>
                          <v-btn @click="deleteBatch(item)" color="error" class="mx-1"  >
                              Delete
                          </v-btn>
                      </div>
                  </template>
              </v-data-table>
          </div>

            <v-data-table
                v-else
                :items="items"
                :headers="headers"
                :search="search"
            >
                <template v-slot:item.actions="{ item }">
                    <div class="d-flex">
                        <v-btn class="mx-1" color="success">View</v-btn>
                        <v-btn v-if="showActive" color="error" class="mx-1"  >
                            Cancel
                        </v-btn>

                        <v-btn  v-if="showCancelled" color="primary" class="mx-1"  >
                            Restore
                        </v-btn>
                    </div>
                </template>
            </v-data-table>
        </div>
    </AppLayout>
</template>

<script  >
import AppLayout from "@/Layouts/AppLayout.vue";
import StatCard from "@/Components/StatCard.vue";
export default {
    components: {StatCard, AppLayout},

    data(){
        return{
            headers:[
                { title: 'ID', key: 'id' },
                { title: 'Client', key: 'client.full_name' },
                { title: 'Stand No', key: 'stand.stand_number' },
                { title: 'Batch No', key: 'batch' },
                { title: 'More', key: 'actions',sortable:false },
            ],

            batchesHeaders:[
                { title: 'ID', key: 'id' },
                { title: 'Batch Name', key: 'name' },
                { title: 'More', key: 'actions',sortable:false },
            ],
            search:'',
            showActive:true,
            showCancelled:false,
            showBatch:false,
            items:[],
            title:'Active Contracts',

            batchForm:this.$inertia.form({
                project_id:this.$page.props.project.id,
                id:null,
                name:'',
            }),
            dialogBatch:false,

            selectedBatch:false,
            dialogSelectedBatch:false,
            batchSelectedForm: this.$inertia.form({
                id:null,
                project_id:this.$page.props.project.id,
                batch_id:null,
                start_date:null,
                end_date:null,
                installment_amount:null,
                calculate_penalty:1,
                calculate_penalty_after:10,
                penalty_percentage:10,
            })
        }
    },


    created(){
        this.items = this.$page.props.project.active
    },

    methods:{


        makeCancelledVisible(){
            this.showCancelled = true
            this.showActive = false
            this.showBatch = false

            this.items = this.$page.props.project.cancelled
            this.title = 'Cancelled Contracts'
        },

        makeActiveVisible(){
            this.showCancelled = false
            this.showActive = true
            this.showBatch = false

            this.items = this.$page.props.project.active
            this.title = 'Active Contracts'
        },

        makeBatchVisible(){
            this.showCancelled = false
            this.showActive = false
            this.showBatch = true
            this.title = 'All Project Batches'
        },

        addBatch(){
            this.batchForm.post(route('admin.batch.store'),{
                onSuccess:()=>{
                    this.batchForm.reset()
                    this.dialogBatch = false
                }
            })
        },

        editBatch(batch) {
            this.batchForm.id                = batch.id;
            this.batchForm.project_id        = batch.project_id
            this.batchForm.name              = batch.name
            this.dialogBatch = true;
        },

        deleteBatch(batch) {
            this.$swal.fire({
                title: "Are you sure?",
                icon:'question',
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$inertia.visit(route('admin.batch.destroy', batch), {
                        method: 'delete',
                    });
                }
            });
        },

        selectBatch(batch){
            this.selectedBatch = batch
            this.batchSelectedForm.batch_id = batch.id
        },

        addBatchRule(){
            this.batchSelectedForm.post(route('admin.batch-rules.store'),{
                onSuccess:()=>{
                    this.batchSelectedForm.reset()
                    this.dialogSelectedBatch = false
                }
            })
        },

        editRule(rule){
            this.batchSelectedForm.id                      = rule.id;
            this.batchSelectedForm.project_id              = rule.project_id
            this.batchSelectedForm.batch_id                = rule.batch_id
            this.batchSelectedForm.start_date              = rule.start_date
            this.batchSelectedForm.end_date                = rule.end_date
            this.batchSelectedForm.installment_amount      = rule.installment_amount
            this.batchSelectedForm.calculate_penalty       = rule.calculate_penalty
            this.batchSelectedForm.calculate_penalty_after = rule.calculate_penalty_after
            this.dialogSelectedBatch = true;
        },


        deleteRule(rule){
            this.$swal.fire({
                title: "Are you sure?",
                icon:'question',
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$inertia.visit(route('admin.batch-rules.destroy', rule), {
                        method: 'delete',
                    });
                }
            });
        }

    }




}
</script>
