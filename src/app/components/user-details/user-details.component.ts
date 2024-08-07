import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent  implements OnInit {
  @Input() public user: User | undefined;
  @Output() public locationClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  public call() : void {
    window.open(`tel:${this.user?.phoneNumber}`);
  }

  public locationButtonClicked() : void {
    this.locationClicked.emit(this.user?.address);
  }
}
