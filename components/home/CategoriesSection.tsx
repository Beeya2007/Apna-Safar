/* ============================================================
   CATEGORIES SECTION — the row of property-type filters that
   sits directly under the hero. Each one is a link into search.
   Styles live in: styles/pages/home.css  (section 2)
   ============================================================ */

import Link from "next/link";

/* Edit this list to change the categories shown. The label must
   match a property type in lib/types.ts, because it is passed
   straight to /search as a filter. */
const CATEGORIES = [
  { icon: "🏖️", label: "Beachfront" },
  { icon: "🏔️", label: "Mountains"  },
  { icon: "🏙️", label: "City"       },
  { icon: "🌳", label: "Countryside" },
  { icon: "🏊", label: "Pools"      },
  { icon: "🏰", label: "Heritage"   },
  { icon: "🛖", label: "Cabins"     },
  { icon: "🏝️", label: "Islands"    },
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
            <span className="categories__icon" aria-hidden>{category.icon}</span>
            <span>{category.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
