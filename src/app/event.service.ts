
import { Injectable } from '@angular/core';
import { Event } from './event'
import { EVENTS } from './event-store';
 
@Injectable()
export class EventService {
 
  getEvent(id: number): Promise<Event> {
    return this.getEventsList()
               .then(events => events.find(event => event.id === id));
  }
  constructor() { }
 
  getEventsList(): Promise<Event[]> {
    console.log("inisde")
    return Promise.resolve(EVENTS);
  }
}