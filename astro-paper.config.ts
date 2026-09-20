import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://thatstheworst.com/",
    title: "thatstheworst.com",
    description: "Links, videos and assorted nonsense. Archived from Tumblr, 2004 onward.",
    author: "Seth Mason",
    profile: "https://thatstheworst.com/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "America/Toronto",
    dir: "ltr",
  },
  posts: {
    perPage: 10,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [],
  shareLinks: [],
});
