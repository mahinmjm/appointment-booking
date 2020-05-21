import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  STORAGE_KEY = 'appointments';

  private count ;

  private storeData : any[];

  constructor() { }

  getAppointments() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
  }

  createAppointment(appointment : Appointment) {

    this.storeData = this.getAppointments();

    this.count = this.storeData.length;

    const key = Date.now();
    let data =  appointment;

    this.storeData.push(data);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.storeData));

    if(this.count < this.getAppointments().length ){
      return 1;
    }else{
      return 0;
    }


  }


}
