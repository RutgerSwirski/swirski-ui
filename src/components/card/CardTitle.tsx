import { ReactNode } from "react";

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-3 font-anton text-2xl uppercase tracking-[-0.02em] group-hover:underline">
      {children}
    </h3>
  );
}

//  <h3 className="font-anton text-2xl uppercase tracking-[-0.02em]">
//                 {project.title}
//               </h3> - dev title

// <h3 className="mt-3 text-base font-semibold tracking-normal group-hover:underline">
//         {title}
//       </h3> - studio title
