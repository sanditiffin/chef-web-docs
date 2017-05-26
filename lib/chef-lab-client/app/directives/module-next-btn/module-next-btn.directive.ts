import { Directive, ElementRef, HostListener, Input } from '@angular/core'
import { SiteDataService } from '../../services/site-data.service'
import { ProgressService } from '../../services/progress.service'

@Directive({
  selector: '.module-next-btn',
})
export class ModuleNextBtnDirective {
  @Input()
  href: string

  constructor(
    private siteDataService: SiteDataService,
    private progressService?: ProgressService,
  ) {
  }

  @HostListener('click', ['$event'])
  clicked(e) {
    e.preventDefault()
    const page = this.siteDataService.currentPage()
    // If there is a quiz, it will be the only way for the user to get credit for this page
    if (page.quiz) {
      window.location.href = this.href
      return
    }
    this.progressService.completePage(page.id)
      .subscribe(
        () => {},
        err => {
          window.location.href = this.href
        },
        () => {
          window.location.href = this.href
        },
      )
  }
}