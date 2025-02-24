<template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Tableau de bord interactif</h2>

    <div class="mb-4">
      <FullCalendar :options="calendarOptions" />
    </div>

    <div class="mt-4">
      <ul>
        <li
          v-for="(event, index) in calendarEventStore.events"
          :key="index"
          class="mb-2 flex justify-between items-center"
        >
          <span :class="{ 'text-yellow-500': event.status === 'pending', 'text-green-500': event.status === 'approved' }">
            {{ event.description }}
          </span>
          <div>
            <sl-button variant="success" @click="handleCheckIn(event.id)" v-if="!event.checkInTime">Check-in</sl-button>
            <sl-button
              variant="danger"
              @click="handleCheckOut(event.id)"
              v-if="!event.checkOutTime && event.checkInTime"
            >
              Check-out
            </sl-button>
          </div>
        </li>
      </ul>
      <p v-if="!calendarEventStore.events.length" class="text-gray-500 text-sm">
        Aucun événement pour cette date.
      </p>
    </div>

    <div class="mt-6">
      <h3 class="text-lg font-semibold mb-2">Jours fériés locaux et internationaux</h3>
      <ul>
        <li v-for="(holiday, index) in holidayStore.holidays" :key="index" class="mb-2">
          {{ holiday.date }} - {{ holiday.name }}
        </li>
      </ul>
      <p v-if="!holidayStore.holidays.length" class="text-gray-500 text-sm">
        Aucun jour férié enregistré pour cette période.
      </p>
    </div>

    <div class="mt-6">
      <h3 class="text-lg font-semibold mb-2">Périodes de restriction</h3>
      <ul>
        <li v-for="(rule, index) in restrictionStore.restrictions" :key="index" class="mb-2">
          Du {{ rule.startDate }} au {{ rule.endDate }} - {{ rule.reason }}
        </li>
      </ul>
      <p v-if="!restrictionStore.restrictions.length" class="text-gray-500 text-sm">
        Aucune période de restriction enregistrée.
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useCalendarEventStore } from '@/core/stores/calendrierInteractif.store';
import { useHolidayStore } from '@/core/stores/holiday.store';
import { useRestrictionStore } from '@/core/stores/restriction.store';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const calendarEventStore = useCalendarEventStore();
const holidayStore = useHolidayStore();
const restrictionStore = useRestrictionStore();

const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: [],
  selectable: true,
  select: (info) => {
    calendarEventStore.selectedDate = info.startStr;
    loadEvents();
  },
  eventContent: (arg) => {
    return { html: arg.event.title };
  },
});

onMounted(async () => {
  await calendarEventStore.loadEvents(calendarEventStore.selectedDate);
  await holidayStore.fetchHolidays();
  await restrictionStore.fetchRestrictions();

  calendarOptions.events = calendarEventStore.events.map((event) => ({
    id: event.id,
    title: event.description,
    start: event.dateDebut,
    end: event.dateFin,
    color: event.status === 'approved' ? '#28a745' : '#ffc107',
  }));
});

const loadEvents = () => {
  calendarEventStore.loadEvents(calendarEventStore.selectedDate);

  calendarOptions.events = calendarEventStore.events.map((event) => ({
    id: event.id,
    title: event.description,
    start: event.dateDebut,
    end: event.dateFin,
    color: event.status === 'approved' ? '#28a745' : '#ffc107',
  }));
};

const handleCheckIn = async (eventId: number) => {
  await calendarEventStore.addCheckIn(eventId);
  loadEvents();
};

const handleCheckOut = async (eventId: number) => {
  await calendarEventStore.addCheckOut(eventId);
  loadEvents();
};
</script>


<!-- <template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Tableau de bord interactif</h2>

    <div class="mb-4">
      <sl-calendar v-model="calendarEventStore.selectedDate" @change="loadEvents"></sl-calendar>
    </div>

    <div class="mt-4">
      <ul>
        <li
          v-for="(event, index) in calendarEventStore.events"
          :key="index"
          class="mb-2 flex justify-between items-center"
        >
          <span>{{ event.description }}</span>
          <div>
            <sl-button
              variant="success"
              @click="handleCheckIn(event.id)"
              v-if="!event.checkInTime"
            >
              Check-in
            </sl-button>
            <sl-button
              variant="danger"
              @click="handleCheckOut(event.id)"
              v-if="!event.checkOutTime && event.checkInTime"
            >
              Check-out
            </sl-button>
          </div>
        </li>
      </ul>
      <p v-if="!calendarEventStore.events.length" class="text-gray-500 text-sm">
        Aucun événement pour cette date.
      </p>
    </div>
    <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Créer un nouvel événement</h2>

    <form @submit.prevent="createEvent" class="space-y-4">
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description :</label>
        <input
          v-model="newEvent.description"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Date :</label>
        <input
          v-model="newEvent.date"
          type="date"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600"
      >
        Créer l'événement
      </button>
    </form>

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

    <div class="mt-6">
      <button @click="viewMode = 'month'" :class="{ 'bg-green-500': viewMode === 'month' }" class="mr-2 px-4 py-2 rounded">
        Mois
      </button>
      <button @click="viewMode = 'week'" :class="{ 'bg-green-500': viewMode === 'week' }" class="mr-2 px-4 py-2 rounded">
        Semaine
      </button>
      <button @click="viewMode = 'day'" :class="{ 'bg-green-500': viewMode === 'day' }" class="px-4 py-2 rounded">
        Jour
      </button>
    </div>

    <div v-if="viewMode === 'month'" class="mt-4">
      <h3 class="text-lg font-bold">Vue par mois</h3>
      <ul>
        <li v-for="(event, index) in calendarEventStore.monthlyEvents" :key="index" class="mb-2">
          {{ event.date }} - {{ event.description }}
        </li>
      </ul>
    </div>

    <div v-if="viewMode === 'week'" class="mt-4">
      <h3 class="text-lg font-bold">Vue par semaine</h3>
      <ul>
        <li v-for="(event, index) in calendarEventStore.weeklyEvents" :key="index" class="mb-2">
          {{ event.date }} - {{ event.description }}
        </li>
      </ul>
    </div>

    <div v-if="viewMode === 'day'" class="mt-4">
      <h3 class="text-lg font-bold">Vue par jour</h3>
      <ul>
        <li v-for="(event, index) in calendarEventStore.dailyEvents" :key="index" class="mb-2">
          {{ event.date }} - {{ event.description }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useCalendarEventStore } from '@/core/stores/calendrierInteractif.store';
import axios from 'axios';
import { env } from '@/core/constants';

const calendarEventStore = useCalendarEventStore();
const viewMode = ref('day');

const newEvent = reactive({
  description: '',
  date: new Date().toISOString().split('T')[0],
});



const loadEvents = () => {
  calendarEventStore.loadEvents(calendarEventStore.selectedDate);
};

const handleCheckIn = async (eventId: number) => {
  await calendarEventStore.addCheckIn(eventId);
  loadEvents();
};

const handleCheckOut = async (eventId: number) => {
  await calendarEventStore.addCheckOut(eventId);
  loadEvents();
};

onMounted(() => {
  loadEvents();
});
</script>

<!-- <template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Créer un nouvel événement</h2>

    <form @submit.prevent="createEvent" class="space-y-4">
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description :</label>
        <input
          v-model="newEvent.description"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Date :</label>
        <input
          v-model="newEvent.date"
          type="date"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600"
      >
        Créer l'événement
      </button>
    </form>

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
 --> -->

