export interface LayoutMenuModel {
  name: string;
  icon: string;
  route: string;
  children?: LayoutMenuModel[];
  expanded?: boolean;
}