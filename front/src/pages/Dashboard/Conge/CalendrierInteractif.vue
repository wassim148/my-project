<template>
  <div class="p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Tableau de bord interactif</h2>

    <div class="mb-4">
      <FullCalendar :options="calendarOptions" />
    </div>

    <div class="mt-4">
      <ul>
        <li v-for="(event, index) in calendarEventStore.events" :key="index"
          class="mb-2 flex justify-between items-center">
          <span
            :class="{ 'text-yellow-500': event.status === 'pending', 'text-green-500': event.status === 'approved' }">
            {{ event.description }}
          </span>
          <div>
            <sl-button variant="success" @click="handleCheckIn(event.id)" v-if="!event.checkInTime">Check-in</sl-button>
            <sl-button variant="danger" @click="handleCheckOut(event.id)"
              v-if="!event.checkOutTime && event.checkInTime">
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
import { onMounted, reactive } from 'vue';
import { useCalendarEventStore } from '@/core/stores/calendrierInteractif.store';
import { useHolidayStore } from '@/core/stores/holiday.store';
import { useRestrictionStore } from '@/core/stores/restriction.store';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const calendarEventStore = useCalendarEventStore();
const holidayStore = useHolidayStore();
const restrictionStore = useRestrictionStore();

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  events: [],
  selectable: true,
  select: async (info) => {
    calendarEventStore.selectedDate = new Date(info.startStr);

    await calendarEventStore.loadEvents(calendarEventStore.selectedDate);

    if (!calendarEventStore.events.length) {
      try {
        await calendarEventStore.createAbsence(
          calendarEventStore.selectedDate,
          'Absence non planifiée'
        );
      } catch (error) {
        console.error('Erreur lors de la création de l\'absence :', error);
      }
    }

    updateCalendarEvents();
  },
  eventContent: (arg) => {
    return { html: arg.event.title };
  },
});

onMounted(async () => {
  await calendarEventStore.loadEvents(calendarEventStore.selectedDate);
  await holidayStore.fetchHolidays();
  await restrictionStore.fetchRestrictions();
  updateCalendarEvents();
});

const updateCalendarEvents = () => {
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

const loadEvents = () => {
  calendarEventStore.loadEvents(calendarEventStore.selectedDate);
  updateCalendarEvents();
};
</script>

<style scoped></style>