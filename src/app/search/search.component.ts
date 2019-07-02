import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  //pipes: [EventsPipe]
})
export class SearchComponent implements OnInit {
  events: Event[];
  selectedEvent: Event;
  constructor(private router: Router, private eventService: EventService) {

  }
  ngOnInit() {
    this.eventService.getEventsList().then(events => {
      this.events = events;
    });
  }

  bookNow(event: Event): void {
    this.selectedEvent = event;
    this.router.navigate(['/eventbooking', this.selectedEvent.id]);
  }
}