/* ============================================================
   CATEGORIES SECTION — the row of property-type filters that
   sits directly under the hero.
   Styles live in: styles/pages/home.css  (section 2)
   ============================================================ */

/* Edit this list to change the categories shown. */
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
        {CATEGORIES.map((category, index) => (
          <button
            key={category.label}
            /* The first item is marked active as a placeholder —
               real filtering gets wired up later. */
            className={
              index === 0 ? "categories__item categories__item--active" : "categories__item"
            }
          >
            <span className="categories__icon" aria-hidden>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
