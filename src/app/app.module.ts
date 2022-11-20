import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core';
import { GridViewComponent } from './grid-view/grid-view.component'
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

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
    ButtonsModule.forRoot()
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://api-staging.csgoroll.com/graphql',
            withCredentials: true
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
