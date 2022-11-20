import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { find, map } from 'rxjs';
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

  private readonly boxDataQuery = gql`{
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

  private readonly openBoxMutation = gql`
    mutation OpenBox($input: OpenBoxInput!) {
      openBox(input: $input) {
        boxOpenings {
          id
          itemVariant {
            id
            name
            value
          }
        }
      }
  }`

  private readonly walletSubscription = gql`
    subscription OnUpdateWallet {
      updateWallet {
        wallet {
          id
          amount
          name
        }
      }
    }
`;

  constructor(private apollo: Apollo) { }

  getUserData() {
    return this.apollo.watchQuery<User>({
      query: this.userDataQuery
    })
  }

  getBoxesData() {
    return this.apollo.watchQuery<Boxes>({
      query: this.boxDataQuery
    })
  }

  getBoxData(boxId: string) {
    return this.apollo.watchQuery<Boxes>({
      query: this.boxDataQuery
    }).valueChanges.pipe(map(data => data.data.boxes.edges.find((box) => box.node.id === boxId)))
  }

  openBox(Id: string) {
    return this.apollo.mutate({ mutation: this.openBoxMutation, variables: { input: { boxId: Id, amount: 1 } } });
  }

  subscribeToWallet() {
    return this.apollo.subscribe({
      query: this.walletSubscription
    });
  }
}
