import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'events' })
export class EventsPipe implements PipeTransform {
  transform(events: any, searchText: any): any {
    console.log('insisde text');
    if(searchText == null) return events;

    return events.filter(function(event){
      console.log(event.name);
      return event.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}