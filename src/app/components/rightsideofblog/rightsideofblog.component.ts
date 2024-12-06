import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { BloggerinfoComponent } from "../bloggerinfo/bloggerinfo.component";
import { RecentpostComponent } from "../recentpost/recentpost.component";
import { FilterbymenuComponent } from "../filterbymenu/filterbymenu.component";

@Component({
  selector: 'app-rightsideofblog',
  standalone: true,
  imports: [SearchComponent, BloggerinfoComponent, RecentpostComponent, FilterbymenuComponent],
  templateUrl: './rightsideofblog.component.html',
  styleUrl: './rightsideofblog.component.css'
})
export class RightsideofblogComponent {

}
