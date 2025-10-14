# import pickle
# import logging
# from typing import Any, Optional
# import os
# import joblib

# logger = logging.getLogger(__name__)

# class ModelLoader:
#     def __init__(self):
#         self.fake_detection_model = None
#         self.sentiment_model = None
#         self.category_model = None
#         self.vectorizer = None 
#         self.models_loaded = False
    
#     def load_models(self) -> bool:
#         """Load ML models from files (placeholder for now)"""
#         try:
#             logger.info("Loading ML models...")
#             models_dir = "ml_models"
        
#             # Load model with joblib instead of pickle
#             fake_model_path = os.path.join(models_dir, "svm_fake_review_model.pkl")
#             if os.path.exists(fake_model_path):
#                 try:
#                     # Direct joblib load
#                     self.fake_detection_model = joblib.load(fake_model_path)
#                     logger.info("✅ Fake detection model loaded successfully using joblib")
#                 except Exception as e:
#                     logger.error(f"❌ Failed to load fake detection model with joblib: {str(e)}")

#             # Load vectorizer - use your actual filename
#             vectorizer_path = os.path.join(models_dir, "tfidf_vectorizer.pkl")
#             if os.path.exists(vectorizer_path):
#                 try:
#                     self.vectorizer = joblib.load(vectorizer_path)
#                     logger.info("✅ TF-IDF Vectorizer loaded successfully")
#                 except Exception as e:
#                     logger.error(f"❌ Failed to load vectorizer: {str(e)}")
        
#             # Load sentiment model
#             sentiment_model_path = os.path.join(models_dir, "sentiment_model.pkl")
#             if os.path.exists(sentiment_model_path):
#                 try:
#                     # Try joblib first
#                     self.sentiment_model = joblib.load(sentiment_model_path)
#                     logger.info("✅ Sentiment model loaded successfully using joblib")
#                 except Exception:
#                     try:
#                         # Fall back to pickle
#                         with open(sentiment_model_path, 'rb') as f:
#                             self.sentiment_model = pickle.load(f)
#                             logger.info("✅ Sentiment model loaded successfully using pickle")
#                     except Exception as e:
#                         logger.error(f"❌ Failed to load sentiment model: {str(e)}")
#             else:
#                 logger.warning(f"⚠️ Sentiment model not found at {sentiment_model_path}")
        
#             # Load category model
#             category_model_path = os.path.join(models_dir, "category_model.pkl")
#             if os.path.exists(category_model_path):
#                 try:
#                     # Try joblib first
#                     self.category_model = joblib.load(category_model_path)
#                     logger.info("✅ Category model loaded successfully using joblib")
#                 except Exception:
#                     try:
#                         # Fall back to pickle
#                         with open(category_model_path, 'rb') as f:
#                             self.category_model = pickle.load(f)
#                             logger.info("✅ Category model loaded successfully using pickle")
#                     except Exception as e:
#                         logger.error(f"❌ Failed to load category model: {str(e)}")
#             else:
#                 logger.warning(f"⚠️ Category model not found at {category_model_path}")
        
#             # Set models_loaded to True if at least one model was loaded
#             models_found = any([self.fake_detection_model, self.sentiment_model, self.category_model])
#             if not models_found:
#                 logger.warning("No ML models were loaded. Using fallback implementations.")
#                 self.models_loaded = False
#                 return False                
#             else:
#                 logger.info("✅ ML model loading complete")
#                 self.models_loaded = True
#                 return True
            
#         except Exception as e:
#             logger.error(f"Failed to load ML models: {str(e)}")
#             self.models_loaded = False
#             return False
    
#     def is_ready(self) -> bool:
#         return self.models_loaded

# # Global model loader instance
# model_loader = ModelLoader()

import pickle
import logging
from typing import Any, Optional
import os
import joblib

logger = logging.getLogger(__name__)

class ModelLoader:
    def __init__(self):
        self.fake_detection_model = None
        self.sentiment_model = None
        self.category_model = None
        self.vectorizer = None 
        self.sentiment_vectorizer = None
        self.models_loaded = False
    
    def load_models(self) -> bool:
        """Load ML models from files (placeholder for now)"""
        try:
            logger.info("Loading ML models...")
            models_dir = "ml_models"
        
            # Load model with joblib instead of pickle
            fake_model_path = os.path.join(models_dir, "svm_fake_review_model.pkl")
            if os.path.exists(fake_model_path):
                try:
                    # Direct joblib load
                    self.fake_detection_model = joblib.load(fake_model_path)
                    logger.info("✅ Fake detection model loaded successfully using joblib")
                except Exception as e:
                    logger.error(f"❌ Failed to load fake detection model with joblib: {str(e)}")

            # Load vectorizer - use your actual filename
            vectorizer_path = os.path.join(models_dir, "tfidf_vectorizer.pkl")
            if os.path.exists(vectorizer_path):
                try:
                    self.vectorizer = joblib.load(vectorizer_path)
                    logger.info("✅ TF-IDF Vectorizer loaded successfully")
                except Exception as e:
                    logger.error(f"❌ Failed to load vectorizer: {str(e)}")
        
            # Load sentiment model
            sentiment_model_path = os.path.join(models_dir, "best_model_svmsentiment.pkl")
            if os.path.exists(sentiment_model_path):
                try:
                    # Try joblib first
                    self.sentiment_model = joblib.load(sentiment_model_path)
                    logger.info("✅ Sentiment model loaded successfully using joblib")
                except Exception as e:
                    logger.error(f"❌ Failed to load sentiment model with joblib: {str(e)}")
                    
            # Load sentiment vectorizer (new)
            sentiment_vectorizer_path = os.path.join(models_dir, "tf_idf_vectorizersentiment.pkl")
            if os.path.exists(sentiment_vectorizer_path):
                try:
                    self.sentiment_vectorizer = joblib.load(sentiment_vectorizer_path)  # Use new property
                    logger.info("✅ Sentiment TF-IDF Vectorizer loaded successfully")
                except Exception as e:
                    logger.error(f"❌ Failed to load sentiment vectorizer: {str(e)}")

            # Load category model
            category_model_path = os.path.join(models_dir, "category_model.pkl")
            if os.path.exists(category_model_path):
                try:
                    # Try joblib first
                    self.category_model = joblib.load(category_model_path)
                    logger.info("✅ Category model loaded successfully using joblib")
                except Exception:
                    try:
                        # Fall back to pickle
                        with open(category_model_path, 'rb') as f:
                            self.category_model = pickle.load(f)
                            logger.info("✅ Category model loaded successfully using pickle")
                    except Exception as e:
                        logger.error(f"❌ Failed to load category model: {str(e)}")
            else:
                logger.warning(f"⚠️ Category model not found at {category_model_path}")
        
            # Set models_loaded to True if at least one model was loaded
            models_found = any([self.fake_detection_model, self.sentiment_model, self.category_model])
            if not models_found:
                logger.warning("No ML models were loaded. Using fallback implementations.")
                self.models_loaded = False
                return False                
            else:
                logger.info("✅ ML model loading complete")
                self.models_loaded = True
                return True
            
        except Exception as e:
            logger.error(f"Failed to load ML models: {str(e)}")
            self.models_loaded = False
            return False
    
    def is_ready(self) -> bool:
        return self.models_loaded

# Global model loader instance
model_loader = ModelLoader()