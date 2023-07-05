import { ChangeDetectionStrategy, Component, Signal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Link } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly router = inject(Router);

  navLinks: Signal<Link[]> = signal([
    this.createLink('Info', 'info', './info', 0),
    this.createLink('Files', 'note_add', './files', 1),
    this.createLink('Transactions', 'swap_horiz', './transactions', 2),
    this.createLink('Earns', 'savings', './earns', 3),
    this.createLink('Settings', 'settings', './settings', 4),
  ]).asReadonly();

  activeLink$: Observable<Link> = this.router.events.pipe(
    startWith(this.navLinks()[0]),
    map(() => {
      const activeLink = this.navLinks().find((tab) => tab.link === '.' + this.router.url);
      return activeLink ?? this.navLinks()[0];
    }),
  );

  private createLink(label: string, icon: string, link: string, index: number): Link {
    return { label, icon, link, index };
  }
}
