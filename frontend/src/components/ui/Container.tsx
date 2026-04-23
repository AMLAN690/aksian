/*
 * Container Component
 * ====================
 * Reusable wrapper that applies the brand max-width + padding.
 * Replaces raw `.container-aksian` class usage in sections.
 */

import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: "div" | "section" | "article" | "main";
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Container({
  as: Tag = "div",
  children,
  className,
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={cn("container-aksian", className)}>
      {children}
    </Tag>
  );
}
