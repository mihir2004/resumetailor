const express = require('express')
const multer  = require('multer')
const path = require('path');
const axios = require('axios');
const app = express()
app.set('view engine', 'ejs');
app.use(express.static('public'));
const upload = multer({ dest: 'uploads/' });

app.get('/', (req,res)=>{
    res.render('index')
})

app.post('/upload', upload.single('resume'), async (req, res) => {
    const resumePath = req.file.path;
    
    // Call Python script or API to process the resume
    const response = await axios.post('http://localhost:5000/process', {
        resumePath: resumePath
    });

    const tailoredResume = response.data.tailoredResume;
    const recommendations = response.data.recommendations;

    res.render('result', {
        originalResume: resumePath,
        tailoredResume: tailoredResume,
        recommendations: recommendations
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});