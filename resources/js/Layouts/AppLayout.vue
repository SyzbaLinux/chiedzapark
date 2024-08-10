<script>

export default {
    watch: {
        $page: {
            handler() {
                const message = this.$page.props.flash.message;
                if (message != null) {
                    if(!message.optionRoute){
                        this.$swal.fire({
                            icon: message.type,
                            title: message.title,
                            text: message.description
                        })

                    }else{

                        this.$swal.fire({
                            title: message.title,
                            text:message.optiontext,
                            icon: message.type,
                            showCancelButton: true,
                            confirmButtonColor: '#42a848',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Close',
                            confirmButtonText: 'Yes, Proceed'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.$inertia.visit(message.optionRoute)
                            }
                        })
                    }
                }
            },
        },
    },

    data(){
        return{
            drawer:null,
            items:[
                {
                    text: 'Dashboard',
                    icon: 'mdi-folder-home',
                    url:route('admin.dashboard'),
                },
                {
                    text: 'projects',
                    icon: 'mdi-map',
                    url:route('admin.projects.index'),
                },
                {
                    text: 'Payments',
                    icon: 'mdi-account-cash',
                    url:route('admin.payments.index'),
                },
                {
                    text: 'Clients & Contracts',
                    icon: 'mdi-file-document-edit',
                    url:route('admin.contracts.index'),
                },
                {
                    text: 'Cancelled Contracts',
                    icon: 'mdi-account-cancel',
                    url:route('admin.cancelled.contracts'),
                },
                {
                    text: 'Clients',
                    icon: 'mdi-account-group',
                    url:route('admin.clients.index'),
                },
                {
                    text: 'Stands',
                    icon: 'mdi-map-marker',
                    url:route('admin.stands.index'),
                },
                {
                    text: 'Reports',
                    icon: 'mdi-file-document',
                    url:route('admin.report'),
                },
                {
                    text: 'System Users',
                    icon: 'mdi-account-multiple',
                    url:route('admin.users'),
                },
            ]
        }
    },
    props:{
        title:{
            default:'Chiedza'
        }
    },

    methods:{
        getPath(stringG){
            if(stringG){
                let url = new URL(stringG)
                return url.pathname
            }
        }
    }

}
</script>

<template>
    <Head :title="title"/>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" class="glass-shadow">
            <v-list  density="compact" class="mt-n3">
                <v-list>
                    <v-list-item class="text-center">
                        <img height="40" src="/images/logo.png" :alt="$page.props.appName" />
                        <v-list-item-title>
                            <b> {{ $page.props.auth.user.name }}</b>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ $page.props.auth.user.email }}
                        </v-list-item-subtitle>

                        <InertiaLink class="InertiaLink" :href="route('profile.show')">
                            <v-btn class="mt-2" size="small" color="primary" variant="flat" block>
                                Systems Adminstrator
                            </v-btn>
                        </InertiaLink>

                    </v-list-item>
                </v-list>
                <v-divider/>
                <v-list-subheader class="my-3">{{ $page.props.appName}}</v-list-subheader>
                <InertiaLink
                    class="InertiaLink raleway"
                    v-for="(item, i) in items"
                    :key="i"
                    :href="item.url"
                >
                    <v-list-item
                        :class="{ 'active-sidebar':$page.url == getPath(item.url) }"
                    >
                        <template v-slot:prepend>
                            <v-icon :icon="item.icon"></v-icon>
                        </template>

                        <v-list-item-title class="raleway" v-text="item.text"></v-list-item-title>
                    </v-list-item>
                </InertiaLink>




<!--                <div class="pa-6 px-2 userbottom ">-->
<!--                    <v-sheet class="  bg-primary  rounded-lg pa-2 ">-->
<!--                        <div class="d-flex align-center justify-space-between">-->
<!--                            <div>-->
<!--                                <h4 class="  d-flex align-center font-weight-semibold">{{ $page.props.auth.user.name }}</h4>-->
<!--                                <span class="text-subtitle-2 font-weight-medium text-grey100">School Admin</span>-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                <InertiaLink as="button" :href="route('logout')" method="post">-->
<!--                                    <v-btn color="primary" icon="mdi-logout" variant="elevated"   />-->
<!--                                </InertiaLink>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </v-sheet>-->
<!--                </div>-->
            </v-list>


        </v-navigation-drawer>

        <v-app-bar   class="glass-shadow">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title>{{ $page.props.appName }}</v-app-bar-title>
            <v-btn
                color="primary"
            >
                <v-icon icon="mdi-account-circle"/>
                {{ $page.props.auth.user.name }}
                <v-menu activator="parent">
                    <v-list>
                        <v-list-item>
                            <v-list-item-title>
                                {{ $page.props.auth.user.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ $page.props.auth.user.email }}
                            </v-list-item-subtitle>
                        </v-list-item>
                        <v-divider class="my-2" />

                        <v-list-item :href="route('profile.show')">
                            <v-list-item-title>
                                <v-icon>mdi-account-circle</v-icon>  Profile
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item class="cursor-pointer" @click="logout">
                            <v-list-item-title>
                                <v-icon>mdi-login</v-icon> Logout
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container>
                <slot/>
            </v-container>
        </v-main>
    </v-app>
</template>


