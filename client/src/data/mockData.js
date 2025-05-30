// Mock Data for Events and Content
export const mockEvents = [
    {
        id: "e1",
        title: "Future of AI in Business Webinar",
        shortDescription:
            "Explore the latest AI trends and their impact on various industries.",
        description:
            "Join our experts for an insightful webinar on the transformative power of Artificial Intelligence in modern business. We will cover topics such as machine learning applications, ethical AI, and future predictions.",
        date: "2025-07-15",
        time: "10:00 AM AEST",
        locationType: "Online",
        locationDetails: "https://zoom.us/j/1234567890",
        registrationLink: "#", // Placeholder for actual registration form
        status: "Upcoming",
        imageUrl: "https://placehold.co/600x300/AEC6CF/FFFFFF?text=AI+Webinar",
        category: "Webinar",
        speakers: [
            {
                name: "Dr. Emily Chen",
                title: "Chief AI Scientist",
                company: "Tech Innovators Inc.",
                bio: "Dr. Chen leads cutting-edge AI research.",
                profilePic:
                    "https://placehold.co/100x100/AEC6CF/FFFFFF?text=EC",
            },
            {
                name: "Mr. David Lee",
                title: "Head of Data Science",
                company: "Global Analytics",
                bio: "Mr. Lee specializes in big data and machine learning.",
                profilePic:
                    "https://placehold.co/100x100/AEC6CF/FFFFFF?text=DL",
            },
        ],
        agenda: [
            { time: "10:00", topic: "Opening Remarks & AI Overview" },
            { time: "10:30", topic: "Machine Learning in Practice" },
            { time: "11:15", topic: "Ethical Considerations of AI" },
            { time: "11:45", topic: "Q&A Session" },
        ],
    },
    {
        id: "e2",
        title: "Exclusive Customer Dinner: Sydney",
        shortDescription:
            "An evening of networking and insights with industry leaders.",
        description:
            "Our annual exclusive dinner for valued customers. Enjoy fine dining, network with peers, and gain insights from a keynote address by our CEO on industry trends.",
        date: "2025-08-22",
        time: "07:00 PM AEST",
        locationType: "Offline",
        locationDetails: "The Grand Ballroom, 123 Event Street, Sydney, NSW",
        registrationLink: "#",
        status: "Upcoming",
        imageUrl:
            "https://placehold.co/600x300/FFD700/000000?text=Customer+Dinner",
        category: "Customer Dinner",
        speakers: [
            {
                name: "Ms. Sarah Wong",
                title: "CEO",
                company: "Our Company",
                bio: "Ms. Wong is a visionary leader in the tech industry.",
                profilePic:
                    "https://placehold.co/100x100/FFD700/000000?text=SW",
            },
        ],
        agenda: [
            { time: "19:00", topic: "Welcome Reception" },
            { time: "19:30", topic: "Dinner Service" },
            { time: "20:30", topic: "Keynote Address: The Road Ahead" },
            { time: "21:00", topic: "Networking & Dessert" },
        ],
    },
    {
        id: "e3",
        title: "Global Tech Expo 2025",
        shortDescription:
            "Visit our booth at the leading technology trade show.",
        description:
            "We are excited to exhibit at the Global Tech Expo, showcasing our latest innovations and solutions. Visit our booth for live demos, expert consultations, and exclusive giveaways.",
        date: "2025-09-01",
        time: "09:00 AM AEST",
        locationType: "Offline",
        locationDetails:
            "Booth #A10, Sydney Convention Centre, Darling Harbour",
        registrationLink: "#",
        status: "Upcoming",
        imageUrl: "https://placehold.co/600x300/ADD8E6/000000?text=Tech+Expo",
        category: "Trade Show",
        speakers: [],
        agenda: [
            { time: "09:00", topic: "Exhibition Opens" },
            { time: "11:00", topic: "Product Demo: Innovation XYZ" },
            { time: "14:00", topic: "Expert Panel: Future of Connectivity" },
            { time: "17:00", topic: "Exhibition Closes" },
        ],
    },
    {
        id: "e4",
        title: "Digital Marketing Masterclass",
        shortDescription:
            "Learn advanced strategies for digital marketing success.",
        description:
            "A comprehensive masterclass covering SEO, SEM, social media marketing, and content strategy. Designed for marketing professionals looking to elevate their skills.",
        date: "2025-06-20",
        time: "02:00 PM AEST",
        locationType: "Online",
        locationDetails: "https://webinar.example.com/marketing",
        registrationLink: "#",
        status: "Past",
        imageUrl:
            "https://placehold.co/600x300/DDA0DD/FFFFFF?text=Digital+Marketing",
        category: "Webinar",
        speakers: [
            {
                name: "Ms. Jessica Chen",
                title: "Marketing Director",
                company: "Brand Growth Agency",
                bio: "Ms. Chen is an award-winning digital marketer.",
                profilePic:
                    "https://placehold.co/100x100/DDA0DD/FFFFFF?text=JC",
            },
        ],
        agenda: [
            { time: "14:00", topic: "Introduction to Digital Marketing" },
            { time: "14:45", topic: "SEO & SEM Deep Dive" },
            { time: "15:30", topic: "Social Media & Content Strategy" },
            { time: "16:15", topic: "Q&A and Wrap-up" },
        ],
    },
];

export const mockContent = [
    {
        id: "c1",
        title: "AI in Business Webinar Recording",
        description:
            'Full recording of the "Future of AI in Business Webinar" held on July 15, 2025.',
        type: "Video Recording",
        associatedEventId: "e1",
        fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
        thumbnailUrl:
            "https://placehold.co/300x200/AEC6CF/FFFFFF?text=AI+Video",
        uploadDate: "2025-07-16",
        tags: ["AI", "Webinar", "Technology"],
    },
    {
        id: "c2",
        title: "AI in Business Webinar Slides",
        description:
            'Downloadable slides from the "Future of AI in Business Webinar".',
        type: "Presentation Slides",
        associatedEventId: "e1",
        fileUrl: "https://www.africau.edu/images/default/sample.pdf", // Example PDF URL
        thumbnailUrl:
            "https://placehold.co/300x200/AEC6CF/FFFFFF?text=AI+Slides",
        uploadDate: "2025-07-16",
        tags: ["AI", "Webinar", "Technology", "Slides"],
    },
    {
        id: "c3",
        title: "Keynote: The Road Ahead (Customer Dinner)",
        description:
            "Keynote address by Ms. Sarah Wong from the Exclusive Customer Dinner.",
        type: "Video Recording",
        associatedEventId: "e2",
        fileUrl: "https://www.w3schools.com/html/movie.mp4", // Example video URL
        thumbnailUrl:
            "https://placehold.co/300x200/FFD700/000000?text=Keynote+Video",
        uploadDate: "2025-08-23",
        tags: ["Keynote", "Customer Dinner", "Leadership"],
    },
    {
        id: "c4",
        title: "Digital Marketing Masterclass Slides",
        description:
            "Presentation slides from the Digital Marketing Masterclass held on June 20, 2025.",
        type: "Presentation Slides",
        associatedEventId: "e4",
        fileUrl: "https://www.africau.edu/images/default/sample.pdf", // Example PDF URL
        thumbnailUrl:
            "https://placehold.co/300x200/DDA0DD/FFFFFF?text=Marketing+Slides",
        uploadDate: "2025-06-21",
        tags: ["Marketing", "Webinar", "Slides"],
    },
    {
        id: "c5",
        title: "Product Demo: Innovation XYZ",
        description:
            "A short video demonstrating the features of our new product, Innovation XYZ, showcased at the Global Tech Expo.",
        type: "Video Recording",
        associatedEventId: "e3",
        fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
        thumbnailUrl:
            "https://placehold.co/300x200/ADD8E6/000000?text=Product+Demo",
        uploadDate: "2025-09-02",
        tags: ["Product", "Demo", "Tech Expo"],
    },
];
