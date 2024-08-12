<template>
    <v-app id="inspire" class="welcome">
        <v-app-bar class="glass-shadow">
            <v-app-bar-title>
                {{ $page.props.appName}}
            </v-app-bar-title>

            <v-spacer></v-spacer>

            <InertiaLink href="/">
                <v-btn>
                    Home
                </v-btn>
            </InertiaLink>

            <InertiaLink :href="route('login')">
                <v-btn>
                    Login
                </v-btn>
            </InertiaLink>

            <InertiaLink :href="route('register')">
                <v-btn>
                    Register
                </v-btn>
            </InertiaLink>
        </v-app-bar>

        <v-main >
            <v-container>
               <slot/>
            </v-container>
        </v-main>
    </v-app>
</template>
 <style>

 .welcome{
     background-image: url("/images/bg.jpg");
     background-repeat: no-repeat;
     background-size: cover;
     background-position: center;
 }

 </style>
