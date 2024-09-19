import { BusScheduleProps } from '@types'
import { RRule, RRuleSet, rrulestr } from 'rrule'



const EXPANSION_TIMES = 30 //DAYS TO EXPANSION

const expandRecurrenceDates = (
    schedule: BusScheduleProps,
  ): BusScheduleProps[] => {
    const result: BusScheduleProps[] = []
  
    
      const scheduleStartDate = new Date(schedule.start as string)
  
      if (schedule.recurrenceRule) {
        // Use getRecurrenceDates to generate all occurrences
        const recurrenceDates = getRecurrenceDates(
          scheduleStartDate,
          schedule.recurrenceRule,
          schedule.recurrenceExceptions as string[],
        )
  
        // Create a new BusScheduleProps for each occurrence
        recurrenceDates.forEach(date => {
          const newSchedule = { ...schedule } // Copy the original schedule
          newSchedule.start = date // Replace the start date with the occurrence date
  
          // If the original schedule has an end date, adjust it based on the duration
          if (schedule.end) {
            const originalDuration =
              new Date(schedule.end as string).getTime() -
              scheduleStartDate.getTime()
            newSchedule.end = new Date(
              new Date(date).getTime() + originalDuration,
            ).toISOString()
          }
  
          result.push(newSchedule) // Add the new schedule to the result
        })
      } else {
        // If it's a one-time event, add it directly
        result.push(schedule)
      }
   
  
    return result
  }

function getRecurrenceDates(
    startDate: Date,
    recurrenceRule: string,
    exceptions: string[] | undefined,
  ): string[] {
    const dates: string[] = []
    const endDate = new Date(startDate.getTime() + EXPANSION_TIMES * 24 * 60 * 60 * 1000)

    if (recurrenceRule) {
      const ruleSet = new RRuleSet()
  
      // Parse the recurrence rule
      const rule = rrulestr(recurrenceRule)
      ruleSet.rrule(rule as RRule)
  
      // Add exceptions if provided
      if (exceptions) {
        exceptions.forEach(exception => {
          ruleSet.exdate(new Date(exception))
        })
      }
  
      // Generate occurrences within the date range
      const occurrences = ruleSet.between(startDate, endDate)
  
      // Convert dates to ISO string format
      occurrences.forEach(date => {
        dates.push(date.toISOString())
      })
    }

    return dates
}

export default expandRecurrenceDates