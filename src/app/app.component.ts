import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  private mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  openSearchDialog(): void {
    this.dialog.open(AutocompleteComponent, {
      width: this.mobileQuery ? '100vh' : '250px'
    });
  }
}
