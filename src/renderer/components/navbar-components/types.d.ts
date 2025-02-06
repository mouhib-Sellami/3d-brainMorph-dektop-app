import { IconHome2 } from "@tabler/icons-react";
export interface LinkItem {
  label: string;
  link: string;
  isVisible?: boolean;

}

export interface NavItem {
  label: string;
  icon: typeof IconHome2;
  name: string;
  link?: string;
  isVisible: boolean;
  initiallyOpened?: boolean;
  links?: LinkItem[];
}

interface LinksGroupProps extends NavItem {

}