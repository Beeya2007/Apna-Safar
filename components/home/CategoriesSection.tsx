/* ============================================================
   CATEGORIES SECTION — the row of property-type filters that
   sits directly under the hero. Each one is a link into search.
   Styles live in: styles/pages/home.css  (section 2)
   ============================================================ */


"use client";

import Link from "next/link";
import {
  Umbrella, Mountains, Buildings, Tree,
  SwimmingPool, CastleTurret, Tent, Island,
} from "@phosphor-icons/react";

/* Edit this list to change the categories shown. The label must
   match a property type in lib/types.ts, because it is passed
   straight to /search as a filter. */
const CATEGORIES = [
  { Icon: Umbrella,     label: "Beachfront"  },
  { Icon: Mountains,    label: "Mountains"   },
  { Icon: Buildings,    label: "City"        },
  { Icon: Tree,         label: "Countryside" },
  { Icon: SwimmingPool, label: "Pools"       },
  { Icon: CastleTurret, label: "Heritage"    },
  { Icon: Tent,         label: "Cabins"      },
  { Icon: Island,       label: "Islands"     },
];

export default function CategoriesSection() {
  return (
    <section className="categories">
      <div className="page-container categories__row">
        {CATEGORIES.map((category) => (
          <Link
            key={category.label}
            href={`/search?type=${encodeURIComponent(category.label)}`}
            className="categories__item"
          >
            <category.Icon className="categories__icon icon" size={24} />
            <span>{category.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
