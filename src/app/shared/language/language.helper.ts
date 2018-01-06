import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

import { LANGUAGES } from './language.constants';

@Injectable()
export class JhiLanguageHelper {
    renderer: Renderer2 = null;

    constructor(
        private rootRenderer: RendererFactory2,
        private titleService: Title,
        private router: Router
    ) {
        this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
        this.init();
    }

    getAll(): Promise<any> {
        return Promise.resolve(LANGUAGES);
    }

    /**
     * Update the window title using params in the following
     * order:
     * 1. titleKey parameter
     * 2. $state.$current.data.pageTitle (current state page title)
     * 3. 'global.title'
     */
    updateTitle(titleKey?: string) {
        if (!titleKey) {
             titleKey = this.getPageTitle(this.router.routerState.snapshot.root);
        }

    }

    private init() {
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'testjhipsterApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }
}
