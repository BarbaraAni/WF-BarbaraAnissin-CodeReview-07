import { Injectable } from '@angular/core';
import { FormControl , FormGroup , Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(private firebase: AngularFireDatabase) { }
	travelList: AngularFireList<any>;

	form = new FormGroup({
        $key: new FormControl(null),
        place: new FormControl('', Validators.required),
        duration: new FormControl('', Validators.required),
        rating: new FormControl('', Validators.required)
    });
    getTravel(){
        this.travelList = this.firebase.list('travel');
        return this.travelList.snapshotChanges();
    }
    insertTravel(travel){
        this.travelList.push({
            place: travel.place,
            duration: travel.duration, 
            rating: travel.rating
        });
    }
    populateForm(travel){
        this.form.setValue(travel);
    }
    updateTravel(travel){
        this.travelList.update(travel.$key,{
            place: travel.place,
            duration: travel.duration,
            rating: travel.rating
        });
    }
    deleteTravel($key: string){
        this.travelList.remove($key);
    }
}
