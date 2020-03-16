import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter
} from "@angular/core";
import { FilmsServerService } from "src/services/films-server.service";
import { Film } from "src/entities/film";
import { DataSource } from "@angular/cdk/table";
import { Observable, of } from "rxjs";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import {
  mergeAll,
  switchMap,
  tap,
  map,
  filter,
  switchMapTo
} from "rxjs/operators";
import { MatSort, Sort } from "@angular/material/sort";

@Component({
  selector: "app-films-list",
  templateUrl: "./films-list.component.html",
  styleUrls: ["./films-list.component.css"]
})
export class FilmsListComponent implements OnInit, AfterViewInit {
  dataSource: FilmsDataSource;
  filter$ = new EventEmitter<string>();
  columnsToDisplay = [
    "id",
    "nazov",
    "slovenskyNazov",
    "rok",
    "afi1998",
    "afi2007"
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private filmsServerService: FilmsServerService) {}

  ngOnInit(): void {
    if (!this.filmsServerService.token) {
      this.columnsToDisplay = ["id", "nazov", "rok"];
    }
    this.dataSource = new FilmsDataSource(this.filmsServerService);
  }

  ngAfterViewInit(): void {
    this.dataSource.setObservables(this.paginator, this.filter$, this.sort);
  }

  applyFilter(filter: string) {
    this.filter$.next(filter);
  }
}

class FilmsDataSource implements DataSource<Film> {
  futureObservables = new EventEmitter<Observable<any>>();
  paginator: MatPaginator;
  indexFrom: number;
  pageSize: number;
  search = "";
  orderBy = "";
  descending: boolean;

  constructor(private filmsServerService: FilmsServerService) {}

  setObservables(
    paginator: MatPaginator,
    filter$: Observable<string>,
    sort: MatSort
  ) {
    this.paginator = paginator;
    this.indexFrom = paginator.pageIndex * paginator.pageSize;
    this.pageSize = paginator.pageSize;

    this.futureObservables.next(of({}));
    this.futureObservables.next(
      paginator.page.pipe(
        filter((pageEvent: PageEvent) => {
          return (
            this.indexFrom != pageEvent.pageIndex * pageEvent.pageSize ||
            this.pageSize != pageEvent.pageSize
          );
        }),
        tap((pageEvent: PageEvent) => {
          this.indexFrom = pageEvent.pageIndex * pageEvent.pageSize;
          this.pageSize = pageEvent.pageSize;
        })
      )
    );
    this.futureObservables.next(
      filter$.pipe(
        tap(searchString => {
          this.indexFrom = 0;
          this.paginator.firstPage();
          this.search = searchString;
        })
      )
    );
    this.futureObservables.next(
      sort.sortChange.pipe(
        tap((sortEvent: Sort) => {
          this.indexFrom = 0;
          this.paginator.firstPage();
          if (sortEvent.direction === "") {
            this.orderBy = undefined;
            this.descending = undefined;
            return;
          }
          this.descending = sortEvent.direction === "desc";
          switch (sortEvent.active) {
            case "afi1998":
              this.orderBy = "poradieVRebricku.AFI 1998";
              break;
            case "afi2007":
              this.orderBy = "poradieVRebricku.AFI 2007";
              break;
            default:
              this.orderBy = sortEvent.active;
              break;
          }
        })
      )
    );
  }

  connect(): Observable<Film[]> {
    return this.futureObservables.pipe(
      mergeAll(),
      tap(event => console.log("Event: " + JSON.stringify(event))),
      switchMap(() =>
        this.filmsServerService
          .getFilms(
            this.indexFrom,
            this.indexFrom + this.pageSize,
            this.search,
            this.orderBy,
            this.descending
          )
          .pipe(
            map(response => {
              this.paginator.length = response.totalCount;
              return response.items;
            })
          )
      )
    );
  }

  disconnect(): void {}
}
