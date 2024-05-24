import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent  implements OnInit{

  public countries: Country[]=[];
  public isloading:boolean =false;
  public initialValue:string='';

  constructor(private countriesService:CountriesService) {

  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }
  
  searchByCapital(term:string):void {
    this.isloading=true;
    console.log('Desde ByCapitalPage');
  this.countriesService.searchCapital(term).
  subscribe(countries => {
    console.log('pasa por ByCApital');
    this.countries = countries
    this.isloading=false;
  })
  }
}
