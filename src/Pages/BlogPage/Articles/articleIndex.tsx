
/* Types */
import { BlogPost } from "@Types";

/* Mock Data */
export const mockPosts: BlogPost[] = [
    {
        title: "Day One",
        date: "2025-08-09",
        summary: "This is my first blog post.",
        image: "https://picsum.photos/200/300",
        tags: ["React", "TypeScript", "Markdown", "About Me"],
        slug: "day-one",
    },
    {
        image: "https://picsum.photos/200/300",
        title: "The Endless Hallway",
        summary: "Fluorescent lights hum overhead as we walk through corridors that seem to stretch beyond reason."
    },
    {
        image: "https://picsum.photos/200/301",
        title: "Empty Swimming Pool",
        summary: "The blue tiles reflect nothing but shadows in a space meant for joy, now holding only silence."
    },
    {
        image: "https://picsum.photos/200/302",
        title: "Between Floors",
        summary: "Stairwells that connect to nowhere, where footsteps echo in impossible acoustics."
    },
    {
        image: "https://picsum.photos/200/304",
        title: "The Waiting Room",
        summary: "Beige walls and outdated magazines in a place where time seems suspended indefinitely."
    },
    {
        image: "https://picsum.photos/200/305",
        title: "Parking Garage Level B",
        summary: "Concrete pillars extend into darkness, where every corner looks exactly the same."
    },
    {
        image: "https://picsum.photos/200/306",
        title: "After Hours Mall",
        summary: "Empty storefronts with grates pulled down, escalators running to serve no one."
    }
];

/* Articles Array */
const articles: BlogPost[] = [
    {
        title: "Day One",
        date: "2025-08-09",
        summary: "This is my first blog post.",
        image: "https://picsum.photos/200/300",
        // content: article080925,
        tags: ["React", "TypeScript", "Markdown", "About Me"],
        slug: "day-one",
    }
];

// TODO: Eventually convert this file to index.ts and adjust alias 
// so it's import articles from '@Articles'
export default articles;