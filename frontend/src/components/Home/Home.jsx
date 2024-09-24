import React from 'react'
import { DollarSign, Filter, Menu, Moon, Star, X, Zap } from 'lucide-react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionActions from '@mui/material/AccordionActions';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Cards 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import '../../App.css'

export function Home() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const teamMembers = [
        {
            name: 'Jayesh Rajput',
            designation: 'Founder of AgriEquip',
            image: 'https://media-bom1-2.cdn.whatsapp.net/v/t61.24694-24/420862050_1362164814470519_1278959819118659038_n.jpg?ccb=11-4&oh=01_Q5AaIIfapDnQ-7iEjdl_96xsFR9MDdTY2gm67EcCEC4UKEQq&oe=66DEFB5B&_nc_sid=5e03e0&_nc_cat=104',
        },
        {
            name: 'Deadpool',
            designation: 'Product Manager',
            image: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/02/deadpool-wolverine-ryan-reynolds1.jpg',
        },
        {
            name: 'Bruce Wayne',
            designation: 'Co-founder of AgriEquip',
            image: 'https://th.bing.com/th/id/OIP.XEwcrkV2c47AAeQaQ4NNHQHaEK?rs=1&pid=ImgDetMain',
        },
    ];

    const data = [
        {
            image: "https://images.pexels.com/photos/27420262/pexels-photo-27420262/free-photo-of-mahdrescher-ernten-weizen.jpeg?auto=compress&cs=tinysrgb&w=600",
            heading: "Combine Harvester",
            description: "A combine harvester is a versatile machine used for harvesting grain crops. It combines the tasks of reaping, threshing, and winnowing into one process.",
        },
        {
            image: "https://images.pexels.com/photos/12612082/pexels-photo-12612082.jpeg?auto=compress&cs=tinysrgb&w=600",
            heading: "Plow",
            description: "A plow is an agricultural tool used for tilling the soil, turning it over, and preparing it for planting crops. It's essential for breaking up and loosening the soil.",
        },
        {
            image: "https://images.pexels.com/photos/2253413/pexels-photo-2253413.jpeg?auto=compress&cs=tinysrgb&w=600",
            heading: "Seed Drill",
            description: "A seed drill is a device that plants seeds at a consistent depth and spacing. It ensures efficient planting and improves crop yields. and having a agriculture experience",
        },
        {
            image: "https://images.pexels.com/photos/20280081/pexels-photo-20280081/free-photo-of-nawozenie-roslin-na-polu.jpeg?auto=compress&cs=tinysrgb&w=600",
            heading: "Sprayer",
            description: "A sprayer is used to apply herbicides, pesticides, or fertilizers to crops. It helps in managing pests and ensuring the health of plants.",
        },
    ];

    return (
        <div className="w-full mt-14 px-6">
            {/* Hero Section */}
            <div className="relative w-full bg-white" id='home'>
                <div className="mx-auto max-w-7xl lg:px-8">
                    <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
                        <div className="mt-10 flex max-w-max items-center space-x-2 rounded-full border p-2 bg-green-50">
                            <p className="text-xs font-medium md:text-sm">
                                Transforming Agriculture, Empowering Farmers.
                                <span className="ml-2 cursor-pointer font-bold">Join us &rarr;</span>
                            </p>
                        </div>
                        <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
                            Affordable Equipment, Accessible to Every Farmer.
                        </h1>
                        <p className="mt-8 max-w-3xl text-lg text-gray-700">
                            Breaking down financial barriers, ensuring that even the smallest farms have access to the tools they need to thrive. We bring the power of modern agriculture within reach, so every farmer can cultivate success, regardless of their budget.
                        </p>
                        <div className="mt-8">
                            <button
                                type="button"
                                className="rounded-md bg-green-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <div className="rounded-lg px-4">
                        <div className="relative h-[500px] overflow-hidden rounded-lg">
                            <img
                                className="absolute inset-0 w-full h-full rounded-lg bg-gray-50 object-cover animate-fade-in-out"
                                // src="https://media3.giphy.com/media/USVgVUitCduCP9DjKo/giphy.gif"
                                src="https://www.sfwmd.gov/sites/default/files/documents/030302_bmp_agric_ani.gif"
                                alt="Image 1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Rental Equiments  */}
            <div className="mx-auto max-w-7xl px-4 mt-12" id='rental'>
                <div className="max-w-max rounded-full border bg-green-50 p-1 px-3 my-5">
                    <p className="text-xs font-semibold leading-normal md:text-sm">Rental Equiments</p>
                </div>
                <p className="text-3xl font-bold text-gray-900 md:text-3xl md:leading-10">
                    Rental Equiments for Agricultures
                </p>
            </div>
            <div className="flex overflow-x-auto scroll-smooth gap-4 p-4 mx-auto max-w-7xl px-4 mt-4">
                {data.map((item, index) => (
                    <Card key={index} className="max-w-xs flex-shrink-0">
                        <CardMedia
                            component="img"
                            alt={item.heading}
                            height="140"
                            image={item.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.heading}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {item.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Add to cart</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
            {/* Contact us */}
            <div className="mx-auto max-w-7xl mt-10 px-4" id='contact'>
                <div className="flex items-center content-around flex-wrap">
                    <div className="flex items-center justify-center mb-5">
                        <div className="px-2 md:px-12">
                            <p className="text-2xl font-bold text-gray-900 md:text-4xl">Get in touch</p>
                            <p className="mt-4 text-lg text-gray-600">
                                Our friendly team would love to hear from you.
                            </p>
                            <form action="" className="mt-8 space-y-4">
                                <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="first_name"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="first_name"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="last_name"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="last_name"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="grid w-full  items-center gap-1.5">
                                    <label
                                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                        type="text"
                                        id="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="grid w-full  items-center gap-1.5">
                                    <label
                                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="phone_number"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                        type="tel"
                                        id="phone_number"
                                        placeholder="Phone number"
                                    />
                                </div>
                                <div className="grid w-full  items-center gap-1.5">
                                    <label
                                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="message"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                        id="message"
                                        placeholder="Leave us a message"
                                        cols={3}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    <img
                        alt="Contact us"
                        className="max-h-full min-w-80 rounded-lg m-auto mt-1"
                        src="https://images.pexels.com/photos/5940091/pexels-photo-5940091.jpeg?auto=compress&cs=tinysrgb&w=600"
                    />
                </div>
            </div>
            {/* Newsletter  */}
            <div className="mx-auto my-12 max-w-7xl px-2 py-2 md:my-24 lg:my-32 lg:px-0" id='newsletter'>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                        <h2 className="text-3xl font-bold text-black">Sign up for our weekly newsletter</h2>
                        <p className="mt-4 text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc
                            commodo posuere et sit amet ligula.
                        </p>
                        <div className="mt-4">
                            <p className="font-semibold text-gray-800">
                                Trusted by over 100,000+ businesses and individuals <span className='text-green-600'>Farmer</span>
                            </p>
                            <div className="mt-2 flex items-center">
                                <div className="flex space-x-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="ml-2 inline-block">
                                    <span className="text-sm font-semibold text-gray-800">4.8/5 . 3420 Reviews</span>
                                </span>
                            </div>
                        </div>
                        <form className="mt-6">
                            <div className="flex w-full max-w-md flex-col space-y-4">
                                <input
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                ></input>
                                <button
                                    type="button"
                                    className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                        <p className="mt-2">
                            <span className="text-sm text-gray-600">
                                By signing up, you agree to our terms of service and privacy policy.
                            </span>
                        </p>
                    </div>
                    <div className="mt-10 w-full md:w-2/3 lg:mt-0 lg:w-1/2">
                        <img
                            className="h-full w-full rounded-md object-cover"
                            src="https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Newsletter"
                        />
                    </div>
                </div>
            </div>
            {/* FAQs */}
            <div className="mx-auto max-w-7xl px-4 mt-12" id='faq'>
                <div className="max-w-max rounded-full border bg-green-50 p-1 px-3 my-5">
                    <p className="text-xs font-semibold leading-normal md:text-sm">FAQ's</p>
                </div>
                <p className="text-3xl font-bold text-gray-900 md:text-3xl md:leading-10">
                    Frequently Asked Questions
                </p>
            </div>
            <div className='mx-auto max-w-7xl px-4 mt-12'>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        What types of agricultural equipment are available for rent?
                    </AccordionSummary>
                    <AccordionDetails>
                        We offer a wide range of equipment including tractors, harvesters, tillers, seeders, and irrigation systems, all available for rent at competitive rates.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        How can I book agricultural equipment online?
                    </AccordionSummary>
                    <AccordionDetails>
                        Booking is simple! Just browse through our equipment catalog, select the equipment you need, choose your rental duration, and complete the booking process online.
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        What are the payment options and cancellation policies?
                    </AccordionSummary>
                    <AccordionDetails>
                        We accept various payment methods including credit/debit cards, online banking, and UPI. Cancellations made 24 hours before the rental period are eligible for a full refund.
                    </AccordionDetails>
                    <AccordionActions>
                        <Button>Cancel</Button>
                        <Button>Agree</Button>
                    </AccordionActions>
                </Accordion>
            </div>
            {/* About us Section */}
            <div className="mx-auto max-w-7xl px-4" id='about'>
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                    <div className="max-w-max rounded-full border bg-green-50 p-1 px-3">
                        <p className="text-xs font-semibold leading-normal md:text-sm">About the company</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 md:text-3xl md:leading-10">
                        Cultivating Success with Shared Farming Solutions
                    </p>
                    <p className="max-w-4xl text-base text-gray-600 md:text-lg">
                        Welcome to AgriEuipe your trusted partner in transforming the agricultural landscape. We understand the challenges faced by farmers, especially those who cannot afford the high cost of advanced farming equipment. Our platform is dedicated to bridging this gap by providing an accessible, reliable, and cost-effective solution for renting agricultural equipment.
                    </p>
                    <p className="text-3xl font-bold text-gray-900 md:text-3xl md:leading-10">
                        Our Mission
                    </p>
                    <p className="max-w-4xl text-base text-gray-600 md:text-lg">
                        Our mission is to revolutionize the agricultural sector by providing an easy-to-use platform where farmers can rent, buy, and sell farming equipment. We aim to empower farmers by making advanced tools and machinery accessible to all, thereby improving farming efficiency and yields.
                    </p>
                    <p className="text-3xl font-bold text-gray-900 md:text-3xl md:leading-10">
                        Who We Are
                    </p>
                    <p className="max-w-4xl text-base text-gray-600 md:text-lg">
                        We are a dedicated team of professionals with a deep understanding of the agricultural sector. Our goal is to support farmers by providing a platform that simplifies the process of renting and acquiring the necessary equipment. We are committed to enhancing the livelihoods of farmers by offering a service that is not only convenient but also crucial in modern farming practices.
                    </p>
                    <p className="text-3xl font-bold text-gray-900 md:text-3xl md:leading-10">
                        Why Choose Us?
                    </p>
                    <p className="max-w-4xl text-base text-gray-600 md:text-lg">
                        <span className='font-bold text-green-600'> Affordable Rentals :</span> We offer competitive pricing, ensuring that advanced equipment is within reach for every farmer.
                        <span className='font-bold text-green-600'>Comprehensive Support : </span>Our customer service team is always ready to assist you, from equipment selection to final payment.
                        <span className='font-bold text-green-600'>Trusted Partners : </span>We partner with leading equipment brands to ensure that you have access to the best machinery available.
                    </p>
                    <p className="text-3xl font-bold text-gray-900 md:text-3xl md:leading-10">
                        Meet the People Behind Our Mission
                    </p>
                    <p className="max-w-4xl text-base text-gray-600 md:text-lg">
                        our team is more than just a group of individuals; we are a collective of passionate experts united by a common goal: to make advanced agricultural equipment accessible to every farmer.
                        {
                            teamMembers.map((member, index) => (
                                <div key={index} className="flex items-center space-x-2 my-3">
                                    <img
                                        className="inline-block h-12 w-12 rounded-full"
                                        src={member.image}
                                        alt={member.name}
                                    />
                                    <span className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">{member.name}</span>
                                        <span className="text-sm font-medium text-gray-500">{member.designation}</span>
                                    </span>
                                </div>
                            ))
                        }
                    </p>
                </div>
                <div className="w-full space-y-4">
                    <img
                        className="h-[200px] w-full rounded-xl object-cover md:h-full"
                        src="https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/google-map.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}
