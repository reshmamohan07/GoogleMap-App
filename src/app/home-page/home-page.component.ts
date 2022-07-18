import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, of, startWith, switchMap } from 'rxjs';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  locationCtrl = new FormControl();
  filteredOptions: Observable<any[]>;
  weatherReport: any;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.filteredOptions = this.locationCtrl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      switchMap(value => value ? this.homeService.getLocations(value) : of([])),
    );
  }

  getClimate() {
    this.homeService.getClimate(this.locationCtrl.value)
      .subscribe(data => {
        this.weatherReport = data;
      });
  }

}
