'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const CalendarView = ({ events, eventTypeColors  }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'day'

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventsForSelectedDate = events.filter(event => 
    isSameDay(new Date(event.date), selectedDate)
  );

  const changeMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => changeMonth('prev')}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          </button>
          
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          
          <button 
            onClick={() => changeMonth('next')}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('month')}
            className={`px-3 py-1.5 text-sm rounded-md ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
          >
            Month
          </button>
          <button 
            onClick={() => setViewMode('day')}
            className={`px-3 py-1.5 text-sm rounded-md ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
          >
            Day
          </button>
        </div>
      </div>

      {/* Month View */}
      {viewMode === 'month' && (
        <div className="p-4">
          {/* Day names header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400 py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map(day => {
              const dayEvents = events.filter(event => 
                isSameDay(new Date(event.date), day)
              );
              
              return (
                <div 
                  key={day.toString()}
                  onClick={() => {
                    setSelectedDate(day);
                    if (dayEvents.length > 0) setViewMode('day');
                  }}
                  className={`min-h-24 p-2 rounded-lg border transition-all ${
                    isSameDay(day, selectedDate) 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                      : 'border-transparent hover:border-zinc-200 dark:hover:border-zinc-700'
                  } ${
                    isSameMonth(day, currentMonth) 
                      ? 'bg-white dark:bg-zinc-900' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500'
                  }`}
                >
                  <div className="text-right font-medium text-sm mb-1">
                    {format(day, 'd')}
                  </div>
                  
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event._id}
                        className={`text-xs p-1 rounded truncate ${
                          eventTypeColors[event.eventType] || eventTypeColors.meetup
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {viewMode === 'day' && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>
            <button 
              onClick={() => setViewMode('month')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to month
            </button>
          </div>
          
          {eventsForSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {eventsForSelectedDate.map(event => (
                <div 
                  key={event._id}
                  className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mb-2 ${
                        eventTypeColors[event.eventType] || eventTypeColors.meetup
                      }`}>
                        {event.eventType.replace(/-/g, ' ')}
                      </div>
                      <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        {event.title}
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        {format(new Date(event.date), 'h:mm a')}
                        {event.endDate && ` - ${format(new Date(event.endDate), 'h:mm a')}`}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/guests/${event._id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      Manage Guests
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarDays className="h-10 w-10 text-zinc-400 dark:text-zinc-500 mb-4" />
              <h4 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                No events scheduled
              </h4>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1 max-w-md">
                You don't have any events scheduled for this day. Create a new event to get started.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;