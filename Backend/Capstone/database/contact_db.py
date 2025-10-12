from database.mongo import contact_messages
from datetime import datetime

def save_contact_message(name: str, email: str, message: str, username: str = None) -> str:
    """Save a contact message to the database"""
    message_data = {
        "name": name,
        "email": email,
        "message": message,
        "username": username,  
        "timestamp": datetime.now(),
    }
    result = contact_messages.insert_one(message_data)
    return str(result.inserted_id)