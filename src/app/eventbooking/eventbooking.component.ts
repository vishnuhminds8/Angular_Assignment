import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Event } from '../event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { CustomValidator } from '../validators';



@Component({
  selector: 'app-eventbooking',
  templateUrl: './eventbooking.component.html',
  styleUrls: ['./eventbooking.component.css']
})
export class EventbookingComponent implements OnInit {
  event: Event;
  eventbookingform: FormGroup;
  seats: number;
  noseats: any;
  formDisabled: boolean = false;
  successmsg: boolean = false;
  disablebtn: any;

  constructor(private eventService: EventService,
    private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.seats = new Array(6).fill().map((x, i) => i + 1);

    this.route.params.switchMap((params: Params) => this.eventService.getEvent(+params['id']))
      .subscribe((event: any) => {
        setTimeout(() => {
          this.noseats = event.seats;
        }, 1000)

        this.event = event
      });

    //console.log(this.event.seats);

    this.eventbookingform = fb.group({
      'persons': this.fb.array([]),
      'name': ['', Validators.compose([Validators.required, CustomValidator.specialCharValidator])],
      'email': ['', Validators.compose([Validators.required, CustomValidator.emailValidator])],
      'phone': ['', Validators.compose([
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10)])],
      'seats': ['', Validators.compose([Validators.required, CustomValidator.seatsValidator(this.noseats)])],

    });
  }

  IsValidField(i: number, formname: any) {
    const f = formname
      .get('persons') // retrieve items FormArray
      .get(i.toString()); // retrieve items FormGroup
    // .get(field); // retrieve items form field
    return (f.invalid && (f.dirty || f.touched));
  }


  clearFormArray = () => {
    const arr = <FormArray>this.eventbookingform.controls.persons;
    arr.controls = [];
  }

  addNewField() {
    this.clearFormArray();
    for (let num = 0; num < this.eventbookingform.controls.seats.value; num++) {
      const creds = this.eventbookingform.controls.persons as FormArray;
      creds.push(this.fb.group({
        'person': ['', Validators.compose([Validators.required])]
      }));
    }
  }


  getTotalSeats() {
    this.route.params.switchMap((params: Params) => this.eventService.getEvent(+params['id']))
      .subscribe((event: any) => {
        return event.seats;
      });
  }

  eventSubmit = (formval: any) => {
    this.formDisabled = true;
    this.successmsg = true;
    this.disablebtn = {'opacity': '0.5'};

  }

  cancelEvent = () => {
    this.router.navigate(['']);
  }

}