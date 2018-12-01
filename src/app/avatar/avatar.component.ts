import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tv-avatar',
  templateUrl: './avatar.component.html',
  styles: [
  ]
})

export class AvatarComponent implements OnInit {
  @Input() avatarHash: string
  @Input() initials: string
  @Input() fullName: string
  constructor() { }

  ngOnInit() {
  }

}
