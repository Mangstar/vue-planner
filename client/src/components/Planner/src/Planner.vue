<template>
  <div class="app-planner-wr">
    <div class="app-planner">
      <header class="app-planner-header">
        <v-row align="center"
               justify="space-between"
        >
          <v-col cols="1">
            <v-btn outlined
                   fab
                   color="primary"
                   small
                   class="app-planner-prev-period-btn"
                   @click="showPrevMonth"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="10">
            <v-row align="center">
              <v-col cols="2">
                <div class="app-planner-header-datetime">
                  <div class="app-planner-header-time">{{ currentTimePrinted }}</div>
                  <div class="app-planner-header-date">{{ currentDatePrinted }}</div>
                </div>
              </v-col>

              <v-col cols="8" offset="1">
                <div class="app-planner-header-status">
                  <v-alert type="info" class="mb-0">
                    {{ dayStatusMessage.empty }}
                  </v-alert>
                </div>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="1" class="d-flex justify-end">
            <v-btn outlined
                   fab
                   color="primary"
                   small
                   class="app-planner-next-period-btn"
                   @click="showNextMonth"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </header>

      <div class="app-planner-content">
        <div class="app-planner-day-list" v-cloak>
          <header class="app-planner-day-list-titles">
            <v-row>
              <v-col v-for="weekDay in weekDays"
                     :key="weekDay"
              >
                <app-planner-cell-header>{{ weekDay }}</app-planner-cell-header>
              </v-col>
            </v-row>
          </header>

          <div class="app-planner-day-list-content">
            <v-row v-for="(week, index) in plannerCells"
                   :key="index"
            >
              <v-col v-for="(day, index) in week"
                     :key="index"
              >
                <app-planner-cell :isActive="isActiveDate(day)">
                  <template v-slot:title>
                    {{ day.format('DD') }}
                  </template>

                  {{ day.format('DD MMMM YYYY') }}
                </app-planner-cell>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppPlannerCellHeader from './PlannerCellHeader';
import AppPlannerCell from './PlannerCell';
import { FORMAT } from '@/assets/JS_CONSTS';

export default {
  name: 'app-planner',

  components: {
    AppPlannerCellHeader,
    AppPlannerCell
  },

  data: () => ({
    currentMode: 'month',

    currentTime: '',
    currentDate: '',

    dayStatusMessage: {
      empty: 'На сегодня задач нет',
      processing: 'Задачи в работе',
      complited: 'Все задачи завершены',
      expired: 'Задачи просрочены'
    },

    timeTickInterval: null
  }),

  computed: {
    currentDatePrinted () {
      return this.currentDate.format(FORMAT.DATE_LONG)
    },

    currentTimePrinted () {
      return this.$date(this.currentTime).format(FORMAT.TIME)
    },

    weekDays () {
      return this.$date.weekdays()
    },

    monthStart () {
      return this.$date(this.currentDate).startOf('month');
    },

    monthEnd () {
      return this.$date(this.currentDate).endOf('month')
    },

    monthWeeksTotal () {
      return Math.ceil(this.monthEnd.diff(this.monthStart, 'week', true));
    },

    plannerCells () {
      if (this.currentMode === 'month') {
        let matrixMonth = [];
        let currentDate = this.monthStart.day(1);

        for (let weekIndex = 0; weekIndex < this.monthWeeksTotal; weekIndex++) {
          matrixMonth[weekIndex] = [];

          for (let weekDayIndex = 1; weekDayIndex <= 7; weekDayIndex++) {
            matrixMonth[weekIndex].push(currentDate);

            currentDate = currentDate.add(1, 'day');
          }
        }

        return matrixMonth;
      }

      return null;
    },
  },

  async created () {
    this.timeTick();
    this.currentDate = this.$date();
    // console.log(2222)

    // await this.$store.dispatch('fetchPosts');

    // setTimeout(async () => {
    //   await this.$store.dispatch('fetchPosts');
    // }, 10000);
  },

  methods: {
    timeTick () {
      this.timeTickInterval = setInterval(() => {
        this.currentTime = this.$date();
      }, 1000);
    },

    isActiveDate (day) {
      return day.valueOf() === this.currentDate.startOf('day').valueOf()
    },

    showNextMonth () {
      this.currentDate = this.currentDate.add(1, 'month');
    },

    showPrevMonth () {
      this.currentDate = this.currentDate.subtract(1, 'month');
    }
  }
}
</script>

<style lang="scss" scoped>
.app-planner {
  &-prev-period-btn {
    transform: translateX(25px);
  }

  &-next-period-btn {
    transform: translateX(-25px);
  }
}

.app-planner-day-list {
  perspective: 500px;

  &-titles {
    width: 95%;
    margin: 0 auto;
  }

  &-content {
    transform: rotateX(10deg);
  }
}
</style>