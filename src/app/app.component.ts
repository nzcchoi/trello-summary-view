import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import * as _ from 'lodash';
declare var Trello: any;

@Component({
  selector: 'tsv-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'trello-summary-view';
  boards = [];
  members = [];
  constructor(private bottomSheet: MatBottomSheet) {
    Trello.appClass = this;
  }

  ngOnInit() {
    this.authorize();
  }

  authorize() {
    Trello.authorize({
      type: "popup",
      outer: this,
      scope: { read: true, write: true },
      success: this.onAuthorize
    });
  }
  onAuthorize() {
    this.boards = [];
    Trello.members.get("me", member => {
      console.log(member);
      member.idBoards.forEach(b => {
        Trello.get('/boards/' + b + '?lists=all&cards=open&members=all', Trello.appClass.onBoardLoad);
      });
    });

  };

  onBoardLoad(data) {
    console.log(data);
    data.lists.forEach(l => l.count = (_.filter(data.cards, { 'idList': l.id }).length));
    _.remove(Trello.appClass.boards, { 'id': data.id });
    Trello.appClass.boards = _.orderBy(Trello.appClass.boards.concat(data), 'name');
    Trello.appClass.members = _.orderBy(_.uniqBy(Trello.appClass.members.concat(data.members), 'id'), 'fullName');
  }

  openBottomSheet(board: any, listId: string) {
    const cards = _.filter(board.cards, { 'idList': listId });
    console.log(cards);
    cards.forEach(c => c['members'] = _.filter(this.members, m => c['idMembers'].indexOf(m.id) > -1));
    const bottomSheetRef = this.bottomSheet.open(ListCardsComponent, { data: cards });
  }
}
