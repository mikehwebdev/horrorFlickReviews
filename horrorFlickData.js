
{/* Main flick database use for pre-existing Mikey flick reviews */}

const horrorFlicksData = [
  // Unique identifier for the movie
        //title: "String",      // Movie title
        //rating: Number,               // Mikey's rating (1-5 knives)
        //subHeader: "String",        // Movie/user tagline
        //reviewText: "String",       // Mikey's/user review text
        //imdbLink: "String",         // Link to external site (IMDB)
        //imdbId: "tt0084787",     // IMDb ID for fetching OMDb data
        //userReview: false,       // Indicates a user review for conditional rendering
        //clicked: false           // For condionally rendering modal

    {
        id:0,
        title:"The Thing",
        rating:5,
        subHeader:"Man is the warmest place to hide",
        reviewText: "Possibly John Carpenter's finest film and definitely the best body horror film ever  - The Thing should be on the the top ten list of any horror fan. With a magnificent soundtrack written by Ennio Morricone (of The Good, The Bad and The Ugly fame) and terrifyingly gruesome effects work by Rob Bottin The Thing should always be the first on the list for any horror themed movie night.",
        imdbLink: "https://www.imdb.com/title/tt0084787/",
        imdbId:"tt0084787",
        userReview:false,
        clicked: false
    },
    {
        id:1,
        title:"It Follows",
        rating:4,
        subHeader:"It doesn't think. It doesn't feel. It doesn't give up",
        reviewText: "For me It Follows is probably the best horror film of the 2010s.  With a totally unique premise monster, breathtaking camera work and for me the best jump scare ever, It Follows is an underappreciated gem. If you haven't seen it stop reading and do so now. ",
        imdbLink: "https://www.imdb.com/title/tt3235888/?ref_=fn_al_tt_1",
        imdbId:"tt3235888",
        userReview:false,
        clicked: false
    },
    {
        id:2,
        title:"Evil Dead (2013)",
        rating:4,
        subHeader:"Fear What You Will Become",
        reviewText: "Given the impossible task of rebooting a beloved horror franchise, Fede Álvarez absolutely smashed it for his feature film debut. Breathing fresh life into the fabulously grotesque corpse of the Evil Dead series, Fede made it his own and did the almost impossible. The final act feels a little weak but only because the first two are horrifying beyond words (in a good way). If you love 80's horror and the most realistic make up and effects work I've ever seen, give it a watch. ",
        imdbLink: "https://www.imdb.com/title/tt1288558/?ref_=fn_al_tt_2",
        imdbId:"tt1288558",
        userReview:false,
        clicked: false
    },
    {
        id:3,
        title:"The Fly",
        rating:5,
        subHeader:"Be afraid. Be very afraid",
        reviewText: "The Fly. Peerless horror from the endlessly talented David Cronenberg. My favourite horror film of my teenage years, with excellent performances of Jeff Goldblum and Geena Davies, I'm amazed by how small the cast  is for a film that feels so much larger. With a technical but relatively simple story, The Fly gets into the action and doesn't let you go until Seth Brundle's terrifying and sad conclusion. ",
        imdbLink: "https://www.imdb.com/title/tt0091064/?ref_=fn_al_tt_2",
        imdbId:"tt0091064",
        userReview:false,
        clicked: false
    },
    {
        id:4,
        title:"Midsommar",
        rating:4,
        subHeader:"Let the festivities begin",
        reviewText: "I hadn't heard anything about Midsommar before watching it and, oh my, am I glad. A suite of superb performances by it's young cast, a wonderfully unpredictable story (so rare for Hollywood) and a genuinely sad and uncomfortable watch this is probably the most layered and complex film on this list. Too much so? Maybe. It does suffer a little from “I need to Google this because there are bits I missed” but it does have a fascinating rabbit hole like quality to its internet community that can take you to some wonderfully terrifying places.",
        imdbLink: "https://www.imdb.com/title/tt8772262/?ref_=fn_al_tt_1",
        imdbId:"tt8772262",
        userReview:false,
        clicked: false
    }, 
    {
        id:5,
        title:"Hereditary",
        rating:5,
        subHeader:"Evil runs in the family.",
        reviewText: "Oh. My. God. Beautifully directed. Incredibly written. Some of the finest acting of all time, and certainly the best and most heart wrenching monologue I've ever seen delivered by Toni Collete, Hereditary is not only one of the finest horror films ever but one of the best family dramas. Ari Aster managing to weave the two genres together is nothing short of miraculous. It's s shame the horror element would put some off as this is on of the finest films ever made. Everyone should watch it.",
        imdbLink: "https://www.imdb.com/title/tt7784604/?ref_=fn_al_tt_1",
        imdbId:"tt7784604",
        userReview:false,
        clicked: false
    }, 
    {
        id:6,
        title:"Alien",
        rating:5,
        subHeader:"In space no one can hear you scream.",
        reviewText: "What can I say? Alien - the daddy of sci-fi horror. Ridley Scott created one of the best films ever, inspiring generations of film makers, comic writers, video game developers, screen writers and make up artists. The industry wouldn't be the same without his film, Sigourney Weaver's performance, and HR Gigers peerless design. It's DNA permeates the entire industry and has huge and continuing influence even half a century later. I'd been a horror and film fan my whole life, but at 13 years old, sitting up at 1am watching Alien with my best friend on his tiny little CRT, drinking ciders pinched from the kitchen and my LOVE for film was born. The best film ever. ",
        imdbLink: "https://www.imdb.com/title/tt0078748/?ref_=nv_sr_srsg_4_tt_7_nm_0_in_0_q_alien",
        imdbId:"tt0078748",
        userReview:false,
        clicked: false
    },  
    {
        id:7,
        title:"The Witch",
        rating:4,
        subHeader:"Evil Takes Many Forms.",
        reviewText:"Seldom does a film drawn you in like The Witch. With superb performances, a stellar cast, mystery and most importantly a growing sense of dread means The Witch truly is a modern classic and should be on any horror fans favourite list.",
        imdbLink:"https://www.imdb.com/title/tt4263482/",
        imdbId:"tt4263482",
        userReview:false,
        clicked: false
    }, 
    {
        id:8,
        title: "The Lighthouse",
        rating:5,
        subHeader:"Keeping secrets, are ye?",
        reviewText:"When people ask you why no-one makes proper films anymore , point them at The Lighthouse. Haunting sound design, 2nd to none cinematography, superb mystery, peerless acting from both leads and a haunting diorama feel to the entire film leaves The Lighhouse almost in a category of its own. A classic.",
        imdbLink:"https://www.imdb.com/title/tt7984734/",
        imdbId:'tt7984734',
        userReview:false,
        clicked: false
    },
    {
        id: 9,
        title:"Poltergeist",
        rating:4,
        subHeader: "They're here!",
        reviewText: "Probably the first horror film I ever saw at about 6 years old (#80sParenting) this film holds a special place in my heart. While it doesn't really hold up through a modern lens for me this is still a classic with many of my childhood sleepless nights featuring toy clowns come to life, trees coming to drag me away and haunted TVs come to life.",
        imdbLink:"https://www.imdb.com/title/tt0084516/",
        imdbId:'tt0084516',
        userReview:false,
        clicked: false
    },
    {
        id: 10,
        title:"The Babadook",
        rating:5,
        subHeader: "Don't let it in",
        reviewText: "A beautiful depiction and exploration of depression through a haunting/monster tale The Babadook deserves every plaudit it has gained. Wondeful tension building, incredible and heart wrenching performances and even, surprisingly, a well woven and cohesive ending. A must-watch.",
        imdbLink:"https://www.imdb.com/title/tt2321549/",
        imdbId:'tt2321549',
        userReview:false,
        clicked: false
    },
]

export {horrorFlicksData}