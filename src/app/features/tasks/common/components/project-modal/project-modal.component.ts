import { Component,EventEmitter,Input,Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {Task} from 'src/app/features/tasks/model/task.model';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent {

  task!:Task;
  constructor(public bsModalRef:BsModalRef) {
  }

}
