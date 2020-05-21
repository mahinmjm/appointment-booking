import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppointmentsService } from './../../providers/appointments.service';
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})

export class AppointmentComponent implements OnInit {


  @Output()
  dateChange:EventEmitter< MatDatepickerInputEvent< any>>;

  private appointments: any[];

  success: string;

  appointmentForm: FormGroup;

  slots: Slot[] = [
    {value: '4:00-5:00', viewValue: '4:00-5:00'},
    {value: '5:00-6:00', viewValue: '5:00-6:00'},
    {value: '6:00-7:00', viewValue: '6:00-7:00'},
  ];

  constructor(private _snackBar: MatSnackBar, private appointmentService : AppointmentsService ) {

    this.appointments = this.appointmentService.getAppointments();

    console.log(this.appointments);

    this.appointmentForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'phone_no': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      'age': new FormControl(null, [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern("^[0-9]*$"),
      ]),
      'address': new FormControl(null, Validators.required),
      'booking_date': new FormControl({ value: null, disabled: true}, Validators.required),
      'time_slot': new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
  }

  onDateSelected(value:any){
    let date = value.value.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    //console.log(this.appointments);


    const filterAppointments =  this.appointments.filter( (appointment)  => {
      if (appointment.booking_date == date){

        this.slots = this.slots.filter( (slot) => { if(appointment.time_slot != slot.value) return slot } )

        console.log(this.slots);

        return appointment;

      }


    });

    console.log(filterAppointments);

  }

  submitForm(): void{

    let booking_date = this.appointmentForm.getRawValue().booking_date;
    const bookingDate = booking_date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    let appointmentData = this.appointmentForm.value;
    appointmentData.booking_date = bookingDate
    appointmentData.createdAt = Date.now();

    if(this.appointmentService.createAppointment(appointmentData) === 1) {
      console.log('added');
      this.success = 'Appointment Booked!';

      this._snackBar.open(this.success, null, {
        duration: 2000,
      });

      setTimeout(()=>{
        this.success = '';
        //this.appointmentForm.reset();
        this.appointmentForm.markAsPristine();
        this.appointmentForm.clearValidators()
        this.appointmentForm.updateValueAndValidity()
      }, 2000)

    }

  }

}


interface Slot {
  value: string;
  viewValue: string;
}
