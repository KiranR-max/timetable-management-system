const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser')
    //const jsonParser = bodyParser.json()

const passport = require('passport')
const LocalStratergy = require('passport-local')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose');
const Project = require('./models/projectS')
const year1 = require('./models/year1')
const year2 = require('./models/year2')
const year3 = require('./models/year3')
const year4 = require('./models/year4')
const yearclass1 = require('./models/yearclass1')
const yearclass2 = require('./models/yearclass2')
const yearclass3 = require('./models/yearclass3')
const yearclass4 = require('./models/yearclass4')

const User = require('./models/user')
    //const dbUrl=process.env.DB_URL;

const sessionConfig = {

    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
    }
}
const methodOverride = require('method-override');
const { monitorEventLoopDelay } = require('perf_hooks');
const { addListener } = require('process');
app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.json())
var jsonParser = bodyParser.json()
app.use(session(sessionConfig))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//'mongodb://127.0.0.1:27017/project'
mongoose.connect('mongodb://127.0.0.1:27017/project', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!!!");
    })
    .catch(err => {
        console.log("MONGO ERORRR");
        console.log(err);
    })
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    next();
})

app.get('/', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    res.render('projects/welcome.ejs')
})
app.get('/register', async(req, res) => {

    res.render('projects/register.ejs')
})
app.get('/login', async(req, res) => {
    res.render('projects/login.ejs')
})
app.get('/subjects', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    res.render('projects/subjects.ejs')
})
app.get('/subjects/firstyear', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const firstyear = await year1.find()
    res.render('projects/firstyear.ejs', { firstyear })
})
app.get('/subjects/secondyear', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const secondyear = await year2.find()
    res.render('projects/secondyear.ejs', { secondyear })
})
app.get('/subjects/thirdyear', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const thirdyear = await year3.find()
    res.render('projects/thirdyear.ejs', { thirdyear })
})
app.get('/subjects/fourthyear', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const fourthyear = await year4.find()
    res.render('projects/fourthyear.ejs', { fourthyear })
})
app.get('/class', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    res.render('projects/class.ejs')
})
app.get('/class/firstyear', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const firstyearclass = await yearclass1.find()
    res.render('projects/firstyearclass.ejs', { firstyearclass })
})
app.get('/class/secondyear', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const secondyearclass = await yearclass2.find()
    res.render('projects/secondyearclass.ejs', { secondyearclass })
})
app.get('/class/thirdyear', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const thirdyearclass = await yearclass3.find()
    res.render('projects/thirdyearclass.ejs', { thirdyearclass })
})
app.get('/class/fourthyear', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const fourthyearclass = await yearclass4.find()
    res.render('projects/fourthyearclass.ejs', { fourthyearclass })
})



app.get('/teachers', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const foundTeachers = await Project.find({})

    res.render('projects/teachers.ejs', { foundTeachers })



})



app.get('/teachers/:id', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const { id } = req.params
    const foundTt = await Project.findById(id);

    res.render('projects/owntt.ejs', { foundTt })
})
app.get('/subjects/firstyear/:id', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const { id } = req.params
    const found = await year1.findById(id)
    res.render('projects/firstyearedit.ejs', { found })
})
app.get('/subjects/secondyear/:id', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const { id } = req.params
    const found = await year2.findById(id)
    res.render('projects/secondyearedit.ejs', { found })
})
app.get('/subjects/thirdyear/:id', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const { id } = req.params
    const found = await year3.findById(id)
    res.render('projects/thirdyearedit.ejs', { found })
})
app.get('/subjects/fourthyear/:id', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    const { id } = req.params
    const found = await year4.findById(id)
    res.render('projects/fourthyearedit.ejs', { found })
})
app.get('/logout', async(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        res.redirect('/login')
    }
    req.logOut();
    req.flash('success', 'LOGGED OUT')
    res.redirect('/login')
})
app.delete('/teachers/:id', async(req, res) => {
    const { id } = req.params
    const deletedItem = await Project.findByIdAndDelete(id);
    res.redirect("/teachers");

})
app.delete('/subjects/firstyear/:id', async(req, res) => {
    const { id } = req.params
    const deleted = await year1.findByIdAndDelete(id);
    res.redirect("/subjects/firstyear");
})
app.delete('/subjects/secondyear/:id', async(req, res) => {
    const { id } = req.params
    const deleted = await year2.findByIdAndDelete(id);
    res.redirect("/subjects/secondyear");
})
app.delete('/subjects/thirdyear/:id', async(req, res) => {
    const { id } = req.params
    const deleted = await year3.findByIdAndDelete(id);
    res.redirect("/subjects/thirdyear");
})
app.delete('/subjects/fourthyear/:id', async(req, res) => {
    const { id } = req.params
    const deleted = await year4.findByIdAndDelete(id);
    res.redirect("/subjects/fourthyear");
})
app.get('/teachers/:id/edit', async(req, res) => {
    const { id } = req.params
    const edit = await Project.findById(id);
    res.render('projects/edit.ejs', { edit })
})
app.post('/teachers', async(req, res) => {
    const params = new Project(req.body)
    await params.save();
    res.redirect(`/teachers/${params._id}`);

})
app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'WELCOME BACK')
    res.redirect('/')
})

app.post('/register', async(req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password)
        req.flash('success', 'Successfully Registered')
        res.redirect('/register')
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }


})
app.post('/subjects/firstyear', async(req, res) => {
    const params = new year1(req.body)
    await params.save();

    res.redirect("/subjects/firstyear")
})


app.post('/subjects/secondyear', async(req, res) => {
    const params = new year2(req.body)
    await params.save();
    res.redirect("/subjects/secondyear")

})
app.post('/subjects/thirdyear', async(req, res) => {
    const params = new year3(req.body)
    await params.save();
    res.redirect("/subjects/thirdyear")

})
app.post('/subjects/fourthyear', async(req, res) => {
    const params = new year4(req.body)
    await params.save();
    res.redirect("/subjects/fourthyear")

})
app.post('/class/firstyear', async(req, res) => {
    const params = new yearclass1(req.body)
    await params.save();
    res.redirect("/class/firstyear")
})
app.post('/class/secondyear', async(req, res) => {
    const params = new yearclass2(req.body)
    await params.save();
    res.redirect("/class/secondyear")
})
app.post('/class/thirdyear', async(req, res) => {
    const params = new yearclass3(req.body)
    await params.save();
    res.redirect("/class/thirdyear")
})
app.post('/class/fourthyear', async(req, res) => {
    const params = new yearclass4(req.body)
    await params.save();
    res.redirect("/class/fourthyear")
})
app.put('/subjects/firstyear/:id', async(req, res) => {
    let flag = 1
    const { id } = req.params

    let b = ""
    let c = ""
    let d = ""
        //await year1.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    const found = await year1.findById(id)
    const virtual = await year1.find({ _id: { $ne: found._id } })

    for (let i of virtual) {
        if (req.body.CSEA1 != '' && req.body.CSEA1 == i.CSEA1) {
            c = 'CSEA1'
            b = req.body.CSEA1
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
        if (req.body.CSEB1 != '' && req.body.CSEB1 == i.CSEB1) {
            c = 'CSEB1'
            b = req.body.CSEB1
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
        if (req.body.CSEC1 != '' && req.body.CSEC1 == i.CSEC1) {
            c = 'CSEC1'
            b = req.body.CSEC1
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
    }
    if (flag == 1) {
        await year1.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.redirect("/subjects/firstyear")
    } else {
        res.send(`${b} FOR ${c} ALREADY ASSIGNED TO ${d}`)
    }



})
app.put('/subjects/secondyear/:id', async(req, res) => {
    let flag = 1
    const { id } = req.params

    let b = ""
    let c = ""
    let d = ""
        //await year1.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    const found = await year2.findById(id)
    const virtual = await year2.find({ _id: { $ne: found._id } })

    for (let i of virtual) {
        if (req.body.CSEA3 != '' && req.body.CSEA3 == i.CSEA3) {
            c = 'CSEA3'
            b = req.body.CSEA3
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
        if (req.body.CSEB3 != '' && req.body.CSEB3 == i.CSEB3) {
            c = 'CSEB3'
            b = req.body.CSEB3
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
        if (req.body.CSEC3 != '' && req.body.CSEC3 == i.CSEC3) {
            c = 'CSEC3'
            b = req.body.CSEC3
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
    }
    if (flag == 1) {
        await year2.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.redirect("/subjects/secondyear")
    } else {
        res.send(`${b} FOR ${c} ALREADY ASSIGNED TO ${d}`)
    }



})
app.put('/subjects/thirdyear/:id', async(req, res) => {
    let flag = 1
    const { id } = req.params

    let b = ""
    let c = ""
    let d = ""
        //await year1.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    const found = await year3.findById(id)
    const virtual = await year3.find({ _id: { $ne: found._id } })

    for (let i of virtual) {
        if (req.body.CSEA5 != '' && req.body.CSEA5 == i.CSEA5) {
            c = 'CSEA5'
            b = req.body.CSEA5
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
        if (req.body.CSEB5 != '' && req.body.CSEB5 == i.CSEB5) {
            c = 'CSEB5'
            b = req.body.CSEB5
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
        if (req.body.CSEC5 != '' && req.body.CSEC5 == i.CSEC5) {
            c = 'CSEC5'
            b = req.body.CSEC5
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
    }
    if (flag == 1) {
        await year3.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.redirect("/subjects/thirdyear")
    } else {
        res.send(`${b} FOR ${c} ALREADY ASSIGNED TO ${d}`)
    }



})
app.put('/subjects/fourthyear/:id', async(req, res) => {
    let flag = 1
    const { id } = req.params

    let b = ""
    let c = ""
    let d = ""
        //await year1.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    const found = await year4.findById(id)
    const virtual = await year4.find({ _id: { $ne: found._id } })

    for (let i of virtual) {
        if (req.body.CSEA7 != '' && req.body.CSEA7 == i.CSEA7) {
            c = 'CSEA7'
            b = req.body.CSEA7
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
        if (req.body.CSEB7 != '' && req.body.CSEB7 == i.CSEB7) {
            c = 'CSEB7'
            b = req.body.CSEB7
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
        if (req.body.CSEC7 != '' && req.body.CSEC7 == i.CSEC7) {
            c = 'CSEC7'
            b = req.body.CSEC7
            b = b.toUpperCase()
            d = i.NAME
            d = d.toUpperCase()
            flag = 0
            break

        }
    }
    if (flag == 1) {
        await year4.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.redirect("/subjects/fourthyear")
    } else {
        res.send(`${b} FOR ${c} ALREADY ASSIGNED TO ${d}`)
    }



})

app.put('/teachers/:id', async(req, res) => {
    let count = 1
    const { id } = req.params
    const found = await Project.findById(id)
    const virtual = await Project.find({ _id: { $ne: found._id } })

    for (let i of virtual) {
        if (i.MONDAY['one'] != '' && req.body['MONDAY.one'] == (i.MONDAY['one'])) {
            count = 0
            name = i.NAME
            break

        }

        if (i.MONDAY['two'] != '' && req.body['MONDAY.two'] == (i.MONDAY['two'])) {
            count = 0
            name = i.NAME
            break



        }

        if (i.MONDAY['three'] != '' && req.body['MONDAY.three'] == (i.MONDAY['three'])) {
            count = 0
            name = i.NAME
            break



        }
        if (i.MONDAY['four'] != '' && req.body['MONDAY.four'] == (i.MONDAY['four'])) {
            count = 0
            name = i.NAME
            break



        }
        if (i.MONDAY['five'] != '' && req.body['MONDAY.five'] == (i.MONDAY['five'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.MONDAY['six'] != '' && req.body['MONDAY.six'] == (i.MONDAY['six'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.MONDAY['seven'] != '' && req.body['MONDAY.seven'] == (i.MONDAY['seven'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.MONDAY['eight'] != '' && req.body['MONDAY.eight'] == (i.MONDAY['eight'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.TUESDAY['one'] != '' && req.body['TUESDAY.one'] == (i.TUESDAY['one'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.TUESDAY['two'] != '' && req.body['TUESDAY.two'] == (i.TUESDAY['two'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.TUESDAY['three'] != '' && req.body['TUESDAY.three'] == (i.TUESDAY['three'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.TUESDAY['four'] != '' && req.body['TUESDAY.four'] == (i.TUESDAY['four'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.TUESDAY['five'] != '' && req.body['TUESDAY.five'] == (i.TUESDAY['five'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.TUESDAY['six'] != '' && req.body['TUESDAY.six'] == (i.TUESDAY['six'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.TUESDAY['seven'] != '' && req.body['TUESDAY.seven'] == (i.TUESDAY['seven'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.TUESDAY['eight'] != '' && req.body['TUESDAY.eight'] == (i.TUESDAY['eight'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.WEDNESDAY['one'] != '' && req.body['WEDNESDAY.one'] == (i.WEDNESDAY['one'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.WEDNESDAY['two'] != '' && req.body['WEDNESDAY.two'] == (i.WEDNESDAY['two'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.WEDNESDAY['three'] != '' && req.body['WEDNESDAY.three'] == (i.WEDNESDAY['three'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.WEDNESDAY['four'] != '' && req.body['WEDNESDAY.four'] == (i.WEDNESDAY['four'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.WEDNESDAY['five'] != '' && req.body['WEDNESDAY.five'] == (i.WEDNESDAY['five'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.WEDNESDAY['six'] != '' && req.body['WEDNESDAY.six'] == (i.WEDNESDAY['six'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.WEDNESDAY['seven'] != '' && req.body['WEDNESDAY.seven'] == (i.WEDNESDAY['seven'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.WEDNESDAY['eight'] != '' && req.body['WEDNESDAY.eight'] == (i.WEDNESDAY['eight'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.THURSDAY['one'] != '' && req.body['THURSDAY.one'] == (i.THURSDAY['one'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.THURSDAY['two'] != '' && req.body['THURSDAY.two'] == (i.THURSDAY['two'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.THURSDAY['three'] != '' && req.body['THURSDAY.three'] == (i.THURSDAY['three'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.THURSDAY['four'] != '' && req.body['THURSDAY.four'] == (i.THURSDAY['four'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.THURSDAY['five'] != '' && req.body['THURSDAY.five'] == (i.THURSDAY['five'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.THURSDAY['six'] != '' && req.body['THURSDAY.six'] == (i.THURSDAY['six'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.THURSDAY['seven'] != '' && req.body['THURSDAY.seven'] == (i.THURSDAY['seven'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.THURSDAY['eight'] != '' && req.body['THURSDAY.eight'] == (i.THURSDAY['eight'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.FRIDAY['one'] != '' && req.body['FRIDAY.one'] == (i.FRIDAY['one'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.FRIDAY['two'] != '' && req.body['FRIDAY.two'] == (i.FRIDAY['two'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.FRIDAY['three'] != '' && req.body['FRIDAY.three'] == (i.FRIDAY['three'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.FRIDAY['four'] != '' && req.body['FRIDAY.four'] == (i.FRIDAY['four'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.FRIDAY['five'] != '' && req.body['FRIDAY.five'] == (i.FRIDAY['five'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.FRIDAY['six'] != '' && req.body['FRIDAY.six'] == (i.FRIDAY['six'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.FRIDAY['seven'] != '' && req.body['FRIDAY.seven'] == (i.FRIDAY['seven'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.FRIDAY['eight'] != '' && req.body['FRIDAY.eight'] == (i.FRIDAY['eight'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.SATURDAY['one'] != '' && req.body['SATURDAY.one'] == (i.SATURDAY['one'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.SATURDAY['two'] != '' && req.body['SATURDAY.two'] == (i.SATURDAY['two'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.SATURDAY['three'] != '' && req.body['SATURDAY.three'] == (i.SATURDAY['three'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.SATURDAY['four'] != '' && req.body['SATURDAY.four'] == (i.SATURDAY['four'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.SATURDAY['five'] != '' && req.body['SATURDAY.five'] == (i.SATURDAY['five'])) {
            count = 0
            name = i.NAME
            break


        }
        if (i.SATURDAY['six'] != '' && req.body['SATURDAY.six'] == (i.SATURDAY['six'])) {
            count = 0
            name = i.NAME
            break



        }
        if (i.SATURDAY['seven'] != '' && req.body['SATURDAY.seven'] == (i.SATURDAY['seven'])) {
            count = 0
            name = i.NAME
            break



        }
        if (i.SATURDAY['eight'] != '' && req.body['SATURDAY.eight'] == (i.SATURDAY['eight'])) {
            count = 0
            name = i.NAME
            break



        }

    }



    if (count == 1) {
        const project = await Project.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.redirect(`/teachers/${project.id}/edit`)
    } else {
        //console.log('NOPE!!!')
        res.send(`CLASS ALOTTED TO ${name}`)
    }

})



//const virtual = await Project.find({ _id: { $ne: found._id } })

//console.log(virtual)
//for (let i of virtual)
//console.log(i.MONDAY[1])
app.put('/class/firstyear', async(req, res) => {
    const found = await Project.find()
        //const found1 = await year1.find()
    for (let i of found) {
        if (i.MONDAY['one'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'csea1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA1
            }

            let query = { NAME: 'CSEA1' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['one'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'cseb1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB1
            }

            let query = { NAME: 'CSEB1' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['one'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'csec1') {
            let found1 = await year1.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC1
            }

            let query = { NAME: 'CSEC1' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass1.updateOne(query, newValues, { runValidators: true, new: true })

        }

    }
    res.redirect('/class/firstyear')
})
app.put('/class/secondyear', async(req, res) => {
    const found = await Project.find()
        //const found1 = await year2.find()
    for (let i of found) {
        if (i.MONDAY['one'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'csea3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA3
            }

            let query = { NAME: 'CSEA3' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['one'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'cseb3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB3
            }

            let query = { NAME: 'CSEB3' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['one'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'csec3') {
            let found1 = await year2.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC3
            }

            let query = { NAME: 'CSEC3' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass2.updateOne(query, newValues, { runValidators: true, new: true })

        }

    }
    res.redirect('/class/secondyear')
})
app.put('/class/thirdyear', async(req, res) => {
    const found = await Project.find()
        //const found1 = await year3.find()
    for (let i of found) {
        if (i.MONDAY['one'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'csea5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA5
            }

            let query = { NAME: 'CSEA5' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['one'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'cseb5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB5
            }

            let query = { NAME: 'CSEB5' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['one'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'csec5') {
            let found1 = await year3.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC5
            }

            let query = { NAME: 'CSEC5' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass3.updateOne(query, newValues, { runValidators: true, new: true })

        }

    }
    res.redirect('/class/thirdyear')
})
app.put('/class/fourthyear', async(req, res) => {
    const found = await Project.find()
        //const found1 = await year4.find()
    for (let i of found) {
        if (i.MONDAY['one'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'csea7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEA7
            }

            let query = { NAME: 'CSEA7' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['one'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'cseb7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEB7
            }

            let query = { NAME: 'CSEB7' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['one'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'MONDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['two'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'MONDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['three'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'MONDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['four'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'MONDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['five'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'MONDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['six'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'MONDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.MONDAY['seven'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'MONDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.MONDAY['eight'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'MONDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['one'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'TUESDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['two'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'TUESDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['three'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'TUESDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['four'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'TUESDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['five'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'TUESDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['six'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'TUESDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.TUESDAY['seven'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'TUESDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.TUESDAY['eight'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'TUESDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['one'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'WEDNESDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['two'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'WEDNESDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['three'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'WEDNESDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['four'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'WEDNESDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['five'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'WEDNESDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['six'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'WEDNESDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.WEDNESDAY['seven'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'WEDNESDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.WEDNESDAY['eight'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'WEDNESDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['one'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'THURSDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['two'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'THURSDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['three'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'THURSDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['four'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'THURSDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['five'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'THURSDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['six'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'THURSDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.THURSDAY['seven'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'THURSDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.THURSDAY['eight'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'THURSDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['one'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'FRIDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['two'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'FRIDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['three'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'FRIDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['four'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'FRIDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['five'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'FRIDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['six'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'FRIDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.FRIDAY['seven'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'FRIDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.FRIDAY['eight'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'FRIDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['one'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'SATURDAY.one': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['two'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'SATURDAY.two': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['three'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'SATURDAY.three': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['four'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'SATURDAY.four': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['five'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'SATURDAY.five': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['six'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'SATURDAY.six': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }
        if (i.SATURDAY['seven'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'SATURDAY.seven': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })
        }
        if (i.SATURDAY['eight'] == 'csec7') {
            let found1 = await year4.find({ NAME: i.NAME })
            for (let j of found1) {
                sub = j.CSEC7
            }

            let query = { NAME: 'CSEC7' }
            let newValues = { $set: { 'SATURDAY.eight': sub } }
            await yearclass4.updateOne(query, newValues, { runValidators: true, new: true })

        }

    }
    res.redirect('/class/fourthyear')
})

app.listen(3000, (req, res) => {
    console.log("SERVER IS RUNNING AT !!!!")
})