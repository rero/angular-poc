import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { PageTitleStrategy } from './page-title-strategy';

const snapshot = {} as RouterStateSnapshot;

describe('PageTitleStrategy', () => {
  let strategy: PageTitleStrategy;
  let titleService: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PageTitleStrategy,
        { provide: TitleStrategy, useExisting: PageTitleStrategy },
      ],
    });
    strategy = TestBed.inject(PageTitleStrategy);
    titleService = TestBed.inject(Title);
  });

  it('sets the document title with the "Angular POC:" prefix', () => {
    vi.spyOn(strategy, 'buildTitle').mockReturnValue('Dashboard');
    strategy.updateTitle(snapshot);
    expect(titleService.getTitle()).toBe('Angular POC: Dashboard');
  });

  it('sets the title with undefined when route has no title', () => {
    vi.spyOn(strategy, 'buildTitle').mockReturnValue(undefined);
    strategy.updateTitle(snapshot);
    expect(titleService.getTitle()).toBe('Angular POC: undefined');
  });
});
