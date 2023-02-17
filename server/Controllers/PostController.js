import PostModel from '../Models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map(post => post.tags).flat().slice(0, 5)

        res.status(200).json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't get tags"
        })
    }
}

export const create = async (req, res) => {
    try {
        const post = await PostModel.create({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't create post"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't get posts"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findOneAndUpdate({_id: postId},
            {$inc: {viewsCount: 1}}, {returnDocument: 'after'}).populate('user')

        if (!post) {
            return res.status(404).json({
                message: "Something went wrong while getting post"
            })
        }

        res.status(200).json(post)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't get this post"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findOneAndDelete({_id: postId})

        if (!post) {
            return res.status(404).json({
                message: "Something went wrong while removing post"
            })
        }

        res.status(200).json(post)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't remove this post"
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        const post = await PostModel.findOneAndUpdate({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't update this post"
        })
    }
}