import { ReactNode } from 'react';

export interface TheButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
