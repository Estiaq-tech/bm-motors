/* =====================================================================
   BM MOTORS — BIKE LIST
   ---------------------------------------------------------------------
   HOW TO EDIT (add / delete / change a bike):

   • Each bike is one { ... } block, separated by commas.
   • TO ADD a bike: copy one block, paste it, change the details.
   • TO DELETE a bike: remove its whole { ... } block (and its comma).
   • image: put your photo file inside the "images" folder, then write
            its file name here, e.g.  "images/pulsar.jpg".
            Leave it as "" (empty) to show a placeholder.
   • available: true = shown as In stock, false = shown as Sold.
   • Do NOT remove the square brackets [ ] or the "const BIKES =" line.
   ===================================================================== */

const BIKES = [
  {
    name_en: "Bajaj Pulsar 150",
    name_bn: "বাজাজ পালসার ১৫০",
    brand: "Bajaj",
    type: "Sports Commuter",
    engine: "149 cc",
    condition: "New",
    image: "",
    available: true,
    specs_en: ["149 cc engine", "Electric & kick start", "Disc brake (front)", "Great mileage"],
    specs_bn: ["১৪৯ সিসি ইঞ্জিন", "ইলেকট্রিক ও কিক স্টার্ট", "ডিস্ক ব্রেক (সামনে)", "ভালো মাইলেজ"]
  },
  {
    name_en: "Honda CB Shine",
    name_bn: "হোন্ডা সিবি শাইন",
    brand: "Honda",
    type: "Commuter",
    engine: "125 cc",
    condition: "New",
    image: "",
    available: true,
    specs_en: ["125 cc engine", "Excellent mileage", "Smooth & reliable", "Comfortable ride"],
    specs_bn: ["১২৫ সিসি ইঞ্জিন", "চমৎকার মাইলেজ", "স্মুথ ও নির্ভরযোগ্য", "আরামদায়ক রাইড"]
  },
  {
    name_en: "Yamaha FZ-S",
    name_bn: "ইয়ামাহা এফজেড-এস",
    brand: "Yamaha",
    type: "Street",
    engine: "149 cc",
    condition: "New",
    image: "",
    available: true,
    specs_en: ["149 cc engine", "Muscular design", "Fuel injection", "Single-channel ABS"],
    specs_bn: ["১৪৯ সিসি ইঞ্জিন", "পেশীবহুল ডিজাইন", "ফুয়েল ইনজেকশন", "সিঙ্গেল-চ্যানেল এবিএস"]
  },
  {
    name_en: "TVS Apache RTR 160",
    name_bn: "টিভিএস অ্যাপাচি আরটিআর ১৬০",
    brand: "TVS",
    type: "Sports",
    engine: "159 cc",
    condition: "New",
    image: "",
    available: true,
    specs_en: ["159.7 cc engine", "Sporty handling", "Disc brakes", "Racing DNA"],
    specs_bn: ["১৫৯.৭ সিসি ইঞ্জিন", "স্পোর্টি হ্যান্ডলিং", "ডিস্ক ব্রেক", "রেসিং ডিএনএ"]
  },
  {
    name_en: "Bajaj Discover 110",
    name_bn: "বাজাজ ডিসকভার ১১০",
    brand: "Bajaj",
    type: "Commuter",
    engine: "115 cc",
    condition: "Used - Good",
    image: "",
    available: true,
    specs_en: ["115 cc engine", "Budget friendly", "Low maintenance", "Daily commute"],
    specs_bn: ["১১৫ সিসি ইঞ্জিন", "বাজেট ফ্রেন্ডলি", "কম রক্ষণাবেক্ষণ", "দৈনন্দিন যাতায়াত"]
  },
  {
    name_en: "Hero Splendor Plus",
    name_bn: "হিরো স্প্লেন্ডর প্লাস",
    brand: "Hero",
    type: "Commuter",
    engine: "97 cc",
    condition: "Used - Good",
    image: "",
    available: false,
    specs_en: ["97 cc engine", "Very high mileage", "Lightweight", "Easy to ride"],
    specs_bn: ["৯৭ সিসি ইঞ্জিন", "খুব বেশি মাইলেজ", "হালকা ওজন", "চালাতে সহজ"]
  }
];
