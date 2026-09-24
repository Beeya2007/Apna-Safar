/* ============================================================
   PHOTO CREDITS — who took each photo. All are from Pexels.
   ------------------------------------------------------------
   Written by scripts/fetch-photos.mjs. Don't edit by hand;
   re-run the script instead.
   ============================================================ */

import type { PhotoCredit } from "../types";

export const PHOTO_CREDITS: {
  listings: Record<string, PhotoCredit[]>;
  destinations: Record<string, PhotoCredit>;
  experiences: Record<string, PhotoCredit>;
  people: Record<string, PhotoCredit>;
} = {
  "listings": {
    "1": [
      {
        "photographer": "Rohit  George",
        "profile": "https://www.pexels.com/@rohit-george-1141376880",
        "source": "https://www.pexels.com/photo/scenic-seaside-resort-with-palm-trees-and-beach-31897042/"
      },
      {
        "photographer": "Guduru Ajay bhargav",
        "profile": "https://www.pexels.com/@ajaybhargavguduru",
        "source": "https://www.pexels.com/photo/bird-s-eye-view-of-house-near-body-of-water-863985/"
      },
      {
        "photographer": "Lost Traveller",
        "profile": "https://www.pexels.com/@lost-traveller-2159123316",
        "source": "https://www.pexels.com/photo/luxurious-villa-with-pool-in-arpora-goa-35808145/"
      },
      {
        "photographer": "Aditya Oberai",
        "profile": "https://www.pexels.com/@oberai",
        "source": "https://www.pexels.com/photo/lush-green-retreat-in-goa-by-tranquil-waters-34636887/"
      },
      {
        "photographer": "Jebakumar Samuel",
        "profile": "https://www.pexels.com/@jebakumar-samuel-728757187",
        "source": "https://www.pexels.com/photo/scenic-view-of-anjuna-beach-in-goa-29023465/"
      }
    ],
    "2": [
      {
        "photographer": "- landsmann -",
        "profile": "https://www.pexels.com/@landsmann-803094805",
        "source": "https://www.pexels.com/photo/wooden-cottages-in-village-in-mountains-in-winter-19200610/"
      },
      {
        "photographer": "jj chan",
        "profile": "https://www.pexels.com/@jj-chan-425005084",
        "source": "https://www.pexels.com/photo/snow-covered-cabins-in-winter-mountain-landscape-36506012/"
      },
      {
        "photographer": "SERHAT  TUĞ",
        "profile": "https://www.pexels.com/@serhattugg",
        "source": "https://www.pexels.com/photo/scenic-snowy-mountain-cabins-in-winter-landscape-35523363/"
      },
      {
        "photographer": "Pascal Küffer",
        "profile": "https://www.pexels.com/@pascal-kuffer-190126462",
        "source": "https://www.pexels.com/photo/a-cabin-near-snowy-mountains-11400176/"
      },
      {
        "photographer": "- landsmann -",
        "profile": "https://www.pexels.com/@landsmann-803094805",
        "source": "https://www.pexels.com/photo/wooden-cottages-in-snow-in-winter-19473882/"
      }
    ],
    "3": [
      {
        "photographer": "Pritam Sengupta",
        "profile": "https://www.pexels.com/@pritam-sengupta-685216574",
        "source": "https://www.pexels.com/photo/passenger-ship-sailing-on-tropical-river-17928231/"
      },
      {
        "photographer": "Nishad Mohammed",
        "profile": "https://www.pexels.com/@nishad2212",
        "source": "https://www.pexels.com/photo/houseboats-in-a-canal-in-kerala-india-12950219/"
      },
      {
        "photographer": "Suman Boipai",
        "profile": "https://www.pexels.com/@suman-boipai-143965246",
        "source": "https://www.pexels.com/photo/scenic-kerala-houseboats-among-tropical-palms-32518360/"
      },
      {
        "photographer": "Frank van Dijk",
        "profile": "https://www.pexels.com/@frank-van-dijk-121009207",
        "source": "https://www.pexels.com/photo/serene-houseboats-on-kerala-s-backwaters-36998153/"
      },
      {
        "photographer": "Alex Jaison",
        "profile": "https://www.pexels.com/@alex-jaison-1690209427",
        "source": "https://www.pexels.com/photo/scenic-houseboats-on-kerala-s-backwaters-28890056/"
      }
    ],
    "4": [
      {
        "photographer": "Hussain Badshah",
        "profile": "https://www.pexels.com/@hussain-badshah-2084644",
        "source": "https://www.pexels.com/photo/elegant-courtyard-in-rajasthani-heritage-architecture-39574623/"
      },
      {
        "photographer": "Amish Alqama",
        "profile": "https://www.pexels.com/@amish-alqama-2163494792",
        "source": "https://www.pexels.com/photo/beautiful-courtyard-of-city-palace-udaipur-39037457/"
      },
      {
        "photographer": "sunaina ravikumar",
        "profile": "https://www.pexels.com/@sunaina-ravikumar-1597491343",
        "source": "https://www.pexels.com/photo/mehrangahr-27403540/"
      },
      {
        "photographer": "Hussain Badshah",
        "profile": "https://www.pexels.com/@hussain-badshah-2084644",
        "source": "https://www.pexels.com/photo/luxurious-marble-hallway-in-rajasthani-palace-39574624/"
      },
      {
        "photographer": "Deepak Ramesha",
        "profile": "https://www.pexels.com/@deepak-ramesha-294760",
        "source": "https://www.pexels.com/photo/woman-seated-on-a-monument-8285869/"
      }
    ],
    "5": [
      {
        "photographer": "Firman Marek_Brew",
        "profile": "https://www.pexels.com/@firman-marek_brew-2148918143",
        "source": "https://www.pexels.com/photo/charming-tudor-house-in-lush-pangalengan-landscape-38014579/"
      },
      {
        "photographer": "Firman Marek_Brew",
        "profile": "https://www.pexels.com/@firman-marek_brew-2148918143",
        "source": "https://www.pexels.com/photo/scenic-house-in-verdant-tea-plantation-landscape-35298937/"
      },
      {
        "photographer": "Tom Fisk",
        "profile": "https://www.pexels.com/@tomfisk",
        "source": "https://www.pexels.com/photo/verdant-jungle-and-residential-house-in-countryside-5915631/"
      },
      {
        "photographer": "Rayhan Patuary",
        "profile": "https://www.pexels.com/@rimon",
        "source": "https://www.pexels.com/photo/remote-bamboo-hut-in-lush-greenery-30615781/"
      },
      {
        "photographer": "Luiz Eduardo Pacheco",
        "profile": "https://www.pexels.com/@luiz-eduardo-pacheco-706192036",
        "source": "https://www.pexels.com/photo/charming-rural-house-surrounded-by-lush-greenery-32155883/"
      }
    ],
    "6": [
      {
        "photographer": "Lisa and everlast jorney",
        "profile": "https://www.pexels.com/@llizzk",
        "source": "https://www.pexels.com/photo/buildings-by-river-in-town-in-india-17693658/"
      },
      {
        "photographer": "Amanjot  Singh",
        "profile": "https://www.pexels.com/@amanjot-singh-311045324",
        "source": "https://www.pexels.com/photo/people-swimming-on-the-river-13545188/"
      },
      {
        "photographer": "Capturing Rishikesh",
        "profile": "https://www.pexels.com/@capturing-rishikesh-2150926434",
        "source": "https://www.pexels.com/photo/scenic-view-of-laxman-jhula-bridge-in-rishikesh-36123978/"
      },
      {
        "photographer": "Capturing Rishikesh",
        "profile": "https://www.pexels.com/@capturing-rishikesh-2150926434",
        "source": "https://www.pexels.com/photo/scenic-view-of-laxman-jhula-in-rishikesh-india-36123985/"
      },
      {
        "photographer": "Sanket  Mishra",
        "profile": "https://www.pexels.com/@sanketgraphy",
        "source": "https://www.pexels.com/photo/woman-relaxing-in-yoga-pose-15196909/"
      }
    ],
    "7": [
      {
        "photographer": "Tushar",
        "profile": "https://www.pexels.com/@tushar-1586029",
        "source": "https://www.pexels.com/photo/charming-colonial-architecture-in-puducherry-india-38199872/"
      },
      {
        "photographer": "Cheese Burger",
        "profile": "https://www.pexels.com/@cheeseburger",
        "source": "https://www.pexels.com/photo/elegant-colonial-architecture-with-blue-sky-backdrop-34293574/"
      },
      {
        "photographer": "Abhi M",
        "profile": "https://www.pexels.com/@mypixelvibes",
        "source": "https://www.pexels.com/photo/vibrant-yellow-building-in-french-colonial-style-39540830/"
      },
      {
        "photographer": "ROMAN ODINTSOV",
        "profile": "https://www.pexels.com/@roman-odintsov",
        "source": "https://www.pexels.com/photo/volkswagen-beetle-parked-beside-white-concrete-building-4870482/"
      },
      {
        "photographer": "Sivarao sanapalli",
        "profile": "https://www.pexels.com/@sivarao-sanapalli-2591504",
        "source": "https://www.pexels.com/photo/the-entrance-of-a-hotel-10049549/"
      }
    ],
    "8": [
      {
        "photographer": "eberhard grossgasteiger",
        "profile": "https://www.pexels.com/@eberhardgross",
        "source": "https://www.pexels.com/photo/tall-green-trees-growing-in-hillside-4406328/"
      },
      {
        "photographer": "eberhard grossgasteiger",
        "profile": "https://www.pexels.com/@eberhardgross",
        "source": "https://www.pexels.com/photo/old-wooden-barns-on-green-hill-4406339/"
      },
      {
        "photographer": "Oleh Bartkiv",
        "profile": "https://www.pexels.com/@oleh-bartkiv-88534043",
        "source": "https://www.pexels.com/photo/mountain-village-in-fog-20400897/"
      },
      {
        "photographer": "Ghassan Hani",
        "profile": "https://www.pexels.com/@ghassan-hani-709938",
        "source": "https://www.pexels.com/photo/serene-winter-landscape-with-frosted-forest-36454631/"
      },
      {
        "photographer": "eberhard grossgasteiger",
        "profile": "https://www.pexels.com/@eberhardgross",
        "source": "https://www.pexels.com/photo/green-grass-field-and-trees-1287089/"
      }
    ]
  },
  "destinations": {
    "goa": {
      "photographer": "J  Singh",
      "profile": "https://www.pexels.com/@j-singh-166004985",
      "source": "https://www.pexels.com/photo/chairs-and-nipa-huts-10898929/"
    },
    "manali": {
      "photographer": "Kunal Gautam",
      "profile": "https://www.pexels.com/@kunal-gautam-216809665",
      "source": "https://www.pexels.com/photo/scenic-view-of-manali-mountains-and-river-29494184/"
    },
    "kerala": {
      "photographer": "Gorky Sinha",
      "profile": "https://www.pexels.com/@gorky",
      "source": "https://www.pexels.com/photo/charming-kerala-backwaters-scene-with-lush-greenery-30778230/"
    },
    "udaipur": {
      "photographer": "Руслан Кальницкий",
      "profile": "https://www.pexels.com/@ruslankphoto",
      "source": "https://www.pexels.com/photo/palace-on-lake-7195782/"
    },
    "coorg": {
      "photographer": "Renjith Ponnappan",
      "profile": "https://www.pexels.com/@renjithponnappan",
      "source": "https://www.pexels.com/photo/misty-forest-view-in-madikeri-coorg-hills-33046721/"
    },
    "rishikesh": {
      "photographer": "Capturing Rishikesh",
      "profile": "https://www.pexels.com/@capturing-rishikesh-2150926434",
      "source": "https://www.pexels.com/photo/scenic-view-of-laxman-jhula-bridge-in-rishikesh-36123978/"
    },
    "pondicherry": {
      "photographer": "Cheese Burger",
      "profile": "https://www.pexels.com/@cheeseburger",
      "source": "https://www.pexels.com/photo/elegant-colonial-architecture-with-blue-sky-backdrop-34293574/"
    },
    "shillong": {
      "photographer": "Subhadeep Kundu",
      "profile": "https://www.pexels.com/@sratk07",
      "source": "https://www.pexels.com/photo/scenic-view-of-mountain-ranges-10101268/"
    }
  },
  "experiences": {
    "e1": {
      "photographer": "Ishay  Botbol",
      "profile": "https://www.pexels.com/@ishay-botbol-541049",
      "source": "https://www.pexels.com/photo/woman-sitting-near-fishes-and-basins-1304154/"
    },
    "e2": {
      "photographer": "Juan Pablo Serrano",
      "profile": "https://www.pexels.com/@juanpphotoandvideo",
      "source": "https://www.pexels.com/photo/shallow-focus-photo-of-coffee-beans-894695/"
    },
    "e3": {
      "photographer": "Kamakshi",
      "profile": "https://www.pexels.com/@kamakshi-72543796",
      "source": "https://www.pexels.com/photo/colorful-assortment-of-indian-spices-on-wooden-surface-30296301/"
    },
    "e4": {
      "photographer": "Frank van Dijk",
      "profile": "https://www.pexels.com/@frank-van-dijk-121009207",
      "source": "https://www.pexels.com/photo/traditional-canoes-in-kerala-backwaters-36998152/"
    },
    "e5": {
      "photographer": "Rasel",
      "profile": "https://www.pexels.com/@rasel-601355",
      "source": "https://www.pexels.com/photo/person-standing-on-bridge-near-waterfalls-1403036/"
    },
    "e6": {
      "photographer": "Soubhagya Maharana",
      "profile": "https://www.pexels.com/@soubhagya23",
      "source": "https://www.pexels.com/photo/people-during-ganga-aarti-ceremony-18887232/"
    }
  },
  "people": {
    "h1": {
      "photographer": "Ashutosh Kumar",
      "profile": "https://www.pexels.com/@ashutosh-kumar-2162352017",
      "source": "https://www.pexels.com/photo/portrait-of-woman-in-traditional-indian-attire-38281680/"
    },
    "h2": {
      "photographer": "Sebastian Timothy",
      "profile": "https://www.pexels.com/@timothysebastian",
      "source": "https://www.pexels.com/photo/man-in-black-jacket-11545005/"
    },
    "h3": {
      "photographer": "Abhishek  Shekhawat",
      "profile": "https://www.pexels.com/@absoluteabhi",
      "source": "https://www.pexels.com/photo/smiling-man-with-traditional-pink-turban-36342203/"
    },
    "h4": {
      "photographer": "Ethan Sarkar",
      "profile": "https://www.pexels.com/@ethan-sarkar-2060961318",
      "source": "https://www.pexels.com/photo/elderly-woman-in-traditional-shawl-portrait-29820147/"
    },
    "h5": {
      "photographer": "Prudvi Raj",
      "profile": "https://www.pexels.com/@prudvi-raj-1202091",
      "source": "https://www.pexels.com/photo/a-bearded-man-in-an-olive-colored-shirt-6595899/"
    },
    "h6": {
      "photographer": "Daniil Kondrashin",
      "profile": "https://www.pexels.com/@konrads-photo",
      "source": "https://www.pexels.com/photo/blond-woman-wearing-eyeglasses-13793985/"
    },
    "r1": {
      "photographer": "Deepak Maurya",
      "profile": "https://www.pexels.com/@143deepak",
      "source": "https://www.pexels.com/photo/grayscale-photo-of-a-handsome-man-with-a-headband-looking-at-the-camera-7276073/"
    },
    "r2": {
      "photographer": "PATRICIA Barros",
      "profile": "https://www.pexels.com/@patricia-barros-2161001905",
      "source": "https://www.pexels.com/photo/portrait-of-a-woman-in-vibrant-sari-outdoors-37145167/"
    },
    "r3": {
      "photographer": "Deepak Maurya",
      "profile": "https://www.pexels.com/@143deepak",
      "source": "https://www.pexels.com/photo/grayscale-photo-of-a-bearded-man-14183123/"
    },
    "r4": {
      "photographer": "Ravinder Ravi",
      "profile": "https://www.pexels.com/@ravinder-ravi-108844465",
      "source": "https://www.pexels.com/photo/portrait-of-a-woman-in-traditional-attire-outdoors-38982379/"
    },
    "r5": {
      "photographer": "ravi k",
      "profile": "https://www.pexels.com/@ravi-k-301762",
      "source": "https://www.pexels.com/photo/a-portrait-of-a-bearded-man-11800909/"
    },
    "r6": {
      "photographer": "Manish M",
      "profile": "https://www.pexels.com/@manish-m-2148639571",
      "source": "https://www.pexels.com/photo/young-woman-in-traditional-saree-outdoors-39559946/"
    },
    "r7": {
      "photographer": "Nikhil Manan",
      "profile": "https://www.pexels.com/@nikhil-manan-1536524",
      "source": "https://www.pexels.com/photo/smiling-man-in-traditional-indian-turban-28945957/"
    },
    "r8": {
      "photographer": "Uday Veeru",
      "profile": "https://www.pexels.com/@uday-veeru-2148554804",
      "source": "https://www.pexels.com/photo/portrait-of-a-woman-in-warm-lighting-38451328/"
    },
    "r9": {
      "photographer": "Deepak Maurya",
      "profile": "https://www.pexels.com/@143deepak",
      "source": "https://www.pexels.com/photo/monochrome-photo-of-a-man-with-facial-hair-looking-away-7276086/"
    },
    "r10": {
      "photographer": "Nataliya Vaitkevich",
      "profile": "https://www.pexels.com/@n-voitkevich",
      "source": "https://www.pexels.com/photo/close-up-photo-of-woman-s-face-4772182/"
    },
    "r11": {
      "photographer": "Noorain Saleem",
      "profile": "https://www.pexels.com/@noorain-saleem-88530788",
      "source": "https://www.pexels.com/photo/an-elderly-bearded-man-smiling-11905784/"
    },
    "r12": {
      "photographer": "Elka Elias",
      "profile": "https://www.pexels.com/@elka-elias-2164032779",
      "source": "https://www.pexels.com/photo/portrait-of-smiling-woman-in-denim-jacket-at-night-39598425/"
    }
  }
};
