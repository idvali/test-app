import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { GridViewComponent } from './grid-view/grid-view.component'
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import {
  InMemoryCache,
  split
} from '@apollo/client/core';

import { getMainDefinition } from '@apollo/client/utilities';
import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './store/reducers';


@NgModule({
  declarations: [
    AppComponent,
    GridViewComponent,
    HeaderComponent,
    DetailViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.forRoot({ loading: loadingReducer })
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {

        const http = httpLink.create({
          uri: "https://api-staging.csgoroll.com/graphql",
          withCredentials: true
        });

        const wsLink = new GraphQLWsLink(createClient({
          url: 'ws://api-staging.csgoroll.com/graphql',
        }));

        const link = split(
          ({ query }) => {
            const data = getMainDefinition(query);
            return (
              data.kind === 'OperationDefinition' && data.operation === 'subscription'
            );
          },
          wsLink,
          http
        )

        return {
          link: link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
