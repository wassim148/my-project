<template>
    <div class="datepicker-container">
      <input
        type="text"
        class="datepicker-input"
        v-model="formattedDate"
        @focus="toggleCalendar(true)"
        @blur="toggleCalendar(false)"
        readonly
        placeholder="Select a date"
      />
      
      <!-- Calendar Popup -->
      <div v-if="isCalendarVisible" class="calendar-popup">
        <div class="calendar-header">
          <button @click="prevMonth">Prev</button>
          <span>{{ currentMonthName }} {{ currentYear }}</span>
          <button @click="nextMonth">Next</button>
        </div>
        
        <div class="calendar-grid">
          <div class="calendar-day" v-for="day in daysOfMonth" :key="day.date" @click="selectDate(day)">
            <span :class="{'selected': day.selected}">{{ day.day }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  
  const modelValue = ref<string | null>(null)
  
  defineProps({
    modelValue: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Select a date',
    },
  })
  
  const isCalendarVisible = ref(false)
  const currentDate = ref(new Date())
  const selectedDate = ref<Date | null>(null)
  
  // Format date into 'YYYY-MM-DD' format
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  // Update the formatted date
  const formattedDate = computed({
    get() {
      return selectedDate.value ? formatDate(selectedDate.value) : ''
    },
    set(value: string) {
      modelValue.value = value
      selectedDate.value = value ? new Date(value) : null
    },
  })
  
  // Calendar Data
  const currentMonthName = computed(() => currentDate.value.toLocaleString('default', { month: 'long' }))
  const currentYear = computed(() => currentDate.value.getFullYear())
  const daysOfMonth = computed(() => {
    const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
    const lastDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0)
    const days = []
  
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), i)
      days.push({
        date,
        day: i,
        selected: selectedDate.value && selectedDate.value.toDateString() === date.toDateString(),
      })
    }
  
    return days
  })
  
  // Show or hide the calendar popup
  const toggleCalendar = (isVisible: boolean) => {
    isCalendarVisible.value = isVisible
  }
  
  // Select a date from the calendar
  const selectDate = (day: { date: Date; day: number }) => {
    selectedDate.value = day.date
    modelValue.value = formatDate(day.date)
    isCalendarVisible.value = false
  }
  
  // Navigate to the previous month
  const prevMonth = () => {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1)
  }
  
  // Navigate to the next month
  const nextMonth = () => {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1)
  }
  
  // Sync the model value to the datepicker
  watch(() => modelValue.value, (newValue) => {
    if (newValue) {
      selectedDate.value = new Date(newValue)
    }
  })
  </script>
  
  <style scoped>
  .datepicker-container {
    position: relative;
    display: inline-block;
  }
  
  .datepicker-input {
    padding: 10px;
    width: 180px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    background-color: #fff;
  }
  
  .calendar-popup {
    position: absolute;
    top: 45px;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f0f0f0;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 10px;
  }
  
  .calendar-day {
    text-align: center;
    padding: 5px;
    cursor: pointer;
  }
  
  .calendar-day:hover {
    background-color: #f0f0f0;
  }
  
  .calendar-day.selected {
    background-color: #007bff;
    color: white;
  }
  
  button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  