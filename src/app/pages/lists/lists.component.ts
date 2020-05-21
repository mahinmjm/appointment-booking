import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/providers/appointments.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  appointments: any;

  constructor(private appointmentService : AppointmentsService ) { }

  ngOnInit() {

    this.appointments = this.appointmentService.getAppointments();

  }

}
