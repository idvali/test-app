import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Boxes, User } from './types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userDataQuery = gql`{
    currentUser {
      id
      name
      wallets {
        id
        amount
        currency
      }
    }
  }`;

  private boxDataQuery = gql`{
    boxes(free: false, purchasable: true, openable: true) {
      edges {
        node {
          id
          name
          iconUrl
          cost
        }
      }
    }
  }`

  constructor(private apollo: Apollo) { }

  getUserData() {
    return this.apollo.watchQuery<User>({
      query: this.userDataQuery
    })
  }

  getBoxData() {
    return this.apollo.watchQuery<Boxes>({
      query: this.boxDataQuery
    })
  }
}
