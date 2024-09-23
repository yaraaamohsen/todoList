import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlowbitesService } from '../../core/services/flowbites/flowbites.service';
import { Todo } from '../../core/models/todo';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, MatSlideToggleModule, MatButtonModule, FormsModule, MatProgressBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private _FlowbitesService: FlowbitesService , private _MatDialog: MatDialog){}

  tasksArr: Todo[] = [];
  taskInput!: string;
  completedTasks: number = 0;
  progress: number = 0
  totalTasks !:number
  
  taskForm : FormGroup = new FormGroup({
    task: new FormControl(null, [Validators.required]),
    checkBox: new FormControl(null)
  })

  ngOnInit(): void{
    if(typeof localStorage != 'undefined'){
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks !== null) {
        this.tasksArr = JSON.parse(storedTasks);
      }
    }
    this.totalTasks = this.tasksArr.length;
  }

  ngDoCheck(): void{
    this.totalTasks = this.tasksArr.length;
  }

  checkBox(event: Event){
    const checkbox = event.target as HTMLInputElement;
    if(checkbox.checked){
      this.completedTasks = this.completedTasks + 1
    }
    if(checkbox.checked == false){
      this.completedTasks = this.completedTasks - 1
    }
    this.progress = (this.completedTasks/this.totalTasks)*100;
  }

  addTask(){
    console.log(this.taskForm.value);
    this.tasksArr.push(this.taskForm.get('task')?.value);
    this.taskInput = this.taskForm.get('task')?.value;
    this.resetForm();
    localStorage.setItem('tasks', JSON.stringify(this.tasksArr))
  }

  resetForm(){
    this.taskForm.get('task')?.setValue(null)
    this.taskForm.markAsUntouched()
  }

  deleteSpecTask(index: number ){
    this.tasksArr.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasksArr))
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, todo: Todo): void {
    const index = this.tasksArr.indexOf(todo)
    const dialogRef = this._MatDialog.open(DialogAnimationsExampleDialog, {
      width: '50%',
      data: {todo},
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result: Todo) => {
      if (result) {
        this.tasksArr[index] = result;
        localStorage.setItem('tasks', JSON.stringify(this.tasksArr));
      }
    });
  } 
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DialogAnimationsExampleDialog {
  updatedTask: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { todo: string },
    private dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {
    this.updatedTask = data.todo;
  }

  save(): void {
    this.dialogRef.close(this.updatedTask)
  }
}