import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { data } from '../../assets/dummy/jsonData'
import { DataService } from './../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
export interface PeriodicElement {
  projectId: string,
  projectName: string,
  projectProgress: string,
  projectRisk: string,
  projectStart: string,
  projectEnd: string,
  clientName: string,
  domainName: string,
  projectStatus: string,
  projectOwner: {},
  // resources: [],
  projectCreatedOn: string,
  clientPoc: string,
  projectLocation: string,
  projectStartDate: string,
  projectEndDate: string
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})


export class DataTableComponent implements OnInit {
  width: any = 0;
  displayedColumns: string[] = ['select', 'projectName', 'domainName', 'resources', 'projectStatus', 'projectRisk', 'projectStartDate','menu'];
  dataSource: any;
  selection = new SelectionModel<PeriodicElement>(true, []);
  index: any;
  // users = [];
  users: PeriodicElement[] = [];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  constructor(private dataService: DataService) {
    console.log('data', data)
    this.users = [];

    data.projectDetails.forEach((data: any) => {
      this.users.push(
        {
          projectId: data.projectId,
          projectName: data.projectName,
          projectProgress: data.projectProgress,
          projectRisk: data.projectRisk,
          projectStart: data.projectStart,
          projectEnd: data.projectEnd,
          clientName: data.clientName,
          domainName: data.domainName,
          projectStatus: data.projectStatus,
          projectOwner: data.projectOwner,
          // resources: data.resources,
          projectCreatedOn: data.projectCreatedOn,
          clientPoc: data.clientPoc,
          projectLocation: data.projectLocation,
          projectStartDate: data.projectStartDate,
          projectEndDate: data.projectEndDate

        }
      );
    });
    this.dataSource = new MatTableDataSource(this.users);
    this.runProgressBar();
  };


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  ngOnInit(): void {
    // this.refresh('');

  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  applyFilter(event: any) {
    let filterValue = event?.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log('this.dataSource.filter', this.dataSource.filter);
  }

  refresh(id: any) {
    this.index = this.dataSource.data.find(function (o: any) {
      return o.id === id;
    })
    if (this.index !== -1)
      this.dataSource.data.splice(this.index, 1);
    this.dataSource.data = this.dataSource.data;
  }
  ngOnChanges() {

  }
  openEditDialog() {

  }

  getData() {
    this.dataService.getProfileData().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.projectDetails);
    })
  }
  runProgressBar() {
    let counter = 10;
    timer(0, 100) //Initial delay 1 seconds and interval countdown also 1 second
      .pipe(
        takeWhile(() =>
          this.isWidthWithinLimit()
        )

      )
      .subscribe(() => {
        this.width = this.width + 1;
        console.log(this.width);
      });

    // Observable.timer$(0, 100)
    //   .takeWhile(() =>
    //     this.isWidthWithinLimit()
    //   )
    //   .subscribe(() => {
    //     this.width = this.width + 1;
    //     console.log(this.width);
    //   })

  }

  isWidthWithinLimit() {
    if (this.width === 100) {
      return false;
    } else {
      return true;
    }
  }
}
