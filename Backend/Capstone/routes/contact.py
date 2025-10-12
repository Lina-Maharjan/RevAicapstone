from fastapi import APIRouter, HTTPException, Depends
from models.schemas import ContactFormInput
from database.contact_db import save_contact_message
from utils.auth_utils import get_current_user
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("/submit")
async def submit_contact_form(
    form_data: ContactFormInput,
    current_user: str = Depends(get_current_user)  
):

    try:
        # Add username to the saved message
        message_id = save_contact_message(
            form_data.name,
            form_data.email, 
            form_data.message,
            username=current_user  # Store which user sent this
        )
        
        return {
            "success": True,
            "message": "Your message has been received. Thank you for contacting us!"
        }
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process your message")