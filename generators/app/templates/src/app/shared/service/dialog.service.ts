import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from '@app/component/form-modal/form-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(public dialog: MatDialog) {}


  /**
   * 
   * @param modal - name of the modal CHOICE : stepper
   * @param width - width of the modal
   * @param height - height of the modal
   * @param type - OPTIONNAL needed when modal = stepper , CHOICE : newProject | analyse
   */
  openDialog(modal: string, width: string, height: string, type?: 'newProject' | 'analyse'): void {
    console.log(modal,width,height,type);

    const dialogRef = this.dialog.open(FormModalComponent, {
      width: width,
      height: height,
      data: { type: type, modalType: modal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`${modal} Dialog  was closed`, result);
    });
  }

}
