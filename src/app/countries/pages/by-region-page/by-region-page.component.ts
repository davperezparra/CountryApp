import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{
  public countries: Country[]=[];
  public regiones: Region[] =['Africa','Americas','Asia','Europa','Oceania'];
  public selectRegion?:Region;

  constructor(private CountriesService:CountriesService) {

  }
  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byRegion.countries;
    this.selectRegion = this.CountriesService.cacheStore.byRegion.region;
  }


  searchRegion(term:Region ):void 
  { 
    this.selectRegion=term;
     this.CountriesService.searchRegion(term).
     subscribe(countries => {
      this.countries = countries
     })
  }

}
