import { Component, ElementRef, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'tv-list-cards',
  templateUrl: './list-cards.component.html',
  styles: []
})
export class ListCardsComponent implements OnInit {
  
  constructor(elementRef: ElementRef, private bottomSheetRef: MatBottomSheetRef<ListCardsComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any[]) { }

  ngOnInit() {
  }
  openLink(event: MouseEvent): void {
    //this.bottomSheetRef.dismiss();
    //event.preventDefault();
  }
}
