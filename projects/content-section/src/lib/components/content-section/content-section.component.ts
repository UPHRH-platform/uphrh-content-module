import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IContentSearchRequest } from '../model';
import { ContentSectionService } from '../../services/content-section.service';
import { IContent } from 'uphrh-common-consumption';
import { Utility } from '../utility';
import { Subject } from 'rxjs';

const DEFAULT_LAYOUT_CONFIG = {
  source: '',
  name: 'newLayout',
  options: ''
};
const DEFAULT_TITLE = 'Section';
const DEFAULT_MAX_CARD_COUNT = 4;
const DEFAULT_LOADING = false;
const DEFAULT_VIEW_MORE_TEXT = 'View all';

@Component({
  selector: 'sb-content-section',
  templateUrl: './content-section.component.html',
  styles: []
})
export class ContentSectionComponent implements OnInit, OnDestroy {

  @Input() title: string = DEFAULT_TITLE;
  @Input() searchRequest: IContentSearchRequest;
  @Input() layoutConfig = DEFAULT_LAYOUT_CONFIG;
  @Input() maxCardCount: number = DEFAULT_MAX_CARD_COUNT; /* Max card count to be shown */
  @Input() isMenu = false; /* Show Menu on each card */
  @Input() isLoading: boolean = DEFAULT_LOADING;
  @Input() viewMoreButtonText: string = DEFAULT_VIEW_MORE_TEXT;
  @Input() sortBy: string;

  @Output() cardClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() menuClick: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() viewMoreClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  contentList: IContent[] = [];
  count: number;
  private unsubscribe$ = new Subject<void>();
  constructor(private contentSectionService: ContentSectionService) { }

  ngOnInit(): void {
    this.fetchContents();
  }

  fetchContents() {
    if (this.searchRequest) {
      this.contentSectionService.search(this.searchRequest).subscribe((res: any) => {
        this.contentList = this.sortBy ? res.content.concat().sort(Utility.sortBy(this.sortBy)) : res.content;
        this.count = res.count;
      });
    }
  }

  onCardClick(event: MouseEvent) {
    this.cardClick.emit(event);
  }

  onCardMenuClick(event: MouseEvent) {
    this.menuClick.emit(event);
  }

  onViewMoreClick(event: MouseEvent) {
    this.viewMoreClick.emit(event);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
