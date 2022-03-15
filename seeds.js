const db = require('../config/connection');
const { User, Business, } = require('../models');
​
db.once('open', async () => {
  
​
  await Business.deleteMany();
​
  const businesses = await Business.insertMany([
    {
      title: 'Tin of Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      location:'622 West 168th St, New York,NY',
      links:['www.google.com'],
      phone:'646-123-1234',
      blackOwned: true,
      womenOwned:true,
      closing:false,
      momAndDad: false
    },

    {
        title: 'Sweet Brooklyn Bar',
        description:
          'Relaxed hangout featuring pub food, weekend brunch & live music nights amid quirky, steampunk decor.',
        image: 'sweetbk.jpeg',
        location:'608 Nostrand Ave., Brooklyn, NY 11216',
        links:['www.google.com'],
        phone:'347-425-0111',
        blackOwned: true,
        womenOwned:true,
        closing:false,
        momAndDad: false
      },

      {
        title: 'BLVD Bistro NY',
        description:
          'Relaxed spot with a casual-chic vibe offering modernized soul food classics with cocktails & wine.',
        image: 'Blvd-Bistro.jpeg',
        location:'2149 Frederick Douglass Blvd (corner of 116th St) New York, NY 10026',
        links:['www.google.com'],
        phone:'212-678-6200',
        blackOwned: true,
        womenOwned:false,
        closing:false,
        momAndDad: false
      },

      {
        title: 'Chillhouse Soho Flagship',
        description:
          'Cyndi Ramirez-Fulton opened this cafe-spa in the SoHo offering manicures, facials, massages, and wellness drinks. They’ve recently become a major hit for their stunning “Chill Tips” (press on nails) that come in a wide variety of color and designs.',
        image: 'chillhouse.jpeg',
        location:'75 Varick St, New York, NY 10013',
        links:['www.google.com'],
        phone:'347-537-5742',
        blackOwned: false,
        womenOwned:true,
        closing:false,
        momAndDad: false
      },

      {
        title: 'Peaches HotHouse',
        description:
          'Casual kitchen offering small & large plates of Southern comfort food, plus mason jar cocktails.',
        image: 'peaches.jpeg',
        location:'415 Tompkins Ave, Brooklyn, NY 11216',
        links:['www.google.com'],
        phone:'718-483-9111',
        blackOwned: true,
        womenOwned:false,
        closing:false,
        momAndDad: true
      },

      {
        title: 'Life Wellness Center',
        description:
          'Co-founded by Khadija A. Tudor, Life Wellness Center is a therapeutic massage practice and wellness market that offers transformative services from acupuncture to chiropractic treatments.',
        image: 'life-wellness.jpeg',
        location:'376 Tompkins Ave, Brooklyn, NY 11216',
        links:['www.google.com'],
        phone:'347-461-9939',
        blackOwned: true,
        womenOwned:true,
        closing:false,
        momAndDad: true
      },

  ])
  console.log('business seeded');
​
  await User.deleteMany();
​
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
​
  console.log('users seeded');
  process.exit();
});