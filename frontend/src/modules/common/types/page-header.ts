import { ReactNode } from "react";

export interface IPageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  actions?: ReactNode;
}
