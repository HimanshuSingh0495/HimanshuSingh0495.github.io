// Content for every app's website. Privacy facts come from each app's code (2026-10-02):
// permissions in Info.plist, frameworks used, and network hosts. Keep them in step with the apps.

export const developer = "Himanshu Singh";
export const supportBase = "duoapps.support";
export const effective = "2 October 2026";
export const supportEmail = (slug) => `${supportBase}+${slug}@gmail.com`;

const onDevice =
  "Everything you create in the app is stored on your iPhone, inside the app. It is removed when you delete the app.";
const noCollect = [
  "We don't collect any personal data. We don't run servers for this app, so nothing you enter is sent to us.",
  "No accounts, no ads, no analytics, no tracking across apps or websites, and nothing is sold or shared.",
];

export const apps = [
  {
    slug: "duonight",
    name: "DuoNight",
    accent: "#B83A63",
    line: "A date-night ritual for two, played face to face on one phone.",
    about: [
      "Stand the phone between you and each of you gets your own side of the screen: questions, guesses and little games that are about the two of you, not the phone.",
      "On any iPhone it works flat on the table, passed back and forth.",
    ],
    privacy: [
      ["What the app stores", [onDevice, "That includes your answers, your names as you typed them, and your history of past nights."]],
      ["What we collect", noCollect],
    ],
    faq: [
      ["How do we use tent mode?", "Open Settings and choose Tent. The far half of the screen turns to face the other person."],
      ["How do we clear our history?", "Delete the app. All of its data is on your phone and goes with it."],
    ],
    terms: [],
  },
  {
    slug: "duo-mentalism",
    name: "Duo Mentalism Kit",
    accent: "#6A4CC0",
    line: "Close-up mentalism effects where the phone keeps the performer's secret.",
    about: [
      "The spectator sees an ordinary app on their side of the table. Your side quietly shows what you need to know to finish the effect.",
      "Built for working mentalists and keen hobbyists performing for small groups.",
    ],
    privacy: [
      ["What the app stores", [onDevice, "That includes your effect settings and routines. The app plays sounds but never uses the microphone."]],
      ["What we collect", noCollect],
    ],
    faq: [
      ["The spectator's side is upside down", "That's tent mode. If you're using the phone flat, switch to Flat in Settings."],
      ["Can I change the forced choices?", "Yes. Each effect has its own settings, reachable from the performer's side."],
    ],
    terms: ["Duo Mentalism Kit is for entertainment. The effects are tricks and the app makes no claim of real mind reading."],
  },
  {
    slug: "tarot-table",
    name: "Tarot Table",
    accent: "#8C6A12",
    line: "A reading table for professional tarot readers and the person across from them.",
    about: [
      "Your client sees the shuffle, the cut and each card turning over. You see positions, meanings and notes on your own side.",
      "Keep client records and past readings in one place, and send your own payment link when the reading is done.",
    ],
    privacy: [
      ["What the app stores", [onDevice, "That includes client names and notes, and readings you save."]],
      ["iCloud", ["If you turn on iCloud sync, your clients and readings are also stored in your own private iCloud account so they appear on your other devices. That data is held by Apple under Apple's privacy policy. We can't see it."]],
      ["Payment links", ["If you add a Stripe payment link, the app opens it in the browser so your client can pay you. The payment happens between your client and Stripe; nothing about it is sent to us."]],
      ["What we collect", noCollect],
    ],
    faq: [
      ["My clients don't appear on my iPad", "Check that iCloud sync is on in the app's Settings and that both devices use the same Apple Account."],
      ["How do I delete a client?", "Open the client and choose Delete client. If iCloud sync is on, it's removed from your other devices too."],
    ],
    terms: ["Tarot Table is a tool for readers. Readings are for entertainment and reflection, not medical, legal or financial advice. Payments you take from clients are between you and them."],
  },
  {
    slug: "duospeak",
    name: "DuoSpeak",
    accent: "#16766A",
    line: "Articulation practice for speech therapy sessions, with the scoring kept on the clinician's side.",
    about: [
      "The client sees a large picture, the word and a model recording, and can record and play back their own attempt. The clinician scores, counts and keeps notes on the other side, out of view.",
      "Made for speech-language pathologists in private practice, and for parents practising at home between sessions.",
    ],
    privacy: [
      ["What the app stores", [onDevice, "That includes client profiles, session scores, notes and practice recordings."]],
      ["Microphone and recordings", ["The app uses the microphone only when you tap record. Recordings stay on your iPhone and are never uploaded, including when iCloud sync is on."]],
      ["iCloud", ["If iCloud sync is turned on, client profiles, scores and notes (not recordings) are stored in your own private iCloud account, held by Apple under Apple's privacy policy. We can't see it."]],
      ["What we collect", noCollect],
      ["Children", ["DuoSpeak is used by adults (clinicians and parents) with the people they work with, who may be children. Children don't create accounts and no data leaves the device for us. If you're a clinician, you remain responsible for client records under the rules that apply to your practice."]],
    ],
    faq: [
      ["Recording doesn't start", "Allow microphone access in Settings › Privacy & Security › Microphone › DuoSpeak."],
      ["How do I delete a client's data?", "In the client list, swipe left on the client and tap Delete. Their sessions, scores and kept recordings are removed from the phone."],
    ],
    terms: ["DuoSpeak supports therapy practice. It doesn't diagnose or treat anything and is not a substitute for a qualified speech-language pathologist."],
  },
  {
    slug: "listing-table",
    name: "Listing Table",
    accent: "#2D5BA6",
    line: "A listing presentation that sits on the seller's kitchen table.",
    about: [
      "The seller's side shows the home's photos, nearby sales, a net proceeds sheet they can touch, and your marketing plan. Your side shows talk tracks, objection cards and commission scenarios they never see.",
      "When they're ready, send the listing agreement for e-signature before you leave.",
    ],
    privacy: [
      ["What the app stores", [onDevice, "That includes presentations, seller names and contact details you enter, comparable sales, and photos you pick. The app only sees the photos you choose."]],
      ["iCloud and share links", ["If you turn on iCloud, presentations are stored in your own private iCloud account. If you create a leave-behind link, anyone with that link can view that presentation, read-only. Only share it with the seller. This is held by Apple under Apple's privacy policy. We can't see it."]],
      ["DocuSign", ["If you connect DocuSign, the agreement, the seller's name and email are sent to DocuSign to collect the signature, under DocuSign's privacy policy. You sign in to DocuSign directly; we never see your DocuSign password."]],
      ["What we collect", noCollect],
    ],
    faq: [
      ["The seller's side is upside down", "That's tent mode. If you're presenting with the phone flat, choose Flat in Settings."],
      ["Can I leave a PDF instead of a link?", "Yes. In the leave-behind, choose Share PDF instead of Create Share Link."],
    ],
    terms: ["Figures in the net sheet and comparable sales are estimates you enter or adjust. They are not an appraisal and not legal, tax or financial advice. You're responsible for following your brokerage's and your market's rules, and for the agreement wording you send."],
  },
  {
    slug: "boothlead",
    name: "BoothLead Duo",
    accent: "#0E7590",
    line: "Trade-show lead capture where visitors fill in their own details and your notes stay private.",
    about: [
      "Visitors type their details and give consent on their side. You scan badges, score the lead and dictate notes on yours.",
      "Sign in to share leads with your team and send them to your CRM.",
    ],
    privacy: [
      ["Who this applies to", ["BoothLead Duo is used by exhibitors (\"you\") to collect the contact details of trade-show visitors. This policy covers both."]],
      ["What the app stores", ["Visitor contact details (name, email, phone, company, job title), each visitor's consent record (what they agreed to, when, and which wording), and your private notes and scores. Badge photos are read on the phone with Apple's on-device text recognition and are never uploaded.", "The camera is used only to scan badges and QR codes. The microphone and speech recognition are used only when you dictate a note."]],
      ["Accounts", ["Signing in is optional; capturing leads works without it. If you sign in (Sign in with Apple or an email code), we store your name, email and team memberships so your team can share leads."]],
      ["Where data goes", ["Leads are stored on your phone and, when you're signed in, on our server (Cloudflare) so your team can see them, so they can be sent to your CRM (HubSpot) if you connect it, and so follow-up emails or texts you ask for can be sent (Resend for email, Twilio for SMS). Each of those providers handles data under its own privacy policy.", "We don't sell data, show ads or track anyone across apps. Usage figures are counts only, such as leads per event, and contain no personal data."]],
      ["Retention", ["Leads are deleted automatically a set time after the event ends: 90 days by default, and you can change it. Deletion happens on the phone and on our server."]],
      ["Deleting data", ["Visitors can ask the exhibitor who collected their details to delete them. The exhibitor does this in Settings › Data › Delete a visitor's data, which removes it from the phone, our server and HubSpot. Visitors can also email us and we'll pass the request on.", "You can delete your account in Settings › Account › Delete account."]],
    ],
    faq: [
      ["Leads aren't syncing", "Look at the status line in the rep console. \"Sign in to sync\" means you're not signed in; \"Failed to sync\" has a Retry now button."],
      ["The visitor's side is upside down", "That's tent mode. If you're using the phone flat, choose Flat in Settings › Manual tent mode."],
      ["How do I delete a visitor's data?", "Settings › Data › Delete a visitor's data."],
      ["How do I delete my account?", "Settings › Account › Delete account."],
    ],
    terms: ["You're responsible for having a lawful basis to contact the visitors you capture and for honouring their requests. Follow-up messages are sent on your behalf and on your instruction."],
  },
  {
    slug: "duoboard",
    name: "DuoBoard",
    accent: "#7A5537",
    line: "Mood boards for interior designers, presented across the table with your costs out of sight.",
    about: [
      "Your client sees the room, the finishes and the client price, and can approve items and sign. You see vendor costs, margins and your checklist on your side.",
      "Turn an approved board into a proposal PDF in a few taps.",
    ],
    privacy: [
      ["What the app stores", [onDevice, "That includes boards, client names, prices and costs, proposals, signatures and photos. The camera is used only when you take a photo for a board, and the app only sees library photos you choose."]],
      ["iCloud", ["If iCloud sync is turned on, your boards are also stored in your own private iCloud account, held by Apple under Apple's privacy policy. We can't see it."]],
      ["What we collect", noCollect],
    ],
    faq: [
      ["Can my client see my costs?", "No. The client's side only ever receives client prices. Costs and margins appear only on your side."],
      ["How do I share a proposal?", "Open the proposal and choose Share PDF."],
    ],
    terms: ["Prices, costs and proposals are the figures you enter. You're responsible for the agreements you make with your clients."],
  },
  {
    slug: "snaptable",
    name: "SnapTable",
    accent: "#2B7F3C",
    line: "A fast two-player card battler for one phone and two people across a table.",
    about: [
      "Each of you plays from your own side of the screen, hidden from the other. Bluff, raise the stakes or fold.",
      "Practise against the computer, build your own decks and unlock new card backs and tables as you play.",
    ],
    privacy: [
      ["What the app stores", [onDevice, "That includes your decks, match history and unlocked cosmetics."]],
      ["What we collect", noCollect],
    ],
    faq: [
      ["Can we play on two phones?", "Not yet. SnapTable is designed for one phone shared across a table."],
      ["Where did my decks go?", "Decks are stored on the phone. Deleting the app deletes them."],
    ],
    terms: ["Cards, art and rules are original to SnapTable."],
  },
];
