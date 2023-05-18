
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdministratorsService } from './services/administrator-login-services/administrators.service';
import { AppComponent } from './app.component';
import { AdministratorLoginComponent } from './components/administrator-login/administrator-login.component';
import { AppRoutingModule } from './app-routing.module';
import { MediumsComponent } from './components/mediums/mediums.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { TagsComponent } from './components/tags/tags.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {APP_BASE_HREF, DatePipe} from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FilterPipe, FilterAllResponces,FilterPipeObj,FilterPipeS,FilterPipeNew } from './pipe';
import { ClientsComponent } from './components/clients/clients.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { TagsTreeviewComponent } from './components/tags-treeview/tags-treeview.component';
import { AddClipPecatenComponent } from './components/add-clip-pecaten/add-clip-pecaten.component';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { AddClipTvRadioComponent } from './components/add-clip-tv-radio/add-clip-tv-radio.component';
import { TendersComponent } from './components/tenders/tenders.component';
import { SalesComponent } from './components/sales/sales.component';
import { NostrificationsComponent } from './components/nostrifications/nostrifications.component';
import { TendersSearchbarComponent } from './components/tenders-searchbar/tenders-searchbar.component';
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTabsModule } from '@angular/material/tabs'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersComponent } from './components/users/users.component'
import { MatTreeModule } from '@angular/material/tree'
import { BankruptciesComponent } from './components/bankruptcies/bankruptcies.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips'
import {MatCardModule} from '@angular/material/card'
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker'
import { DialogComponent } from './components/dialog/dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { DndModule } from 'ngx-drag-drop';
import { DialogClipGroupComponent } from './components/dialog-clip-group/dialog-clip-group.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { DialogTagsComponent } from './components/dialog-tags/dialog-tags.component';
import { DialogTenderClientsComponent } from './components/dialog-tender-clients/dialog-tender-clients.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';
import { ClipComponent } from './components/clip/clip.component';


@NgModule({
  declarations: [
    AppComponent,
    AdministratorLoginComponent,
    MediumsComponent,
    AuthorsComponent,
    TagsComponent,
    ClipComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    SearchbarComponent,
    FilterPipe,
    FilterAllResponces,
    FilterPipeObj,
    FilterPipeS,
    FilterPipeNew,
    ClientsComponent,
    TagsTreeviewComponent,
    AddClipPecatenComponent,
    AddClipTvRadioComponent,
    TendersComponent,
    SalesComponent,
    NostrificationsComponent,
    TendersSearchbarComponent,
    UsersComponent,
    BankruptciesComponent,
    DialogComponent,
    DialogClipGroupComponent,
    DialogComponent,
    LoaderComponent,
    DialogTagsComponent,
    DialogTenderClientsComponent,
    AdministratorsComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatExpansionModule, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    DropDownListAllModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCheckboxModule,
    NgxMatColorPickerModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTreeModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    DndModule,
    MatCardModule,
    ScrollingModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  providers: [DatePipe, AdministratorsService, { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
