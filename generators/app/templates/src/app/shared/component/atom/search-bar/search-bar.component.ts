/****** ANGULAR ******/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

/****** RXJS ******/
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/******* 3rd *******/
import * as _ from 'underscore';

/****** Interface ******/
import { Project } from '@data/api-app/project/schema/project';
import { UseCase } from '@data/api-app/usecase/schema/usecase';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  @Input() searchData: Array<Project> | Array<UseCase>;
  @Input() type: string;
  @Input() width: string;
  @Output() EmitNewFilteredData = new EventEmitter<Array<object>>();
  filteredOptions: Observable<string[]>;
  searchBarForm = new FormControl();
  itemTitles: string[];
  itemTitlesFiltered: string[];
  searchDataCopy;

  constructor() { }

  ngOnInit(): void {
    this.initSearchData(this.type);

    // Track search-bar input change
    this.filteredOptions = this.searchBarForm.valueChanges
      .pipe(
        map(value => this._filter(value))
    );
  }

  /**
   * Filter project
   * @param value
   * @return filtered projectsCopy array
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const projectsTitlesFiltered = this.itemTitles.filter(option => option.toLowerCase().includes(filterValue));
    this.searchDataCopy = _.map(this.searchData, function(item) {
      if (projectsTitlesFiltered.includes(item.title)) {return item; }
    });
    this.searchDataCopy = this.searchDataCopy.filter(n => n);
    console.log(this.searchDataCopy);
    this.EmitNewFilteredData.emit(this.searchDataCopy);
    return this.itemTitles.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   * Init search bar data
   * @param type
   * */
  initSearchData(type) {
    const catalogs = {
      project: () => {
        this.searchDataCopy = JSON.parse(JSON.stringify(this.searchData));
        this.itemTitles = _.map(this.searchData, function(item) {return item.title; });
        this.itemTitlesFiltered = JSON.parse(JSON.stringify(this.itemTitles));
      },
      usecase: () => {
        this.searchDataCopy = JSON.parse(JSON.stringify(this.searchData));
        this.itemTitles = _.map(this.searchData, function(item){ return item.title; });
        this.itemTitlesFiltered = JSON.parse(JSON.stringify(this.itemTitles));
      },
      default: () => {
        return console.log('this type of Search is not handled');
      },
    };
    return (catalogs[type] || catalogs['default'])();
  }
}
