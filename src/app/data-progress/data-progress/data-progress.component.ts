import { Component, OnInit } from '@angular/core';
import { data } from '../../../assets/dummy/jsonData'
@Component({
  selector: 'app-data-progress',
  templateUrl: './data-progress.component.html',
  styleUrls: ['./data-progress.component.scss']
})
export class DataProgressComponent implements OnInit {
  percent = 100;
  progressCount = 0;
  blockedCount = 0;
  pipelineCount = 0;
  closeCount = 0;
  resourceCount = 0;

  constructor() { }

  ngOnInit(): void {
    this.abc();
    this.resourceCount = data.resourceCount;
  }
  abc() {
    data.projectDetails.forEach((data: any) => {
      if (data.projectStatus === 'In Progress') {
        this.progressCount++;

      }
      else if (data.projectStatus === 'Blocked') {
        this.blockedCount++;
      }
      else if (data.projectStatus === 'Pipeline') {
        this.pipelineCount++;

      }
      else if (data.projectStatus === 'Closed') {
        this.closeCount++;
      }
    });
    console.log('this.progressCount', this.progressCount);
  }
  showProgress(event: any) {
    if (event === 'progress') {
      this.percent = this.progressCount;
    }
    else if (event === 'blocked') {
      this.percent = this.blockedCount;
    }
    else if (event === 'pipeline') {
      this.percent = this.pipelineCount;
    }
    else if (event === 'closed') {
      this.percent = this.closeCount;
    }
    console.log('event', event);
  }
}
