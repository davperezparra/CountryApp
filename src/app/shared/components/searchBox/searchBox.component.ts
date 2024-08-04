import { CommonModule } from '@angular/common';
import {  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, input } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',

  templateUrl: './searchBox.component.html',
})
  
export class SearchBoxComponent implements OnInit , OnDestroy {
  
  private debouncer : Subject<string> = new Subject <string>();
  @Input()
  public initialValue:string = '';


  private debouncerSuscription?:Subscription;
  
  @Output()
  public onValue = new EventEmitter<string>();
  
  @Output()
  public onDebounce = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer.pipe(
        debounceTime(1000)
        
      ).subscribe(value => {
        console.log(value);
        this.onDebounce.emit(value);
      })
    }
    ngOnDestroy(): void {
      this.debouncerSuscription?.unsubscribe();
        console.log('destruido');
    }
    
    // onPropagar(termino:string) {
  //   this.onValue.emit(termino)

  
  // }

  emitValue(value:string):void {
      this.onValue.emit(value);
  }

  onKeyPress(searchteam:string)
  { 
    this.debouncer.next(searchteam);

  }


  
  // @Input()

  // public placeholder:string = ''

 }
