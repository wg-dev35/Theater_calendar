"use strict";

/*
   Author: Will
   Date:  04/10/23
   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the calDate parameter. The current date is highlighted in the table.
   calCaption(calDate)
      Writes the caption of the calendar table
   calWeekdayRow()
      Writes the weekday title rows in the calendar table
   daysInMonth(calDate)
      Returns the number of days in the month from calDate
   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate	
*/

//display date
let thisDay = new Date();

//Create calendar table
document.getElementById("calendar").innerHTML = createCalendar(thisDay);
//table function
function createCalendar (calDate) {
   let calendarHTML = "<table id='calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table>";
   return calendarHTML;
};

//write table caption
function calCaption(calDate){
   let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   let thisMonth = calDate.getMonth();
   let thisYear = calDate.getFullYear();
   return "<caption>"  + monthName[thisMonth] + " " + thisYear + "</caption>";
};

//write table headings
function calWeekdayRow(){
   let dayName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
   let rowHTML = '<tr>';
   for ( let i = 0; i < dayName.length; i++){
      rowHTML +=  '<th class="calendar_weekdays">' + dayName[i] + '</th>';
   }
   return   rowHTML += '</tr>'
}

//write days in table
function daysInMonth(calDate){
   let dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   //parse month & year for use in next array
   let thisYear = calDate.getFullYear(); 
   let thisMonth = calDate.getMonth();

   //leap year calculations
   if (thisYear % 4 === 0){
      if ((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
         dayCount[1] = 29;
      }
   }
   return dayCount[thisMonth]; 
}

//write weeks as rows on table with highlight on current day
function calDays(calDate){
   //determine day of month to start row
   let day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   let weekDay = day.getDay();
   //padding empty cells to fill in starting day
   let htmlCode = '<tr>';
   for (let i = 0; i < weekDay; i++){
      htmlCode += '<td></td>'
   }
   //write days out
   let totalDays = daysInMonth(calDate);
   let highlightDay = calDate.getDate();

   for ( let i = 1; i <=totalDays; i++){
      day.setDate(i);
      weekDay = day.getDay();
      if (weekDay === 0) {
         htmlCode += '<tr>';
      }

      if(i === highlightDay){
         htmlCode += '<td class="calendar_dates" id="calendar_today">' + i + dayEvent[i] + '</td>';
      }
      else {htmlCode += '<td class="calendar_dates">' + i + dayEvent[i] + '</td>';
      }
      if(weekDay === 6){
         htmlCode += '</tr>';
      }
   }
   return htmlCode;
}