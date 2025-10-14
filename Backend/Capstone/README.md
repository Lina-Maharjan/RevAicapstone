# Capstone
Fake Review Detection API

# Project Overview
A comprehensive API for detecting fake reviews, analyzing sentiment, and categorizing product reviews. This project helps users analyze Amazon product reviews (either via URL or manually input) to identify potential fake reviews, understand sentiment patterns, and categorize review content.

# Features
Fake Review Detection: Identifies potentially fake reviews using heuristic analysis
Sentiment Analysis: Classifies reviews as positive, negative, or neutral using TextBlob
Review Categorization: Categorizes reviews by topics (quality, price, delivery, etc.)
Amazon Review Fetching: Extracts reviews from Amazon product URLs
User Authentication: Secure JWT-based authentication system
API Documentation: Interactive OpenAPI documentation

# Tech Stack
Framework: FastAPI
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
NLP Processing: TextBlob
External APIs: Amazon Product Reviews API (via RapidAPI)

# Installation
Prerequisites
Python 3.8+
MongoDB database
RapidAPI account with Amazon Product Reviews API subscription

## Machine Learning Models

This application requires pre-trained machine learning models to function properly. 
Due to file size limitations, these models are not included in the repository.

### Required Models

Download the following files and place them in the `ml_models` folder:
Folder link: https://drive.google.com/drive/u/0/folders/1tMpTrppznvS9bVhRBq5RnOAXwjJ3kLQz
