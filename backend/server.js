const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10
const {body, validationResult} = require('express-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your_secret_key'; // Make sure to keep this secure
const jwtExpiresIn = '24h'; // Token expiration time


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cms'
});

db.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log("Successfully connected to the database.");
});


//////////////////////////////


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage});
app.post('/posts/image', upload.single('file'), (req, res) => {
    const {file, postId} = req.body
    sql = "UPDATE posts SET post_image = ?  , WHERE post_id = ?";
    db.query(sql, [file, postId])
    res.status(201).json({message: 'Image set succesfully!'})

})


///////////////////////
async function userExists(email, username) {

    const query = 'SELECT * FROM users WHERE user_email = ? OR username = ?';
    const values = [email, username]
    try {
        const results = await db.query(query, values);
        console.log(results);
        if (results.rows > 1) return true;
        else return false;
    } catch (error) {
        console.error('Database error numero 2:', error);
        throw error;
    }
}


app.post('/posts/add', [
    body('postTitle').escape(),
    body('postContent').notEmpty().escape(),
    body('postTags').escape(),
    body('postUser').notEmpty(),
    body('postAuthor').notEmpty(),
    body('postDate').notEmpty(),
    body('postUserId').notEmpty(),
    body('postUserEmail').isEmail(),
    body('postCategoryId').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        postTitle,
        postContent,
        postTags,
        postUser,
        postAuthor,
        postDate,
        postUserId,
        postUserEmail,
        postCategoryId
    } = req.body;
    const sql = 'INSERT INTO posts (post_title, post_content, post_tags, post_user, post_author, post_date, post_user_id, post_user_email , post_category_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ? )';

    try {
        await db.query(sql, [postTitle, postContent, postTags, postUser, postAuthor, postDate, postUserId, postUserEmail, postCategoryId]);
        res.status(201).json({
            message: "Post created successfully!"
        });
    } catch (error) {
        console.error('Failed to insert post:', error);
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
});


app.post('/users/new', [
    body('email').isEmail(),
    body('username').not().isEmpty().trim().escape(),
    body('nume').not().isEmpty().trim().escape(),
    body('prenume').not().isEmpty().trim().escape(),
    body('password').isLength({min: 7}),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, username, nume, prenume, password, anStudiu, profil, grupa} = req.body;
    try {

        if (await userExists(email, username)) {
            return res.status(409).json({
                message: 'Email sau username deja folosite!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Eroare la verificarea existentei!'
        })
    }


    const saltRounds = 10;
    const userRole = 'user'
    const token = jwt.sign({email, username},
        jwtSecret,
        {expiresIn: jwtExpiresIn});
    // console.error(email, username, nume, prenume, password, token);
    try {
        bcrypt
            .genSalt(saltRounds)
            .then(salt => {

                return bcrypt.hash(password, salt).then(hashedPassword => {
                    return {salt, hashedPassword}
                })
            })
            .then(({salt, hashedPassword}) => {


                const sql = "INSERT INTO users (user_email, username, user_firstname, user_lastname, user_password, token ,user_role , randSalt, an_studiu , profil , grupa ) VALUES (?, ?, ?, ?, ?, ? , ? , ?, ? , ? , ?)";
                db.query(sql, [email, username, nume, prenume, hashedPassword, token, userRole, salt, anStudiu, profil, grupa]);
                res.status(201).json({
                    message: 'Inregistrat cu success!'
                });
            }).catch(err => console.error(err.message));


    } catch (error) {
        console.error('Server error', error);
        res.status(500).json({
            error: 'Server error while processing request',
            details: error.message
        });
    }
});

function validateUser(hash) {
    bcrypt
        .compare(password, hash)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.error(err.message))
}

app.post('/users/login', (request, response) => {
    const {username, password} = request.body;
    const sql = `SELECT *
                 FROM users
                 WHERE username = ?`;
    db.query(sql, [username], async (error, results) => {
        user = results[0];
        if (error) {
            console.error(err);
            response.status(500).json({
                error: 'Database error',
                message: err.message
            });
            return;
        }
        if (results.length > 0) {
            const validatePassword = await bcrypt.compare(password, results[0].user_password);
            if (validatePassword) {
                return response.status(201).json({
                    message: 'Te-ai logat cu success!',
                    user: user

                })
            } else return response.status(401).json({
                message: 'Username sau parola invalide!'
            })
            // bcrypt.compare(password , results[0].user_password , (err , res) => {
            //     console.log(results[0] , password);
            //     if(password != results[0].user_password) {
            //         response.status(401).json({message: 'Invalid Password!'});
            //     } else response.status(201).json({message: 'Succesfully logged in!'})
            // })   

        } else {
            response.status(404).json({message: 'Username-ul nu exista!'});
        }
    });
});

app.delete('/posts/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const sql = `DELETE
                     FROM posts
                     WHERE post_id = ?`;
        const result = await db.query(sql, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Postarea nu a fost gasita'});
        }
        res.status(200).json({message: 'Postare stearsa cu success'});
    } catch (error) {
        console.error('Eroare la stergere:', error);
        res.status(500).json({message: 'Eroare la stergere', error: error.message});
    }
});


app.get('/categories', (req, res) => {
    const sql = "SELECT * FROM categories";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching categories: ', err);
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(result);

    })
})

app.get('/categories:id', (req, res) => {
    const {id} = req.params;
    const sql = "SELECT * FROM categories WHERE post_category_id = ?";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching categories: ', err);
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(result);

    })
})

app.get('/posts', (req, res) => {
    const sql = "SELECT * FROM posts ORDER BY post_id DESC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching categories: ', err);
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(result);

    })
})

app.get('/posts/:categoryId', (req, res) => {
    const {categoryId} = req.params;
    const sql = "SELECT * FROM posts WHERE post_category_id = ? ORDER BY post_id DESC";
    db.query(sql, [categoryId], (error, result) => {
        if (error) {
            console.error("ERROR FETCHING POSTS FOR THE SELECTED CATEGORY", error)
            res.status(500).json({error: error.message})
            return;
        }
        res.status(200).json(result);
    })
})

app.get('/comments/limit10', (req, res) => {
    const sql = "SELECT * FROM comments ORDER BY comment_id DESC LIMIT 10";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching comments: ', err);
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(result);

    })
})

app.get('/posts/user/:user_id', (req, res) => {
    const {user_id} = req.params;
    const sql = "SELECT * FROM posts WHERE post_user_id = ? ORDER BY post_id DESC";
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error('Error getting posts for the user:', err);
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(result);
    });
});

app.get('/comments/user/:user_id', (req, res) => {
    const {user_id} = req.params;
    const sql = "SELECT * FROM comments WHERE comment_user_id = ? ORDER BY comment_id DESC";
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error('Error getting posts for the user:', err);
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(result);
    });
});

app.get('/users/all', (req, res) => {
    const sql = "SELECT * FROM users ORDER BY user_id DESC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('ERROR FETCHING USERS', err);
            return res.status(500).json({error: err.message});
        }

        res.status(200).json(result);
    });
});


app.listen(3001, () => {
    console.log('Server running on port 3001');
});

