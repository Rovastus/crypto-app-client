import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  navLinks: Link[] = [
    this.createLink('Info', 'info', './info', 0),
    this.createLink('Files', 'note_add', './files', 1),
    this.createLink('Transactions', 'swap_horiz', './transactions', 2),
    this.createLink('Earns', 'savings', './earns', 3),
    this.createLink('Settings', 'settings', './settings', 4),
  ];

  activeLink: Link = this.navLinks[0];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const activeLink = this.navLinks.find((tab) => tab.link === '.' + this.router.url);
      if (activeLink) {
        this.activeLink = activeLink;
      }
    });
  }

  private createLink(label: string, icon: string, link: string, index: number): Link {
    return { label, icon, link, index };
  }
}
