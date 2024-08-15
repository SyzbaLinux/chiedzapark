<template>
    <AppLayout>
            <v-toolbar class="rounded-lg mb-5" density="comfortable" color="white">
                <v-toolbar-title>
                    Generated Report
                </v-toolbar-title>
                <v-spacer />
                <v-btn @click="printDiv('contentToPrint')" variant="flat" class="ml-2" color="black">
                    Print
                </v-btn>
            </v-toolbar>


           <v-card variant="flat">
                <v-card-text>
                    <div id="contentToPrint">
                        <h1 style="font-size: 25px;">
                            Arrears Report from <b>{{  $page.props.start_date  }}</b> to <b>{{ $page.props.end_date  }}</b>
                        </h1>
                        <hr>

                        <div>
                            <br>
                            <table  width="40%">
                                <tr>
                                    <td style="border-bottom:1px solid grey; padding: 2px"><b>Project Name:</b></td>
                                    <td style="border-bottom:1px solid grey; padding: 2px">{{  $page.props.project_name }}</td>
                                </tr>

                                <tr style=" ">
                                    <td style="border-bottom:1px solid grey; padding: 2px"><b>Client:</b></td>
                                    <td style="border-bottom:1px solid grey; padding: 2px">{{  $page.props.client_name }}</td>
                                </tr>

                                <tr style=" ">
                                    <td style="border-bottom:1px solid grey; padding: 2px"><b>Total Active Contracts:</b></td>
                                    <td style="border-bottom:1px solid grey; padding: 2px">{{  $page.props.activeNumber }}  Contracts</td>
                                </tr>

                                <tr style="">
                                    <td style="border-bottom:1px solid grey; padding: 2px"><b>Total Cancelled Contracts:</b></td>
                                    <td style="border-bottom:1px solid grey; padding: 2px"> {{ $page.props.cancelledNumber }} Contracts</td>
                                </tr>
                            </table>
                            <br><br>

                            <div style="display: flex; justify-content: space-between">
                                <div style="border:1px solid grey; padding: .7rem; border-radius: 6px; width: 24%">
                                    <h3>Total Expected Amount</h3>
                                    $ {{ $page.props.totalExpectedAmount }}
                                </div>

                                <div style="border:1px solid grey; padding: .7rem; border-radius: 6px; width: 24%">
                                    <h3>Total Penalty</h3>
                                    $ {{ $page.props.totalPenalty  }}
                                </div>

                                <div style="border:1px solid grey; padding: .7rem; border-radius: 6px; width: 24%">
                                    <h3>Total Paid</h3>
                                    $ {{ $page.props.totalPaid  }}
                                </div>

                                <div style="border:1px solid grey; padding: .7rem; border-radius: 6px; width: 24%">
                                    <h3>Total Balance</h3>
                                    $ {{ $page.props.totalBalance }}
                                </div>
                            </div>
                        </div>
                        <br>
                        <!-- Table Start -->

                        <table style="text-align: left; width: 100%; margin-top: 25px; border-collapse: collapse; border: 1px solid rgb(140 140 140);">
                            <thead>
                            <tr>
                                <th style="width:3%;padding: 0.3rem; border: 1px solid rgb(140 140 140)">No</th>
                                <th style="width:15%;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Client Name</th>
                                <th style="text-align:right;width:10%;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Stand No</th>
                                <th style="text-align:right;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Price </th>
                                <th style="text-align:right;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Elec Cost</th>
                                <th style="text-align:right;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Interest</th>
                                <th style="text-align:right;width:10%;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Total Price</th>
                                <th style="text-align:right;width:10%;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Expected</th>
                                <th style="text-align:right;width:10%;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Total Paid</th>
                                <th style="text-align:right;width:10%;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Penalty</th>
                                <th style="text-align:right;width:10%;padding: 0.3rem; border: 1px solid rgb(140 140 140)">Current Due</th>
                            </tr>
                            </thead>

                            <tbody>
                            </tbody>
                        </table>

                        <!-- Table End  -->


                        <div class="my-5" style="text-align: center">
                            <hr><br>
                            <p>Computer Generated, &copy; Chiedza Park 2024</p>
                        </div>
                    </div>
                </v-card-text>
           </v-card>
    </AppLayout>
</template>
<script>
    import AppLayout from "@/Layouts/AppLayout.vue";
    export default {
        components: {AppLayout },

        methods:{

            printDiv(divId) {
                var content = document.getElementById(divId).innerHTML;
                var originalBody = document.body.innerHTML;
                document.body.innerHTML = content;
                window.print();
                document.body.innerHTML = originalBody;
            }
        }
    }
</script>
