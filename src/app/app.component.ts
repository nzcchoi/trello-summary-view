import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { map } from 'rxjs/internal/operators/map';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

import * as _ from 'lodash';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
declare var Trello: any;

@Component({
  selector: 'tv-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  boards = [];
  members = [{ id: null, fullName: ' Not assigned', initials: 'NA', checked: true }];
  public config: PerfectScrollbarConfigInterface = {
    suppressScrollY: true
  };
  checkedMembersCount = 0;
  constructor(private bottomSheet: MatBottomSheet) {
    Trello.appClass = this;
  }

  ngOnInit() {
    this.authorize();
  }


  authorize() {
    Trello.authorize({
      name: 'Trello View',
      outer: this,
      scope: { read: true, write: false },
      success: this.onAuthorize
    });
  }
  onAuthorize() {
    this.boards = [];
    Trello.members.get("me", member => {
      member.idBoards.forEach(b => {
        Trello.get('/boards/' + b + '?lists=all&cards=open&members=all', Trello.appClass.onBoardLoad);
      });
    });
  };

  refresh() {
    this.authorize();
  }

  onAllMemberChecked(event) {
    this.members.forEach(m => m.checked = event.checked);
    this.afterMemberChecked();
  }
  onMemberChecked(event, member) {
    member.checked = event.checked;
    this.afterMemberChecked();
  }

  afterMemberChecked() {
    this.checkedMembersCount = _.filter(this.members, { 'checked': true }).length;
    this.boards.forEach(b =>
      b.lists.forEach(l =>
        l.cardCount = this.getMemberCards(b.cards, l.id).length));
  }

  getMemberCards(cards, idList) {
    const memberIds = _.filter(this.members, { 'checked': true }).map(m => m.id);
    return (_.filter(cards, c => c.idList === idList
      && ((memberIds.indexOf(null) > -1 && c.idMembers.length === 0)
        || _.intersection(memberIds, c.idMembers).length > 0)));
  }

  onBoardLoad(data) {
    data.lists.forEach(l => l.cardCount = (_.filter(data.cards, { 'idList': l.id }).length));
    _.remove(Trello.appClass.boards, { 'id': data.id });
    Trello.appClass.boards = _.orderBy(Trello.appClass.boards.concat(data), 'name');
    console.log(Trello.appClass.members);
    if (!Trello.appClass.members) {
      data.members.forEach(m => {
        m.checked = true;
      });
    }
    Trello.appClass.members = _.orderBy(_.uniqBy(Trello.appClass.members.concat(data.members), 'id'), 'fullName');
    Trello.appClass.checkedMembersCount = _.filter(Trello.appClass.members, { 'checked': true }).length;
  }

  getCards(board: any, listId: string) {
    const cards = this.getMemberCards(board.cards, listId);
    cards.forEach(c => c['members'] = _.filter(this.members, m => c['idMembers'].indexOf(m.id) > -1));
    return cards;
  }

  openBottomSheet(board: any, listId: string) {
    const cards = this.getCards(board, listId);
    this.bottomSheet.open(ListCardsComponent, { data: cards });
  }
}
