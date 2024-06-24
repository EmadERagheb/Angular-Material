import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from "../course-dialog/course-dialog.component";
import { filter } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[];
  rowHeight = "500px";
  cols = 3;
  handsPortrait=false

  constructor(
    private dialog: MatDialog,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit() {
    this.responsive
      .observe([
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
      ])
      .subscribe((value) => {
        this.cols = 3;
        this.rowHeight = "500px";
        this.handsPortrait=false
        const breakpoint = value.breakpoints;
        if (breakpoint[Breakpoints.TabletPortrait]) {
          this.cols = 1;
        } else if (breakpoint[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
          this.rowHeight = "430px";
          this.handsPortrait=true
        } else if (breakpoint[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
        } else if (breakpoint[Breakpoints.TabletLandscape]) {
          this.cols = 2;
          console.log("TabletPortrait")
        }
      });
  }

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, course)
      .pipe(filter((value) => !!value))
      .subscribe((val) => console.log(val));
  }
}
