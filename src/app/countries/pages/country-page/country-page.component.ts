import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements  OnInit {

  public country?:Country;
  
  constructor(
    private activateRoute:ActivatedRoute,
    private countriesService:CountriesService,
    private router:Router

  ) {

  }
  
  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByalphaCode(id))
    )
    .subscribe(country=> {
      
        if (!country) {
          return this.router.navigateByUrl('')
        }
        console.log('Tenemos pais')

        this.country=country;

        console.log(this.country);
        return;

    })
  }

}
