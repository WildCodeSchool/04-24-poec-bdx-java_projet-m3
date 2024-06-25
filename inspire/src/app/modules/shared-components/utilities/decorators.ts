export function AutoDestroy(component: any, key: string | symbol): void {
  const originalOnDestroy = component.ngOnDestroy;

  component.ngOnDestroy = function () {
    if (originalOnDestroy) {
      originalOnDestroy.call(this);
    }
    this[key].next();
    this[key].complete();
  };
}
