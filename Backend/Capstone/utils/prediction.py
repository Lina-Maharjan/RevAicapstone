# import random
# import re
# import numpy as np
# from typing import List, Tuple
# from textblob import TextBlob
# from models.schemas import SentimentType, CategoryType, FakeDetectionResult, SingleReviewAnalysis
# from utils.model_loader import model_loader
# import logging

# logger = logging.getLogger(__name__)

# class ReviewAnalyzer:
#     def __init__(self):
#         self.fake_keywords = [
#             "amazing", "perfect", "best ever", "life changing", "miraculous",
#             "unbelievable", "fantastic", "incredible", "outstanding", "phenomenal"
#         ]
        
#         self.quality_keywords = [
#             "quality", "durable", "sturdy", "build", "material", "construction",
#             "solid", "cheap", "flimsy", "broke", "broken", "defective"
#         ]
        
#         self.price_keywords = [
#             "price", "cost", "expensive", "cheap", "value", "money", "worth",
#             "affordable", "budget", "overpriced", "deal"
#         ]
        
#         self.delivery_keywords = [
#             "shipping", "delivery", "fast", "slow", "arrived", "package",
#             "packaging", "box", "delayed", "quick", "overnight"
#         ]
    
#     def detect_fake_review(self, review: str) -> Tuple[FakeDetectionResult, float]:
#         try:
#             if model_loader.fake_detection_model is not None and model_loader.vectorizer is not None:
#                 # Process review text 
#                 processed_review = review.lower()  # Basic preprocessing
#                 # # Convert to 2D array with reshape - this fixes the error
#                 # review_array = np.array([processed_review]).reshape(1, -1)
#                 # Transform text to numerical features using the vectorizer
#                 features = model_loader.vectorizer.transform([processed_review])
#                 # Make prediction using the model
#                 # Note: Adjust the code based on your specific model's API
#                 # prediction = model_loader.fake_detection_model.predict(review_array)[0]
#                 # probabilities = model_loader.fake_detection_model.predict_proba(review_array)[0]
#                 # Make prediction using the model
#                 prediction = model_loader.fake_detection_model.predict(features)[0]
#                 probabilities = model_loader.fake_detection_model.predict_proba(features)[0]
                
#                 # Assuming binary classification where index 1 is the "fake" class
#                 # Adjust based on your model's output structure
#                 fake_probability = probabilities[1] if len(probabilities) > 1 else probabilities[0]
                
#                 result = FakeDetectionResult.FAKE if fake_probability > 0.5 else FakeDetectionResult.REAL
#                 confidence = fake_probability if result == FakeDetectionResult.FAKE else (1.0 - fake_probability)
                
#                 logger.debug(f"ML model fake detection: {result} with confidence {confidence:.2f}")
#                 return result, confidence
                
#             # Fall back to heuristic method if model isn't available
#             logger.debug("Using heuristic fake detection (ML model not available)")
#             review_lower = review.lower()
            
#             # Check for excessive exclamation marks
#             exclamation_ratio = review.count('!') / len(review) if len(review) > 0 else 0
            
#             # Check for fake keywords
#             fake_keyword_count = sum(1 for keyword in self.fake_keywords if keyword in review_lower)
            
#             # Check review length (very short or very long could be suspicious)
#             length_score = 0
#             if len(review) < 20 or len(review) > 1000:
#                 length_score = 0.3
            
#             # Calculate fake probability
#             fake_score = min(1.0, (exclamation_ratio * 2) + (fake_keyword_count * 0.2) + length_score)
            
#             # Add some randomness to simulate model uncertainty
#             fake_score += random.uniform(-0.2, 0.2)
#             fake_score = max(0.0, min(1.0, fake_score))
            
#             result = FakeDetectionResult.FAKE if fake_score > 0.5 else FakeDetectionResult.REAL
#             confidence = fake_score if result == FakeDetectionResult.FAKE else (1.0 - fake_score)
            
#             return result, confidence
            
#         except Exception as e:
#             logger.error(f"Error in fake detection: {str(e)}")
#             return FakeDetectionResult.REAL, 0.5
    
#     def analyze_sentiment(self, review: str) -> Tuple[SentimentType, float]:
#         """
#         Analyze sentiment using ML model with fallback to TextBlob
#         """
#         try:
#             # Try to use ML model if available
#             if model_loader.sentiment_model is not None:
#                 # Process review text
#                 processed_review = review.lower()  # Basic preprocessing
                
#                 # Make prediction using the model
#                 # Adjust based on your specific model's API
#                 prediction = model_loader.sentiment_model.predict([processed_review])[0]
#                 confidence = model_loader.sentiment_model.predict_proba([processed_review])[0].max()
                
#                 # Map prediction to sentiment type (adjust based on your model outputs)
#                 sentiment_mapping = {
#                     'positive': SentimentType.POSITIVE,
#                     'negative': SentimentType.NEGATIVE,
#                     'neutral': SentimentType.NEUTRAL
#                 }
                
#                 # Convert model output to SentimentType enum
#                 sentiment = sentiment_mapping.get(
#                     str(prediction).lower(), 
#                     SentimentType.NEUTRAL
#                 )
                
#                 logger.debug(f"ML model sentiment analysis: {sentiment} with confidence {confidence:.2f}")
#                 return sentiment, confidence
            
#             # Fall back to TextBlob if model isn't available
#             logger.debug("Using TextBlob for sentiment analysis (ML model not available)")
#             blob = TextBlob(review)
#             polarity = blob.sentiment.polarity
            
#             if polarity > 0.1:
#                 sentiment = SentimentType.POSITIVE
#             elif polarity < -0.1:
#                 sentiment = SentimentType.NEGATIVE
#             else:
#                 sentiment = SentimentType.NEUTRAL
            
#             # Convert polarity to confidence score
#             confidence = abs(polarity)
            
#             return sentiment, confidence
            
#         except Exception as e:
#             logger.error(f"Error in sentiment analysis: {str(e)}")
#             return SentimentType.NEUTRAL, 0.5
    
#     def categorize_review(self, review: str) -> CategoryType:
#         """
#         Categorize review using ML model with fallback to keyword matching
#         """
#         try:
#             # Try to use ML model if available
#             if model_loader.category_model is not None:
#                 # Process review text
#                 processed_review = review.lower()  # Basic preprocessing
                
#                 # Make prediction using the model
#                 # Adjust based on your specific model's API
#                 category_pred = model_loader.category_model.predict([processed_review])[0]
                
#                 # Map prediction to category type (adjust based on your model outputs)
#                 category_mapping = {
#                     'quality': CategoryType.QUALITY,
#                     'price': CategoryType.PRICE,
#                     'delivery': CategoryType.DELIVERY,
#                     'general': CategoryType.GENERAL
#                 }
                
#                 # Convert model output to CategoryType enum
#                 category = category_mapping.get(
#                     str(category_pred).lower(), 
#                     CategoryType.GENERAL
#                 )
                
#                 logger.debug(f"ML model categorization: {category}")
#                 return category
            
#             # Fall back to keyword approach if model isn't available
#             logger.debug("Using keyword matching for categorization (ML model not available)")
#             review_lower = review.lower()
            
#             quality_score = sum(1 for keyword in self.quality_keywords if keyword in review_lower)
#             price_score = sum(1 for keyword in self.price_keywords if keyword in review_lower)
#             delivery_score = sum(1 for keyword in self.delivery_keywords if keyword in review_lower)
            
#             max_score = max(quality_score, price_score, delivery_score)
            
#             if max_score == 0:
#                 return CategoryType.GENERAL
#             elif quality_score == max_score:
#                 return CategoryType.QUALITY
#             elif price_score == max_score:
#                 return CategoryType.PRICE
#             elif delivery_score == max_score:
#                 return CategoryType.DELIVERY
#             else:
#                 return CategoryType.GENERAL
                
#         except Exception as e:
#             logger.error(f"Error in categorization: {str(e)}")
#             return CategoryType.GENERAL
    
#     def analyze_single_review(self, review: str) -> SingleReviewAnalysis:
#         """
#         Analyze a single review for fake detection, sentiment, and category
#         """
#         fake_result, fake_confidence = self.detect_fake_review(review)
#         sentiment, sentiment_score = self.analyze_sentiment(review)
#         category = self.categorize_review(review)
        
#         return SingleReviewAnalysis(
#             review_text=review,
#             is_fake=fake_result,
#             sentiment=sentiment,
#             sentiment_score=sentiment_score,
#             category=category,
#             confidence_score=fake_confidence
#         )
    
#     def analyze_reviews(self, reviews: List[str]) -> dict:
#         """
#         Analyze multiple reviews and return comprehensive results
#         """
#         detailed_results = []
#         sentiment_counts = {s.value: 0 for s in SentimentType}
#         category_counts = {c.value: 0 for c in CategoryType}
#         fake_count = 0
        
#         for review in reviews:
#             if not review or len(review.strip()) < 5:
#                 continue
                
#             analysis = self.analyze_single_review(review.strip())
#             detailed_results.append(analysis)
            
#             # Update counters
#             sentiment_counts[analysis.sentiment.value] += 1
#             category_counts[analysis.category.value] += 1
            
#             if analysis.is_fake == FakeDetectionResult.FAKE:
#                 fake_count += 1
        
#         total_reviews = len(detailed_results)
#         real_count = total_reviews - fake_count
#         fake_percentage = (fake_count / total_reviews * 100) if total_reviews > 0 else 0
        
#         # Determine overall sentiment
#         overall_sentiment = max(sentiment_counts, key=sentiment_counts.get)
        
#         return {
#             "total_reviews": total_reviews,
#             "fake_count": fake_count,
#             "real_count": real_count,
#             "sentiment_distribution": sentiment_counts,
#             "category_distribution": category_counts,
#             "detailed_results": detailed_results,
#             "overall_sentiment": overall_sentiment,
#             "fake_percentage": round(fake_percentage, 2)
#         }

# # Global analyzer instance
# review_analyzer = ReviewAnalyzer()

import random
import re
import numpy as np
from typing import List, Tuple
from textblob import TextBlob
from models.schemas import SentimentType, CategoryType, FakeDetectionResult, SingleReviewAnalysis
from utils.model_loader import model_loader
import logging

logger = logging.getLogger(__name__)

class ReviewAnalyzer:
    def __init__(self):
        self.fake_keywords = [
            "amazing", "perfect", "best ever", "life changing", "miraculous",
            "unbelievable", "fantastic", "incredible", "outstanding", "phenomenal"
        ]
        
        self.quality_keywords = [
            "quality", "durable", "sturdy", "build", "material", "construction",
            "solid", "cheap", "flimsy", "broke", "broken", "defective"
        ]
        
        self.price_keywords = [
            "price", "cost", "expensive", "cheap", "value", "money", "worth",
            "affordable", "budget", "overpriced", "deal"
        ]
        
        self.delivery_keywords = [
            "shipping", "delivery", "fast", "slow", "arrived", "package",
            "packaging", "box", "delayed", "quick", "overnight"
        ]
    
    def detect_fake_review(self, review: str) -> Tuple[FakeDetectionResult, float]:
        try:
            if model_loader.fake_detection_model is not None and model_loader.vectorizer is not None:
                # Process review text 
                processed_review = review.lower()  # Basic preprocessing
                # # Convert to 2D array with reshape - this fixes the error
                # review_array = np.array([processed_review]).reshape(1, -1)

                # Transform text to numerical features using the vectorizer
                features = model_loader.vectorizer.transform([processed_review])
                # Make prediction using the model
                # Note: Adjust the code based on your specific model's API
                # prediction = model_loader.fake_detection_model.predict(review_array)[0]
                # probabilities = model_loader.fake_detection_model.predict_proba(review_array)[0]
                # Make prediction using the model
                prediction = model_loader.fake_detection_model.predict(features)[0]

                # Check if model supports predict_proba
                if hasattr(model_loader.fake_detection_model, 'predict_proba'):
                    # Use probability if available
                    probabilities = model_loader.fake_detection_model.predict_proba(features)[0]
                    fake_probability = probabilities[1] if len(probabilities) > 1 else probabilities[0]
                else:
                    # For models like LinearSVC, use decision_function instead
                    # Convert decision function score to a probability-like value between 0 and 1
                    decision_score = model_loader.fake_detection_model.decision_function(features)[0]
                    fake_probability = 1 / (1 + np.exp(-decision_score))  # Sigmoid function
                
                result = FakeDetectionResult.FAKE if fake_probability > 0.5 else FakeDetectionResult.REAL
                confidence = fake_probability if result == FakeDetectionResult.FAKE else (1.0 - fake_probability)
                
                logger.debug(f"ML model fake detection: {result} with confidence {confidence:.2f}")
                return result, confidence
                
            # Fall back to heuristic method if model isn't available
            logger.debug("Using heuristic fake detection (ML model not available)")
            review_lower = review.lower()
            
            # Check for excessive exclamation marks
            exclamation_ratio = review.count('!') / len(review) if len(review) > 0 else 0
            
            # Check for fake keywords
            fake_keyword_count = sum(1 for keyword in self.fake_keywords if keyword in review_lower)
            
            # Check review length (very short or very long could be suspicious)
            length_score = 0
            if len(review) < 20 or len(review) > 1000:
                length_score = 0.3
            
            # Calculate fake probability
            fake_score = min(1.0, (exclamation_ratio * 2) + (fake_keyword_count * 0.2) + length_score)
            
            # Add some randomness to simulate model uncertainty
            fake_score += random.uniform(-0.2, 0.2)
            fake_score = max(0.0, min(1.0, fake_score))
            
            result = FakeDetectionResult.FAKE if fake_score > 0.5 else FakeDetectionResult.REAL
            confidence = fake_score if result == FakeDetectionResult.FAKE else (1.0 - fake_score)
            
            return result, confidence
            
        except Exception as e:
            logger.error(f"Error in fake detection: {str(e)}")
            return FakeDetectionResult.REAL, 0.5
    
    def analyze_sentiment(self, review: str) -> Tuple[SentimentType, float]:
        """
        Analyze sentiment using ML model with fallback to TextBlob
        """
        try:
            # Try to use ML model if available
            if model_loader.sentiment_model is not None:
                # Process review text
                processed_review = review.lower()  # Basic preprocessing
                
                # Make prediction using the model
                # Adjust based on your specific model's API
                prediction = model_loader.sentiment_model.predict([processed_review])[0]
                confidence = model_loader.sentiment_model.predict_proba([processed_review])[0].max()
                
                # Map prediction to sentiment type (adjust based on your model outputs)
                sentiment_mapping = {
                    'positive': SentimentType.POSITIVE,
                    'negative': SentimentType.NEGATIVE,
                    'neutral': SentimentType.NEUTRAL
                }
                
                # Convert model output to SentimentType enum
                sentiment = sentiment_mapping.get(
                    str(prediction).lower(), 
                    SentimentType.NEUTRAL
                )
                
                logger.debug(f"ML model sentiment analysis: {sentiment} with confidence {confidence:.2f}")
                return sentiment, confidence
            
            # Fall back to TextBlob if model isn't available
            logger.debug("Using TextBlob for sentiment analysis (ML model not available)")
            blob = TextBlob(review)
            polarity = blob.sentiment.polarity
            
            if polarity > 0.1:
                sentiment = SentimentType.POSITIVE
            elif polarity < -0.1:
                sentiment = SentimentType.NEGATIVE
            else:
                sentiment = SentimentType.NEUTRAL
            
            # Convert polarity to confidence score
            confidence = abs(polarity)
            
            return sentiment, confidence
            
        except Exception as e:
            logger.error(f"Error in sentiment analysis: {str(e)}")
            return SentimentType.NEUTRAL, 0.5
    
    def categorize_review(self, review: str) -> CategoryType:
        """
        Categorize review using ML model with fallback to keyword matching
        """
        try:
            # Try to use ML model if available
            if model_loader.category_model is not None:
                # Process review text
                processed_review = review.lower()  # Basic preprocessing
                
                # Make prediction using the model
                # Adjust based on your specific model's API
                category_pred = model_loader.category_model.predict([processed_review])[0]
                
                # Map prediction to category type (adjust based on your model outputs)
                category_mapping = {
                    'quality': CategoryType.QUALITY,
                    'price': CategoryType.PRICE,
                    'delivery': CategoryType.DELIVERY,
                    'general': CategoryType.GENERAL
                }
                
                # Convert model output to CategoryType enum
                category = category_mapping.get(
                    str(category_pred).lower(), 
                    CategoryType.GENERAL
                )
                
                logger.debug(f"ML model categorization: {category}")
                return category
            
            # Fall back to keyword approach if model isn't available
            logger.debug("Using keyword matching for categorization (ML model not available)")
            review_lower = review.lower()
            
            quality_score = sum(1 for keyword in self.quality_keywords if keyword in review_lower)
            price_score = sum(1 for keyword in self.price_keywords if keyword in review_lower)
            delivery_score = sum(1 for keyword in self.delivery_keywords if keyword in review_lower)
            
            max_score = max(quality_score, price_score, delivery_score)
            
            if max_score == 0:
                return CategoryType.GENERAL
            elif quality_score == max_score:
                return CategoryType.QUALITY
            elif price_score == max_score:
                return CategoryType.PRICE
            elif delivery_score == max_score:
                return CategoryType.DELIVERY
            else:
                return CategoryType.GENERAL
                
        except Exception as e:
            logger.error(f"Error in categorization: {str(e)}")
            return CategoryType.GENERAL
    
    def analyze_single_review(self, review: str) -> SingleReviewAnalysis:
        """
        Analyze a single review for fake detection, sentiment, and category
        """
        fake_result, fake_confidence = self.detect_fake_review(review)
        sentiment, sentiment_score = self.analyze_sentiment(review)
        category = self.categorize_review(review)
        
        return SingleReviewAnalysis(
            review_text=review,
            is_fake=fake_result,
            sentiment=sentiment,
            sentiment_score=sentiment_score,
            category=category,
            confidence_score=fake_confidence
        )
    
    def analyze_reviews(self, reviews: List[str]) -> dict:
        """
        Analyze multiple reviews and return comprehensive results
        """
        detailed_results = []
        sentiment_counts = {s.value: 0 for s in SentimentType}
        category_counts = {c.value: 0 for c in CategoryType}
        fake_count = 0
        
        for review in reviews:
            if not review or len(review.strip()) < 5:
                continue
                
            analysis = self.analyze_single_review(review.strip())
            detailed_results.append(analysis)
            
            # Update counters
            sentiment_counts[analysis.sentiment.value] += 1
            category_counts[analysis.category.value] += 1
            
            if analysis.is_fake == FakeDetectionResult.FAKE:
                fake_count += 1
        
        total_reviews = len(detailed_results)
        real_count = total_reviews - fake_count
        fake_percentage = (fake_count / total_reviews * 100) if total_reviews > 0 else 0
        
        # Determine overall sentiment
        overall_sentiment = max(sentiment_counts, key=sentiment_counts.get)
        
        return {
            "total_reviews": total_reviews,
            "fake_count": fake_count,
            "real_count": real_count,
            "sentiment_distribution": sentiment_counts,
            "category_distribution": category_counts,
            "detailed_results": detailed_results,
            "overall_sentiment": overall_sentiment,
            "fake_percentage": round(fake_percentage, 2)
        }

# Global analyzer instance
review_analyzer = ReviewAnalyzer()