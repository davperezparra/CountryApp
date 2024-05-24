import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiurl:string = 'https://restcountries.com/v3.1';

    public cacheStore : CacheStore = {
        byCapital : {term:'', countries:[]},
        byCountries : {term:'',countries:[]},
        byRegion: {region:'',countries:[]}
    }


    constructor(private http: HttpClient) 
    { 
        this.loadFromLocalStorage();
    }


    private saveToLocalStorage() {
        localStorage.setItem('cacheStorage',JSON.stringify(this.cacheStore))

    }

    private loadFromLocalStorage() {
        if(!localStorage.getItem('cacheStorage')) return;

        this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);


    }

    private getCountriesRequest(url:string):Observable<Country[]> {
        return this.http.get<Country[]>(url)
        .pipe(
            // delay(2000),
            catchError(()=> of([])),
        );
    }

    searchCountryByalphaCode(code:string):Observable<Country | null> {

        const url = `${this.apiurl}/alpha/${code}`;
        return this.http.get<Country[]>(url)
        .pipe(
            // delay(2000),
            map(paises => paises.length > 0 ? paises[0] : null),
         
            catchError(()=> of(null))
        )
    }
    

    searchCapital(term:string): Observable<Country[]> {
        const url = `${this.apiurl}/capital/${term}`;

        return this.getCountriesRequest(url).pipe(
            tap(countries => this.cacheStore.byCapital = {term,countries }),
            tap (()=> this.saveToLocalStorage())
        )

    }

    searchCountry(term:string):Observable<Country[]> {

        const url = `${this.apiurl}/name/${term}`;

        return this.getCountriesRequest(url).pipe(
            tap(countries => this.cacheStore.byCountries = {term, countries}),
            tap (()=> this.saveToLocalStorage())
        )
    
    }


    searchRegion(term:Region):Observable<Country[]> {
        const url = `${this.apiurl}/region/${term}`;

        return this.getCountriesRequest(url).pipe(
            tap(countries => this.cacheStore.byRegion = {region:term,countries:countries}),
            tap (()=> this.saveToLocalStorage())
        )
    }
}