import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EventService } from './event.service';
import { SearchComponent } from './search/search.component';
import { EventsPipe } from './events.pipe';
import { EventbookingComponent } from './eventbooking/eventbooking.component';

const appRoutes: Routes = [
  {path: 'search', component: SearchComponent},
  { path: 'eventbooking/:id', component: EventbookingComponent },
  {path: '', redirectTo: '/search', pathMatch: 'full'}
];


@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule, 
    RouterModule,
    RouterModule.forRoot(appRoutes), 
  ],

  declarations: [ AppComponent, SearchComponent, EventsPipe, EventbookingComponent ],
  providers: [ EventService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
