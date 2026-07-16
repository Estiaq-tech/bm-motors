/* =====================================================================
   BM MOTORS — BIKE LIST
   ---------------------------------------------------------------------
   HOW TO EDIT (add / delete / change a bike):

   • Each bike is one { ... } block, separated by commas.
   • TO ADD a bike: copy one block, paste it, change the details.
   • TO DELETE a bike: remove its whole { ... } block (and its comma).
   • Do NOT remove the square brackets [ ] or the "const BIKES =" line.

   THE FIELDS
   ----------
   • photos:  a LIST of photo files, inside [ ] and separated by commas.
              Put the photo files in the "images" folder first, then:
                photos: ["images/bike1.jpg", "images/bike1-side.jpg"]
              - The FIRST photo is the one shown on the bike's card.
              - Add as many as you like; customers swipe through them
                in the Details popup with the ‹ › arrows.
              - Only one photo? Just write one:  photos: ["images/x.jpg"]
              - No photos yet? Write:            photos: []
   • price:   OPTIONAL. e.g. "৳ 1,85,000" or "৳ 1,85,000 (negotiable)".
              - Write a price and it is shown on the bike's card.
              - Leave it EMPTY ("") and the card instead says
                "Contact for price" — the customer must message you.
              You can price some bikes and leave others blank.
     price_bn: the same price in Bangla digits, e.g. "৳ ১,৮৫,০০০".
              Optional — if empty, the English price is used for both.
   • year:    model/registration year, e.g. "2019".  "" hides it.
   • mileage: how far a used bike has run, e.g. "18,500 km".  "" hides it.
   • owner:   e.g. "1st owner", "2nd owner".  "" hides it.
     owner_bn: the same in Bangla, e.g. "১ম মালিক". Optional.
   • note:    OPTIONAL yellow highlight box for papers / registration
              status, e.g. "On test showroom paper", "Papers up to date".
              Leave "" to hide it.
     note_bn: the same in Bangla. Optional.
   • condition: free text. "New", "Used - Excellent",
              "Used - Good", "Used - Fair".
   • available: true = shown as In stock, false = shown as Sold.
   ===================================================================== */

const BIKES = [
  {
    name_en: "FZs V4",
    name_bn: "এফজেডএস ভি৪",
    brand: "Suzuki",
    engine: "149 cc",
    condition: "Used - Excellent",
    photos: ["images/YamahaFZsV4.jpeg","images/fzs2.jpeg","images/fzs3.jpeg","images/fzs4.jpeg","images/fzs5.jpeg"],
    price: "",
    price_bn: "",
    year: "2025",
    mileage: "14,000 km",
    owner: "1st owner",
    owner_bn: "১ম মালিক",
    note: "",
    note_bn: "",
    available: true,
    specs_en: ["149 cc engine", "Electric & kick start", "Disc brake (front)", "Great mileage"],
    specs_bn: ["১৪৯ সিসি ইঞ্জিন", "ইলেকট্রিক ও কিক স্টার্ট", "ডিস্ক ব্রেক (সামনে)", "ভালো মাইলেজ"]
  },
  {
    name_en: "Gixer Fi ABS Naked",
    name_bn: "জিক্সার এফআই এবিএস",
    brand: "Suzuki",
    engine: "150 cc",
    condition: "New",
    photos: [
      "images/gixerfiabs.jpeg",
      "images/gixer2.jpeg",
      "images/gixer3.jpeg",
      "images/gixer4.jpeg",
      "images/gixer5.jpeg",
      "images/gixer6.jpeg"
    ],
    price: "৳ 1,85,000",
    price_bn: "৳ ১,৮৫,০০০",
    year: "2022",
    mileage: "34,000 km",
    owner: "On test",
    owner_bn: "অন টেস্ট",
    note: "On test showroom paper",
    note_bn: "অন টেস্ট শোরুম পেপার",
    available: true,
    specs_en: ["150 cc engine", "Fuel injection & ABS", "Smooth & reliable", "Comfortable ride"],
    specs_bn: ["১৫০ সিসি ইঞ্জিন", "ফুয়েল ইনজেকশন ও এবিএস", "স্মুথ ও নির্ভরযোগ্য", "আরামদায়ক রাইড"]
  }
];
