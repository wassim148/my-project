<script setup lang="ts">
import Layout from '@layouts/AuthLayout/AuthLayout.vue'
import config from './config'
import { Button } from '@/shared/components/ui/button'
</script>
<template>
    <Layout>
        <template #main>
            <div class="col-span-2 hidden md:block relative w-full h-full">
                <!-- <div class="absolute left-14 right-20 bottom-16 z-10">
                    <component :is="config.quotes"></component>
                </div> -->
                <img class="absolute -z-10 w-full h-full" src="@/assets/img/hero-9.jpg" />
                <div class="absolute bottom-2 flex space-x-2 items-center bg-transparent">
                    <span class="pl-4 text-xs font-medium text-accent-foreground md:block">
                        Photo by
                        <a
                            href="https://unsplash.com/@marvelous?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                            >Marvin Meyer</a
                        >
                        on
                        <a
                            href="https://unsplash.com/photos/people-sitting-down-near-table-with-assorted-laptop-computers-SYTO3xs06fU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                            >Unsplash</a
                        >
                    </span>
                </div>
            </div>
        </template>
        <template #hero>
            <RouterView />
        </template>
    </Layout>
</template>

<style src="./Home.css"></style>
