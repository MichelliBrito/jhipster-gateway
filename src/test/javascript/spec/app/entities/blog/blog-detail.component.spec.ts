import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { BlogDetailComponent } from 'app/entities/blog/blog-detail.component';
import { Blog } from 'app/shared/model/blog.model';

describe('Component Tests', () => {
  describe('Blog Management Detail Component', () => {
    let comp: BlogDetailComponent;
    let fixture: ComponentFixture<BlogDetailComponent>;
    const route = ({ data: of({ blog: new Blog(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [BlogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BlogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BlogDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load blog on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.blog).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
