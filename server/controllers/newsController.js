const axios = require('axios');
const Article = require('../models/article');

const fetchNews = async (req, res) => {
    try {
        const response = await axios.get('https://newsdata.io/api/1/news', {
            params: {
                apikey: process.env.NEWSDATA_API_KEY,  // Use the API key from the .env file
                country: 'us',
                language: 'en',
                category: 'top',
            },
        });

        const articles = response.data.results;

        // Log the fetched articles
        console.log('Fetched articles:', articles);

        // Save each article to the MongoDB
        articles.forEach(async (article) => {
            const newArticle = new Article({
                title: article.title,
                content: article.description,
                author: article.source_id,
                date: article.pubDate,
            });
            await newArticle.save();
        });

        res.json(articles);
    } catch (error) {
        console.error('Error in fetchNews:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { fetchNews };
