<template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Calendrier des absences</h2>
    <sl-calendar v-model="calendarEventStore.selectedDate" @change="loadEvents"></sl-calendar>
    <div class="mt-4">
      <ul>
        <li v-for="(event, index) in calendarEventStore.events" :key="index" class="mb-2 flex justify-between items-center">
          {{ event.description }}
          <div>
            <sl-button variant="success" @click="handleCheckIn(event.id)" v-if="!event.checkInTime">Check-in</sl-button>
            <sl-button variant="danger" @click="handleCheckOut(event.id)" v-if="!event.checkOutTime && event.checkInTime">
              Check-out
            </sl-button>
          </div>
        </li>
      </ul>
      <p v-if="!calendarEventStore.events.length" class="text-gray-500 text-sm">
        Aucun événement pour cette date.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCalendarEventStore } from '@/core/stores/calendrierInteractif.store';

const calendarEventStore = useCalendarEventStore();

onMounted(() => {
  calendarEventStore.loadEvents(calendarEventStore.selectedDate);
});

const loadEvents = () => {
  calendarEventStore.loadEvents(calendarEventStore.selectedDate);
};

const handleCheckIn = async (eventId: number) => {
  await calendarEventStore.addCheckIn(eventId);
  calendarEventStore.loadEvents(calendarEventStore.selectedDate);
};

const handleCheckOut = async (eventId: number) => {
  await calendarEventStore.addCheckOut(eventId);
  calendarEventStore.loadEvents(calendarEventStore.selectedDate);
};
</script>