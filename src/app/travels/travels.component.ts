import { Component, OnInit } from '@angular/core';
import { TravelService } from '../shared/travel.service';
@Component({
  selector: 'travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent implements OnInit {

  travelArray =[];
  submitted: boolean;
	formControls = this.travelService.form.controls;
  showSuccessMessage: boolean;
  showDeletedMessage : boolean;
  searchText:string = "";
  
	constructor (private travelService: TravelService) { }

	ngOnInit() {
    this.travelService.getTravel().subscribe(
      (list) => {
        this.travelArray = list.map( (item) => {
          return {
            $key : item.key,
            ...item.payload.val()
          }
        })
      });
 	}

 onDelete($key){
      if(confirm("Are you sure you want to delete this record?")){
       this.travelService.deleteTravel($key);
       this.showDeletedMessage = true;
       setTimeout(()=> this.showDeletedMessage=false , 3000)
     }
   }

 filterCondition(travel){
    return travel.place.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1  ;
 }

	onSubmit(){
		this.submitted = true;
	    if(this.travelService.form.valid){
           	if(this.travelService.form.get("$key").value == null ){ 
           		this.travelService.insertTravel(this.travelService.form.value);
		       	this.showSuccessMessage =true;
		       	setTimeout(()=> this.showSuccessMessage=false,3000);
		       	this.submitted = false;
		       	this.travelService.form.reset();
		    } else {
	    	   	this.travelService.updateTravel(this.travelService.form.value);
	    	   	this.showSuccessMessage =true;
		       	setTimeout(()=> this.showSuccessMessage=false,3000); 
		       	this.submitted = false;
		       	this.travelService.form.reset();
		       }
	 	}
	}

}
