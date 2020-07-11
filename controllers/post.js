const getPosts = (req, res) => {
    res.json({
         posts:  [
              { title: "First post"},
              { title: "Second post"}
         ]
    })
};
const aboutPosts = (req, res) => {
     res.send("This is the About page.");
};

module.exports = {
     getPosts,
     aboutPosts
};