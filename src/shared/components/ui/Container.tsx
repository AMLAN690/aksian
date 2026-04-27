/**
 * ==========================================
 * FILE SUMMARY: src/components/ui/Container.tsx
 * ==========================================
 * Purpose: 
 *   A layout utility component that enforces the global maximum width and horizontal padding. 
 *   Replaces the need to manually apply the `.container-aksian` class everywhere.
 *
 * Connections:
 *   - Used by almost every layout-level component (Headers, Footers, Sections).
 *
 * Data Flow:
 *   - Presentational wrapper.
 *
 * Risky Areas (Bugs likely here):
 *   - None.
 *
 * Common Mistakes to Avoid:
 *   - Nesting `Container`s inside each other, which will double up the horizontal padding.
 *
 * Performance Considerations:
 *   - Very lightweight.
 *
 * Where to add new features safely:
 *   - Adjust the `as` prop union type if you need to render as a specific HTML5 semantic tag.
 */

import { cn } from "@/shared/lib/utils";

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
