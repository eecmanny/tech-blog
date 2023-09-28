const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  res.json('some data');
})

// need authority to post
//http://localhost:3001/api/dashboard/
router.post('/', withAuth, async (req, res) => {
  try {
    const newblog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newblog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// need authority to delete
//http://localhost:3001/api/dashboard/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// need authority to update a blog
//put - to update blogs

// Don't need authourity to see peoples post
// //get - to fetch all created
// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/homapage');
//     return;
//   }

//   res.render('login');
// }); 

module.exports = router;
