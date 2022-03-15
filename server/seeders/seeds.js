const db = require('../config/connection');
const { User, Business, } = require('../models');

db.once('open', async () => {
  

  await Business.deleteMany();

  const businesses = await Business.insertMany([
    {
      title: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      location:'622 West 168th St, New York,NY',
      phone:'646-123-1234',
      blackOwned: true,
      womenOwned:true,
      closing:false,
      momAndDad: false,
      thoughts:[]
    },
    {
      title: 'Car Wash',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      location:'2 West 268th St, Bronx,NY',
      phone:'646-123-1234',
      blackOwned: true,
      womenOwned:false,
      closing:true,
      momAndDad: false,
    },
    {
      title: 'Dry Cleaning',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      location:' West 16th St, New York,NY',
      phone:'646-123-1234',
      blackOwned: false,
      womenOwned:true,
      closing:false,
      momAndDad: true,
    },
    {
      title: 'Flower Shop',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      location:'622 West 168th St, Brooklyn,NY',
      phone:'646-123-1234',
      blackOwned: true,
      womenOwned:true,
      closing:false,
      momAndDad: false,
    }
  ])
  console.log('business seeded');

  await User.deleteMany();

  const users = await User.insertMany([
    {
      "username": "Okey_Schinner",
      "email": "Okey_Schinner_Bernier@hotmail.com",
      "password": "gqxFBGXzSoNZdSj",
      "type":"PAID",
      "stripeId":"asdsasd"
    },
    {
      "username": "Schinner",
      "email": "Okey_Bernier@hotmail.com",
      "password": "gqxFBGXzSoNZdSj",
      "type":"FREE",
    }
  ])

  console.log('users seeded');
  process.exit();
});
