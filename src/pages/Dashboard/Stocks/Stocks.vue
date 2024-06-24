<script lang="ts" setup>
import DisplayCard from '@/shared/components/statistics/DisplayCard.vue'
import { BarChart } from '@/shared/components/ui/chart-bar'
import { useDashboardStore } from '@/core/stores/dashboard.store'
import { cn } from '@/shared/lib/utils'
import AreaChart from '@/shared/components/ui/chart-area/AreaChart.vue'
import LineChart from '@/shared/components/ui/chart-line/LineChart.vue'
import DonutChart from '@/shared/components/ui/chart-donut/DonutChart.vue'

const dashboardStore = useDashboardStore()

const data = [
    { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
    { name: 'Jul', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
]
</script>

<template>
    <div class="container pt-7 space-y-6">
        <div>
            <h1 class="font-sans text-lg font-bold text-primary">Stocks</h1>
        </div>
        <div class="flex justify-center flex-row space-x-7">
            <div class="flex flex-col space-y-7">
                <div class="flex flex-row space-x-7">
                    <DisplayCard title="Machines" :content="{ value: 3780 }" :state="11.01" trend="down" />
                    <DisplayCard title="Pices" :content="{ value: 3780 }" :state="11.01" trend="up" />
                </div>
                <div class="flex flex-row space-x-7">
                    <DisplayCard title="Orders" :content="{ value: 3780 }" :state="11.01" trend="down" />
                    <DisplayCard title="Machines" :content="{ value: 3780 }" />
                </div>
            </div>
            <div
                :class="
                    cn(
                        'flex w-full max-w-[24rem] bg-background border rounded-lg p-6',
                        dashboardStore.isAnySidebarCollapsed() && '!max-w-[40rem]',
                    )
                "
            >
                <BarChart
                    class="w-full h-64"
                    :data="data"
                    index="name"
                    :rounded-corners="4"
                    :categories="['total', 'predicted']"
                    :y-formatter="
                        (tick, i) => {
                            return typeof tick === 'number'
                                ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                                : ''
                        }
                    "
                />
            </div>
        </div>
        <div
            :class="
                cn(
                    'flex w-full max-w-[60rem] bg-background border rounded-lg p-6',
                    dashboardStore.isAnySidebarCollapsed() && '!max-w-[80rem]',
                )
            "
        >
            <AreaChart class="w-full flex-1" :data="data" index="name" :categories="['total', 'predicted']" />
        </div>
        <div
            :class="
                cn(
                    'flex w-full max-w-[60rem] bg-background border rounded-lg p-6',
                    dashboardStore.isAnySidebarCollapsed() && '!max-w-[80rem]',
                )
            "
        >
            <LineChart
                :data="data"
                index="name"
                :categories="['total', 'predicted']"
                :y-formatter="
                    (tick, i) => {
                        return typeof tick === 'number'
                            ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                            : ''
                    }
                "
            />
        </div>
        <div
            :class="
                cn(
                    'flex w-full max-w-[60rem] bg-background border rounded-lg p-6',
                    dashboardStore.isAnySidebarCollapsed() && '!max-w-[80rem]',
                )
            "
        >
            <DonutChart index="name" :category="'total'" :data="data" />
        </div>
    </div>
</template>
