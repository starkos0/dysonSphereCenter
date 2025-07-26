import { Directive, Input, TemplateRef } from '@angular/core';
@Directive({
  selector: 'ng-template[typedTemplate]',
  standalone: true,
})
export class TypedTemplateDirective<T> {
  @Input() typedTemplate!: T;
  constructor(public templateRef: TemplateRef<T>) {}
  static ngTemplateContextGuard<T>(dir: TypedTemplateDirective<T>, ctx: any): ctx is T {
    return true;
  }
}
