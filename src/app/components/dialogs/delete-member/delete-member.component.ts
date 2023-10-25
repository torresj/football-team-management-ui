import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MemberService} from "../../../services/member.service";
import Member from "../../../entities/Member";

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.css']
})
export class DeleteMemberComponent {
  constructor(private dialogRef: MatDialogRef<DeleteMemberComponent>,
              private memberService: MemberService,
              @Inject(MAT_DIALOG_DATA) public data: Member) {
  }

  deleteMember() {
    this.memberService.delete$(this.data.id).subscribe({
      next: () => this.dialogRef.close(),
      error: err => this.dialogRef.close()
    })
  }
}
